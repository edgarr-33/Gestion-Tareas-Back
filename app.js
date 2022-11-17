const express = require("express");
var bodyParser = require('body-parser')
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const app =  express();

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json())

const timeDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: process.env.SECRET,
    saveUninitialized:false,
    cookie: { maxAge: timeDay },
    resave: false
}));

//Tareas ruta
// const task = require('./src/routes/task_router')
const task = require('./src/Routes/Task_Routes')
app.use('/task',task)

const user = require('./src/Routes/User_Routes')
app.use('/user',user)



app.get('/',(req,res)=>{
    res.send("Sistema de Gestion de Tareas")
})



app.listen(8000,()=>{
    console.log('Servidor corriendo')
    
});