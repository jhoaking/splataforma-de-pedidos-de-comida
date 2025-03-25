import { Router } from "express";
import { restauranteController } from "../controller/restaurantes.controller.js";


export const crearRestaurantes = ({restauranteModel}) =>{
    const restauranteRouter = Router();

    const controllerRestaurante = new restauranteController({restauranteModel});

    restauranteRouter.get('/',controllerRestaurante.getRestaurante);
    restauranteRouter.post('/',controllerRestaurante.createRestaurante);
    restauranteRouter.put('/:id',controllerRestaurante.updateRestaurante);
    restauranteRouter.delete('/:id',controllerRestaurante.deleteRestaurante);

    return restauranteRouter;
}