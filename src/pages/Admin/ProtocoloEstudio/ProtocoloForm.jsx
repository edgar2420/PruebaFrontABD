import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  getProductos,
  obtenerDetalleProducto,
  obtenerEspecificacionesProducto
} from "../../../services/ProductoService";
import { obtenerFrecuenciaPorProductoYTipo } from "../../../services/FrecuenciaMuestreoService";
import DiseñoEstudio from "./DiseñoEstudio";
import EspecificacionesEvaluacion from "./EspecificacionesEvaluacion";
import FrecuenciaMuestreo from "./FrecuenciaMuestreo";
import ProtocoloExportarPDF from "./ProtocoloExportarPDF";

const ProtocoloForm = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [formaFarmaceutica, setFormaFarmaceutica] = useState("");
  const [envasePrimario, setEnvasePrimario] = useState("");
  const [volumenNominal, setVolumenNominal] = useState("");
  const [volumenes, setVolumenes] = useState([]);
  const [formulasPorVolumen, setFormulasPorVolumen] = useState([]);
  const [formulaTabla, setFormulaTabla] = useState([]);
  const [temperatura, setTemperatura] = useState("");
  const [humedad, setHumedad] = useState("");
  const [tipoEstudio, setTipoEstudio] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [lotes, setLotes] = useState([{ numero: "", tamano: "", fecha: "", tipo: "", duracion: "" }]);
  const [especificaciones, setEspecificaciones] = useState([]);
  const [frecuencia, setFrecuencia] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const lista = await getProductos();
        setProductos(lista);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const handleSeleccionarProducto = async (e) => {
    const nombre = e.target.value;
    setProductoSeleccionado(nombre);
    setVolumenNominal("");
    setFormulaTabla([]);
    setFrecuencia([]);

    try {
      const data = await obtenerDetalleProducto(nombre);
      setFormaFarmaceutica(data.formaFarmaceutica || "No asignada");
      setEnvasePrimario(data.envasePrimario || "");
      setVolumenes(data.volumenes || []);
      setFormulasPorVolumen(data.formulas || []);

      if (data.volumenes.length > 0) {
        setVolumenNominal(data.volumenes[0]);
        const formulaInicial = data.formulas.find(f => f.volumen === data.volumenes[0]);
        setFormulaTabla(formulaInicial?.materiasPrimas || []);
      }

      const especificacionesRes = await obtenerEspecificacionesProducto(nombre);
      setEspecificaciones(especificacionesRes);

      if (tipoEstudio) {
        try {
          const datos = await obtenerFrecuenciaPorProductoYTipo(nombre, tipoEstudio);
          setFrecuencia(datos);
        } catch {
          setFrecuencia([]);
        }
      }

    } catch (error) {
      console.error("Error al obtener datos del producto:", error);
      setFrecuencia([]);
    }
  };

  const handleSeleccionarVolumen = async (e) => {
    const vol = e.target.value;
    setVolumenNominal(vol);

    const formula = formulasPorVolumen.find(f => f.volumen === vol);
    setFormulaTabla(formula?.materiasPrimas || []);

    try {
      const especificacionesRes = await obtenerEspecificacionesProducto(productoSeleccionado, vol);
      setEspecificaciones(especificacionesRes);
    } catch (error) {
      console.error("Error al obtener especificaciones por volumen:", error);
    }
  };

  const handleSeleccionarTipoEstudio = async (e) => {
    const tipo = e.target.value;
    setTipoEstudio(tipo);
    setFrecuencia([]);

    if (!tipo || !productoSeleccionado) return;

    try {
      const datos = await obtenerFrecuenciaPorProductoYTipo(productoSeleccionado, tipo);
      setFrecuencia(datos);
    } catch (err) {
      console.error("Error al obtener frecuencia por producto y tipo:", err);
      setFrecuencia([]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h5" fontWeight="bold" mb={2} align="center">
        Protocolo de Estudio
      </Typography>

      <Grid container spacing={2} px={2}>
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Determinación y Objetivo del Estudio
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">Tipo de estudio:</Typography>
                <Select fullWidth size="small" value={tipoEstudio} onChange={handleSeleccionarTipoEstudio} displayEmpty>
                  <MenuItem value="" disabled>Seleccione...</MenuItem>
                  {[
                    "ESTABILIDAD NATURAL (ESTABLE)",
                    "ESTABILIDAD ACELERADA (ESTABLE)",
                    "ESTABILIDAD ON GOING (ESTABLE)",
                    "ESTUDIO DE EXCURSIÓN (ESTABLE)",
                    "ESTABILIDAD NATURAL (MENOS ESTABLE)",
                    "ESTABILIDAD ACELERADA (MENOS ESTABLE)",
                    "ESTABILIDAD ON GOING (MENOS ESTABLE)",
                    "ESTUDIO DE EXCURSIÓN (MENOS ESTABLE)"
                  ].map((op) => (
                    <MenuItem key={op} value={op}>{op}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Objetivo:</Typography>
                <TextField fullWidth size="small" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Temperatura:</Typography>
                <Select fullWidth size="small" value={temperatura} onChange={(e) => setTemperatura(e.target.value)} displayEmpty>
                  <MenuItem value="" disabled>Seleccione...</MenuItem>
                  <MenuItem value="40°C ± 2°C">40°C ± 2°C</MenuItem>
                  <MenuItem value="30°C ± 2°C">30°C ± 2°C</MenuItem>
                  <MenuItem value="5°C ± 3°C">5°C ± 3°C</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Humedad:</Typography>
                <Select fullWidth size="small" value={humedad} onChange={(e) => setHumedad(e.target.value)} displayEmpty>
                  <MenuItem value="" disabled>Seleccione...</MenuItem>
                  <MenuItem value="No más de 25% H.R.">No más de 25% H.R.</MenuItem>
                  <MenuItem value="75% ± 5% H.R.">75% ± 5% H.R.</MenuItem>
                  <MenuItem value="60% ± 5% H.R.">60% ± 5% H.R.</MenuItem>
                </Select>
              </Grid>
            </Grid>
          </Paper>

          <DiseñoEstudio lotes={lotes} setLotes={setLotes} />
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Datos del Producto
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">Nombre del producto:</Typography>
                <Select fullWidth size="small" value={productoSeleccionado} onChange={handleSeleccionarProducto} displayEmpty>
                  <MenuItem value="" disabled>Seleccione...</MenuItem>
                  {productos.map((prod, idx) => (
                    <MenuItem key={idx} value={prod.nombre}>{prod.nombre}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Forma Farmacéutica:</Typography>
                <TextField fullWidth size="small" value={formaFarmaceutica} InputProps={{ readOnly: true, sx: { fontWeight: "bold" } }} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Volumen nominal:</Typography>
                <Select fullWidth size="small" value={volumenNominal} onChange={handleSeleccionarVolumen} displayEmpty>
                  <MenuItem value="" disabled>Seleccione...</MenuItem>
                  {volumenes.map((vol, i) => (
                    <MenuItem key={i} value={vol}>{vol}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Envase Primario:</Typography>
                <TextField fullWidth size="small" value={envasePrimario} InputProps={{ readOnly: true }} />
              </Grid>

              {formulaTabla.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="h6" mt={2} fontWeight="bold">FÓRMULA CUALI-CUANTITATIVA</Typography>
                  <Typography variant="body2" fontWeight="bold" mt={1}>Cada envase contiene:</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}><strong>MATERIA PRIMA</strong></Grid>
                      <Grid item xs={3}><strong>Cantidad</strong></Grid>
                      <Grid item xs={3}><strong>Unidad</strong></Grid>
                      {formulaTabla.map((item, idx) => (
                        <React.Fragment key={idx}>
                          <Grid item xs={6}>{item.materiaPrima}</Grid>
                          <Grid item xs={3}>{item.cantidad}</Grid>
                          <Grid item xs={3}>{item.unidad}</Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <EspecificacionesEvaluacion producto={productoSeleccionado} especificaciones={especificaciones} />

      {tipoEstudio && frecuencia.length > 0 && (
        <FrecuenciaMuestreo frecuencia={frecuencia} />
      )}

      <ProtocoloExportarPDF
        producto={productoSeleccionado}
        tipoEstudio={tipoEstudio}
        objetivo={objetivo}
        temperatura={temperatura}
        humedad={humedad}
        formaFarmaceutica={formaFarmaceutica}
        volumenNominal={volumenNominal}
        envasePrimario={envasePrimario}
        formulaTabla={formulaTabla}
        especificaciones={especificaciones}
        frecuencia={frecuencia}
        lotes={lotes}
      />
    </LocalizationProvider>
  );
};

export default ProtocoloForm;
