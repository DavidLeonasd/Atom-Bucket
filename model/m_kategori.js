const {getClient} = require('../db/connection');
const utils=require('../utils');

const table_name='kategori';
const table_columns=['id','nama','deskripsi','isactive'];
module.exports.create=function(nama, deskripsi, callback){
    var query=`INSERT INTO ${table_name}(nama, deskripsi) VALUES('${nama}', '${deskripsi}')`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
          })
        release();
    });
}

module.exports.update=function(id, nama, deskripsi, callback){
    var query=`UPDATE ${table_name} SET nama='${nama}', deskripsi='${deskripsi}' WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
          })
        release();
    });
}

module.exports.updateStatus=function(id, isActive, callback){
    var query=`UPDATE ${table_name} SET isactive='${isActive}' WHERE id=${id}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
          })
        release();
    });
}

module.exports.read=function(id, isActive, keyWord, orderByColumn, callback){
    var query=`SELECT * FROM ${table_name} WHERE 1=1`;
    if(id)query+=` AND id=${id}`;
    if(isActive)query+=` AND isactive=${isActive}`;
    if(keyWord)query+=` AND (nama ilike '%${keyWord}%' OR deskripsi ilike'%${keyWord}%')`;
    if(orderByColumn && table_columns.includes(orderByColumn))query+=` ORDER BY ${orderByColumn}`;
    getClient((err, client, release)=>{
        client.query(query, (err, res) => {
            if(err)utils.logDBQueryError(query, new Error(err.message))
            callback(err, res);
          })
        release();
    });
}