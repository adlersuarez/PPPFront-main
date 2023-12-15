import Programa from "./programa/programa"
import Modalidad from "./modalidad/modalidad"
import Sede from "./sede/sede"
import Idioma from "./idioma/idioma"
import Turno from "./turno/turno"
import Periodo from "./periodo/periodo"
import TipoEstudio from "./tipo-estudio/tipoEstudio"
import Asignatura from "./asignatura/asignatura"
import DocenteInfo from "./docente/docenteInfo"
import Aula from "./aula/aula"
import Seccion from "./seccion/seccion"

import ListHorarioDetId from "./horario/listHorarioDetId"

import PagoMatriculaLista from './matricula/matriculaPago'
import PagoPensionLista from './matricula/matriculaPago'

export default interface Listas {
    resultado: Programa[] | Modalidad[] | Sede[] | Idioma[] | Turno[] | Periodo[] | TipoEstudio[] | Asignatura[] | DocenteInfo[] | Aula[] |  Seccion[] | ListHorarioDetId[] | PagoMatriculaLista[] | PagoPensionLista[]
}