import React from "react";
import { Modal, Form, Select, Input, Button, Space } from "antd";

const FormulaFormModal = ({
  visible,
  onCancel,
  onOk,
  productos,
  form,
  materiasPrimas,
  handleAddMateriaPrima,
  handleMateriaChange,
}) => {
  return (
    <Modal
      title="Crear Nueva Fórmula"
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      okText="Guardar"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Producto"
          name="productoNombre"
          rules={[{ required: true, message: "El producto es obligatorio" }]}
        >
          <Select
            showSearch
            placeholder="Seleccionar producto"
            options={productos.map((p) => ({
              value: p.nombre,
              label: `${p.nombre} (${p.volumen} mL)`,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Volumen Nominal (mL)"
          name="volumenNominal"
          rules={[{ required: true, message: "El volumen es obligatorio" }]}
        >
          <Input placeholder="Ej. 1.5" />
        </Form.Item>

        <label>Materias Primas:</label>
        {materiasPrimas.map((mp, index) => (
          <Space
            key={index}
            style={{ display: "flex", marginBottom: 8 }}
            align="baseline"
          >
            <Input
              placeholder="Nombre"
              value={mp.nombre}
              onChange={(e) =>
                handleMateriaChange(index, "nombre", e.target.value)
              }
            />
            <Input
              placeholder="Cantidad"
              value={mp.cantidad}
              onChange={(e) =>
                handleMateriaChange(index, "cantidad", e.target.value)
              }
            />
            <Input
              placeholder="Unidad"
              value={mp.unidad}
              onChange={(e) =>
                handleMateriaChange(index, "unidad", e.target.value)
              }
            />
          </Space>
        ))}

        <Button type="link" onClick={handleAddMateriaPrima}>
          + Agregar materia prima
        </Button>
      </Form>
    </Modal>
  );
};

export default FormulaFormModal;
