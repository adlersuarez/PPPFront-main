interface UnidadTematica {
    objetivoEspecifico: string
    fechaInicio: string
    fechaFinal: string
    actividades: string[]
}

export default interface RegistroPlanActividades {
    estudianteId: string
    usuario: string
    periodo: number
    objetivoGeneral: string
    unidadTematica1: UnidadTematica
    unidadTematica2: UnidadTematica
    unidadTematica3: UnidadTematica
    unidadTematica4: UnidadTematica
}
