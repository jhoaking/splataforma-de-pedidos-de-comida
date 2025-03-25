import z from 'zod';

 const esquemaUsuario = z.object({
    nombre : z.string().min(1).optional(),
    email  :z.string().email(),
    password : z.string().min(6,'minio 6 letras para la contraseña'),
    rol_id: z.number().int().min(1).max(3).optional()
})

export const validarUsuario = (input) =>{
    return esquemaUsuario.partial().safeParse(input)
}