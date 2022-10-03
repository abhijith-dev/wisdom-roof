module.exports = function (code = 500 ) {
    switch(code){
        case 200 : return 'OK' 
        case 400 : return 'Bad Request'
        case 401 : return 'Unauthorized Request'
        case 403 : return 'Forbidden'
        default : return 'Internal Server Error'
    }
}