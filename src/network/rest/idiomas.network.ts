import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_CENTRO_IDIOMAS_API_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

// instance.interceptors.request.use((config) => {
//     const storage = window.localStorage as Storage;
//     const token = storage.getItem('token');
//     if (token !== null) {
//         config.headers.Authorization = 'Bearer ' + JSON.parse(token);
//     }
//     return config;
// });


// export async function ValidarTokenRest<Void>(signal = null): Promise<Response<Void> | RestError> {
//     return await Resolve.create<Void>(instance.get<Void>("/Aplicacion/validarToken", { signal: signal! }));
// }

export async function ValidarEstudianteExistente<RespValue>(codigo: string, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.get<RespValue>("/Estudiante/ValidarEstudianteExistente/" + codigo, { signal: signal! }));
}

export async function ListarPrograma<Listas>( abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Programa/ListarPrograma", { signal: abortController?.signal }));
}

export async function ListarModalidad<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Modalidad/ListarModalidad", { signal: abortController?.signal }));
}

// export async function ListarPrograma<T>(signal = null): Promise<Response<T> | RestError> {
//     return await Resolve.create<T>(instance.get<T>("/Programa/ListarPrograma", { signal: signal! }));
// }

// export async function ListarPrograma(signal = null): Promise<Response<Programa[]> | RestError> {
//     return await Resolve.create<Programa[]>(instance.get<Programa[]>("/Programa/ListarPrograma", { signal: signal! }));
// }

// export async function ListarModalidad<Listas>(signal = null): Promise<Response<Listas> | RestError> {
//     return await Resolve.create<Listas>(instance.get<Listas>("/Modalidad/ListarModalidad", { signal: signal! }));
// }

// export async function ListarModalidadDos<Listas>(signal = null): Promise<Response<Listas> | RestError> {
//     return await Resolve.create<Listas>(instance.get<Listas>("/Modalidad/ListarModalidad", { signal: signal! }));
// }