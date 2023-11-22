import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';
import HomeEstudiante from './view/estudiante/HomeEstudiante';
import MatriculaInterna from './view/estudiante/matricula/MatriculaInterna';
import MatriculaExterna from './view/estudiante/matricula/MatriculaExterna';
import MatriculaHorario from './view/estudiante/matricula/MatriculaHorario';
import HorarioIdiomas from './view/trabajador/HorarioIdiomas';
import AgregarHorario from './view/trabajador/AgregarHorario';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';

const router = createBrowserRouter([
  {
    path: '/inicio',
    element: <Navigate to="centro-idiomas" replace/>
  },
  {
    path: '/inicio/*',
    element: <Inicio/>,
    children: [
      {
        path:'centro-idiomas',
        element: <HomeEstudiante/>
      },
      {
        path:'matricula_interna',
        element: <MatriculaInterna/>
      },
      {
        path:'matricula_externa',
        element: <MatriculaExterna/>
      },
      {
        path:'horario',
        element: <MatriculaHorario/>
      },
      {
        path:'horario-idiomas',
        element: <HorarioIdiomas/>
      },
      {
        path:'agregar-horario',
        element: <AgregarHorario/>
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
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
])
export default router;