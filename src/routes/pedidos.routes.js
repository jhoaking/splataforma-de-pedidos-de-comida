import { Router } from "express";
import { menuController } from "../controller/pedido.controller.js";
import { validarRoles} from "../middlewares/autenticacionPorRoles.js";
import {autenticar} from '../middlewares/autenticacion.js'

export const crearPedido = ({pedidoModel}) =>{
    const pedidoRouter = Router();

    const controllerMenu = new menuController ({pedidoModel})

    pedidoRouter.get('/',controllerMenu.getPedido)
    pedidoRouter.post('/',autenticar,validarRoles([1,2]),controllerMenu.createPedido)
    pedidoRouter.put('/:id',autenticar,validarRoles([3]),controllerMenu.updatePedido)
    pedidoRouter.delete('/:id',autenticar ,validarRoles([1,3]),controllerMenu.deletePedido)


    return pedidoRouter;
}