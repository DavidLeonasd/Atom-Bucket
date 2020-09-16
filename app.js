const express = require('express');
const app=express();
const port=process.env.PORT || 3000;

const c_Dompet = require('./controller/dompet');
const c_Kategori = require('./controller/kategori');
const c_Transaksi = require('./controller/transaksi');
const c_Laporan = require('./controller/laporan');
const bodyParser = require('body-parser')

app.use('/dompet', c_Dompet);
app.use('/kategori', c_Kategori);
app.use('/transaksi', c_Transaksi);
app.use('/laporan', c_Laporan);

app.listen(port)
console.log("Atom-Pocket listening on port : "+port);