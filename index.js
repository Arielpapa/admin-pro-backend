const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require ('./database/config');

//Crear el servidor de express
const app = express();

//configurar CORS
app.use(cors());

// Lectura del body
app.use( express.json() );

//base de datos
dbConnection();

//console.log (process.env);


//arielpapa
//franco0711
// Rutas
app.use ('/api/usuarios', require('./routes/usuarios'));
app.use('/api/todo',require ('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require ('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/upload', require('./routes/uploads'));




app.listen(process.env.PORT, () =>{
    console.log ('Servidor corriendo en el puerto ' + process.env.PORT);
} );


