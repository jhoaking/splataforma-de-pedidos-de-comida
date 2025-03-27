import { connection } from "../db.js";

export const validarRoles = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ message: 'Acceso denegado, no autenticado' });
        }

        console.log("Usuario decodificado:", req.user); 

        
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        next();     
    };
};



export const verificarPedido = async (req,res,next) =>{
    const {pedido_id}  = req.body;

    const [pedido] = await connection.query('SELECT * FROM pedidos WHERE pedido_id = UUID_TO_BIN(?)',pedido_id);

    if(!pedido){
        res.json({ message:'no hiciste un pedido'});
    }

    if(pedido.estado_id === 1 || pedido.estado_id === 3 ){
        return res.status(403).json({ message: 'No puedes modificar un pedido confirmado o entregado' });
    }
    next();
}