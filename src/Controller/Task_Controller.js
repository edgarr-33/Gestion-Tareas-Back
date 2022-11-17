const model =  require('../Model/Task')

const controllerTarea = {}


controllerTarea.get_task = (req,res) =>{
   
    if(req.session.userid){
        var data = req.body
        var keys =  Object.keys(data);
        
       if(keys.includes("id_tarea")){
            data.id_user = req.session.userid
            
            model.getTask(data,function(data_result){     
    
            res.send(data_result)
    
        });
       }else{
        res.send("Datos incompletos o erroneos")
       }
    }else{
        res.send("Se necesita un inicio de sesion")
    }
   
   
}  


controllerTarea.get_all_task = (req,res)=>{
    if(req.session.userid){
       data = {}
        data.id_user = req.session.userid
    
       
            
            model.getAllTask(data,function(data_result){
                res.send(data_result)
            })
       
       }else{
        res.send("Se necesita un inicio de sesion")
       }
    
    

}

controllerTarea.add_task  = (req,res) =>{

    if(req.session.userid){
        var data = req.body
        var keys = Object.keys(data)
        if(
        
        keys.includes("titulo") && 
        keys.includes("descripcion")&& 
        keys.includes("status") && 
        keys.includes("fecha") ){
            if(check_null(data,keys) == false){
                if(keys.includes("comentario") == false){
                    data.comentario = null
                }
                if(keys.includes("tags") == false){
                    data.tags = null
                    
                }
              
                data.id_user = req.session.userid
            
                
                model.addTask(data,function(data_result){
                    res.send(data_result)
                })
            }else{
                res.send("Revisar JSON existen datos con valores null que son obligatorios");
            }
            
    
        }else{
            res.send("Faltaron datos para poder registrar la tarea");
        }
    }else{
        res.send("Se necesita un inicio de sesion")
    }
   
  

}

controllerTarea.edit_task  = (req,res) =>{


    if(req.session.userid){
        var data_cambio = []
    var nombre_cambio = []
    cambios = {}

    var data = req.body
    var keys = Object.keys(data)
    if(keys.includes("id") &&
    keys.includes("titulo") && 
    keys.includes("descripcion")&& 
    keys.includes("status") && 
    keys.includes("fecha") ){
 
        if(check_null(data,keys) == false){

            var data_usuario_tarea ={
                id_tarea: data.id,
                id_user: req.session.userid
            }
    
            model.getTask(data_usuario_tarea,function(resultado){

                if(keys.includes("comentario") == false){
                    data.comentario = null
                }
                if(keys.includes("tags") == false){
                    data.tags = null
                }
             
                if(resultado.length >0){
                    
                   
                    
                    var dateString = resultado[0]["fecha"].toISOString();
                    resultado[0].fecha = dateString.substring(0,10)
        
                    keys = Object.keys(data)
                    
                    
                    keys.forEach(element => {
                        if(data[element] != resultado[0][element]){
                            nombre_cambio.push(element)
                            data_cambio.push(data[element])
                        }
                    });
                    cambios.id_tarea = data.id
                    cambios.name_cambio = nombre_cambio
                    cambios.data_cambio = data_cambio
                    
                    if(nombre_cambio.length > 0){
                        model.editTask(cambios,function(resultado_editar){
                            res.send(resultado_editar)
                        });
                    }else{
                      
                        res.send("El objeto enviado es el mismo que el la base de datos")
                    }
                }else{
                    res.send("No se encontro la tarea")
                }
    
               
               
            })
           
        }else{
             res.send("Revisar JSON existen datos con valores null que son obligatorios");
        }
        
    }else{
        res.send("Faltaron datos para poder actualizar la tarea")
    }

    }else{
        res.send("Se necesita un inicio de sesion")
    }
    
    




}

controllerTarea.delete_task  = (req,res) =>{
    
    if(req.session.userid){
            var data = req.body
            var keys = Object.keys(data)
            if(keys.includes("id_tarea")){
                data.id_user = req.session.userid
                if(check_null(data,keys) == false){
                    model.deleteTask(data,function(data_result){
                
                        res.send(data_result)
                        
                    });
                }else{
                    res.sendres.send("Revisar JSON existen datos con valores null que son obligatorios");
                }
                
           }else{
            res.send("Datos incompletos o erroneos")
           }
    }else{
        res.send("Se necesita un inicio de sesion")
    }

    
    
}


function check_null(data,keys){
    var flag = false
    keys.forEach(element => {
        if(data[element] == null){
            flag = true
            if(element == "comentarios" || element == "tags" ){
                flag = false
            }
        }
       
        
    });
    return flag;
}


module.exports = controllerTarea;