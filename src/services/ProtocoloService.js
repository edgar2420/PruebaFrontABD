import axios from "axios";

const API_URL = "https://pruebasubidabd.onrender.com/protocolo";

// Obtener todos los protocolos (si luego los querés listar)
export const obtenerProtocolos = async () => {
  const res = await axios.get(`${API_URL}/obtener`);
  return res.data;
};

// Obtener un protocolo por ID (para vista detallada, si lo implementás)
export const obtenerProtocoloPorId = async (id) => {
  const res = await axios.get(`${API_URL}/obtener/${id}`);
  return res.data;
};

// Generar el próximo código de protocolo
export const obtenerCodigoProtocolo = async () => {
  const res = await axios.get(`${API_URL}/generar-codigo`);
  return res.data; // { codigo: "PROT-001" }
};


// (Para más adelante) Crear un nuevo protocolo
export const crearProtocolo = async (data) => {
  const res = await axios.post(`${API_URL}/crear`, data);
  return res.data;
};

// (Opcional) Eliminar protocolo
export const eliminarProtocolo = async (id) => {
  const res = await axios.delete(`${API_URL}/eliminar/${id}`);
  return res.data;
};

