const conexion = require('../DataBase/DataBaseConectionMySQL')
const modelTask = {}

function login(data,callback){
    var sql = 'SELECT id_user FROM usuario where user= ? and password= ?'
    conexion.query(sql,[data.user,data.pass], function(err, results){
          if (err){ 
            throw err;
          }
        return callback(results);
    })
}

modelTask.login = login

module.exports = modelTask