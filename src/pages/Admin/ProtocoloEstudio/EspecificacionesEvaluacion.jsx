import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const EspecificacionesEvaluacion = ({ especificaciones = [] }) => {
  if (!especificaciones.length) return null;

  const transformar = (data) => {
    const lista = [];

    data.forEach((item) => {
      if (item.aspecto)
        lista.push({ tipo: "especificacion", nombre: "Aspecto", criterio: item.aspecto });

      if (item.ph_min && item.ph_max)
        lista.push({
          tipo: "especificacion",
          nombre: "pH",
          criterio: `${item.ph_min} - ${item.ph_max}`,
        });

      if (item.volumen)
        lista.push({
          tipo: "especificacion",
          nombre: "Volumen",
          criterio: `No menor a ${item.volumen} ml`,
        });

      if (item.hermeticidad)
        lista.push({
          tipo: "especificacion",
          nombre: "Hermeticidad",
          criterio: item.hermeticidad,
        });

      if (item.pruebas_microbiologicas)
        lista.push({
          tipo: "prueba_microbiologica",
          nombre: "Pruebas microbiológicas",
          criterio: item.pruebas_microbiologicas,
        });

      if (item.esterilidad)
        lista.push({
          tipo: "prueba_microbiologica",
          nombre: "Esterilidad",
          criterio: item.esterilidad,
        });

      if (item.endotoxinas)
        lista.push({
          tipo: "prueba_microbiologica",
          nombre: "Endotoxinas",
          criterio: item.endotoxinas,
        });

      // ✅ Valoraciones limpias
      if (item.otros_componentes) {
        let componentes = {};

        try {
          let raw = item.otros_componentes;
          if (typeof raw === "string") {
            if (raw.startsWith('"') && raw.includes('\\"')) {
              raw = JSON.parse(raw); // desescapado doble
              componentes = JSON.parse(raw);
            } else {
              componentes = JSON.parse(raw);
            }
          } else {
            componentes = raw;
          }
        } catch (e) {
          console.warn("❗ Error al parsear otros_componentes:", e);
        }

        if (componentes && typeof componentes === "object") {
          Object.entries(componentes).forEach(([clave, valor]) => {
            const nombreLimpio = clave?.trim();
            const numero = parseFloat(valor);

            if (
              nombreLimpio &&
              !nombreLimpio.toLowerCase().includes("empty") &&
              nombreLimpio.toLowerCase() !== "producto" &&
              !isNaN(numero)
            ) {
              lista.push({
                tipo: "valoracion",
                nombre: nombreLimpio,
                criterio: `${(numero * 100).toFixed(2)}%`,
              });
            }
          });
        }
      }
    });

    return lista;
  };

  const listaTransformada = transformar(especificaciones);

  const renderSeccion = (titulo, tipoFiltro) => {
    const datos = listaTransformada.filter((e) => e.tipo === tipoFiltro);
    if (datos.length === 0) return null;

    return (
      <>
        <TableRow>
          <TableCell colSpan={2} style={{ fontWeight: "bold", backgroundColor: "#f0f0f0" }}>
            {titulo}
          </TableCell>
        </TableRow>
        {datos.map((fila, idx) => (
          <TableRow key={idx}>
            <TableCell>{fila.nombre}</TableCell>
            <TableCell>{fila.criterio}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };

  return (
    <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Especificaciones a Evaluar y Criterio de Aceptación
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Especificación</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Criterio de Aceptación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderSeccion("Especificación", "especificacion")}
            {renderSeccion("Valoraciones", "valoracion")}
            {renderSeccion("Pruebas microbiológicas", "prueba_microbiologica")}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EspecificacionesEvaluacion;
