const express = require("express");
const app =  express();
app.use(express.json());
const conexion = require('./DataBase/DataBaseConectionMySQL')


const tareas = require('./Routes/Task_Routes');
app.use('/tarea',tareas);


app.listen(8000,()=>{
    console.log('Servidor corriendo')
    conexion.firstConec 
});