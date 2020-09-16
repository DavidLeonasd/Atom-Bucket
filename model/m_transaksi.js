const {getClient} = require('../db/connection');
const table_name='transaksi';
const table_columns=['kode','deksipsi','tanggal','nilai','dompet_id','kategori_id','istransaksimasuk'];
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
                callback(err, res);
                return;
            }
            var kode_prefix=transaksi_kode_prefix_in;
            if(istransaksimasuk=='false')kode_prefix=transaksi_kode_prefix_out;
            var kode=transaksi_kode_start_value;
            if(res.rows[0])kode=res.rows[0].kode;
            var queryInsert=`INSERT INTO transaksi (kode, deskripsi, tanggal, nilai, dompet_id, kategori_id, istransaksimasuk) values('${kode_prefix}${kode}', '${deskripsi}', to_date('${tanggal}','DD-MM-YYYY'), ${nilai}, ${dompet_id}, ${kategori_id}, ${istransaksimasuk})`;
            client.query(queryInsert, (err, res) => {
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
            callback(err, res);
        })
        release();
    });
}

module.exports.read=function(id, callback){
    var query=`SELECT *, TO_CHAR(tanggal, 'DD-MM-YYYY') AS tanggal FROM ${table_name}`;
    if(id)query+=` WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
        })
        release();
    });
}

