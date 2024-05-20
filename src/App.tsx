import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.store';
import Cargar from './view/cargar/Cargar';
//import router from './Rutas';
import routerEstudiante from './rutas/RutaEstudiante';
import { compararHashSHA256 } from './helper/herramienta.helper';
import routerDocente from './rutas/RutasDocente';
import routerAcceso from './rutas/RutaAcceso';

function App() {

    const cargando = useSelector((state: RootState) => state.autenticacion.cargando)

    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    
    if (cargando) return <Cargar />

    //Docente - Admin
    if (compararHashSHA256(import.meta.env.VITE_USER_TYPO_AD, tipoUsuario)) {
        return <RouterProvider router={routerDocente} />
    }

    if (compararHashSHA256(import.meta.env.VITE_USER_TYPO_ES, tipoUsuario)) {
        return <RouterProvider router={routerEstudiante} />
    }

    return <RouterProvider router={routerAcceso} />
}

export default App