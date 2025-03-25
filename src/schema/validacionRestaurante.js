import z from 'zod';

 const esquemaRestaurante = z.object({
   nombre : z.string().min(3),
   direccion : z.string().min(3)
})

export const validarRestaurante = (input) =>{
    return esquemaRestaurante.partial().safeParse(input)
}