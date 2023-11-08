import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.store';
import Cargar from './view/cargar/Cargar';
//import Inicio from './view/inicio/Inicio';
import NotFound from './view/pages/404/NotFound';
import Acceso from './view/acceso/Acceso';
import Inicio from './view/inicio/Inicio';
//import Acceso from './view/acceso/Acceso';
//import Busqueda from './view/busqueda/Busqueda';

function App() {

    const cargando = useSelector((state: RootState) => state.autenticacion.cargando);

    //console.log(cargando)

    if (cargando) {
        return <Cargar />;
    }

    return (

        <Switch>

            <Route
                path="/"
                exact={true}
            >
                <Redirect to={"/acceso"} />
            </Route>

            <Route
                path="/acceso"
                exact={true}
                render={() => <Acceso />}
            />

            <Route
                path="/inicio"
                render={(props) => <Inicio {...props} />}
            />

            {/*
            <Route
                path="/control"
                render={(props) => <Control {...props} />}
              />
            */}

            <Route
                component={NotFound}
            />

        </Switch>

    );

}

export default App