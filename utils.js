const moment=require('moment');
const {log}=require('./logger');

module.exports.logDBQueryError = function(query, error){
    log.error(query,'\n',error)
}
module.exports.checkDateIsValidWithFormat = function(dateString, patternString){
    return moment(dateString,patternString,true).isValid();
}

module.exports.HTTP_RESPONSE_CODE_200_OK=200;
module.exports.expressSendResponse = function(res, StatusCode, Message){
    res.status(StatusCode).send({Message : Message})
}

module.exports.expressSendResponseAndData = function(res, StatusCode, Message, Data){
    var respMessage={};
    respMessage.message=Message;
    respMessage.data=Data
    res.status(StatusCode).send(respMessage)
}

module.exports.HTTP_RESPONSE_CODE_404_NOT_FOUND=404;
module.exports.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY=422;
module.exports.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR=500;
module.exports.expressSendErrorResponse = function(res, StatusCode, Message){
    res.status(StatusCode).send({ErrorMessage : Message})
}

module.exports.REGEX_DATE_DD_MM_YYYY_PATTERN = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20|21)\d\d$/
module.exports.REGEX_DATE_MM_DD_YYYY_PATTERN = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20|21)\d\d$/