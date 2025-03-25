import { validarUsuario } from "../schema/validacionUser.js";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from "../config.js";

export class controllerUser{
    constructor ({usuariosModel}){
        this.usuariosModel= usuariosModel;
    }

    registerUser = async (req,res) =>{
        try {
            const vali = validarUsuario(req.body);
            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }
            const user = await this.usuariosModel.register(vali.data);

            res.status(200).json({user});
            
        } catch (error) {
            res.status(400).json({message : 'error al registrar usuarios', error: error.message});
        }
    }

    loginUser = async (req,res) =>{
        try {
            const vali = validarUsuario(req.body);

            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }
            
            const user = await this.usuariosModel.login(vali.data);

            const token = jwt.sign(
                {nombre: user.nombre, email: user.email},
                SECRET_JWT_KEY,
                {expiresIn : '48h'}
            )

            res
            .cookie('acces_token',token, {
                httpOnly: true, 
                sameSite : 'strict', 
                secure : process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 48        
            })
            .send({user,token})
            } catch (error) {
                res.status(500).json({message : 'error al logear usuarios', error: error.message});
            }
        }
    updateUser = async (req,res) =>{
        const {id} = req.params;
        try {
            const vali = validarUsuario(req.body);
            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }

            const result = await this.usuariosModel.actualizarUsuario(vali.data,id );

            res.status(200).json({message : 'se actualizo el usuario',result});
             } catch (error) {
            res.status(500).json({message : 'error al actualizar usuarios', error: error.message});
            }
        }
}