import { validarMenu } from "../schema/validacionmenus.js";

export class menuController {
    constructor ({menuModel}) {
        this.menuModel = menuModel;
    }

    postMenu = async (req,res) =>{
        try {
            const vali = validarMenu(req.body);

            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }

            const result = this.menuModel.agregarMenu(vali.data);
            res.status(200).json({message : 'se creo el menu',result});
        } catch (error) {
            res.status(500).json({message : 'error al crear los datos del restaurante', error: error.message});
        }
    }

    getDesayuno = async (req,res) =>{
            const {desayuno} = req.query;
        try {
            const result  = await this.menuModel.obtenerDesayuno(desayuno);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener los desayunos del menu', error: error.message});
        }
    }

    getAlmuerzo = async (req,res) =>{
            const {almuerzo} = req.query;
        try {
            const result  = await this.menuModel.obtenerAlumerzo(almuerzo);

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener los desayunos del menu', error: error.message});
        }
    }

    getCena = async (req,res) =>{
        const {cena} = req.query;
        try {
        const result  = await this.menuModel.obtenerCena(cena);

        res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener los desayunos del menu', error: error.message});
        }
    }
    
}