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

/*instance.interceptors.request.use((config) => {
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

//Carrera
export async function ListarCarrerasPorFacultad<Listas>(FacultadId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Carrera/ListarCarrerasPorFacultad/${FacultadId}`, { signal: abortController?.signal }))
}
//Facultades
export async function ListarFacultades<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Facultad/ListarFacultades", { signal: abortController?.signal }))
}
//Asignatura
export async function ListarAsignaturasPeriodo<Listas>(PeriodoId: number, CarreraId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Asignatura/ListarAsignaturasPeriodo/${PeriodoId}/${CarreraId}`, { signal: abortController?.signal }))
}
//Docente
export async function ListarDocentesCarreraAsignatura<Listas>(PeriodoId: number, CarreraId: string, AsignaturaId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarDocentesCarreraAsignatura/${PeriodoId}/${CarreraId}/${AsignaturaId}`, { signal: abortController?.signal }))
}

////Facultades
export async function ListarPeriodos<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Periodo/ListarPeriodos", { signal: abortController?.signal }))
}

//Dashboard Cards
export async function ReporteDatosGenerales<DatosGenerales>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<DatosGenerales> | RestError> {
    return await Resolve.create<DatosGenerales>(instance.get<DatosGenerales>(`/Reporte/ReporteDatosGenerales/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}


//Dashboard graficos
export async function ReporteDatosTipoEmpresa<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteDatosTipoEmpresa/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}
export async function ReporteDatosRankEmpresa<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteDatosRankEmpresa/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}
export async function ReporteDatosGradoJefe<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteDatosGradoJefe/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}
export async function ReporteDatosDiasPracticas<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteDatosDiasPracticas/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}

export async function ReporteInformacionEstudiante<InformacionEstudiante>(EstudianteId: string, PeriodoId: number, signal = null): Promise<Response<InformacionEstudiante> | RestError> {
    return await Resolve.create<InformacionEstudiante>(instance.get<InformacionEstudiante>(`/Reporte/ReporteInformacionEstudiante/${EstudianteId}/${PeriodoId}`, { signal: signal! }));
}

export async function ReporteInformacionDocente<InformacionDocente>(DocenteId: string, CarreraId: string, AsignaturaId: string, SedeId: string, Seccion: string, PeriodoId: number, signal = null): Promise<Response<InformacionDocente> | RestError> {
    return await Resolve.create<InformacionDocente>(instance.get<InformacionDocente>(`/Reporte/ReporteInformacionDocente/${DocenteId}/${CarreraId}/${AsignaturaId}/${SedeId}/${Seccion}/${PeriodoId}`, { signal: signal! }));
}

export async function ReporteListarSeccion<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteListarSeccion/${CarreraId}/${AsignaturaId}/${DocenteId}/${PeriodoId}`, { signal: signal! }));
}


export async function ReporteSuneduGenerar<Listas>(CarreraId: string, AsignaturaId: string, DocenteId: string, SedeId: string, Seccion: string, PeriodoId: number, signal = null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Reporte/ReporteSunedu/${CarreraId}/${AsignaturaId}/${DocenteId}/${SedeId}/${Seccion}/${PeriodoId}`, { signal: signal! }));
}