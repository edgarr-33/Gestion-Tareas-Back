const conexion = require('../DataBase/DataBaseConectionMySQL')
const modelTarea = {}
//el usuario puede obtener una tarea especifica atravez de su id_usuario y id de tarea, pasado por el body, {id_tarea = 1,id_usuario = 1}
function getTask(data,callback){
    var sql = 'SELECT * FROM tareas where id= ? and  id_usuario= ?'
    conexion.query(sql,[data.id_tarea,data.id_usuario], function(err, results){
          if (err){ 
            throw err;
          }
        return callback(results);
    })
}


//el usuario puede obtener una todas sus tareas atravez de su id, pasado por el body, {id_usuario =}
function getAllTask(data,callback){
    var sql = 'SELECT * FROM tareas where id_usuario= ?'
    conexion.query(sql,[data.id_usuario], function(err, results){
      if (err){ 
        throw err;
      }
    
        return callback(results);
    })
}

function addTask(data,callback){
  
  var sql = 'INSERT INTO tareas(id_usuario, titulo, descripcion, status, fecha, comentario, tags) VALUES (?,?,?,?,?,?,?)';
  conexion.query(sql,[data.id_usuario,data.titulo,data.descripcion,data.status,data.fecha,data.comentario,data.tags]
  , function(err){
    if (err){ 
      throw err;
    }
      results = "Añadido correctamente"
      return callback(results);
  })
}

function editTask(data,callback){

  var sql = "UPDATE tareas SET"
  data.name_cambio.forEach(element => {
      sql = sql + " "+element+" = ? ,"
  });

  sql =sql.substring(0,sql.length-1)
  sql = sql + " where id = " + data.id_tarea
  

  conexion.query(sql,data.data_cambio
  , function(err){
    if (err){ 
      throw err;
    }
  
      results = "Tarea editada"
      return callback(results);
  })
}

function deleteTask(data,callback){
  

  conexion.query(
    "DELETE FROM tareas where id=? and id_usuario= ?",[data.id_tarea,data.id_usuario]
  , function(err,resul){
    if (err){ 
      throw err;
    }
  
      var results = ''
      if(resul["affectedRows"] == 0 ){
        results= "No se elimino la tarea"
      }else{
        results= "Tarea borrada"
      }
  
      
      return callback(results);
  })
}

modelTarea.getTask = getTask
modelTarea.getAllTask = getAllTask
modelTarea.addTask = addTask
modelTarea.editTask = editTask
modelTarea.deleteTask = deleteTask

module.exports = modelTarea;