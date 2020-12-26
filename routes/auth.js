/*
    Path: '/api/login
*/
const { Router } = require ('express');
const { check } = require('express-validator');
const { login } = require ('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
    [
        check('password', 'el password es obligatorio').not().isEmpty(),  
        check('email', 'el mail es obligatorio').isEmail(),
        validarCampos,

    ],
    login
)



module.exports = router;