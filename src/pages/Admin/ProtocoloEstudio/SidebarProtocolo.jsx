import React from 'react';
import { FaBox, FaFileAlt, FaUsers, FaClipboardList } from 'react-icons/fa';

const SidebarProtocolo = ({ isOpen, navigate, logo }) => {
  return (
    <div className={`sidebar ${isOpen ? '' : 'closed'} full-height`}>
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
    </div>
  );
};

export default SidebarProtocolo;
