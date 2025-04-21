import axios from "axios";

const API_URL = "https://pruebasubidabd.onrender.com/frecuencia";

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
