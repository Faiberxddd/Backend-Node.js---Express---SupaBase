import "dotenv/config"; //Carga las variables automaticamente al importar
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

//Verificacion de seguridad para evitar que el servidor se ejecute sin datos
if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Error: Faltan las variables del entorno");
    process.exit(1);
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const conexionDB = () => {
    console.log("✅ Conexion establecida con Supabase");
};