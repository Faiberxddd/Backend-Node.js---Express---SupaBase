import { supabase } from "../db/db.js";

//Obtener todos los usuarios
export const UserModel = {
    obtenerTodos: async () => {
        const { data, error } = await supabase
            .from("users")
            .select("*");

        return { data, error };
    }
};

//Crear un nuevo usuario
export const UserCreate =  async ( nombre, apellido, telefono, correo, rol ) => {
    const { data, error } = await supabase
        .from("users")
        .insert([{ nombre, apellido, telefono, correo, rol }])
        .select();

    return { data, error };
};

//Actualizar un usuario
export const UserUpdate = async ( id,nombre, apellido, telefono, correo, rol ) => {
    const { data, error } = await supabase
        .from("users")
        .update({ nombre, apellido, telefono, correo, rol })
        .eq("id", id)
        .select();

    return { data, error };
};

//Eliminar un usuario
export const UserDelete = async ( id ) => {
    const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", id)
        .select();

    return { data, error };
};