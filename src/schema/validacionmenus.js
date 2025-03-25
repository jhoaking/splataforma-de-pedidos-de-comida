import z from 'zod';

const menuEsquema = z.object({
    nombre : z.string().min(3),
    descripcion : z.string().min(3),
    precio: z.number().positive(),
    tipo_id : z.number().positive().int(),  
    restaurante_id : z.uuid()
})

export const validarMenu = (input) =>{
    return menuEsquema.partial().safeParse(input);
}