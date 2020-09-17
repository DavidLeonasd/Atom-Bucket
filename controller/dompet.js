const express=require('express');
const m_dompet=require('../model/m_dompet');
const utils=require('../utils');
const router=express.Router();


router.post('/create', function (req, resp) {
    if(!req.query.nama || req.query.nama.length<5) {
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'nama is mandatory and must be longer than 5 character');
        return;
    }
    if(req.query.deskripsi && req.query.deskripsi.length>100) {
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'deskripsi max length 100');
        return;
    }
    var nama=req.query.nama || '', referensi=req.query.referensi || '', deskripsi=req.query.deskripsi || '';
    m_dompet.create(nama, referensi, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.post('/update', function (req, resp) {
    if(!req.query.id){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'id is mandatory');
        return;
    }
    if(!req.query.nama || req.query.nama.length<5){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'nama is mandatory and must be longer than 5 character');
        return;
    }
    if(req.query.deskripsi && req.query.deskripsi.length>100) {
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'deskripsi max length 100');
        return;
    }
    var id=req.query.id, nama=req.query.nama || '', referensi=req.query.referensi || '', deskripsi=req.query.deskripsi || '';
    m_dompet.update(id, nama, referensi, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.post('/updatestatus', function (req, resp) {
    if(!req.query.id){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'id is mandatory');
        return;
    }
    if(!req.query.isactive || (req.query.isactive!='true' && req.query.isactive!='false')){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, `isactive must be 'true' or 'false'`);
        return;
    }
    var id=req.query.id, isActive=req.query.isactive;
    m_kategori.updateStatus(id, isActive,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.post('/get', function (req, resp) {
    var id, isactive, keyword;
    if(req.query.isactive && (req.query.isactive!='true' && req.query.isactive!='false')){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, `isactive must be 'true' or 'false'`);
        return;
    }
    id=req.query.id;
    isactive=req.query.isactive;
    keyword=req.query.keyword;
    orderByColumn =req.query.orderbycolumn;
    m_dompet.read(id, isactive, keyword, orderByColumn, (err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponseAndData(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success', res.rows);
    })
})



module.exports = router;