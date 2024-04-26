export default interface MostrarDuracionFlexible {
    diaId: number
    diaNombre: string
    detalleDia: HorarioDia[]
}

interface HorarioDia {
    detalleDiaId: number
    horaInicio: string
    horaFin: string
}