const { connect,connection } = require('mongoose')
const vars = require('./variables')

/**
 * intializing database connnections
 * @param {String} args additional connection string
 * @returns {String} prompt -> success | error -> failure
 */
const initialize = async ( args = vars?.database?.connectionString ) =>{
    try {
        let f  = await connect(args,vars?.database?.options)
        let r = {}
        return  (f) ? r['message'] = 'connected to database' : r['message'] = 'Opps! unable to connect database first'
    } catch (e) {
       return e.message ? e.message : 'Opps! unable to connect database' 
    }

}

/**
 * terminate database connections
 * @param {String} f mode "normal | console"
 * @returns {Object} {text: message,console:Boolean | undefined} 
 */
const terminate = async (f = `normal`) =>{
    await connection.close()
    let r = f  === 'console'? {text:'database connection closed',console:true} : { console:false }
    return r
}

module.exports = {
    initialize,
    terminate
}