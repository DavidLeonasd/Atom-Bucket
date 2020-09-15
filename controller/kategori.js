const express = require('express');
const router=express.Router();


router.get('/create', function (req, res) {
    res.send(req.params);
})

router.get('/update', function (req, res) {
    res.send(req.params);
})

router.get('/get', function (req, res) {
    res.send(req.params);
})






module.exports = router;