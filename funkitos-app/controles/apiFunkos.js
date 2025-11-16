// controllers/funkosController.js
const funkos = require("../src/funkos");

// GET /api/funkos → Obtener todos los funkos o filtrados
exports.getFunkos = (req, res) => {
  const { nombre, franquicia } = req.query;
  let resultados = funkos;

  // Filtro por nombre (búsqueda parcial)
  if (nombre) {
    const texto = nombre.toLowerCase();
    resultados = resultados.filter(f =>
      f.nombre.toLowerCase().includes(texto)
    );
  }

  // Filtro por franquicia (coincidencia exacta)
  if (franquicia) {
    resultados = resultados.filter(
      f => f.franquicia.toLowerCase() === franquicia.toLowerCase()
    );
  }

  res.json(resultados);
};

// GET /api/funkos/:id → Obtener un funko por ID
exports.getFunkoById = (req, res) => {
  const { id } = req.params;
  const funko = funkos.find(f => f.id === parseInt(id));

  if (!funko) {
    return res.status(404).json({ message: "Funko no encontrado" });
  }

  res.json(funko);
};
