const httpstatus = require('../utils/httpstatus')

module.exports = function (req,res,next) {
   let request = req
   let isServerInMaintenance = true
   request.id = require('uuid').v4()
   request.os  = process.platform
   if(isServerInMaintenance === 'yes' || isServerInMaintenance || isServerInMaintenance === 'y'){
     return res.status(503).json({
        code : 503,
        status :httpstatus(503),
        irid : req.id
     })
   }
   else
     next() 
} 