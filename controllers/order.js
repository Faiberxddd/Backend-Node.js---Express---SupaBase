import * as OrderModel from "../models/order.js";

export const orders = async (req, res) => {
    //Aqui recibes lo que el modelo envio con el "return"
    const { data, error } = await OrderModel.OrderModel.obtenerTodos();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json(data);
};

//Crear un nuevo pedido
export const OrderCreate = async (req, res) => {
    const { productos, descripcion, cantidad, total, usuario_id, fecha_pedido } = req.body;

    //validacion rapida
    if (!productos || !descripcion || !cantidad || !total || !usuario_id || !fecha_pedido) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await OrderModel.OrderCreate(productos, descripcion, cantidad, total, usuario_id, fecha_pedido);

    if (error) {
        console.error("❌ Error al crear pedido:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Pedido creado con exito");

    res.json({
        mensaje: "✅ Pedido creado con exito",
        pedidos: data[0]
    })
};

//Actualizar un pedido
export const OrderUpdate = async (req, res) => {
    const { id } = req.params;
    const { productos, descripcion, cantidad, total, usuario_id, fecha_pedido } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!productos && !descripcion && !cantidad && !total && !usuario_id && !fecha_pedido) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await OrderModel.OrderUpdate(id, productos, descripcion, cantidad, total, usuario_id, fecha_pedido);

    if (error) {
        console.error("❌ Error al actualizar pedido:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Pedido actualizado con exito");

    res.json({
        mensaje: "✅ Pedido actualizado con exito",
        pedidos: data[0]
    })
};

//Eliminar un pedido
export const OrderDelete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const {data, error} = await OrderModel.OrderDelete(id);

    if (error) {
        console.error("❌ Error al eliminar pedido:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Pedido eliminado con exito");

    res.json({
        mensaje: "✅ Pedido eliminado con exito",
        pedidos: data[0]
    })
};