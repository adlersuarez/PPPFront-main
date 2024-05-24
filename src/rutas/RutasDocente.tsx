import Acceso from '@/view/acceso/Acceso';
import Inicio from '@/view/inicio/Inicio';
import NotFound from '@/view/pages/404/NotFound';
import RevisionAdmin from '@/view/pages/admin/revision/RevisionAdmin';
import RevisionDocente from '@/view/pages/admin/revision/RevisionDocente';
import RevisionEstudiante from '@/view/pages/admin/revision/RevisionEstudiante';

import Especifico from '@/view/pages/docente/Especifico';
import Revision from '@/view/pages/docente/Revision';
import Secciones from '@/view/pages/docente/Secciones';
import Contacto from '@/view/pages/estudiante/Contacto';
import InicioAfterLogin from '@/view/pages/Inicio';
import Reglamento from '@/view/pages/estudiante/Reglamento';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Dashboard from '@/view/pages/admin/reportes/Dashboard';
import ReporteGeneral from '@/view/pages/admin/reportes/ReporteGeneral';
import ReporteEspecifico from '@/view/pages/admin/reportes/ReporteEspecifico';
import RevisionSeccionAlumno from '@/view/pages/admin/revision/RevisionSeccionAlumno';
import RevisionAlumnoEspecifico from '@/view/pages/admin/revision/RevisionAlumnoEspecifico';


const routerDocente = createBrowserRouter([
  /*{
    path: '/inicio',
    element: <Navigate to="inscripcion" replace />,
  },*/
  {
    path: '/*',
    element: <Inicio />,
    children: [
      {
        //index: true,
        path: 'inicio',
        element: <InicioAfterLogin />,
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
          },
          {
            path: '*',
            element: <NotFound />
          }
        ]
      },
      {
        path: 'reportes/*',
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'general',
            element: <ReporteGeneral />,
          },
          {
            path: 'especifico',
            element:  <ReporteEspecifico />,
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

export default routerDocente