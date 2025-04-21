import axios from "axios";

const API_URL = "https://api.render.com/deploy/srv-d03atc0dl3ps73fim78g?key=4IBMgwAoeFQ/frecuencia";

export const obtenerFrecuenciaPorProductoYTipo = async (producto, tipoEstudio) => {
  try {
    const res = await axios.get(
      `${API_URL}/producto/${encodeURIComponent(producto)}/tipo/${encodeURIComponent(tipoEstudio)}`
    );
    return res.data.frecuencias; // ✅ Accede al array correcto
  } catch (error) {
    console.error("❌ Error al obtener frecuencia:", error);
    throw error; // para que el frontend lo capture con try/catch
  }
};
