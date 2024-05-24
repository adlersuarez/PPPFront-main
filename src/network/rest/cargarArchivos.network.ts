import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_PRACTICAS_API_APP,
    timeout: 10000,
    headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    },

})
/*
instance.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY
    config.headers.key = apiKey
    return config
})*/

instance.interceptors.request.use((config) => {
    const storage = window.localStorage as Storage;
    const token = storage.getItem('token');
    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + JSON.parse(token);
    }
    return config;
})

//Empresa
export async function ConfirmarEmpresaCarta<RespValue>(CartaId: number, EstudianteId: string, PeriodoId: number, TipoConvenioId: number, formData: FormData, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post(`/Empresa/ConfirmarEmpresaCarta/${CartaId}/${EstudianteId}/${PeriodoId}/${TipoConvenioId}`, formData, { signal: signal! }))
}

export async function RegistrarDocumento<RespValue>(TipoDoc: string, EstudianteId: string, PeriodoId: number, formData: FormData, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/DocumentoProcesado/RegistrarDocumento/${TipoDoc}/${EstudianteId}/${PeriodoId}`, formData, { signal: signal! }))
}

export async function RegistrarDocumentoDocente<RespValue>(TipoDoc: string, EstudianteId: string, PeriodoId: number, formData: FormData, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/DocumentoProcesado/RegistrarDocumentoDocente/${TipoDoc}/${EstudianteId}/${PeriodoId}`, formData, { signal: signal! }))
}

