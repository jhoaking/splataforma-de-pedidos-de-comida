import { Router } from "express";
import { controllerUser } from "../controller/usuario.controller.js";


export const crearUser = ({usuariosModel}) =>{

    const  routerUser = Router();

    const userController = new controllerUser ({usuariosModel});

    
    routerUser.post('/register',userController.registerUser);
    routerUser.post('/login',userController.loginUser);
    routerUser.put('/:id',userController.updateUser);

    return routerUser;
}