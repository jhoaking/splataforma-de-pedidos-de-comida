import { validarRestaurante } from "../schema/validacionRestaurante.js";


export class restauranteController {
    constructor ({restauranteModel}){
        this.restauranteModel = restauranteModel;
    }


    getRestaurante = async (req,res) =>{
        try {
            const result = await this.restauranteModel.obtenerRestaurante();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({message : 'error al obtener los datos del restaurante', error: error.message});
        }
    }

    createRestaurante = async (req,res) =>{

        try {
            const vali = validarRestaurante(req.body);
            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }

            const result = await this.restauranteModel.crearRestaurante(vali.data);

            res.status(200).json({message : 'se creo el restaurante',result});
        } catch (error) {
            res.status(500).json({message : 'error al crear los datos del restaurante', error: error.message});
        }
    }


    deleteRestaurante = async (req,res) =>{
        const {id} = req.params;
        try {
            const result = await this.restauranteModel.eliminarRestaurante(id)

            res.status(200).json({message: 'se elimino el restaurante',result});
        } catch (error) {
            res.status(500).json({message : 'error al eliminar los datos del restaurante', error: error.message});
        }
    }


    updateRestaurante = async (req,res) =>{
        const {id} = req.params;
        try {
            const vali = validarRestaurante(req.body);
            if(!vali.success){
                res.status(400).json({error: JSON.parse(vali.error.message)});
            }

            const result = await this.restauranteModel.actualizarRestaurante(vali.data , id);

            res.status(200).json({message : 'se actualizo el restaurante',result})
        } catch (error) {
            res.status(500).json({message : 'error al actualizar los datos del restaurante', error: error.message});
        }
    }
}