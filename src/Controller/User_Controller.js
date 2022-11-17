const model =  require('../Model/User')



controllerUser = {}

controllerUser.login = (req,res) =>{
    
    var data =  req.body
    var keys = Object.keys(data)

    if((keys.includes("usuario") && keys.includes("contrasenia"))){
        model.login(data,function(result){
            
            if(result.length  == 0){
                res.send("No se encontro el usuario")
            }else{
                session=req.session;
                session.userid=result[0]["id_usuario"];
                res.send("Sesion iniciada con exito")
               
            }

            
        })
       
    }else{
        res.send("Datos incompletos")
    }
    

}

controllerUser.logout = (req,res) =>{
    req.session.destroy()
    res.send("Sesion cerrada")
   
    
}


module.exports = controllerUser;