import React, { useState } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from "../../../assets/laboratoriosabd.png";
import Sidebar from "./SidebarProtocolo";
import ProtocoloForm from "./ProtocoloForm";
import './ProtocoloEstudio.css';

const ProtocoloEstudio = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-container full-height">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} navigate={navigate} logo={logo} />

      {/* Main Content */}
      <div className="main-content full-height">
        {/* Navbar */}
        <header className="navbar">
          <div>
            <FaBars
              style={{ fontSize: '24px', cursor: 'pointer', marginRight: '20px' }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <h1>Laboratorios ABD</h1>
          </div>
          <div style={{ position: 'relative' }}>
            <FaUser
              style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '20px' }}
              title="Usuario"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            />
            {isUserMenuOpen && (
              <div className="user-menu">
                <button onClick={() => alert('Cerrando sesión...')}>Salir</button>
              </div>
            )}
          </div>
        </header>

        {/* Aquí va todo el formulario */}
        <div className="protocolo-container">
          <ProtocoloForm />
        </div>
      </div>
    </div>
  );
};

export default ProtocoloEstudio;
