import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_PRACTICAS_API_APP,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
})

//Grado
export async function BuscarCoincidenciasReglamento<Listas>(params: object, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.post<Listas>("/Reglamento/BuscarCoincidenciasReglamento", params, { signal: abortController?.signal }))
}