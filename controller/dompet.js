const express=require('express');
const m_dompet=require('../model/m_dompet');
const utils=require('../utils');
const router=express.Router();


router.get('/create', function (req, resp) {
    if(!req.query.nama) {
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'nama is mandatory');
        return;
    }
    var nama=req.query.nama || '', referensi=req.query.referensi || '', deskripsi=req.query.deskripsi || '';
    m_dompet.create(nama, referensi, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.get('/update', function (req, resp) {
    if(!req.query.id || !req.query.nama){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'id and nama is mandatory');
        return;
    }
    var id=req.query.id, nama=req.query.nama || '', referensi=req.query.referensi || '', deskripsi=req.query.deskripsi || '';
    m_dompet.update(id, nama, referensi, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.get('/get', function (req, resp) {
    var id=req.query.id;
    m_dompet.read(id,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponseAndData(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success', res.rows);
    })
})



module.exports = router;