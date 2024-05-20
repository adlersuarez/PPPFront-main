import Acceso from '@/view/acceso/Acceso';
import Inicio from '@/view/inicio/Inicio';
import NotFound from '@/view/pages/404/NotFound';
import Contacto from '@/view/pages/estudiante/Contacto';
import Formato from '@/view/pages/estudiante/Formato';
import InicioAfterLogin from '@/view/pages/Inicio';
import Proceso from '@/view/pages/estudiante/Proceso';
import Reglamento from '@/view/pages/estudiante/Reglamento';
import { Navigate, createBrowserRouter } from 'react-router-dom';

const routerEstudiante = createBrowserRouter([
  /*{
    path: '/*',
    element: <Navigate to="inicio" replace />,
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
        path: '*',
        element: <NotFound />
      }

    ]
  },
  {
    path: '/*',
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

export default routerEstudiante