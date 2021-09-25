const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const auth = require('../middleware/auth')
const { check } = require('express-validator');
//crea tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
)
//obtener las tareas por proyecto
router.get('/',
    auth,
    tareaController.obtenerTareas
);
//actualiazar tarea
router.put('/:id',
    auth,
    tareaController.actualizarTarea
)
//eliminar tarea
router.delete('/:id',
    auth,
    tareaController.eliminarTarea)
module.exports = router;

