import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';


export const autenticar = async (req,res,next) =>{
    try {
        const token = req.cookies.access_token;

        if(!token){
            res.status(400).json({message: 'token invalido'})
        }
    
        const decoded = await jwt.verify(token,SECRET_JWT_KEY);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.log('token expirado');
        
    }
}