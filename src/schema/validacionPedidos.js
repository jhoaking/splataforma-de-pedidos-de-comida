import z from 'zod';

const pedidosSchema = z.object({
    estado_id: z.number().int().positive(),
    usuario_id : z.string().uuid(),
    fecha_pedido: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
})    

export const validarPedido = (input) =>{
    return pedidosSchema.safeParse(input);
}