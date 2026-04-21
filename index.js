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
app.post("/crear", async (req, res) => {
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
    console.log("ERROR", error);

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
    console.log("ERROR", error);

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

//definimos el puerto de nuestro servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});