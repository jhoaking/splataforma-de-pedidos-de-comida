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

            const result = await this.menuModel.agregarMenu(vali.data);
            res.status(200).json({message :'se creo el menu',result});
        } catch (error) {
            res.status(500).json({message : 'error al crear los datos del restaurante', error: error.message});
        }
    }

    getMenus = async (req, res) => {
        const { tipo } = req.query; 

        if (!tipo) {
            return res.status(400).json({ message: "Debes proporcionar un tipo de menú." });
        }

        try {
            const result = await this.menuModel.obtenerMenusPorTipo(tipo);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: `Error al obtener el menú de ${tipo}`, error: error.message });
        }
    }

    deleteMenu = async (req,res) =>{
        const {id} = req.params;
        try {
            const result = await this.menuModel.eliminarMenu(id);

            res.status(200).json({message: 'se elimino el platillo',result});
        } catch (error) {
            res.status(500).json({message : 'error al eliminar el menu', error: error.message});
        }
    }

    putMenu = async (req,res) =>{
        const {id} = req.params
        try {
            const vali = validarMenu(req.body);

            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }

            const result = await this.menuModel.aztualizarMenu(vali.data , id);
            res.status(200).json({message : 'se actualizo el menu',result})
        } catch (error) {
            res.status(500).json({message : 'error al actualizar los datos del menu', error: error.message});
        }
    }
}