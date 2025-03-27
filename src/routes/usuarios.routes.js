import { Router } from "express";
import { controllerUser } from "../controller/usuario.controller.js";
import { autenticar } from "../middlewares/autenticacion.js";

export const crearUser = ({usuariosModel}) =>{

    const  routerUser = Router();

    const userController = new controllerUser ({usuariosModel});

    routerUser.get('/logout',userController.logout)
    routerUser.get('/protected',autenticar,userController.protected)
    routerUser.post('/register',userController.registerUser);
    routerUser.post('/login',userController.loginUser);
    routerUser.put('/:id',userController.updateUser);

    return routerUser; 
} 