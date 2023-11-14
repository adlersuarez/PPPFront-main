import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore.store';
import Cargar from './view/cargar/Cargar';
import NotFound from './view/pages/404/NotFound';
import Acceso from './view/acceso/Acceso';
import Inicio from './view/inicio/Inicio';


function App() {

    const cargando = useSelector((state: RootState) => state.autenticacion.cargando);

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
                render={(props) => <Acceso {...props} />}
            />

            <Route
                path="/inicio"
                // exact={true}
                render={(props) => <Inicio {...props} />}
            />

            {
                /*
                <Route
                    path="/acceso"
                    exact={true}
                    render={(props) => <RegistroEstudianteExterno {...props} />}
                />
                */
            }

            <Route
                component={NotFound}
            />

        </Switch>

    );

}

export default App