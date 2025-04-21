import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductoTable = ({ productos, openEditModal, handleDelete }) => {
  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Lote</th>
            <th>Envase</th>
            <th>Volumen</th>
            <th>Hermeticidad</th>
            <th>Aspecto</th>
            <th>pH</th>
            <th>Conductividad</th>
            <th>Impurezas</th>
            <th>Partículas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{producto.nombre}</td>
              <td>{producto.lote}</td>
              <td>{producto.envase}</td>
              <td>{producto.volumen}</td>
              <td>{producto.hermeticidad}</td>
              <td>{producto.aspecto}</td>
              <td>{producto.ph}</td>
              <td>{producto.conductividad}</td>
              <td>{producto.impurezas}</td>
              <td>{producto.particulas}</td>
              <td className="action-buttons-cell">
                <FaEdit
                  className="icon-edit"
                  onClick={() => openEditModal(producto)}
                  title="Editar"
                />
                <FaTrash
                  className="icon-delete"
                  onClick={() => handleDelete(producto.id)}
                  title="Eliminar"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoTable;