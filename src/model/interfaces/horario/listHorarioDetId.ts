export default interface ListHorarioDetId {
    detHorarioId: number
    horarioId: number
    horarioAsigId: number
    capacidad: number
    asignatura: string
    docente: string
  
    dia: number
    horaIni: string
    horaFin: string
    color: string
    observacion: string
    estado: number
    usuarioRegistra: string
    fechaRegistra: Date
    usuarioModifica: string
    fechaModifica: Date
    
    numDocTrabajador: string
    
}