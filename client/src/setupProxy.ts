import * as proxy from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(proxy('/api', 
    { target: 'http://vocabo-server:3001/' }
  ));
}