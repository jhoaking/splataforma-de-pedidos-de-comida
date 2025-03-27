import { validarPedido } from "../schema/validacionPedidos.js";


export class menuController {
    constructor ({pedidoModel}){
        this.pedidoModel=pedidoModel;
    }

    getPedido = async (req,res) =>{
        try {
            const result = await this.pedidoModel.obtenerPedido();

            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({message : 'error al obtener los datos del pedido', error: error.message});
        }
    }

    createPedido = async (req,res) =>{
            try {
                const vali = validarPedido(req.body);
                if(!vali.success){
                    res.status(400).json({error: JSON.parse(vali.error.message)});
                }
                
                const result = await this.pedidoModel.crearPedidos(vali.data);
    
                res.status(200).json({message : 'se creo el pedido',result});
            } catch (error) {
                res.status(500).json({message : 'error al crear los datos del pedido', error: error.message});
            }
        }
    
    
    deletePedido = async (req,res) =>{
        const {id} = req.params;
            try {
                const result = await this.pedidoModel.eliminarPedidos(id)
    
                res.status(200).json({message: 'se elimino el pedido',result});
            } catch (error) {
                res.status(500).json({message : 'error al eliminar los datos del pedido', error: error.message});
            }
        }
    
    
    updatePedido = async (req,res) =>{
        const {id} = req.params;
            try {
                const vali = validarMenu(req.body);
                if(!vali.success){
                    res.status(400).json({error: JSON.parse(vali.error.message)});
                }
    
                const result = await this.pedidoModel.actualizarPedido(vali.data , id);
    
                res.status(200).json({message : 'se actualizo el pedido',result})
            } catch (error) {
                res.status(500).json({message : 'error al actualizar los datos del pedido', error: error.message});
            }
        }
}  