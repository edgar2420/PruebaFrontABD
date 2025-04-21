import axios from "axios";

const API_URL = "https://pruebasubidabd.onrender.com/productos";

// Obtener todos los productos
export const getProductos = async () => {
  const response = await axios.get(`${API_URL}/obtener`);
  return response.data;
};

// Eliminar producto por ID
export const eliminarProducto = async (id) => {
  return axios.delete(`${API_URL}/eliminar/${id}`);
};

// Editar producto por ID
export const editarProducto = async (id, data) => {
  return axios.put(`${API_URL}/editar/${id}`, data);
};

// Importar productos desde un archivo (actualiza forma farmacéutica)
export const importarProductos = async (archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);

  const response = await axios.post("https://pruebasubidabd.onrender.com/productos/importar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const obtenerDetalleProducto = async (nombreProducto) => {
  const res = await axios.get(`https://pruebasubidabd.onrender.com/productos/detalle-formula/${encodeURIComponent(nombreProducto)}`);
  return res.data;
};

// Crear nuevo producto manualmente
export const importarProductosDesdeFormulario = async (data) => {
  const response = await axios.post(`${API_URL}/agregar`, data);
  return response.data;
};

// Buscar productos por texto (nombre, lote, envase, volumen)
export const buscarProductos = async (query) => {
  const response = await axios.get(`${API_URL}/buscar?q=${query}`);
  return response.data;
};

export const obtenerEspecificacionesProducto = async (nombre) => {
  const response = await axios.get(`https://pruebasubidabd.onrender.com/especificaciones/producto/${encodeURIComponent(nombre)}`)
  return response.data;
};
