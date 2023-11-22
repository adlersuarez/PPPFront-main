import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import store from './store/configureStore.store';
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import './network/rest/services.network';
import './network/rest/notificacion.network';
import './network/rest/ingreso.network';
import './assets/css/sweetalert.css'

import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
    <Provider store={store}>
      {/* <BrowserRouter>
      </BrowserRouter> */}
        <App />
    </Provider>
  //</React.StrictMode>,
)
