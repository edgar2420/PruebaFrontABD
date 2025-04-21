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
  TextField,
  Box,
} from "@mui/material";

const FrecuenciaMuestreo = ({ frecuencia }) => {
  const tiempos = [
    "T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "Extra"
  ];

  const tiemposConMeses = {
    T0: "T0 (0 meses)",
    T1: "T1 (6 meses)",
    T2: "T2 (12 meses)",
    T3: "T3 (24 meses)",
    T4: "T4 (36 meses)",
    T5: "T5 (48 meses)",
    T6: "T6 (60 meses)",
    T7: "T7 (72 meses)",
    T8: "T8 (84 meses)",
    T9: "T9 (96 meses)",
    Extra: "Extra"
  };

  if (!frecuencia || frecuencia.length === 0) return null;

  const totalesPorTiempo = tiempos.map((tiempo) =>
    frecuencia.reduce((sum, fila) => sum + (parseInt(fila[tiempo]) || 0), 0)
  );

  const totalGeneral = totalesPorTiempo.reduce((a, b) => a + b, 0);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        13. Frecuencia de Muestreo y Cantidad de Muestras Ingresadas al Estudio
      </Typography>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
              <TableCell align="center" sx={{ fontWeight: "bold", minWidth: 120 }}>
                PRUEBA
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", minWidth: 100 }}>
                Cantidad de muestra (Env.)
              </TableCell>
              {tiempos.map((t, i) => (
                <TableCell key={i} align="center" sx={{ minWidth: 90, fontWeight: "bold" }}>
                  {tiemposConMeses[t]}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: "bold", minWidth: 80 }}>
                TOTAL
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frecuencia.map((fila, idx) => {
              const subtotal = tiempos.reduce(
                (sum, tiempo) => sum + (parseInt(fila[tiempo]) || 0),
                0
              );
              return (
                <TableRow key={idx}>
                  <TableCell>{fila.parametro}</TableCell>
                  <TableCell align="center">
                    <TextField
                      variant="outlined"
                      size="small"
                      value={fila.envases}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                  {tiempos.map((t, i) => (
                    <TableCell key={i} align="center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={fila[t] ?? 0}
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <TextField
                      variant="outlined"
                      size="small"
                      value={subtotal}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}

            {/* Fila de totales */}
            <TableRow sx={{ backgroundColor: "#bbdefb" }}>
              <TableCell colSpan={2} align="center">
                <strong>Muestras por tiempo:</strong>
              </TableCell>
              {totalesPorTiempo.map((total, i) => (
                <TableCell key={i} align="center">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={total}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </TableCell>
              ))}
              <TableCell align="center">
                <TextField
                  variant="outlined"
                  size="small"
                  value={totalGeneral}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={1} display="flex" justifyContent="flex-end" pr={1}>
        <Typography variant="caption">Unid.</Typography>
      </Box>
    </Paper>
  );
};

export default FrecuenciaMuestreo;
