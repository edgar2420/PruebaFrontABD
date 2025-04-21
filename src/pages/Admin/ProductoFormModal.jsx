import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import { obtenerFormasFarmaceuticas } from '../../services/FormaFarmaceuticaSevice';

const ProductoFormModal = ({ visible, onCancel, onOk, form }) => {
  const [formasFarmaceuticas, setFormasFarmaceuticas] = useState([]);

  useEffect(() => {
    if (visible) {
      obtenerFormasFarmaceuticas()
        .then(data => setFormasFarmaceuticas(data))
        .catch(err => console.error(err));
    }
  }, [visible]);

  return (
    <Modal
      title="Editar o Crear Producto"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Guardar"
      cancelText="Cancelar"
      width={800}
      styles={{ body: { maxHeight: '80vh', overflowY: 'auto' } }}
    >
      <Form layout="vertical" form={form}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            name="nombre"
            label="Nombre"
            rules={[{ required: true, message: 'Este campo es obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="formaFarmaceuticaNombre"
            label="Forma Farmacéutica"
            rules={[{ required: true, message: 'La forma farmacéutica es obligatoria' }]}
          >
            <Select placeholder="Selecciona una forma farmacéutica">
              {formasFarmaceuticas.map((f) => (
                <Select.Option key={f.id} value={f.nombre}>
                  {f.nombre}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="lote" label="Lote">
            <Input />
          </Form.Item>
          <Form.Item name="envase" label="Envase">
            <Input />
          </Form.Item>
          <Form.Item name="volumen" label="Volumen">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="hermeticidad" label="Hermeticidad">
            <Input />
          </Form.Item>
          <Form.Item name="aspecto" label="Aspecto">
            <Input />
          </Form.Item>
          <Form.Item name="ph" label="pH">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="conductividad" label="Conductividad">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="impurezas" label="Impurezas">
            <Input />
          </Form.Item>
          <Form.Item name="particulas" label="Partículas">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="recuentoMicrobiano" label="Recuento Microbiano">
            <Input />
          </Form.Item>
          <Form.Item name="esterilidad" label="Esterilidad">
            <Input />
          </Form.Item>
          <Form.Item name="endotoxinas" label="Endotoxinas">
            <Input />
          </Form.Item>
          <Form.Item name="fechaAnalisis" label="Fecha de Análisis">
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item
            name="observaciones"
            label="Observaciones"
            style={{ gridColumn: '1 / -1' }}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

ProductoFormModal.useForm = Form.useForm;

export default ProductoFormModal;
