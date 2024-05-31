export interface DetalleDuracion {
    diaId: number
    horaInicio: string
    horaFin: string
}

export interface DetalleExcluido {
    fechaExcluida: string
    motivo: string
}

export default interface RegistroDuracionPractica {
    periodo: number
    fechaInicio: string
    fechaFinal: string
    cantDias: number
    cantHorasSemanales: number
    tipoDias: string
    jsonDetalleDias: DetalleDuracion[]
    jsonDiasExcluidos: DetalleExcluido[]
}