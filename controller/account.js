const express = require('express');
const router=express.Router();


router.get('/register', function (req, res) {
    res.send(req.params);
})

router.get('/login', function (req, res) {
    res.send(req.params);
})



module.exports = router;