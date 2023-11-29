export default interface ListHorarioDetId {
    detHorarioId: number;
    horarioId: number;
    asiId: string;
    aulasId: number;
    nivel: number;
    capacidad: number;
    dia: string;
    horaIni: string;
    horaFin: string;
    horaAcademica: string;
    color: string;
    observacion: string;
    docenteId: number;
    estado: number;
    usuarioRegistra: string;
    fechaRegistra: Date;
    usuarioModifica: string;
    fechaModifica: Date;
    asignatura: string;
    numDocTrabajador: string;
    docente: string;
}