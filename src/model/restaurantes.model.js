
import {connection} from '../db.js'

export class restauranteModel {
    static obtenerRestaurante = async () =>{
        try {
            const query = 'SELECT BIN_TO_UUID(restaurante_id) AS restaurante_id,nombre,direccion FROM restaurantes';
            const [result] = await connection.query(query);
            return result;
        } catch (error) {
            console.error("Error al obtener los datos de la base de datos:", error);
            throw error;
        }
    }

    static crearRestaurante = async ({nombre,direccion}) =>{
        try {
            const query = 'INSERT INTO restaurantes(nombre,direccion) VALUES (?,?)';
            const [result] = await connection.query(query,[nombre,direccion]);
            return result;
        } catch (error) {
            console.error("Error al crear los datos de la base de datos:", error);
            throw error;
        }
    }

    static  eliminarRestaurante = async (id) =>{
        try {
            const query = 'DELETE FROM restaurantes WHERE restaurante_id = UUID_TO_BIN(?)';
            const [result] = await connection.query(query, [id]);
            if(result.affectedRows === 0){
                throw new Error ('no se elimino el restaurante de la DB');
            }
            return result[0];
        } catch (error) {
            console.error("Error al eliminar los datos de la base de datos:", error);
            throw error;
        }
    }

    static actualizarRestaurante = async ({nombre,direccion},id) =>{
        try {
            const query =`UPDATE usuarios SET nombre = ?, direccion = ? WHERE restaurante_id = UUID_TO_BIN(?)` ;
            const [rows] = await connection.query(query2,[nombre,direccion])

                
             if (rows.affectedRows === 0){
                throw new Error ('no se actualizo el restaurante de la DB');
             }   
             const query2 = 'SELECT BIN_TO_UUID(restaurante_id) AS  restaurante_id, direccion FROM restaurantes WHERE restaurante_id = UUID_TO_BIN(?)';
             const [result] = await connection.query(query2,[id]);

             return result;
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error;
        }
    }
}