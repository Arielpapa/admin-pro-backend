const { response } = require ('express');
const bcrytpt = require ('bcryptjs');

const Usuario = require ('../models/usuario');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0; 
   
/*
    const usuarios = await Usuario.

    const total = await Usuario.count();    
*/

const [usuarios,total]= await Promise.all([
    Usuario
        .find({}, 'nombre email role google img') //aplica filtros
        .skip(desde)
        .limit(5),

    Usuario.countDocuments()
    

])
    res.json({
        ok:true,
        usuarios,
        total
       // uid: req.uid
    });
};

const crearUsuario = async (req, res = response) => {
    const { email, password, nombre } = req.body;

   

    try {    
        const existeEmail = await Usuario.findOne({email});
        if (existeEmail){
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario (req.body);

        // Encriptar contraseña
        const salt = bcrytpt.genSaltSync();
        usuario.password = bcrytpt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();
    
        //generar el TOKEN -JWT
          const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
        
    }



};
const actualizarUsuario = async (req, res = response)=>{
//TODO: validar token y comprobar si es el usuario correcto
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById (uid);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese ID'
            });
        }

    //Actualizaciones
    const { password , google, email, ...campos} = req.body;   
    if ( usuarioDB.email !== email){
        
        const existeEmail = await Usuario.findOne ({email });
        if( existeEmail ){
            return res.status(400).json({
                ok:false,
                msg: 'ya existe un usuario con ese email'
            })
        }
    }

    campos.email= email;
    //delete campos.password;
    //delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate( uid,campos, {new:true} );
        res.json({
            ok:true,
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response)=>{
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById (uid);
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese ID'
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok:true,
            msg: 'Usuario eliminado'
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuario, 
    actualizarUsuario,
    borrarUsuario,
}