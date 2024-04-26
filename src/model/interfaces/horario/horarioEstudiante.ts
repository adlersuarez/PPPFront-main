export default interface HorarioEstudiante {
    cod_hor: number
    hora_ini: string
    hora_fin: string
    lunes: string | null
    martes: string | null
    miercoles: string | null
    jueves: string | null
    viernes: string | null
    sabado: string | null
    domingo: string | null
}
