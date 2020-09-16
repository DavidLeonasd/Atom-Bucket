const express = require('express');
const router=express.Router();
const m_transaksi=require('../model/m_transaksi');
const utils=require('../utils');

router.post('/transaksi', function (req, resp) {
    var responseContent={};
    var dateFrom=req.query.datefrom, dateTo=req.query.dateto, kategori_id=req.query.kategori_id, dompet_id=req.query.dompet_id
    if(!dateFrom || !dateTo){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'datefrom and dateto parameter is mandatory');
        return;
    }
    m_transaksi.read(null, dateFrom, dateTo, (err, res)=>{
        if(err){
            utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database');
            return;
        }
        responseContent.transaksi=res.rows;
        m_transaksi.readSumOfTransaction(dateFrom, dateTo, kategori_id, dompet_id,(err, res)=>{
            if(err){
                utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database');
                return;
            }
            responseContent.sum=res.rows;
            utils.expressSendResponseAndData(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success', responseContent);    
        })
    })
})

module.exports = router;