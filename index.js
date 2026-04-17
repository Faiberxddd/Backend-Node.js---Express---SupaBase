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

//definimos el puerto de nuestro servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});