import { supabase } from "../db/db.js";

//Obtener todas las facturas
export const InvoiceModel = {
    obtenerTodas: async () => {
        const { data, error } = await supabase
            .from("facturas")
            .select("*");

        return { data, error };
    }
};

//Crear una nueva factura
export const InvoiceCreate =  async ( numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago ) => {
    const { data, error } = await supabase
        .from("facturas")
        .insert([
            { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago }
        ])
        .select();

    return { data, error };
};

//Actualizar una factura
export const InvoiceUpdate = async ( id, numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago ) => {
    const { data, error } = await supabase
        .from("facturas")
        .update({ numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago })
        .eq("id", id)
        .select();

    return { data, error };
};

//Eliminar una factura
export const InvoiceDelete = async ( id ) => {
    const { data, error } = await supabase
        .from("facturas")
        .delete()
        .eq("id", id)
        .select();

    return { data, error };
};