import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config.js';
import {connection} from '../db.js'

export class usuariosModel {
    static register = async ({nombre,password,email,rol_id}) =>{
        try {
        
            const user = await  this.buscarPorEmail(email);

            if(user){throw new Error('ya estas registrado')}

            const hashedPassword = await bcrypt.hash(password,Number(SALT_ROUNDS));

            const query = 'INSERT INTO usuarios(nombre,email,password,rol_id) VALUES (?,?,?,?)';
            const [newUser] = await connection.query(query,[nombre,email,hashedPassword,rol_id]);

            return newUser;

        } catch (error) {
            console.error("Error al regtrar el usuario en la base de datos:", error);
            throw error;
        }

    }

    static buscarPorEmail = async (email) =>{
        try {
            const query = 'SELECT BIN_TO_UUID(usuario_id) AS usuario_id, nombre, email, password , rol_id FROM usuarios WHERE email = ?';
            const [result] = await connection.query(query,[email])

            return result[0];
        } catch (error) {
            console.error("Error al buscar el usuario en la base de datos:", error);
            throw error;
        }
    }


    static login = async ({email,password}) =>{
    try {

        const user = await this.buscarPorEmail(email);
        if(!user){
            throw new Error('no se encontro el usuario')
        }
        
        if (!user.password) {
            throw new Error('Error: el usuario no tiene una contraseña registrada');
        }

        const comparePassword = await bcrypt.compare(password.toString(),user.password)
        if(!comparePassword){
            throw new Error('contraseña invalida');
        }

        delete user.password;
        return user;

    } catch (error) {
        console.error("Error al logear el usuario en la base de datos:", error);
        throw error;
    }

    }

    static actualizarUsuario = async ({nombre,password,email,rol_id},id) =>{
        try {
            const [rows] = await connection.query
            (`UPDATE usuarios SET nombre = ?, password = ?,email = ?,  rol_id = ? WHERE usuario_id = UUID_TO_BIN(?) `
                ,[nombre,password,email,rol_id,id])

                
             if (rows.affectedRows === 0){
                throw new Error ('no se actualizo el usuario de la DB');
             }   

             const [result] = await connection.query
             ('SELECT BIN_TO_UUID(usuario_id) AS  user_id, email,password,rol_id FROM usuarios WHERE usuario_id = UUID_TO_BIN(?)',[id]);

             return result;
        } catch (error) {
            console.error("Error al actualizar los datos de la base de datos:", error);
            throw error;
        }
    }
}