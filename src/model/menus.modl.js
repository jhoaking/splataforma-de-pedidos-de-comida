import {connection} from '../db.js'

export class menuModel {
    static agregarMenu = async  ({nombre,descripcion,precio,tipo_id,restaurante_id}) =>{
        try {
            const [rows] = await connection.query
            ('INSERT INTO menus(nombre,descripcion,precio,tipo_id,restaurante_id) VALUES(?,?,?,UUID_TO_BIN(?))'
                [nombre,descripcion,precio,tipo_id,restaurante_id]);

            return rows;
        } catch (error) {
            console.error("Error al crear los datos del menu en la base de datos:", error);
            throw error;
        }
    }

    static obtenerDesayuno = async ({desayuno}) =>{
        try {
            const [result]  = await connection.query
            (`SELECT m.* from menus m
                INNER JOIN tipos t ON m.menu_id = t.tipo_id
                INNER JOIN restaurantes r ON m.menu_id = r.restaurante_id
                WHERE t.nombre = 'desayuno';`,[desayuno])

            return result;    
        } catch (error) {
            console.error("Error al obtener los datos del menu  de desyaunos en la base de datos:", error);
            throw error;
        }
    }

    static obtenerAlmuerzo = async ({almuerzo}) =>{
        try {
            (`SELECT m.* from menus m
                INNER JOIN tipos t ON m.menu_id = t.tipo_id
                INNER JOIN restaurantes r ON m.menu_id = r.restaurante_id
                WHERE t.nombre = 'almuerzo';`,[almuerzo])
            
        } catch (error) {
            console.error("Error al obtener los datos del menu  de almuerzos en la base de datos:", error);
            throw error;
        }
    }

    static obtenerCena = async ({cena}) =>{
        try {
            (`SELECT m.* from menus m
                INNER JOIN tipos t ON m.menu_id = t.tipo_id
                INNER JOIN restaurantes r ON m.menu_id = r.restaurante_id
                WHERE t.nombre = 'cena';`,[cena])
            
        } catch (error) {
            console.error("Error al obtener los datos del menu  de cena en la base de datos:", error);
            throw error;
        }
    }

    static eliminarMenu = async (id) =>{
        try {
            const [result] = await connection.query('DELETE  FROM menus WHERE menu_id  = UUID_TO_BIN(?)',[id])

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
            const [rows] = await connection.query
            ('UPDATE menus SET nombre = ? , descripcion = ? , precio = ? WHERE menu_id = UU_ID_TO_BIN(?)',
                [nombre,descripcion,precio,id])

            if (rows.affectedRows === 0){
                    throw new Error ('no se actualizo el restaurante de la DB');
            }     
            
            const [result] = await connection.query
            ('SELECT BIN_TO_UUID(menu_id) AS menus_id , nombre,descripcion,precio  WHERE menu_id = UU_ID_TO_BIN(?)',
                [id]);
            
            return result    
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error;
        }
    }
}