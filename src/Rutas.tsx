import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

// Estudiante
import HomeEstudiante from './view/estudiante/HomeEstudiante';
import MatriculaInterna from './view/estudiante/matricula/MatriculaInterna';
import MatriculaExterna from './view/estudiante/matricula/MatriculaExterna';
import MatriculaHorario from './view/estudiante/matricula/MatriculaHorario';

// Trabajador
import HorarioIdiomas from './view/trabajador/horario/HorarioIdiomas';
import AgregarHorario from './view/trabajador/AgregarHorario';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import InicioDocente from './view/docente/InicioDocente';
import ListaClasesAsignados from './view/docente/ListaClasesAsignados';
import ReporteDeNotas from './view/docente/ReporteDeNotas';
import VistaHorarioDocente from './view/docente/VistaHorarioDocente';
import SubirNotas from './view/docente/SubirNotas';

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
        path:'matricula-interna',
        element: <MatriculaInterna/>
      },
      {
        path:'matricula-externa',
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
      {
        path:'inicio-docente',
        element: <InicioDocente/>
      },
      {
        path:'clases-asignadas',
        element: <ListaClasesAsignados/>
      },
      {
        path:'reporte-notas',
        element: <ReporteDeNotas/>
      },
      {
        path:'vista-horario',
        element: <VistaHorarioDocente/>
      },
      {
        path:'subir-notas',
        element: <SubirNotas/>
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