import {connection} from '../db.js';


export class pedidoModel{
    static obtenerPedido = async () =>{
        try {
            const [result] = await connection.query
            ('SELECT BIN_TO_UUID(pedido_id) AS pedido, BIN_TO_UUID(usuario_id) AS usuario,estado_id,fecha_pedido FROM pedidos')

            return result;
        } catch (error) {
            console.error("Error al obtener los datos de la base de datos:", error);
            throw error
        }
    }

    static crearPedidos = async ({estado_id,usuario_id,fecha_pedido}) =>{
        try {
            const [rows] = await connection.query
            ('INSERT INTO pedidos(estado_id,usuario_id,fecha_pedido) VALUES(?,UUID_TO_BIN(?),?)',[estado_id,usuario_id,fecha_pedido])

            return rows; 
        } catch (error) {
            console.error("Error al crear los datos de la base de datos:", error);
            throw error
        }
    }

    static eliminarPedidos = async (id) =>{
        try {
            const [result] = await connection.query('DELETE FROM pedidos WHERE pedido_id = UUID_TO_BIN(?)',[id]);

            if(result.affectedRows === 0){
                throw new Error ('no se elimino el pedido de la DB');
            }

            return result[0];
        } catch (error) {
            console.error("Error al crear los datos de la base de datos:", error);
            throw error
        }
    }

    static actualizarPedido = async ({estado_id,fecha_pedido},id) =>{
        try {
            const [rows] = await connection.query
            ('UPDATE pedidos SET estado_id = ? , fecha_pedido = ? WHERE pedido_id = UUID_TO_BIN(?)',[estado_id,fecha_pedido]);

            if(rows.affectedRows === 0){
                throw new Error ('no se actualizo el pedido de la DB');
            }

            const [result] = await connection.query
            ('SELECT BIN_TO_UUID(pedido_id) AS pedido_id, estado_id,fecha_pedido FROM pedidos WHERE pedido_id = UUID_TO_BIN(?)',[id]);

            return result[0];
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error
        }
    }
}