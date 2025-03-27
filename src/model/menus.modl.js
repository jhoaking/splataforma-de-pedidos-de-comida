import {connection} from '../db.js'

export class menuModel {
    static agregarMenu = async  ({nombre,descripcion,precio,tipo_id,restaurante_id}) =>{
        try {
            const query = 'INSERT INTO menus(nombre, descripcion, precio, tipo_id,restaurante_id) VALUES(?, ?, ?, ?, UUID_TO_BIN(?))';

            const [rows] = await connection.query(query,[nombre, descripcion, precio, tipo_id, restaurante_id]);

            return rows
        } catch (error) {
            console.error("Error al crear los datos del menu en la base de datos:", error);
            throw error;
        }
    }  
 
    static obtenerMenusPorTipo = async (tipo) => {
        try {

            const query = `SELECT BIN_TO_UUID(menu_id) as menu_id, 
                m.nombre, 
                m.descripcion, 
                m.precio, 
                t.tipo_id, 
                BIN_TO_UUID(restaurante_id) AS restaurante_id 
                FROM menus m
                INNER JOIN tipos t ON m.tipo_id = t.tipo_id
                WHERE t.nombre = ?`


            const [result] = await connection.query(query,[tipo]);

            return result;
        } catch (error) {
            console.error(`Error al obtener los datos del menú (${tipo}):`, error);
            throw error;
        }
    }
    static eliminarMenu = async (id) =>{
        try {

            const query = 'DELETE  FROM menus WHERE menu_id  = UUID_TO_BIN(?)';

            const [result] = await connection.query(query,[id])

            if(result.affectedRows === 0){
                throw new Error ('no se elimino el menu de la DB');
            }
            return result[0];

        } catch (error) {
            console.error("Error al eliminar los datos de la base de datos:", error);
            throw error;
        }
    }

    static aztualizarMenu = async ({nombre,descripcion,precio},id) =>{
        try {
            const query = 'UPDATE menus SET nombre = ? , descripcion = ? , precio = ? WHERE menu_id = UUID_TO_BIN(?)';
            const [rows] = await connection.query(query,[nombre,descripcion,precio,id]);

            if (rows.affectedRows === 0){
                    throw new Error ('no se actualizo el restaurante de la DB');
            }     
            
            const query2 = 'SELECT BIN_TO_UUID(menu_id) AS menu_id , nombre,descripcion,precio FROM menus  WHERE menu_id = UUID_TO_BIN(?)';
            const [result] = await connection.query(query2,[id]);
            
            return result;    
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error;
        }
    }
}