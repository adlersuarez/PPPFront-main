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

//Grado
export async function ListarGrado<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Grado/ListarGrado", { signal: abortController?.signal }))
}
//Cargo
export async function ListarCargo<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>("/Cargo/ListarCargo", { signal: abortController?.signal }))
}

//Carta Presentacion
export async function ObtenerDatosCartaPresentacion<Listas>(OperacionPago: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/CartaPresentacion/ObtenerDatosCartaPresentacion/${OperacionPago}`, { signal: abortController?.signal }))
}

export async function ObtenerDatosCartaPresentacionAdmin<Listas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/CartaPresentacion/ObtenerDatosCartaPresentacionAdmin/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }))
}

export async function RegistrarCartaPresentacion<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/CartaPresentacion/RegistrarCartaPresentacion`, params, { signal: abortController?.signal }))
}

//Alumno datos
export async function ConsultaInfoEstId<InfoEstudiante>(signal = null): Promise<Response<InfoEstudiante> | RestError> {
    return await Resolve.create<InfoEstudiante>(instance.get<InfoEstudiante>(`/Estudiante/ConsultaInfoEstId`, { signal: signal! }));
}

//Info Periodo
export async function ConsultaInfoPerId<InfoPeriodo>(signal = null): Promise<Response<InfoPeriodo> | RestError> {
    return await Resolve.create<InfoPeriodo>(instance.get<InfoPeriodo>(`/Periodo/ConsultaInfoPerId`, { signal: signal! }));
}

//Empresa 
export async function ListarEmpresasCartaAlumno<Listas>(PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Empresa/ListarEmpresasCartaAlumno/${PeriodoId}`, { signal: abortController?.signal }))
}
export async function ObtenerDatosEmpresaElegida<EmpresaSeleccionada>(PeriodoId: number, abortController: AbortController | null): Promise<Response<EmpresaSeleccionada> | RestError> {
    return await Resolve.create<EmpresaSeleccionada>(instance.get<EmpresaSeleccionada>(`/Empresa/ObtenerDatosEmpresaElegida/${PeriodoId}`, { signal: abortController?.signal }));
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

export async function ObtenerEstadoPracticasEstudiante<EstadoPracticas>(PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoPracticas> | RestError> {
    return await Resolve.create<EstadoPracticas>(instance.get<EstadoPracticas>(`/Practicas/ObtenerEstadoPracticasEstudiante/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerEstadoPracticasDocente<EstadoPracticasDocente>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoPracticasDocente> | RestError> {
    return await Resolve.create<EstadoPracticasDocente>(instance.get<EstadoPracticasDocente>(`/Practicas/ObtenerEstadoPracticasDocente/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerFechasDuracionPracticas<FechaPracticas>(PeriodoId: number, abortController: AbortController | null): Promise<Response<FechaPracticas> | RestError> {
    return await Resolve.create<FechaPracticas>(instance.get<FechaPracticas>(`/Practicas/ObtenerFechasDuracionPracticas/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerDiasLaboralesPracticante<Listas>(PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Practicas/ObtenerDiasLaboralesPracticante/${PeriodoId}`, { signal: abortController?.signal }))
}

//JefeInmediato
export async function RegistrarJefeInmediato<RespValue>(PeriodoId: number, params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/JefeInmediato/RegistrarJefeInmediato/${PeriodoId}`, params, { signal: abortController?.signal }))
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
export async function ConsultaPagoCartaPresentacion<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Pago/ConsultaPagoCartaPresentacion`, { signal: abortController?.signal }))
}

export async function ConsultaPagoTramite<Listas>(abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Pago/ConsultaPagoTramite`, { signal: abortController?.signal }))
}



// Docente
export async function ListarSeccionDocente<Listas>(DocenteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarSeccionDocente/${DocenteId}/${PeriodoId}`, { signal: abortController?.signal }))
}
export async function ListarSeccionDocenteAdmin<Listas>(DocenteId: string, CarreraId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarSeccionDocenteAdmin/${DocenteId}/${CarreraId}/${PeriodoId}`, { signal: abortController?.signal }))
}


export async function ListarSeccionAlumnos<Listas>(CarreraId: string, AsigId: string, DocenteId: string, SedeId: string, Seccion: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Estudiante/ListarSeccionAlumnos/${CarreraId}/${AsigId}/${DocenteId}/${SedeId}/${Seccion}/${PeriodoId}`, { signal: abortController?.signal }))
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

export async function ListarDocentesCarreraAdmin<Listas>(PeriodoId: number, CarreraId: string, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/Docente/ListarDocentesCarreraAdmin/${PeriodoId}/${CarreraId}`, { signal: abortController?.signal }))
}


//Documento
export async function MostrarDocumento<Listas>(TipoDoc: string, EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/DocumentoProcesado/MostrarDocumento/${TipoDoc}/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function MostrarDocumentosAdmin<Listas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<Listas> | RestError> {
    return await Resolve.create<Listas>(instance.get<Listas>(`/DocumentoProcesado/MostrarDocumentosAdmin/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function EstadoDocumento<EstadoValor>(TipoDoc: string, EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoValor> | RestError> {
    return await Resolve.create<EstadoValor>(instance.post<EstadoValor>(`/DocumentoProcesado/EstadoDocumento/${TipoDoc}/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function EstadoAreaTrabajo<EstadoValor>(PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoValor> | RestError> {
    return await Resolve.create<EstadoValor>(instance.post<EstadoValor>(`/Practicas/EstadoAreaTrabajo/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function EstadoDuracionPracticas<EstadoValor>(PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoValor> | RestError> {
    return await Resolve.create<EstadoValor>(instance.post<EstadoValor>(`/Practicas/EstadoDuracionPracticas/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function EstadoPlanActividades<EstadoValor>(PeriodoId: number, abortController: AbortController | null): Promise<Response<EstadoValor> | RestError> {
    return await Resolve.create<EstadoValor>(instance.post<EstadoValor>(`/PlanActividades/EstadoPlanActividades/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ValidarDocumento<RespValue>(params: object, abortController: AbortController | null = null): Promise<Response<RespValue> | RestError> {
    return await Resolve.create(instance.post<RespValue>(`/DocumentoProcesado/ValidarDocumento`, params, { signal: abortController?.signal }))
}

export async function ObtenerDatosAreaTrabajo<AreaTrabajoPracticas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<AreaTrabajoPracticas> | RestError> {
    return await Resolve.create<AreaTrabajoPracticas>(instance.get<AreaTrabajoPracticas>(`/Practicas/ObtenerDatosAreaTrabajo/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerDatosDuracion<DuracionDetallePracticas>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<DuracionDetallePracticas> | RestError> {
    return await Resolve.create<DuracionDetallePracticas>(instance.get<DuracionDetallePracticas>(`/Practicas/ObtenerDatosDuracion/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

export async function ObtenerObjetivoGeneral<ObjetivoGeneral>(EstudianteId: string, PeriodoId: number, abortController: AbortController | null): Promise<Response<ObjetivoGeneral> | RestError> {
    return await Resolve.create<ObjetivoGeneral>(instance.get<ObjetivoGeneral>(`/Practicas/ObtenerObjetivoGeneral/${EstudianteId}/${PeriodoId}`, { signal: abortController?.signal }));
}

/*
export async function ObtenerConvenioPracticas<ConvenioPracticas>(PeriodoId: number, signal = null): Promise<Response<ConvenioPracticas> | RestError> {
    return await Resolve.create<ConvenioPracticas>(instance.get<ConvenioPracticas>(`/Practicas/ObtenerConvenioPracticas/${PeriodoId}`, { signal: signal! }));
}*/


/*
export async function ObtenerCartaPresentacionEspecifica<Blob>(CartaId: number, signal = null): Promise<Response<Blob> | RestError> {
    return await Resolve.create<Blob>(instance.get<Blob>(`/CartaPresentacion/ObtenerCartaPresentacionEspecifica/${CartaId}`, { signal: signal! }))
}*/