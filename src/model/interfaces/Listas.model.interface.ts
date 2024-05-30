import Cargo from "./cargo/cargo";
import Asignatura from "./reportes/asignatura";
import Carrera from "./reportes/carrera";
import Docente from "./reportes/docente";
import Facultad from "./reportes/facultad";
import Periodos from "./reportes/periodos";
import CartaPresentacionDatos from "./cartaPresentacion/cartaPresentacion";
import ListaCartaEmpresaDocente from "./docente/listaCarta";
import ListaDocente from "./docente/listaDocente";
import ListaSeccion from "./docente/listaSeccion";
import SeccionesDocente from "./docente/secciones";
import MostrarDocumentoUrl from "./documento/mostrarDocumento";
import DocumentoAdmin from "./documento/mostrarDocumentoAdmin";
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
import TipoDia from "./reportes/tipoDia";
import tipoEmpresa from "./reportes/tipoEmpresa";
import TipoGradoJefe from "./reportes/tipoGradoJefe";
import RankEmpresa from "./reportes/rankEmpresa";
import SeccionDetalle from "./reportes/seccionDetalle";
import ReporteSunedu from "./reportes/reporteSunedu";
import ConvenioPracticas from "./convenio/convenioPracticas";

export default interface Listas {
    resultado: Grado[] | Cargo[] | CartaPresentacionDatos[] | EmpresaCarta[] | Ubigeo[] | UnidadTematica[] | DiasPracticas[] | PagoCarta[] | ActividadUnidad[] | SeccionesDocente[] | ListaSeccion[] | ListaCartaEmpresaDocente[] | HorarioEstudiante[] | DuracionPracticas[] | ExcluidoPracticas[] | MostrarDocumentoUrl[] | ListaDocente[] | DocumentoAdmin[] | Facultad[] | Carrera[] | Asignatura[] | Docente[] | Periodos[] | TipoDia[] | tipoEmpresa[] | TipoGradoJefe[] | RankEmpresa[] | SeccionDetalle[] | ReporteSunedu[] | ConvenioPracticas[]
}