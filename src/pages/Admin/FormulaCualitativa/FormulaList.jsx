import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaBars, FaUser, FaPlus } from "react-icons/fa";
import {
  Card,
  Input,
  Button,
  Upload,
  Modal,
  Form,
  Space,
  message,
  Pagination,
  Select
} from "antd";
import { UploadOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getTodasLasFormulas,
  subirExcelFormulas,
  crearFormula,
  eliminarFormula,
  actualizarFormula
} from "../../../services/FormulaService";
import { getProductos } from "../../../services/ProductoService";
import Sidebar from "../Sidebar";
import logo from "../../../assets/laboratoriosabd.png";
import "../AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const FormulaList = () => {
  const navigate = useNavigate();

  const [formulas, setFormulas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [materiasPrimas, setMateriasPrimas] = useState([{ nombre: "", cantidad: "", unidad: "" }]);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [formulaEditId, setFormulaEditId] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalFormulas, setTotalFormulas] = useState(0);
  const [limitePorPagina] = useState(10);

  const cargarDatos = async (pagina = 1) => {
    setLoading(true);
    try {
      const productosData = await getProductos();
      setProductos(productosData);

      const res = await getTodasLasFormulas(pagina, limitePorPagina);
      setFormulas(res?.data || []);
      setTotalFormulas(res?.total || 0);
      setPaginaActual(pagina);
    } catch (err) {
      console.error("❌ Error cargando datos:", err);
      message.error("No se pudieron cargar las fórmulas o productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleBuscar = (valor) => {
    setBusqueda(valor);
  };

  const handleFileChange = async (info) => {
    const file = info.file;
    if (!file) return;

    if (!file.name.endsWith(".xlsx")) {
      return message.warning("Solo se permiten archivos .xlsx");
    }

    setLoading(true);
    try {
      const result = await subirExcelFormulas(file);
      message.success(`Se importaron ${result?.formulas?.length || 0} fórmula(s) correctamente`);
      cargarDatos(paginaActual);
    } catch (error) {
      const msg = error?.response?.data?.msg || "Error al importar archivo Excel";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMateriaPrima = () => {
    setMateriasPrimas([...materiasPrimas, { nombre: "", cantidad: "", unidad: "" }]);
  };

  const handleMateriaChange = (index, key, value) => {
    const copia = [...materiasPrimas];
    copia[index][key] = value;
    setMateriasPrimas(copia);
  };

  const handleCrearFormula = async () => {
    try {
      const values = await form.validateFields();
      const producto = productos.find(p => p.nombre === values.productoNombre);
      if (!producto) return message.error("Producto no encontrado");

      const nueva = {
        productoNombre: producto.nombre,
        volumenNominal: producto.volumen,
        materiasPrimas: materiasPrimas.filter(mp => mp.nombre && mp.cantidad)
      };

      if (isEdit && formulaEditId) {
        await actualizarFormula(formulaEditId, nueva);
        message.success("Fórmula actualizada correctamente");
      } else {
        await crearFormula(nueva);
        message.success("Fórmula creada correctamente");
      }

      setModalVisible(false);
      setMateriasPrimas([{ nombre: "", cantidad: "", unidad: "" }]);
      form.resetFields();
      setIsEdit(false);
      setFormulaEditId(null);
      cargarDatos(paginaActual);
    } catch (error) {
      console.error("❌ Error al guardar fórmula:", error);
      message.error("No se pudo guardar la fórmula");
    }
  };

  const handleEditar = (record) => {
    form.setFieldsValue({ productoNombre: record.productoNombre });
    setMateriasPrimas(record.materiasPrimas);
    setIsEdit(true);
    setFormulaEditId(record.id);
    setModalVisible(true);
  };

  const handleEliminar = async (id) => {
    try {
      await eliminarFormula(id);
      message.success("Fórmula eliminada correctamente");
      cargarDatos(paginaActual);
    } catch (error) {
      console.error("❌ Error al eliminar fórmula:", error);
      message.error("No se pudo eliminar la fórmula");
    }
  };

  return (
    <div className="dashboard-container full-height">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} navigate={navigate} logo={logo} />

      <div className="main-content full-height">
        <header className="navbar">
          <div>
            <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ fontSize: '24px', cursor: 'pointer', marginRight: '20px' }} />
            <h1>Fórmulas Cuali-Cuantitativas</h1>
          </div>

          <div style={{ position: 'relative' }}>
            <FaUser style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '20px' }} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
            {isUserMenuOpen && (
              <div className="user-menu">
                <button onClick={() => window.location.href = "/"}>Salir</button>
              </div>
            )}
          </div>
        </header>

        <Card style={{ margin: 20 }}
          extra={
            <Space>
              <Input placeholder="Buscar por producto" prefix={<SearchOutlined />} value={busqueda} onChange={(e) => handleBuscar(e.target.value)} style={{ width: 250 }} />
              <Upload accept=".xlsx" showUploadList={false} customRequest={({ file, onSuccess }) => {
                handleFileChange({ file });
                setTimeout(() => onSuccess("ok"), 0);
              }}>
                <Button icon={<UploadOutlined />} loading={loading}>Subir Excel</Button>
              </Upload>
              <Button icon={<PlusOutlined />} onClick={() => {
                setIsEdit(false);
                form.resetFields();
                setMateriasPrimas([{ nombre: "", cantidad: "", unidad: "" }]);
                setModalVisible(true);
              }}>
                Crear Fórmula
              </Button>
            </Space>
          }
        >
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Volumen</th>
                  <th>Materias Primas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {(formulas || []).filter(f => f.productoNombre.toLowerCase().includes(busqueda.toLowerCase())).map((formula, index) => (
                  <tr key={index}>
                    <td>{formula.productoNombre}</td>
                    <td>{formula.volumenNominal}</td>
                    <td>
                      {formula.materiasPrimas.map((mp, i) => (
                        <div key={i}>{`${mp.nombre} - ${mp.cantidad} ${mp.unidad}`}</div>
                      ))}
                    </td>
                    <td className="action-buttons-cell">
                      <FaEdit className="icon-edit" style={{ color: '#007bff', cursor: 'pointer', marginRight: '12px' }} onClick={() => handleEditar(formula)} title="Editar" />
                      <FaTrash className="icon-delete" style={{ color: '#dc3545', cursor: 'pointer' }} onClick={() => handleEliminar(formula.id)} title="Eliminar" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            current={paginaActual}
            total={totalFormulas}
            pageSize={limitePorPagina}
            onChange={cargarDatos}
            style={{ marginTop: 16, textAlign: 'right' }}
          />
        </Card>

        <Modal
          title={isEdit ? "Editar Fórmula" : "Crear Nueva Fórmula"}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={handleCrearFormula}
          okText="Guardar"
        >
          <Form layout="vertical" form={form}>
            <Form.Item label="Producto" name="productoNombre" rules={[{ required: true, message: "Requerido" }]}> 
              <Select placeholder="Selecciona un producto">
                {productos.map(p => (
                  <Select.Option key={p.id} value={p.nombre}>{p.nombre}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <label>Materias Primas:</label>
            {materiasPrimas.map((mp, index) => (
              <Space key={index} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Input placeholder="Nombre" value={mp.nombre} onChange={(e) => handleMateriaChange(index, "nombre", e.target.value)} />
                <Input placeholder="Cantidad" value={mp.cantidad} onChange={(e) => handleMateriaChange(index, "cantidad", e.target.value)} />
                <Input placeholder="Unidad" value={mp.unidad} onChange={(e) => handleMateriaChange(index, "unidad", e.target.value)} />
              </Space>
            ))}
            <Button type="link" onClick={handleAddMateriaPrima}>+ Agregar materia prima</Button>
          </Form>
        </Modal>
      </div>  
    </div>
  );
};

export default FormulaList;
