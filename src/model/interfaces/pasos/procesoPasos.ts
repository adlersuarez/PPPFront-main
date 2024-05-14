import Caracteristicas from "./caracteristicas"
import Importante from "./importante"
import Procedimiento from "./procedimiento"
import Requisitos from "./requisitos"

export default interface ProcesoPasos {
    id: number
    titulo: string
    requisitos?: Requisitos[]
    importante?: Importante[]
    procedimiento?: Procedimiento[]
    caracteristicas?: Caracteristicas[]
}