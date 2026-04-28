import * as UserModel from "../models/user.js";

export const users = async (req, res) => {
    //Aqui recibes lo que el modelo envio con el "return"
    const { data, error } = await UserModel.UserModel.obtenerTodos();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        return res.status(500).json({ error });
    }

    return res.status(200).json(data);
};

//Crear un nuevo usuario
export const UserCreate = async (req, res) => {
    const { nombre, apellido, telefono, correo, rol } = req.body;

    //validacion rapida
    if (!nombre || !apellido || !telefono || !correo || !rol) {
        console.error("❌ Faltan datos");
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await UserModel.UserCreate(nombre, apellido, telefono, correo, rol);

    if (error) {
        console.error("❌ Error al crear usuario:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Usuario creado con exito");

    res.json({
        mensaje: "✅ Usuario creado con exito",
        usuarios: data[0]
    })
};

//Actualizar un usuario
export const UserUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, correo, rol } = req.body;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    if (!nombre && !apellido && !telefono && !correo && !rol) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const {data, error} = await UserModel.UserUpdate(id, nombre, apellido, telefono, correo, rol);

    if (error) {
        console.error("❌ Error al actualizar usuario:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Usuario actualizado con exito");

    res.json({
        mensaje: "✅ Usuario actualizado con exito",
        usuarios: data[0]
    })
};

//Eliminar un usuario
export const UserDelete = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Falta el id" });
    }

    const {data, error} = await UserModel.UserDelete(id);

    if (error) {
        console.error("❌ Error al eliminar usuario:", error);
        return res.status(500).json({ error });
    }

    console.log("✅ Usuario eliminado con exito");

    res.json({
        mensaje: "✅ Usuario eliminado con exito",
        usuarios: data[0]
    })
};