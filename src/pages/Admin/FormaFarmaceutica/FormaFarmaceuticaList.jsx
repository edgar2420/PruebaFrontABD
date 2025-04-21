import React, { useState, useEffect } from 'react';
import { Table, Input, Modal, Form, Button, Space, message } from 'antd';
import { FaBars, FaUser, FaBox, FaFileAlt, FaClipboardList, FaEdit, FaTrash, FaPlus, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/laboratoriosabd.png';
import {
  obtenerFormasFarmaceuticas,
  crearFormaFarmaceutica,
  editarFormaFarmaceutica,
  eliminarFormaFarmaceutica
} from '../../../services/FormaFarmaceuticaSevice';

const FormaFarmaceutica = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [formas, setFormas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const fetchFormas = async () => {
    try {
      const data = await obtenerFormasFarmaceuticas();
      setFormas(data);
    } catch {
      message.error('Error al obtener formas farmacéuticas');
    }
  };

  useEffect(() => {
    fetchFormas();
  }, []);

  const filteredData = formas.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const openEditModal = (record = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record || {});
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingRecord) {
        await editarFormaFarmaceutica(editingRecord.id, values);
        message.success('Forma farmacéutica actualizada');
      } else {
        await crearFormaFarmaceutica(values);
        message.success('Forma farmacéutica creada');
      }
      setIsModalOpen(false);
      fetchFormas();
      form.resetFields();
    } catch {
      message.error('Error al guardar forma farmacéutica');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar esta forma farmacéutica?')) {
      try {
        await eliminarFormaFarmaceutica(id);
        fetchFormas();
        message.success('Forma farmacéutica eliminada');
      } catch {
        message.error('Error al eliminar forma farmacéutica');
      }
    }
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    {
      title: 'Acciones',
      render: (_, record) => (
        <div className="action-buttons-cell">
          <FaEdit className="icon-edit" onClick={() => openEditModal(record)} title="Editar" />
          <FaTrash className="icon-delete" onClick={() => handleDelete(record.id)} title="Eliminar" />
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-container full-height">
      <div className={`sidebar ${isSidebarOpen ? '' : 'closed'} full-height`}>
        {isSidebarOpen && (
          <>
            <img src={logo} alt="Laboratorios ABD" />
            <nav>
  <ul>
    <li>
      <button className="menu-button" onClick={() => navigate('/admin-dashboard')}>
        <FaBox style={{ marginRight: '10px' }} /> PRODUCTOS
      </button>
    </li>
    <li>
      <button className="menu-button" onClick={() => navigate('/protocolo-estudio')}>
        <FaFileAlt style={{ marginRight: '10px' }} /> PROTOCOLO DE ESTUDIO
      </button>
    </li>
    <li>
      <button className="menu-button" onClick={() => navigate('/forma-farmaceutica')}>
        <FaUsers style={{ marginRight: '10px' }} /> FORMULA FARMACEUTICA
      </button>
    </li>
    <li>
      <button className="menu-button" onClick={() => navigate('/especificaciones')}>
        <FaClipboardList style={{ marginRight: '10px' }} /> ESPECIFICACIONES PT
      </button>
    </li>
    <li>
      <button className="menu-button" onClick={() => navigate('/formula-cualitativa')}>
        <FaClipboardList style={{ marginRight: '10px' }} /> FORMULA CUALITATIVA
      </button>
    </li>
    <li>
      <button className="menu-button" onClick={() => navigate('/clasificacion_pa')}>
        <FaClipboardList style={{ marginRight: '10px' }} /> CLASIFICACION PA
      </button>
    </li>
  </ul>
</nav>
          </>
        )}
      </div>

      <div className="main-content full-height">
        <header className="navbar">
          <div>
            <FaBars onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
            <h1>Laboratorios ABD</h1>
          </div>
          <div className="search-container">
            <Input.Search
              placeholder="Buscar formas farmacéuticas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ width: 300 }}
              allowClear
            />
          </div>
          <div style={{ position: 'relative' }}>
            <FaUser onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
            {isUserMenuOpen && (
              <div className="user-menu">
                <button onClick={() => navigate('/')}>Salir</button>
              </div>
            )}
          </div>
        </header>

        <div className="table-container full-height">
          <div className="action-buttons compact">
            <Button type="primary" icon={<FaPlus />} onClick={() => openEditModal()}>
              Nueva Forma Farmacéutica
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
            className="custom-table"
          />
        </div>

        <Modal
          title="Forma Farmacéutica"
          open={isModalOpen}
          onOk={handleSave}
          onCancel={() => setIsModalOpen(false)}
          okText="Guardar"
          cancelText="Cancelar"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true, message: 'Ingrese el nombre de la forma farmacéutica' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default FormaFarmaceutica;
