import express from "express";
import dotenv from "dotenv";
import { conexionDB, supabase }  from "./db/db.js";
import userRoutes from "./routes/user.js";
import orderRoutes from "./routes/order.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

conexionDB();

app.get("/", (req, res) => {
    res.send({mensaje: "Servidor funcionando 🚀"});
});

app.get("/saludo", (req, res) => {
    res.send({mensaje: "Hola 👋"});
});

app.use("/users", userRoutes);

app.use("/orders", orderRoutes);

app.use("/invoices", invoiceRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}`);
}); 