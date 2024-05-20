import Acceso from '@/view/acceso/Acceso';
import NotFound from '@/view/pages/404/NotFound';
import { Navigate, createBrowserRouter } from 'react-router-dom';


const routerAcceso = createBrowserRouter([
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

export default routerAcceso;