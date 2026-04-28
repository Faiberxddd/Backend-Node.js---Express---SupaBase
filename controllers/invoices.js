import * as InvoiceModel from "../models/invoices.js";

export const invoices = async (req, res) => {
    //Aqui recibes lo que el modelo envio con el "return"
    const { data, error } = await InvoiceModel.InvoiceModel.obtenerTodas();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json(data);
};

//Crear una nueva factura
export const InvoiceCreate = async (req, res) => {
    const { numero_factura, 
        usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago } = req.body;

    //validacion rapida
    if (!numero_factura || !usuario_id || !pedido_id || !fecha_factura || !subtotal || !impuesto || !total || !estado || !metodo_pago) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await InvoiceModel.InvoiceCreate(numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago);

    if (error) {
        console.error("❌ Error al crear factura:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Factura creada con exito");

    res.json({
        mensaje: "✅ Factura creada con exito",
        facturas: data[0]
    })
};

//Actualizar una factura
export const InvoiceUpdate = async (req, res) => {
    const { id } = req.params;
    const { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!numero_factura && !usuario_id && !pedido_id && !fecha_factura && !subtotal && !impuesto && !total && !estado && !metodo_pago) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await InvoiceModel.InvoiceUpdate(id, numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago);

    if (error) {
        console.error("❌ Error al actualizar factura:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Factura actualizada con exito");

    res.json({
        mensaje: "✅ Factura actualizada con exito",
        facturas: data[0]
    })
};

//Eliminar una factura
export const InvoiceDelete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const {data, error} = await InvoiceModel.InvoiceDelete(id);

    if (error) {
        console.error("❌ Error al eliminar factura:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Factura eliminada con exito");

    res.json({
        mensaje: "✅ Factura eliminada con exito",
        facturas: data[0]
    })
};