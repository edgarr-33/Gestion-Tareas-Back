const mysql = require('mysql2');
const conc = {}

const conexion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
});

 conexion.connect((err)=>{
    if(err) throw err;
    console.log("conexion a base de datos");

});


module.exports = conexion;