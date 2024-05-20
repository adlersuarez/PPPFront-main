import Acceso from '@/view/acceso/Acceso';
import Inicio from '@/view/inicio/Inicio';
import NotFound from '@/view/pages/404/NotFound';
import RevisionAdmin from '@/view/pages/admin/RevisionAdmin';
import RevisionAlumnoEspecifico from '@/view/pages/admin/RevisionAlumnoEspecifico';
import RevisionDocente from '@/view/pages/admin/RevisionDocente';
import RevisionEstudiante from '@/view/pages/admin/RevisionEstudiante';
import RevisionSeccionAlumno from '@/view/pages/admin/RevisionSeccionAlumno';
import Especifico from '@/view/pages/docente/Especifico';
import Revision from '@/view/pages/docente/Revision';
import Secciones from '@/view/pages/docente/Secciones';
import Contacto from '@/view/pages/estudiante/Contacto';
import InicioAfterLogin from '@/view/pages/Inicio';
import Reglamento from '@/view/pages/estudiante/Reglamento';
import { Navigate, createBrowserRouter } from 'react-router-dom';


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
        element: <Contacto  />,
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