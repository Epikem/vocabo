express        = require("express")
express        = require("express")
connect        = require("connect")
jade           = require("jade")
app            = module.exports = express()
mongoose       = require("mongoose")
mongoStore     = require("connect-mongodb")
connectTimeout = require("connect-timeout")
sys            = require("sys")
path           = require("path")
fs             = require("fs")
less           = require("less")

entry          = require("./models/entry")
update         = require("./models/update")
tag            = require("./models/tag")
user           = require("./models/user")

#User   = null
#Update = null
#Entry  = null
#Tag    = null

hash = (msg, key) ->
  crypto.createHmac("sha256", key).update(msg).digest "hex"


requireLogin = (req, res, next) ->
  if req.session.user
    next()
  else
    req.flash "error", "Login required"
    res.redirect "/login"

NotFound = (msg) ->
  @name = "NotFound"
  Error.call this, msg
  Error.captureStackTrace this, arguments.callee

isEmpty = (obj) ->
  for prop of obj
    return false  if obj.hasOwnProperty(prop)
  true

getFileDetails = (filename, callback) ->
  fs.stat filename, (err, stat) ->
    if err
      return callback(null, 0)  if err.errno == process.ENOENT
      return callback(err)
    callback null, [ stat.size, stat.mtime, stat.ctime ]


Settings =
  development: {}
  test: {}
  production: {}


app = module.exports = express()

app.set "views", __dirname + "/views"
app.set "view engine", "jade"
# app.use express.favicon()
# app.use express.bodyParser()
# app.use express.cookieParser()
# app.use express.session(
#   store: mongoStore(app.set("db-uri"))
#   secret: "kingofnopants"
# )
# app.use express.logger(format: "\u001b[1m:method\u001b[0m \u001b[33m:url\u001b[0m :response-time ms")
# app.use express.methodOverride()
# app.use express.compiler(
#   src: __dirname + "/public/stylesheets"
#   enable: [ "less" ]
# )
bodyParser = require('body-parser')
cookieParser = require('cookie-parser')
serveFavicon = require('serve-favicon')
expressSession = require('express-session')
methodOverride = require('method-override')
morgan = require('morgan')
app.use bodyParser()
app.use cookieParser()
app.use serveFavicon('./public/favicon.ico')
# app.use connectTimeout(time: 10000)
app.use expressSession(
  store: mongoStore(app.set("db-uri"))
  secret: "kingofnopants"
)
app.use morgan("\u001b[1m:method\u001b[0m \u001b[33m:url\u001b[0m :response-time ms")
app.use methodOverride()
app.use require('less-middleware')(__dirname+'/public/stylesheets')
app.use express.static(__dirname + "/public/stylesheets", {enable: ['less']})


# app.dynamicHelpers
#   currentUser: (req, res) ->
#     req.session.user

#   messages: require("express-messages")

app.use require('connect-flash')();
app.use (req, res, next) ->
  res.locals.messages = require('express-messages')(req, res);
  next();


# Config

process.env.NODE_ENV = 'development'

# app.configure "development", ->
if process.env.NODE_ENV == 'development'
  app.set "db-uri", "mongodb://localhost/kdict"
  app.use morgan()
  app.use require('errorHandler')(
    dumpExceptions: true
    showStack: true
  )

# app.configure "production", ->
if process.env.NODE_ENV == 'production'
  app.set "db-uri", "mongodb://localhost/kdict"
  app.use morgan()
  app.use require('errorHandler')()

# app.configure "test", ->
if process.env.NODE_ENV == 'test'
  app.set "db-uri", "mongodb://localhost/kdict_test"
  app.use require('errorHandler')(
    dumpExceptions: true
    showStack: true
  )



entry.defineModel mongoose, ->
  console.log("Defined entry")

  # update.defineModel mongoose, ->
  #   console.log("Defined update")

  tag.defineModel mongoose, ->
    console.log("Defined tag")

    user.defineModel mongoose, ->
      console.log("Defined user")

      db = mongoose.connect(app.get("db-uri"))

###
models.defineModels mongoose, ->
  console.log("Defining models")
  app.Entry  = Entry  = mongoose.model("Entry")
  app.Update = Update = mongoose.model("Update")
  app.User   = User   = mongoose.model("User")
###
  

# app.error (err, req, res, next) ->
#   if err instanceof NotFound
#     res.render "404", status: 404
#   else
#     next err

app.use (err, req, res, next) ->
  if err instanceof NotFound
    res.render "404", status: 404
  else
    next err

# This seems kind of tightly coupled
user = require('./controllers/users')
app.get  '/login/?',            user.showLogin
app.post '/login/?',            user.login
app.get  '/logout/?',           user.logout
app.get  '/signup/?',           user.signup
app.post '/signup/?',           user.create
app.get  '/users/top/?',        user.top
app.get  '/users/:username',    user.show
app.get  '/login/reset',        user.showResetEmail
app.post '/login/reset',        user.sendResetEmail
app.get  '/login/reset/:token', user.showResetForm
app.post '/login/reset/:token', user.resetPassword

statics = require('./controllers/static')
app.get '/404/?',                   statics.notFound
app.get '/data/:file(*)',           statics.data
app.get '/about/?',                 statics.about
app.get '/contribute/?',            statics.contribute
app.get '/contribute/tagged?',      statics.tagged

app.get '/developers/contribute/?', statics.developers
app.get '/developers/download/?',   statics.download

entries = require('./controllers/entries')
app.get  '/entries/:id.:format?', entries.showById

# PROBLEM: What if we want to find all entries for 'new'
app.get  '/entries/new/?',             requireLogin, entries.new
app.post '/entries/?',                 requireLogin, entries.create
app.post '/entries/create_raw/?',      entries.create_raw
app.get  '/entries/:id.:format?/edit', entries.edit
app.put  '/entries/:id.:format?/edit', entries.update
#app.get  '/entries/:id.:format?/edit', requireLogin, entries.edit
#app.put  '/entries/:id.:format?/edit', requireLogin, entries.update
app.del  '/entries/:id.:format?',      requireLogin, entries.delete

app.get  '/entries/batch',             requireLogin, entries.batchEdit

#app.put '/entries/:id.:format?',      updates.update, requireLogin 
#app.del  '/entries/:id.:format?',     updates.delete, requireLogin

updates = require('./controllers/updates')
app.get '/updates',                   updates.list
app.get '/updates/:id',               updates.show

# This should be After all other routes
app.get  '/:word.:format?',       entries.show # Temporarily disabled



# Root
app.get "/", (req, res, next) ->
  unless isEmpty(req.query)
    entries.search req, res, next
  else
    statics.index req, res, next

app.use (err, req, res, next) ->
  if "ENOENT" == err.code
    throw new NotFound
  else
    next err



app.get "*", (req, res) ->
  res.render "404", status: 404

unless module.parent
  server = app.listen 3000, ->
  # console.log "Express server listening on port %d, environment: %s", server.address.port, server.settings.env
  console.log "Express server listening on port %d", server.address.port
  console.log "Using connect %s, Express %s, Jade %s", connect.version, express.version, jade.version

