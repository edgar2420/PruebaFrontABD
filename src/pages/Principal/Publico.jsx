import React from 'react';
import ProtocoloForm from '../Admin/ProtocoloEstudio/ProtocoloForm';
import { FaBars } from 'react-icons/fa';
import logo from '../../assets/laboratoriosabd.png';
import '../Admin/AdminDashboard.css';

const Publico = () => {
    return (
        <div className="dashboard-container full-height">
            <div className="sidebar full-height">
                <img src={logo} alt="Laboratorios ABD" />
                <nav>
                    <ul>
                        <li>
                            <button className="menu-button">
                                PROTOCOLO DE ESTUDIO
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Contenido principal */}
            <div className="main-content full-height">
                <header className="navbar">
                    <div>
                        <FaBars style={{ cursor: 'pointer' }} />
                        <h1>Laboratorios ABD</h1>
                    </div>
                </header>

                <div style={{ padding: '20px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Protocolo de Estudio</h1>
                    <ProtocoloForm />
                </div>
            </div>
        </div>
    );
};

export default Publico;