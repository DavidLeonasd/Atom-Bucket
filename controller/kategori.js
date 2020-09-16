const express = require('express');
const router=express.Router();
const m_kategori=require('../model/m_kategori');
const utils=require('../utils');

router.get('/create', function (req, resp) {
    if(!req.query.nama) {
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'nama is mandatory');
        return;
    }
    var nama=req.query.nama || '', deskripsi=req.query.deskripsi || '';
    m_kategori.create(nama, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.get('/update', function (req, resp) {
    if(!req.query.id || !req.query.nama){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'id and nama is mandatory');
        return;
    }
    var id=req.query.id, nama=req.query.nama || '', deskripsi=req.query.deskripsi || '';
    m_kategori.update(id, nama, deskripsi,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })
})

router.get('/get', function (req, resp) {
    var id=req.query.id;
    m_kategori.read(id,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else if(res.rows.length<=0)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_404_NOT_FOUND, 'No Data Found', );
        else utils.expressSendResponseAndData(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success', res.rows);
    })
})





module.exports = router;