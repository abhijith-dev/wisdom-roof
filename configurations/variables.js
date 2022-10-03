const values = process.env

module.exports = {
    server : {
        port : values.PORT,
        node_env : values.NODE_ENV,
        protocol : values.PROTOCOL
    },
    database : {
        connectionString  : values.NODE_ENV  === 'development' ? `${values.DB_URL}/${values.DB_NAME}`
                           : '',
        options : {} 
    }
}