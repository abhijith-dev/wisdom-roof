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
const vars = require('./configurations/variables')  // imports 
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

//routes

//initialization server
async function initServer(error) {
    if (!error) {
        console.log("server started..")
    }
    else {
        console.log('Opps !! something went wrong . error details :', error)
        process.exit(1)
    }
}
//listen to server 
server.listen(vars.server.port, initServer)


