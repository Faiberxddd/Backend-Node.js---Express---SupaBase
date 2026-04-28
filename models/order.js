import { supabase } from "../db/db.js";

//Obtener todos los pedidos
export const OrderModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("pedidos")
            .select("*");

        return { data, error };
    }
};

//Crear un nuevo pedido
export const OrderCreate =  async ( productos, descripcion, cantidad, total, usuario_id, fecha_pedido ) => {
    const { data, error } = await supabase
        .from("pedidos")
        .insert([
            { productos, descripcion, cantidad, total, usuario_id, fecha_pedido }
        ])
        .select();

    return { data, error };
};

//Actualizar un pedido
export const OrderUpdate = async ( id, productos, descripcion, cantidad, total, usuario_id, fecha_pedido ) => {
    const { data, error } = await supabase
        .from("pedidos")
        .update({ productos, descripcion, cantidad, total, usuario_id, fecha_pedido })
        .eq("id", id)
        .select();

    return { data, error };
};

//Eliminar un pedido
export const OrderDelete = async ( id ) => {
    const { data, error } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", id)
        .select();

    return { data, error };
};