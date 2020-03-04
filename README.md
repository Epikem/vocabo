# vocabo

## tech stack

### client
- aws cloudfront
- aws s3
- react
- react-router
- styled-component
- redux
- typescript

### server
- aws lambda
- aws cloudformation
- express

## getting started (obsolete. TODO: update this)

To run this project, go client or server folder then install packages with `yarn` or `npm install` command.
On server, use `yarn dev` or `npm run dev` command to start watch.
To create elasticsearch index(database), start elasticsearch on localhost:9200. Then you have to run logstash with `kengdic.logstash.conf` config file. You have to set environment variable `vocaboScriptFolderPath` to absolute `kdict/scripts` folder path. Alternatively you can run `importDatas.ps1` powershell script.

On client, use `yarn start` or `npm run start` command to start.
