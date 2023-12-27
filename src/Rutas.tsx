import { Navigate, createBrowserRouter } from 'react-router-dom';
import Inicio from './view/inicio/Inicio';

// Estudiante
import HomeEstudiante from './view/estudiante/HomeEstudiante';
import MatriculaInterna from './view/estudiante/matricula/MatriculaInterna';
import MatriculaExterna from './view/estudiante/matricula/MatriculaExterna';
import MatriculaHorario from './view/estudiante/matricula/MatriculaHorario';

// Trabajador
import HorarioIdiomas from './view/trabajador/horario/HorarioIdiomas';
import Acceso from './view/acceso/Acceso';
import NotFound from './view/pages/404/NotFound';
import InicioDocente from './view/docente/InicioDocente';
import ListaClasesAsignados from './view/docente/ListaClasesAsignados';
import ReporteDeNotas from './view/docente/ReporteDeNotas';
import VistaHorarioDocente from './view/docente/VistaHorarioDocente';
import SubirNotas from './view/docente/SubirNotas';
import VistaHorarioEstudiante from './view/estudiante/horarios/VistaHorariosEstudiante';
import SeleccionDeIdiomas from './view/estudiante/horarios/SeleccionDeIdiomas';
import ComponenteNotas from './view/estudiante/notas/ComponenteNotas';
import VidaAcademica from './view/estudiante/VidaAcademica';
import Consolidado from './view/estudiante/Consolidado';
import Boleta from './view/estudiante/Boleta-notas';
import Inasistencia from './view/estudiante/inasistencia';
import ResultadoPostulante from './view/estudiante/resultados-postulante';
import Reportes from  './view/trabajador/horario/Reportes';



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
        path:'vista-horario-estudiante',
        element: <VistaHorarioEstudiante/>
      },
      {
        path:'seleccion-idioma',
        element: <SeleccionDeIdiomas/>
      },
      {
        path:'matricula-interna',
        element: <MatriculaInterna/>
      },
      {
        path:'vida-academica',
        element: <VidaAcademica/>
      },
      {
        path:'matricula-externa',
        element: <MatriculaExterna/>
      },
      {
        path:'consolidado',
        element: <Consolidado/>
      },
      {
        path:'boleta-notas',
        element: <Boleta/>
      },
      {
        path:'inasistencia',
        element: <Inasistencia/>
      },
      {
        path:'resultados-postulante',
        element: <ResultadoPostulante/>
      },

      {
        path:'horario',
        element: <MatriculaHorario/>
      },

      
      {
        path:'reportes',
        element: <Reportes/>
      },
      {
        path:'horario-idiomas',
        element: <HorarioIdiomas/>
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
    path: 'notas',
    element: <ComponenteNotas />
  },
  {
    path: '/',
    element: <Navigate to="acceso" replace />,
  },
])
export default router;