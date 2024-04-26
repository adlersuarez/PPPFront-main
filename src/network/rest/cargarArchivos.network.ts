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

instance.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY
    config.headers.key = apiKey
    return config
})

//Empresa
export async function ConfirmarEmpresaCarta<RespValue>(CartaId: number, formData: FormData, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create<RespValue>(instance.post(`/Empresa/ConfirmarEmpresaCarta/${CartaId}`, formData, { signal: signal! }))
}

export async function RegistrarDocumento<RespValue>(TipoDoc: string, EstudianteId: string, PeriodoId: number, Referencia: string, formData: FormData, signal = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/DocumentoProcesado/RegistrarDocumento/${TipoDoc}/${EstudianteId}/${PeriodoId}/${Referencia}`, formData, { signal: signal! }))
}
