const {getClient} = require('../db/connection');
const table_name='kategori';
const table_columns=['nama','deskripsi'];
module.exports.create=function(nama, deskripsi, callback){
    var query=`INSERT INTO ${table_name}(nama, deskripsi) VALUES('${nama}', '${deskripsi}')`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}

module.exports.update=function(id, nama, deskripsi, callback){
    var query=`UPDATE ${table_name} SET nama='${nama}', deskripsi='${deskripsi}' WHERE id=${id}`;
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
    var query=`SELECT * FROM ${table_name} WHERE isactive=true`;
    if(id)query+=` AND id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            callback(err, res);
          })
        release();
    });
}