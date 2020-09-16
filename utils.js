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

module.exports.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY=422;
module.exports.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR=500;
module.exports.expressSendErrorResponse = function(res, StatusCode, Message){
    res.status(StatusCode).send({ErrorMessage : Message})
}