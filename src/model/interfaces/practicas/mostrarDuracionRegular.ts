export default interface MostrarDuracionEstandar {
    listaDias: ListaDias[]
    listaHorarioDia: ListaHorarioDias[]
}

export interface ListaDias {
    diaId: number
    diaNombre: string
}

export interface ListaHorarioDias {
    horaInicio: string
    horaFin: string
}