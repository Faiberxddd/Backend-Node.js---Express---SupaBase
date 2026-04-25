//importamos todas las librerias de express
import express from "express";

import dotenv from "dotenv";
import { conexionDB, supabase }  from "./db/db.js";
dotenv.config();

//creamos la app de express
const app = express();
conexionDB();


//para leer el formato json
app.use(express.json());

//creacion de nuestra primera ruta
app.get("/", (req, res) => {
    res.send({ 
        mensaje: "Bienvenido a mi API REST con Express"
    });
});

//ruta saludar
app.get("/saludo", (req, res) => {
    res.send({
        mensaje: "Aprendiz, bienvenido al curso de JavaScript",
        hora: new Date().toLocaleTimeString()
    });
});

//ruta para mi presentacion 
app.get("/presentacion", (req, res) => {
    res.send({
        nombre: "Faiber Julian",
        apellido: "Torres Gaviria",
        edad: 17,
        email: "ftorresgaviria@gmail.com",
        telefono: "+57 312 208 6698",
        curso: "Analisis y Desarrollo de Software"
    });
});

// ruta para obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    const { data, error } = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error("❌ Error al obtener usuarios:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Usuarios obtenidos:", data);

    //Respuesta al cliente (1 vez)
    res.json({
        total: data.length,
        usuarios: data
    })
});

//ruta para crear un nuevo usuario
app.post("/usuarios", async (req, res) => {
    //tomamos los campos de la db
    const { nombre, apellido, telefono,  correo, rol } = req.body;

    //verificamos que los campos no esten vacios
    if (!nombre || !apellido || !telefono || !correo || !rol) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    //insertamos los datos en la db
    const { data, error } = await supabase
        .from("users")
        .insert([
            { nombre, apellido, telefono, correo, rol }
        ])
        .select();

    //verificamos si hay error
    if (error) {
        console.error("❌ Error al crear usuario:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Usuario creado con exito");

    //Respuesta al cliente (1 vez)
    res.json({
        mensaje: "✅ Usuario creado con exito",
        usuarios: data[0]
    })
});

//ruta para los datos de un db
app.put("/usuarios/:id", async (req, res) => {
    
    console.log("BODY UPDATE:", req.body);

    const { id } = req.params;
    const { nombre, apellido, telefono, correo, rol } = req.body;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //validar que llegue almenos un dato
    if (!nombre && !apellido && !telefono && !correo && !rol) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    
    //construir objeto dinamico
    const actualizarDatos = {}
    if (nombre) actualizarDatos.nombre = nombre;
    if (apellido) actualizarDatos.apellido = apellido;
    if (telefono) actualizarDatos.telefono = telefono;
    if (correo) actualizarDatos.correo = correo;
    if (rol) actualizarDatos.rol = rol;

    //actualizar usuario
    const { data, error } = await supabase
        .from("users")
        .update(actualizarDatos)
        .eq("id", id)
        .select();

    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Modificacion exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        mensaje: "✅ Datos actualizados con exito",
        usuarios: data[0]
    })
});

//ruta para eliminar un usuario
app.delete("/usuarios/:id", async (req, res) => {

    const { id } = req.params;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //eliminar usuario
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
        .select();
    
    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Eliminación exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
        mensaje: "✅ Usuario eliminado con exito",
        usuarios: data[0]
    })
});


app.get("/pedidos", async (req, res) => {
    const { data, error } = await supabase
        .from("pedidos")
        .select("*");

    if (error) {
        console.error("❌ Error al obtener los pedidos:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Pedidos obtenidos:", data);

    //Respuesta al cliente (1 vez)
    res.json({
        total: data.length,
        pedidos: data
    })
});

//ruta para crear un nuevo pedido
app.post("/pedidos", async (req, res) => {
    //tomamos los campos de la db
    const { descripcion, cantidad, total,  usuario_id, fecha_pedido } = req.body;

    //verificamos que los campos no esten vacios
    if (!descripcion || !cantidad || !total || !usuario_id || !fecha_pedido) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    //insertamos los datos en la db
    const { data, error } = await supabase
        .from("pedidos")
        .insert([
            { descripcion, cantidad, total, usuario_id, fecha_pedido }
        ])
        .select();

    //verificamos si hay error
    if (error) {
        console.error("❌ Error al crear pedido:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Pedido creado con exito");

    //Respuesta al cliente (1 vez)
    res.json({
        mensaje: "✅ Pedido creado con exito",
        pedidos: data[0]
    })
});

//ruta para los datos de un db
app.put("/pedidos/:id", async (req, res) => {
    
    console.log("BODY UPDATE:", req.body);

    const { id } = req.params;
    const { descripcion, cantidad, total, usuario_id, fecha_pedido } = req.body;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //validar que llegue almenos un dato
    if (!descripcion && !cantidad && !total && !usuario_id && !fecha_pedido) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    
    //construir objeto dinamico
    const actualizarDatos = {}
    if (descripcion) actualizarDatos.descripcion = descripcion;
    if (cantidad) actualizarDatos.cantidad = cantidad;
    if (total) actualizarDatos.total = total;
    if (usuario_id) actualizarDatos.usuario_id = usuario_id;
    if (fecha_pedido) actualizarDatos.fecha_pedido = fecha_pedido;

    //actualizar pedido
    const { data, error } = await supabase
        .from("pedidos")
        .update(actualizarDatos)
        .eq("id", id)
        .select();

    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Modificacion exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
        mensaje: "✅ Datos actualizados con exito",
        pedidos: data[0]
    })
});

//ruta para eliminar un pedido
app.delete("/pedidos/:id", async (req, res) => {

    const { id } = req.params;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //eliminar pedido
    const { data, error } = await supabase
        .from("pedidos")
        .delete()
        .eq("id", id)
        .select();
    
    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Eliminación exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({
        mensaje: "✅ Pedido eliminado con exito",
        pedidos: data[0]
    })
});


app.get("/facturas/:id", async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from("facturas")
        .select("*")
        .eq("id", id)

    if (error) {
        console.error("❌ Error al obtener la factura:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Facturas obtenida:", data);

    //Respuesta al cliente (1 vez)
    res.json({
        facturas: data
    })
});

//ruta para crear un nuevo pedido
app.post("/facturas", async (req, res) => {
    //tomamos los campos de la db
    const { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago } = req.body;

    //verificamos que los campos no esten vacios
    if (!numero_factura || !usuario_id || !pedido_id || !fecha_factura || !subtotal || !impuesto || !total || !estado || !metodo_pago) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    //insertamos los datos en la db
    const { data, error } = await supabase
        .from("facturas")
        .insert([
            { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago }
        ])
        .select();

    //verificamos si hay error
    if (error) {
        console.error("❌ Error al crear factura:", error);
        return res.status(500).json({ error });
    }

    //Mostrar en consola
    console.log("✅ Factura creada con exito");

    //Respuesta al cliente (1 vez)
    res.json({
        mensaje: "✅ Factura creada con exito",
        facturas: data[0]
    })
});

//ruta para los datos de un db
app.put("/facturas/:id", async (req, res) => {
    
    console.log("BODY UPDATE:", req.body);

    const { id } = req.params;
    const { numero_factura, usuario_id, pedido_id, fecha_factura, subtotal, impuesto, total, estado, metodo_pago } = req.body;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //validar que llegue almenos un dato
    if (!numero_factura && !usuario_id && !pedido_id && !fecha_factura && !subtotal && !impuesto && !total && !estado && !metodo_pago) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    
    //construir objeto dinamico
    const actualizarDatos = {}
    if (numero_factura) actualizarDatos.numero_factura = numero_factura;
    if (usuario_id) actualizarDatos.usuario_id = usuario_id;
    if (pedido_id) actualizarDatos.pedido_id = pedido_id;
    if (fecha_factura) actualizarDatos.fecha_factura = fecha_factura;
    if (subtotal) actualizarDatos.subtotal = subtotal;
    if (impuesto) actualizarDatos.impuesto = impuesto;
    if (total) actualizarDatos.total = total;
    if (estado) actualizarDatos.estado = estado;
    if (metodo_pago) actualizarDatos.metodo_pago = metodo_pago;
    //actualizar factura
    const { data, error } = await supabase
        .from("facturas")
        .update(actualizarDatos)
        .eq("id", id)
        .select();

    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Modificacion exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.json({
        mensaje: "✅ Datos actualizados con exito",
        facturas: data[0]
    })
});

//ruta para eliminar una factura
app.delete("/facturas/:id", async (req, res) => {

    const { id } = req.params;

    //validar id
    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    //eliminar factura
    const { data, error } = await supabase
        .from("facturas")
        .delete()
        .eq("id", id)
        .select();
    
    console.log("DB", data);
    if (error) {
        console.error("❌ Error:", error);
    } else {
        console.log("✅ Eliminación exitosa");
    }

    if (error) {
        return res.status(500).json({ error });
    }

    if (!data || data.length === 0) {
        return res.status(404).json({ error: "Factura no encontrada" });
    }

    res.json({
        mensaje: "✅ Factura eliminada con exito",
        facturas: data[0]
    })
});


//definimos el puerto de nuestro servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});