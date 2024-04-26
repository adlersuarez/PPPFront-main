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
    const apiKey = import.meta.env.VITE_API_KEY
    config.headers.key = apiKey
    return config
})

//Grado
export async function ListarGrado<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Grado/ListarGrado", { signal: abortController?.signal }))
}
//Cargo
export async function ListarCargo<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Cargo/ListarCargo", { signal: abortController?.signal }))
}

//Carta Presentacion
export async function ObtenerDatosCartaPresentacion<Listas>(EstudianteId: string, OperacionPago: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/CartaPresentacion/ObtenerDatosCartaPresentacion/${EstudianteId}/${OperacionPago}`, { signal: abortController?.signal }))
}
export async function RegistrarCartaPresentacion<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/CartaPresentacion/RegistrarCartaPresentacion`, params, { signal: abortController?.signal }))
}

//Alumno datos
export async function ConsultaInfoEstId<InfoEstudiante>(EstudianteId: string, signal = null): Promise<Response<InfoEstudiante> | RestError> {
    return await Resolve.create<InfoEstudiante>(instance.get<InfoEstudiante>(`/Estudiante/ConsultaInfoEstId/${EstudianteId}`, { signal: signal! }));
}

//Info Periodo
export async function ConsultaInfoPerId<InfoPeriodo>(signal = null): Promise<Response<InfoPeriodo> | RestError> {
    return await Resolve.create<InfoPeriodo>(instance.get<InfoPeriodo>(`/Periodo/ConsultaInfoPerId`, { signal: signal! }));
}

//Empresa 
export async function ListarEmpresasCartaAlumno<Listas>(PeriodoId: number, EstudianteId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Empresa/ListarEmpresasCartaAlumno/${PeriodoId}/${EstudianteId}`, { signal: abortController?.signal }))
}
export async function ObtenerDatosEmpresaElegida<EmpresaSeleccionada>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<EmpresaSeleccionada> | RestError> {
    return await Resolve.create<EmpresaSeleccionada>(instance.get<EmpresaSeleccionada>(`/Empresa/ObtenerDatosEmpresaElegida/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerDatosEmpresaElegidaDocente<EmpresaElegidaRespuesta>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<EmpresaElegidaRespuesta> | RestError> {
    return await Resolve.create<EmpresaElegidaRespuesta>(instance.get<EmpresaElegidaRespuesta>(`/Empresa/ObtenerDatosEmpresaElegidaDocente/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

//Ubigeo ListarUbigeo
export async function ListarUbigeo<Listas>(TextFiltro: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Ubigeo/ListarUbigeo/${TextFiltro}`, { signal: abortController?.signal }))
}


//PRACTICAS
export async function InsertarDuracionPracticas<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/Practicas/InsertarDuracionPracticas`, params, { signal: abortController?.signal }))
}

export async function ObtenerEstadoPracticasEstudiante<EstadoPracticas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoPracticas> | RestError> {
    return await Resolve.create<EstadoPracticas>(instance.get<EstadoPracticas>(`/Practicas/ObtenerEstadoPracticasEstudiante/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerFechasDuracionPracticas<FechaPracticas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<FechaPracticas> | RestError> {
    return await Resolve.create<FechaPracticas>(instance.get<FechaPracticas>(`/Practicas/ObtenerFechasDuracionPracticas/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerDiasLaboralesPracticante<Listas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Practicas/ObtenerDiasLaboralesPracticante/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }))
}

//JefeInmediato
export async function RegistrarJefeInmediato<RespValue>(PeriodoId: number, EstudianteId: String, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/JefeInmediato/RegistrarJefeInmediato/${PeriodoId}/${EstudianteId}`, params, { signal: abortController?.signal }))
}


//Plan actividades
export async function InsertarPlanActividades<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/PlanActividades/InsertarPlanActividades`, params, { signal: abortController?.signal }))
}

//ObtenerDatosUnidadTematicaEspecifica
export async function ObtenerDatosUnidadTematicaEspecifica<UnidadTematica>(UnidadId: number, abortController: AbortController | null): Promise<Response<UnidadTematica> | RestError> {
    return await Resolve.create<UnidadTematica>(instance.get<UnidadTematica>(`/UnidadTematica/ObtenerDatosUnidadTematicaEspecifica/${UnidadId}`, { signal: abortController?.signal }));
}

export async function ListarDatosUnidadTematica<Listas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/PlanActividades/ListarDatosUnidadTematica/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }))
}

export async function ObtenerActividadesUnidadTematicaEspecifica<Listas>(UnidadTematicaId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/UnidadTematica/ObtenerActividadesUnidadTematicaEspecifica/${UnidadTematicaId}`, { signal: abortController?.signal }))
}

//Pago
export async function ConsultaPagoCartaPresentacion<Listas>(EstudianteId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Pago/ConsultaPagoCartaPresentacion/${EstudianteId}`, { signal: abortController?.signal }))
}


// Docente
export async function ListarSeccionDocente<Listas>(DocenteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarSeccionDocente/${DocenteId}/${PeriodoId}`, { signal: abortController?.signal }))
}

export async function ListarSeccionAlumnos<Listas>(CarreraId: string, AsigId: string, DocenteId: string, SedeId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Estudiante/ListarSeccionAlumnos/${CarreraId}/${AsigId}/${DocenteId}/${SedeId}/${PeriodoId}`, { signal: abortController?.signal }))
}
export async function ObtenerDatosCartaAlumnoEspecifico<Listas>(EstudianteId: string, DocenteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/CartaPresentacion/ObtenerDatosCartaAlumnoEspecifico/${EstudianteId}/${DocenteId}/${PeriodoId}`, { signal: abortController?.signal }))
}
export async function ListarDetalleDuracion<Listas>(DuracionId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Practicas/ListarDetalleDuracion/${DuracionId}`, { signal: abortController?.signal }))
}
export async function ListarDetalleExcluido<Listas>(DuracionId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Practicas/ListarDetalleExcluido/${DuracionId}`, { signal: abortController?.signal }))
}

//Documento
export async function MostrarDocumento<MostrarDocumentoUrl>(TipoDoc:string, EstudianteId: string,PeriodoId: number, abortController: AbortController | null): Promise<Response<MostrarDocumentoUrl> | RestError> {
    return await Resolve.create<MostrarDocumentoUrl>(instance.get<MostrarDocumentoUrl>(`/DocumentoProcesado/MostrarDocumento/${TipoDoc}/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}
