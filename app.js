const express = require('express');
const config = require('./config.json')
const app=express();
const port=process.env.PORT || config.HOST_Port;
const {testConnection} = require('./db/connection');
const c_Dompet = require('./controller/dompet');
const c_Kategori = require('./controller/kategori');
const c_Transaksi = require('./controller/transaksi');
const c_Laporan = require('./controller/laporan');

app.use('/dompet', c_Dompet);
app.use('/kategori', c_Kategori);
app.use('/transaksi', c_Transaksi);
app.use('/laporan', c_Laporan);

testConnection((err, res)=>{
    if(err){
        console.error(`Atom-Pocket testing connection to database failed`);
        console.error(`Atom-Pocket terminated`);
        return;
    }
    app.listen(port)
    console.log("Atom-Pocket listening on port : "+port);
})
