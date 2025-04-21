import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@mui/material";
import { FaFilePdf } from "react-icons/fa";
import logo from "../../../assets/laboratoriosabd.png";

const ProtocoloExportarPDF = ({
  producto,
  tipoEstudio,
  objetivo,
  temperatura,
  humedad,
  formaFarmaceutica,
  volumenNominal,
  envasePrimario,
  formulaTabla,
  especificaciones,
  frecuencia,
  lotes,
  principioActivo,
  clasificacionPrincipio
}) => {
  const exportarPDF = () => {
    const doc = new jsPDF();
    const img = new Image();
    img.src = logo;

    const encabezado = (pagina) => {
      doc.setDrawColor(0);
      doc.rect(10, 10, 190, 20);
      doc.line(42, 10, 42, 30);
      doc.line(150, 10, 150, 30);
      doc.line(200, 10, 200, 30);

      for (let i = 15; i < 30; i += 5) {
        doc.line(150, i, 200, i);
      }

      doc.addImage(img, "PNG", 12, 12, 28, 14);
      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text("PROTOCOLO DE ESTUDIO DE ESTABILIDAD", 96, 18, { align: "center" });
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.text("Ref: CC-MN-006", 175, 14, { align: "center" });
      doc.text("Registro 1", 175, 19, { align: "center" });
      doc.text("Versión 1", 175, 24, { align: "center" });
      doc.text(`Pág. ${pagina} de 2`, 175, 29, { align: "center" });
    };

    encabezado(1);
    let y = 35;
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("1. Código de Protocolo: __________________________", 12, y);
    y += 8;

    doc.setFillColor(0, 174, 239);
    doc.rect(10, y, 190, 6, "F");
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text("1º DETERMINACIÓN Y OBJETIVO DEL ESTUDIO", 105, y + 4, { align: "center" });
    y += 10;

    doc.setFont(undefined, "normal");
    doc.setFontSize(9);
    doc.text(`2. Tipo de estudio: ${tipoEstudio}`, 12, y); y += 6;
    doc.text(`3. Objetivo: ${objetivo}`, 12, y); y += 6;
    doc.text("4. Condiciones de almacenamiento:", 12, y); y += 5;
    doc.text(`- Temperatura: ${temperatura}`, 17, y);
    doc.text(`- Humedad: ${humedad}`, 110, y); y += 10;

    doc.setFillColor(0, 174, 239);
    doc.rect(10, y, 190, 6, "F");
    doc.setFont(undefined, "bold");
    doc.text("2º DATOS DEL PRODUCTO", 105, y + 4, { align: "center" });
    y += 10;

    doc.setFont(undefined, "normal");
    doc.text("5. Laboratorio fabricante: Laboratorios ABD Ltda.", 12, y); y += 6;
    doc.text(`6. Nombre del producto: ${producto}`, 12, y); y += 6;
    doc.text("7. Sistema de envase y cierre:", 12, y); y += 6;
    doc.text(`7.1 Volumen nominal: ${volumenNominal}`, 17, y); y += 6;
    doc.text(`7.2 Envase primario: ${envasePrimario}`, 17, y); y += 6;
    doc.text(`8. Forma farmacéutica: ${formaFarmaceutica}`, 12, y); y += 6;
    doc.text("9. Fórmula cuali-cuantitativa:", 12, y);

    autoTable(doc, {
      startY: y + 3,
      head: [["Cada envase contiene", "Cantidad", "Unidad"]],
      body: formulaTabla.map((f) => [f.materiaPrima, f.cantidad, f.unidad]),
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [200, 200, 200] },
    });

    let yLotes = doc.lastAutoTable.finalY + 10;
    doc.setFont(undefined, "normal");
    doc.text(`10. Principio Activo(s) (D.C.I.): ${principioActivo}`, 12, yLotes); yLotes += 6;
    doc.text(`10.1 Clasificación del Principio Activo(s): ${clasificacionPrincipio}`, 12, yLotes); yLotes += 10;

    doc.setFillColor(0, 174, 239);
    doc.rect(10, yLotes, 190, 6, "F");
    doc.setFont(undefined, "bold");
    doc.text("3º DISEÑO DEL ESTUDIO", 105, yLotes + 4, { align: "center" });
    yLotes += 10;

    doc.setFont(undefined, "normal");
    doc.text("11. Lotes a evaluar:", 12, yLotes); yLotes += 6;
    doc.text("11.1 Fecha de ingreso al estudio:", 17, yLotes);

    autoTable(doc, {
      startY: yLotes + 3,
      head: [["Nº de Lote", "Tamaño de lote", "Fecha de fabricación", "Tipo de lote", "Duración del estudio"]],
      body: lotes.map((l) => [l.numero, l.tamano, l.fecha, l.tipo, l.duracion]),
      theme: "grid",
      styles: { fontSize: 8 },
    });

    doc.addPage();
    encabezado(2);

    const transformarEspecificaciones = (data) => {
      const generales = [], valoraciones = [], microbiologicas = [];
      data.forEach((item) => {
        if (item.aspecto) generales.push(["Aspecto", item.aspecto]);
        if (item.ph_min && item.ph_max) generales.push(["pH", `${item.ph_min} - ${item.ph_max}`]);
        if (item.volumen) generales.push(["Volumen", `No menor a ${item.volumen} ml`]);
        if (item.hermeticidad) generales.push(["Hermeticidad", item.hermeticidad]);
        if (item.endotoxinas) generales.push(["Endotoxinas", item.endotoxinas]);
        if (item.otros_componentes) {
          try {
            const raw = typeof item.otros_componentes === "string"
              ? JSON.parse(item.otros_componentes)
              : item.otros_componentes;
            const keys = Object.keys(raw);
            for (let i = 0; i < keys.length; i += 2) {
              const nombre = keys[i];
              const siguiente = keys[i + 1];
              const min = raw[nombre]?.toString().replace(",", ".").replace("%", "");
              const max = raw[siguiente]?.toString().replace(",", ".").replace("%", "");
              if (nombre && min && max && !nombre.toLowerCase().includes("na")) {
                const nombreLimpio = nombre.replace(/^%/, "").trim();
                valoraciones.push([
                  `Valoración de ${nombreLimpio.charAt(0).toUpperCase() + nombreLimpio.slice(1)}`,
                  `${parseFloat(min).toFixed(2)}% - ${parseFloat(max).toFixed(2)}%`
                ]);
              }
            }
          } catch (e) {
            console.error("Error al parsear otros_componentes:", e);
          }
        }
        if (item.esterilidad) microbiologicas.push(["Esterilidad", item.esterilidad]);
        if (item.pruebas_microbiologicas) microbiologicas.push(["Pruebas Microbiológicas", item.pruebas_microbiologicas]);
      });
      return { generales, valoraciones, microbiologicas };
    };

    doc.setFont(undefined, "bold");
    doc.setFontSize(9);
    doc.text("12º ESPECIFICACIONES A EVALUAR Y CRITERIO DE ACEPTACIÓN", 12, 35);
    let ySpecs = 38;

    const renderGrupo = (titulo, filas) => {
      doc.setFillColor(179, 205, 224);
      doc.rect(10, ySpecs, 190, 6, "F");
      doc.setFont(undefined, "bold");
      doc.text(titulo, 105, ySpecs + 4, { align: "center" });
      ySpecs += 8;

      autoTable(doc, {
        startY: ySpecs,
        head: [],
        body: filas,
        theme: "grid",
        styles: { fontSize: 8 },
        margin: { left: 10, right: 10 },
      });
      ySpecs = doc.lastAutoTable.finalY + 4;
    };

    const { generales, valoraciones, microbiologicas } = transformarEspecificaciones(especificaciones);
    if (generales.length) renderGrupo("Especificaciones", generales);
    if (valoraciones.length) renderGrupo("Valoración", valoraciones);
    if (microbiologicas.length) renderGrupo("Pruebas microbiológicas", microbiologicas);

    doc.setFont(undefined, "bold");
    doc.text("13. Frecuencia de Muestreo y Cantidad de Muestras Ingresadas al Estudio", 12, ySpecs);
    doc.setFont(undefined, "normal");

    autoTable(doc, {
      startY: ySpecs + 3,
      head: [["Especificación", "# de Env.", "T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "Extra", "Subtotal"]],
      body: frecuencia.map((item) => [
        item.parametro,
        item.envases,
        item.T0,
        item.T1,
        item.T2,
        item.T3,
        item.T4,
        item.T5,
        item.T6,
        item.T7,
        item.T8,
        item.T9,
        item.Extra,
        item.subtotal
      ]),
      theme: "grid",
      styles: { fontSize: 7 },
    });

    const yFinal = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(9);
    doc.text("Observaciones:", 12, yFinal);
    doc.line(35, yFinal + 1, 200, yFinal + 1);
    doc.line(35, yFinal + 6, 200, yFinal + 6);

    doc.text("Realizado por:", 12, yFinal + 15);
    doc.line(40, yFinal + 15, 90, yFinal + 15);
    doc.text("Firma:", 12, yFinal + 22);
    doc.line(40, yFinal + 22, 90, yFinal + 22);

    doc.text("Verificado por:", 110, yFinal + 15);
    doc.line(140, yFinal + 15, 190, yFinal + 15);
    doc.text("Firma:", 110, yFinal + 22);
    doc.line(140, yFinal + 22, 190, yFinal + 22);

    doc.save(`Protocolo-${producto}.pdf`);
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<FaFilePdf />}
      onClick={exportarPDF}
      sx={{ mt: 3 }}
    >
      Exportar PDF
    </Button>
  );
};

export default ProtocoloExportarPDF;