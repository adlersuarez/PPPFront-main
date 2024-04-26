import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';


const instance = axios.create({
    baseURL: import.meta.env.VITE_APLICACIONES_APP,
    timeout: 10000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
});


export async function ListarMenuArray(id: number, abortController: AbortController | null = null): Promise<Response<any[]> | RestError> {
    return await Resolve.create<any[]>(instance.get<any[]>(`/obtenerMenu/${id}`, { signal: abortController?.signal } ));
}