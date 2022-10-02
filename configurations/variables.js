const values = process.env

module.exports = {
    server : {
        port : values.PORT,
        node_env : values.NODE_ENV,
        protocol : values.PROTOCOL
    }
}