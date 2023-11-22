import Programa from "./programa/programa"
import Modalidad from "./modalidad/modalidad"
import Sede from "./sede/sede"
import Idioma from "./idioma/idioma"
import Turno from "./turno/turno"
import Periodo from "./periodo/periodo"
import TipoEstudio from "./tipo-estudio/TipoEstudio"

export default interface Listas {
    resultado: Programa[] | Modalidad[] | Sede[] | Idioma[] | Turno[] | Periodo[] | TipoEstudio[] | Asignatura[] 
}