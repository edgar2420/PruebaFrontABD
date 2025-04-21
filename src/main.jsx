import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormLogin from './pages/Login/Login.jsx';
import Publico from './pages/Principal/Publico.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

import Especificaciones from './pages/Admin/Especificaciones.jsx';
import ProtocoloEstudio from './pages/Admin/ProtocoloEstudio/ProtocoloEstudio.jsx';
import FormulaList from './pages/Admin/FormulaCualitativa/FormulaList.jsx';
import FormaFarmaceuticaList from './pages/Admin/FormaFarmaceutica/FormaFarmaceuticaList.jsx';
import ClasificacionPA from './pages/Admin/ClasificacionPA.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <FormLogin/>
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/protocolo-estudio",
    element: <ProtocoloEstudio/>
  },
  {
    path: "/especificaciones",
    element: <Especificaciones/>
  },
  {
    path: "/publico-dashboard",
    element: <Publico/>
  },
  {
    path: "/forma-farmaceutica",
    element: <FormaFarmaceuticaList/>
  },
  {
    path: "/clasificacion_pa",
    element: <ClasificacionPA/>
  },
  {
    path: "/formula-cualitativa",
    element: <FormulaList/>
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
