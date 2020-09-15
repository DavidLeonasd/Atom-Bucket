const express = require('express');
const app=express();
const port=process.env.PORT || 3000;

const c_Account = require('./controller/account');
const c_Dompet = require('./controller/dompet');
const c_Kategori = require('./controller/kategori');
const c_Transaksi = require('./controller/transaksi');
const bodyParser = require('body-parser')

app.post('/', function (req, res) {
    console.log(req.params);
    if(req.params.qq==null)res.send("qq not found");
    else res.send('Atom-Pocket')
})

app.use('/account', c_Account);
app.use('/dompet', c_Dompet);
app.use('/kategori', c_Kategori);
app.use('/transaksi', c_Transaksi);

app.listen(port)
console.log("Atom-Pocket listening on port : "+port);