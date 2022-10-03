//loading envirnoment 
require('./configurations/envirnoment')

//imports
const express = require('express')
const helmet = require('helmet')
const http = require('http')
const https = require('https')

const app = express()

//security
app.use(helmet.contentSecurityPolicy())
app.use(helmet.crossOriginEmbedderPolicy())
app.use(helmet.crossOriginOpenerPolicy())
app.use(helmet.crossOriginResourcePolicy())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.originAgentCluster())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
app.disable('x-powered-by')

//default middlewares

app.use(express.json())


//server configuration
const vars = require('./configurations/variables')  // imports variables
const database = require('./configurations/database.config') //imports database config 
const initialRequest = require('./middlewares/initialRequest')
const rwisdomRoof = require('./middlewares/rwr')

const envirnoments = {
    dev: {
        platform: 'development',
        protocol: ['http']
    },
    stage: {
        platform: 'stage',
        protocol: ['http', 'https']
    },
    prod: {
        platform: 'production',
        protocol: ['https']
    },
}
let server = undefined
let isHTTP = vars.server.protocol === 'http'

if (vars.server.node_env === envirnoments.prod.platform
    && envirnoments.prod.protocol.includes(vars.server.protocol)) {
    //getting certificate for https protocol
    let certificate = !isHTTP ? {
    cert: require('fs').readFileSync('./certificate/cert'),
    key: require('fs').readFileSync('./certificate/key')
    } : {}    
    server = https.createServer(app, certificate)
}
else if (vars.server.node_env === envirnoments.dev.platform
    && envirnoments.dev.protocol.includes(vars.server.protocol)) {
    //getting certificate for https protocol
    let certificate = !isHTTP ? {
    cert: require('fs').readFileSync('./certificate/cert'),
    key: require('fs').readFileSync('./certificate/key')
    } : {}
    server = isHTTP ?
        http.createServer(app) :
        https.createServer(app, certificate)
}
else {
    server = http.createServer(app)
}

//custom middlewares
app.use('/api',rwisdomRoof) //initial request
app.use("/api/v1",initialRequest) // checker for server maintenance down & rrid attachment


//routes
app.get('/test',(req,res)=>{res.status(200).send({})})
//initialization server
async function initServer(error) {
    if (!error) {
        console.log("server started..")
        let r = await database.initialize()
        console.log(r)
    }
    else {
        console.log('Opps !! something went wrong . error details :', error)
        let d  = await database.terminate()
        await (d.console ? (function(){console.log(d.text); process.exit(1); })() : await process.exit(1))
    }
}
//listen to server 
server.listen(vars.server.port, initServer)


