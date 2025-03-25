
import {connection} from '../db.js'

export class restauranteModel {
    static obtenerRestaurante = async () =>{
        try {
            const [result] = await connection.query('SELECT BIN_TO_UUID(restaurante_id) AS restaurante_id,nombre,direccion FROM restaurantes');
            return result;
        } catch (error) {
            console.error("Error al obtener los datos de la base de datos:", error);
            throw error;
        }
    }

    static crearRestaurante = async ({nombre,direccion}) =>{
        try {
            const [result] = await connection.query
            ('INSERT INTO restaurantes(nombre,direccion) VALUES (?,?)',[nombre,direccion]);
            return result;
        } catch (error) {
            console.error("Error al crear los datos de la base de datos:", error);
            throw error;
        }
    }

    static  eliminarRestaurante = async (id) =>{
        try {
            const [result] = await connection.query('DELETE FROM restaurantes WHERE restaurante_id = UUID_TO_BIN(?)', [id]);
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
            const [rows] = await connection.query
            (`UPDATE usuarios SET nombre = ?, direccion = ? WHERE restaurante_id = UUID_TO_BIN(?) `
                ,[nombre,direccion])

                
             if (rows.affectedRows === 0){
                throw new Error ('no se actualizo el restaurante de la DB');
             }   

             const [result] = await connection.query
             ('SELECT BIN_TO_UUID(restaurante_id) AS  restaurante_id, direccion FROM restaurantes WHERE restaurante_id = UUID_TO_BIN(?)',[id]);

             return result;
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error;
        }
    }
}