import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';


export const autenticar = async (req,res,next) =>{
    try {
        const token = req.cookies.access_token;

        if(!token){
            return res.status(400).json({message: 'token invalido'})
        }
    
        const decoded =  jwt.verify(token,SECRET_JWT_KEY);

        req.user = decoded;  

        next();  
    } catch (error) {
        return res.status(401).json({ message: 'Token expirado o inválido' });  
    }
}