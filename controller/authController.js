const Usuario = require('../models/Usuario');
const bcryptjs = require('bcrypt');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req,res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    //extraer el email y password
    const {email, password} = req.body;

    try {
        //revisar que el usuario este registrado
        let usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'})
        }

        //revisar el password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto) {
            return res.status(400).json({msg: 'Password Incorrecto'})  
        }

        // si todo es correcto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error; 
             //mensaje de confirmacion 
        res.json({ token, msg: 'Usuario creado correctamente' }) 
        })
    } catch (error) {
        console.log(error)
    }
}