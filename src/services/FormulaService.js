import axios from "axios";

const API_URL = "https://pruebasubidabd.onrender.com/formulas";

export const getFormulasPorProducto = async (nombre) => {
    const response = await axios.get(`https://pruebasubidabd.onrender.com/formulas/producto/${encodeURIComponent(nombre)}`);
    return response.data;
  };
  

export const subirExcelFormulas = async (archivo) => {
  const formData = new FormData();
  formData.append("file", archivo);

  const response = await axios.post(`${API_URL}/importar-excel`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

export const crearFormula = async (data) => {
    const response = await axios.post("https://pruebasubidabd.onrender.com/formulas/crear", data);
    return response.data;
  };
  
  
  export const actualizarFormula = async (id, nombre) => {
    const response = await axios.put(`${API_URL}/editar/${id}`, { nombre });
    return response.data;
  };
  
  export const eliminarFormula = async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar/${id}`);
    return response.data;
  };

  export const getTodasLasFormulas = async () => {
    const response = await axios.get(`${API_URL}/todas`);
    return response.data;
  };
  
