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
                WHERE t.nombre = 'desayuno';`)

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
                WHERE t.nombre = 'almuerzo';`)
            
        } catch (error) {
            console.error("Error al obtener los datos del menu  de almuerzos en la base de datos:", error);
            throw error;
        }
    }
}