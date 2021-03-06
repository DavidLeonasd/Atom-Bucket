const {getClient} = require('../db/connection');
const utils=require('../utils');

const table_name='transaksi';
const table_columns=['id','kode','deksipsi','tanggal','nilai','dompet_id','kategori_id','istransaksimasuk'];
const transaksi_kode_prefix_in='WIN';
const transaksi_kode_prefix_out='WOUT';
const transaksi_kode_starting_index_of_number_in=transaksi_kode_prefix_in.length+1;
const transaksi_kode_starting_index_of_number_out=transaksi_kode_prefix_out.length+1;
const transaksi_kode_start_value=100000;
module.exports.create=function(deskripsi, tanggal, nilai, dompet_id, kategori_id, istransaksimasuk, callback){
    var kode_starting_index=transaksi_kode_starting_index_of_number_in;
    if(istransaksimasuk=='false')kode_starting_index=transaksi_kode_starting_index_of_number_out;
    var queryKode=`SELECT SUBSTRING(kode,${kode_starting_index},LENGTH(kode))::int+1 AS kode FROM transaksi WHERE istransaksimasuk=${istransaksimasuk} ORDER BY LENGTH(kode) DESC,kode DESC LIMIT 1`;
    getClient((err, client, release)=>{
        client.query(queryKode, (err, res) => {
            if(err){
                if(err)utils.logDBQueryError(query, new Error(err.message))
                callback(err, res);
                return;
            }
            var kode_prefix=transaksi_kode_prefix_in;
            if(istransaksimasuk=='false')kode_prefix=transaksi_kode_prefix_out;
            var kode=transaksi_kode_start_value;
            if(res.rows[0])kode=res.rows[0].kode;
            var queryInsert=`INSERT INTO transaksi (kode, deskripsi, tanggal, nilai, dompet_id, kategori_id, istransaksimasuk) values('${kode_prefix}${kode}', '${deskripsi}', to_date('${tanggal}','DD-MM-YYYY'), ${nilai}, ${dompet_id}, ${kategori_id}, ${istransaksimasuk})`;
            client.query(queryInsert, (err, res) => {
                if(err)utils.logDBQueryError(queryInsert, new Error(err.message))
                callback(err, res);
            })
        })
        release();
    });
}

module.exports.update=function(id, kode, deskripsi, tanggal, nilai, dompet_id, kategori_id, istransaksimasuk, callback){
    var query=`UPDATE transaksi SET kode='${kode}', deskripsi='${deskripsi}', tanggal=to_date('${tanggal}','DD-MM-YYYY'), nilai=${nilai}, dompet_id=${dompet_id}, kategori_id=${kategori_id}, istransaksimasuk=${istransaksimasuk} WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
        })
        release();
    });
}

module.exports.read=function(id, dateFrom, dateTo, isTransaksiMasuk, kategori_id, dompet_id,keyWord, orderByColumn, callback){
    const allowedOrderByColumn=['id','kode','deksipsi','tanggal','nilai','dompet_id','kategori_id','istransaksimasuk','dompet_nama','kategori_nama'];
    var query=`SELECT transaksi.id, transaksi.kode, transaksi.deskripsi, transaksi.nilai, transaksi.dompet_id, transaksi.kategori_id, transaksi.istransaksimasuk, TO_CHAR(tanggal, 'DD-MM-YYYY') AS tanggal, dompet.nama AS dompet_nama, kategori.nama AS kategori_nama FROM ${table_name} JOIN dompet ON dompet.id=transaksi.dompet_id JOIN kategori ON kategori.id=transaksi.kategori_id WHERE 1=1`;
    if(id)query+=` AND kategori.id=${id}`;
    if(dateFrom)query+=` AND tanggal>=to_date('${dateFrom}','DD-MM-YYYY')`;
    if(dateTo)query+=` AND tanggal<=to_date('${dateTo}','DD-MM-YYYY')`;
    if(isTransaksiMasuk)query+=` AND istransaksimasuk=${dateTo}`;
    if(kategori_id)query+=` AND kategori_id=${kategori_id}`;
    if(dompet_id)query+=` AND dompet_id=${dompet_id}`;
    if(keyWord)query+=`AND (transaksi.kode ilike '%${keyWord}%' OR transaksi.deskripsi ilike '%${keyWord}%' OR dompet.nama ilike '%${keyWord}%' OR kategori.nama ilike '%${keyWord}%' OR TO_CHAR(tanggal, 'DD-MM-YYYY') ilike '%${keyWord}%')`;
    if(orderByColumn && allowedOrderByColumn.includes(orderByColumn))query+=` ORDER BY ${orderByColumn}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
        })
        release();
    });
}

module.exports.readSumOfTransaction=function(dateFrom, dateTo, kategori_id, dompet_id, callback){
    var query=`SELECT istransaksimasuk, SUM(nilai) FROM ${table_name} WHERE 1=1`;
    if(dateFrom)query+=` AND tanggal>=to_date('${dateFrom}','DD-MM-YYYY')`;
    if(dateTo)query+=` AND tanggal<=to_date('${dateTo}','DD-MM-YYYY')`;
    if(kategori_id)query+=` AND kategori_id=${kategori_id}`;
    if(dompet_id)query+=` AND dompet_id=${dompet_id}`;
    query+=` GROUP BY istransaksimasuk`;
    query+=` ORDER BY istransaksimasuk`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
        })
        release();
    });
}

