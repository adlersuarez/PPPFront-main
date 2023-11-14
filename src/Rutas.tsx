import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';
import Inscripcion from './view/pages/estudiante/Inscripcion';
import Formato from './view/pages/estudiante/Formato';
import Contacto from './view/pages/estudiante/Contacto';
import Reglamento from './view/pages/estudiante/Reglamento';
import Admin from './view/pages/admin/Dashboard';
import Revision from './view/pages/docente/Revision';
import Especifico from './view/pages/docente/Especifico';
import ProcesoMedicina from './view/pages/facultades/medicina/interno/ProcesoMedicina';
import Registro from './view/pages/facultades/medicina/interno/Registro';
import CargarInformes from './view/pages/facultades/medicina/interno/CargarInformes';
import Fechas from './view/pages/facultades/medicina/admin/Fechas';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Proceso from './view/pages/estudiante/Proceso';

const router = createBrowserRouter([
  {
    path: '/inicio',
    element: <Navigate to="inscripcion" replace />,
  },
  {
    path: '/inicio/*',
    element: <Inicio />,
    children: [
      {
        //index: true,
        path: 'inscripcion',
        element: <Inscripcion />,
      },
      {
        path: 'proceso',
        element: <Proceso/>,
      },
      {
        path: 'formatos',
        element: <Formato />,
      },
      {
        path: 'contactos',
        element: <Contacto />,
      },
      {
        path: 'reglamentos',
        element: <Reglamento />,
      },

      {
        path: 'administrador',
        element: <Admin />,
      },
      {
        path: 'revision/*',
        children: [
          {
            path: '',
            element: <Revision />,
          },
          {
            path: 'estudiante-detalle',
            element: <Especifico/>,
          },
        ]
      },
      {
        path: 'medicina/*',
        children: [
          {
            path: 'internado-medico',
            element: <ProcesoMedicina/>,
          },
          {
            path: 'registro',
            element: <Registro/>,
          },
          {
            path: 'estudiantes',
            element: <CargarInformes/>,
          },
          {
            path: 'administrador',
            element: <Fechas/>,
          },
        ]
      },

    ]
  },
  {
    path: 'acceso',
    element: <Acceso />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;