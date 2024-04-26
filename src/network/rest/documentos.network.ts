import axios from 'axios';
import Response from '../../model/class/response.model.class';
import Resolve from '../../model/class/resolve.model.class';
import RestError from '../../model/class/resterror.model.class';

const instance = axios.create({
    baseURL: import.meta.env.VITE_PRACTICAS_API_APP,
    timeout: 10000,
    headers: {
        'Accept': 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
})

instance.interceptors.request.use((config) => {
    const apiKey = import.meta.env.VITE_API_KEY
    config.headers.key = apiKey
    return config
})

//Convertir Docx-Pdf
export async function ConvertirWordToPdf<Blob>(formData: FormData, signal = null): Promise<Response<Blob> | RestError> {
    return await Resolve.create<Blob>(instance.post<Blob>(`/Convertir/ConvertirWordToPdfFree`, formData, { signal: signal! }))
}

