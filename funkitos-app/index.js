// index.js
const express = require("express");
const cors = require("cors");
const funkosRoutes = require("./rutes/funkosRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta base de la API
app.use("/api/funkos", funkosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
