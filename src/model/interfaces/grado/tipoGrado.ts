import Grado from "./grado";

interface GradoDatos extends Omit<Grado, 'tipoGradoId' | 'tipoGrado'> { }

export interface TipoGrado {
    tipoGradoId: number
    tipoGrado: string
    grados: GradoDatos[]
}