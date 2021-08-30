//rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

//crea un usuario
// api/usuarios
router.post('/', 
    usuarioController.crearUsuario
);
module.exports = router;
