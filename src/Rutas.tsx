import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';
import InicioAfterLogin from './view/pages/Inicio';
import Formato from './view/pages/estudiante/Formato';
import Contacto from './view/pages/estudiante/Contacto';
import Reglamento from './view/pages/estudiante/Reglamento';
import Dashboard from './view/pages/admin/reportes/Dashboard';
import Revision from './view/pages/docente/Revision';
import Especifico from './view/pages/docente/Especifico';
import ProcesoMedicina from './view/pages/facultades/medicina/interno/ProcesoMedicina';
import Registro from './view/pages/facultades/medicina/interno/Registro';
import CargarInformes from './view/pages/facultades/medicina/interno/CargarInformes';
import Fechas from './view/pages/facultades/medicina/admin/Fechas';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import Proceso from './view/pages/estudiante/Proceso';
import Secciones from './view/pages/docente/Secciones';
import RevisionAdmin from './view/pages/admin/revision/RevisionAdmin';
import RevisionDocente from './view/pages/admin/revision/RevisionDocente';
import RevisionEstudiante from './view/pages/admin/revision/RevisionEstudiante';
import RevisionSeccionAlumno from './view/pages/admin/RevisionSeccionAlumno';
import RevisionAlumnoEspecifico from './view/pages/admin/revision/RevisionAlumnoEspecifico';

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
        element: <InicioAfterLogin />,
      },
      {
        path: 'proceso',
        element: <Proceso />,
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
        element: <Dashboard />,
      },
      {
        path: 'revision/*',
        children: [
          {
            path: '',
            element: <Secciones />,
          },
          {
            path: 'docente',
            element: <Revision />,
          },
          {
            path: 'estudiante-detalle',
            element: <Especifico />,
          },
        ]
      },
      {
        path: 'admin/*',
        children: [
          {
            path: '',
            element: <RevisionAdmin />,
          },
          {
            path: 'docente',
            element: <RevisionDocente />,
          },
          {
            path: 'docente-detalle',
            element: <RevisionEstudiante />,
          },
          {
            path: 'estudiante-detalle',
            element: <RevisionSeccionAlumno />,
          },
          {
            path: 'estudiante-especifico',
            element: <RevisionAlumnoEspecifico />,
          }
        ]
      },
      {
        path: 'medicina/*',
        children: [
          {
            path: 'internado-medico',
            element: <ProcesoMedicina />,
          },
          {
            path: 'registro',
            element: <Registro />,
          },
          {
            path: 'estudiantes',
            element: <CargarInformes />,
          },
          {
            path: 'administrador',
            element: <Fechas />,
          },
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }

    ]
  },
  {
    path: '/',
    element: <Navigate to="login" replace />,
  },
  {
    path: 'login',
    element: <Acceso />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router;