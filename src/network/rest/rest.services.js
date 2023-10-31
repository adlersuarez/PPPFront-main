import axios from "axios";
//import SuccessReponse from "../model/class/response";
//import ErrorResponse from "../model/class/error";
import Resolve from "../model/class/resolve";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVICES_API_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
});

instance.interceptors.request.use((config) => {
    const storage = window.localStorage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
});

export async function validarToken() {
    return await Resolve.create(
        instance.get("/Aplicacion/validarToken")
    );
  }

export async function loginApi(params, signal = null) {
    return await Resolve.create(
        instance.post("/Login", params, {
            signal: signal,
        })
    );
}

export async function TrabajadorRest(params, signal = null){
    return await Resolve.create(
        instance.get(`/Soporte/obtenerDatosTrabajadorPorDni/${params}`, params, {
            signal: signal
        })
    )
}

export async function EstudianteRest(params, signal = null){
    return await Resolve.create(
        instance.get("/MostrarFacultad/codigo", params, {
            signal: signal
        })
    )
}

