import Cargo from "./cargo"

interface CargoDatos extends Omit<Cargo, 'tipoCargoId' | 'tipoCargo'> { }

export interface TipoCargo {
    tipoCargoId: number
    tipoCargo: string
    cargos: CargoDatos[]
  }