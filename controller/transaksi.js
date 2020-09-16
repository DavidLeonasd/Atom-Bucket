const express = require('express');
const router=express.Router();
const m_transaksi=require('../model/m_transaksi');
const utils=require('../utils');

router.post('/create', function (req, resp) {
    if(!req.query.tanggal || !utils.checkDateIsValidWithFormat(req.query.tanggal, 'DD-MM-YYYY')){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'tanggal parameter invlaid');
        return;
    }
    if(!req.query.nilai || req.query.nilai<0){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'nilai parameter invlaid');
        return;
    }
    if(!req.query.dompet_id || isNaN(req.query.dompet_id)){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'dompet_id parameter invlaid');
        return;
    }
    if(!req.query.kategori_id || isNaN(req.query.kategori_id)){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'kategori_id parameter invlaid');
        return;
    }
    if(!req.query.istransaksimasuk || (req.query.istransaksimasuk!='true' && req.query.istransaksimasuk!='false')){
        utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_422_UNPROCESSABLE_ENTITY, 'istransaksimasuk parameter invlaid');
        return;
    }
    var deskripsi=req.query.deskripsi || '', tanggal=req.query.tanggal, nilai=req.query.nilai, dompet_id=req.query.dompet_id, kategori_id=req.query.kategori_id, istransaksimasuk=req.query.istransaksimasuk;
    if(istransaksimasuk=='false')nilai*=-1;
    m_transaksi.create(deskripsi, tanggal, nilai, dompet_id, kategori_id, istransaksimasuk,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else utils.expressSendResponse(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success');
    })

})

// router.get('/update', function (req, resp) {
    
// })

router.post('/get', function (req, resp) {
    var id=req.query.id;
    m_transaksi.read(id,(err, res)=>{
        if(err)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_500_INTERNAL_SERVER_ERROR, 'failed to execute query to database')
        else if(res.rows.length<=0)utils.expressSendErrorResponse(resp, utils.HTTP_RESPONSE_CODE_404_NOT_FOUND, 'No Data Found', );
        else utils.expressSendResponseAndData(resp, utils.HTTP_RESPONSE_CODE_200_OK, 'success', res.rows);
    })
})




module.exports = router;