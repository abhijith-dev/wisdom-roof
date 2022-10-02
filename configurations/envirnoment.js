const options = {
    DEV: 'development',
    STAGE: 'stage',
    PROD: 'production'
}
const dotenv = require('dotenv')

module.exports = (function () {
    let env = process.argv[2]
    if (env === options.DEV)
        dotenv.config({
            path: '.env'
        })
    if (env === options.STAGE)
        dotenv.config({
            path: 'stage.env'
        })
    if (env === options.PROD) {
        dotenv.config({
            path: 'production.env'
        })
    }
})()
