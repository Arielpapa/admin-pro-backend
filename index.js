const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require ('./database/config');

//Crear el servidor de express
const app = express();

//configurar CORS
app.use(cors());
//base de datos
dbConnection();

//console.log (process.env);


//arielpapa
//franco0711
// Rutas
app.get ('/', (req, res) => {

    res.json({
        ok:true,
        msg: 'hola mundo'
    });

})


app.listen(process.env.PORT, () =>{
    console.log ('Servidor corriendo en el puerto ' + process.env.PORT);
} );


