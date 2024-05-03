import Cargo from "./cargo/cargo";
import CartaPresentacionDatos from "./cartaPresentacion/cartaPresentacion";
import ListaCartaEmpresaDocente from "./docente/listaCarta";
import ListaSeccion from "./docente/listaSeccion";
import SeccionesDocente from "./docente/secciones";
import MostrarDocumentoUrl from "./documento/mostrarDocumento";
import EmpresaCarta from "./empresa/empresaCarta";
import Grado from "./grado/grado";
import HorarioEstudiante from "./horario/horarioEstudiante";
import PagoCarta from "./pagos/pagoCarta";
import ActividadUnidad from "./planActividades/actividades";
import UnidadTematica from "./planActividades/unidadTematica";
import DiasPracticas from "./practicas/diasPracticas";
import DuracionPracticas from "./practicas/duracionPracticas";
import ExcluidoPracticas from "./practicas/excluidoPracticas";
import Ubigeo from "./ubigeo/ubigeo";

export default interface Listas {
    resultado: Grado[] | Cargo[] | CartaPresentacionDatos[] | EmpresaCarta[] | Ubigeo[] | UnidadTematica[] | DiasPracticas[] | PagoCarta[] | ActividadUnidad[] | SeccionesDocente[] | ListaSeccion[] | ListaCartaEmpresaDocente[] | HorarioEstudiante[] | DuracionPracticas[] | ExcluidoPracticas[] | MostrarDocumentoUrl[]
}