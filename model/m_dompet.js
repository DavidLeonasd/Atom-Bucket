const {getClient} = require('../db/connection');
const table_name='dompet';
const table_columns=['nama','referensi','deskripsi'];

module.exports.create=function(nama, referensi, deskripsi, callback){
    var query=`INSERT INTO ${table_name}(nama, referensi, deskripsi) VALUES('${nama}', '${referensi}', '${deskripsi}')`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}

module.exports.update=function(id, nama, referensi, deskripsi, callback){
    var query=`UPDATE ${table_name} SET nama='${nama}', referensi='${referensi}', deskripsi='${deskripsi}' WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}

module.exports.updateStatus=function(id, isActive, callback){
    var query=`UPDATE ${table_name} SET isactive='${isActive}' WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}

module.exports.read=function(id, callback){
    var query=`SELECT * FROM ${table_name}`;
    if(id)query+=` WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}