import { Router } from "express";
import { menuController } from "../controller/pedido.controller.js";
import { validarRoles } from "../middlewares/autenticacionPorRoles.js";


export const crearPedido = ({pedidoModel}) =>{
    const pedidoRouter = Router();

    const controllerMenu = new menuController ({pedidoModel})

    pedidoRouter.get('/',controllerMenu.getPedido)
    pedidoRouter.post('/',validarRoles([1]),controllerMenu.createPedido)
    pedidoRouter.put('/:id',validarRoles([3]),controllerMenu.updatePedido)
    pedidoRouter.delete('/:id',validarRoles([1,3]),controllerMenu.deletePedido)


    return pedidoRouter;
}