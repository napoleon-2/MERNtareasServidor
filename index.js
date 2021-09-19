const express = require('express');
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//habilitar express.json
app.use(express.json({ extendend: true}));

//puerto de app
const PORT = process.env.PORT || 4000;
//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
//arrancar la app 
app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
}); 
//pass MRxnJqbidNChhwgJ