import { Router } from "express";
import { menuController } from "../controller/menus.controller.js";

export const crearMenu = ({menuModel}) =>{
    const menuRouter = Router();

    const controllerMenu = new menuController({menuModel});

    menuRouter.get('/',controllerMenu.getMenus);
    menuRouter.post('/',controllerMenu.postMenu);
    menuRouter.put('/:id',controllerMenu.putMenu);
    menuRouter.delete('/:id',controllerMenu.deleteMenu);

    return menuRouter;
} 