module.exports = function(req,res,next) {
    //version attachement
    process.v = "v"+require('../package.json').version.split(".")[0].toString()
    next()
}