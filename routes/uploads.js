/*
    ruta: api/uploads/

*/
const { Router } = require ('express');
const { fileUpload, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload());

router.put ('/:tipo/:id',validarJWT ,fileUpload);
router.get ('/:tipo/:foto',retornaImagen);





module.exports = router;