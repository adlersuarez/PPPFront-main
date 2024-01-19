
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Idioma from "../../../model/interfaces/idioma/idioma";
import Sede from "../../../model/interfaces/sede/sede";
import Modalidad from "../../../model/interfaces/modalidad/modalidad";
import Periodo from "../../../model/interfaces/periodo/periodo";
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarSede, ListarPeriodo, ListarHorarioPag, ListarTipoEstudio, ListarCalendarioFiltrosPag } from "../../../network/rest/idiomas.network";

import useSweerAlert from "../../../component/hooks/useSweetAlert"

import HorarioPag from "../../../model/interfaces/horario/horarioPag";
import ListasPag from "../../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../../component/Paginacion.component";
import { LoaderSvg } from "../../../component/Svg.component";

import { convertirFormatoFechaSql, convertirFormatoHoraSql, convertirNumeroAMes } from '../../../helper/herramienta.helper'
import CalendarioPag from "@/model/interfaces/calendario/calendarioPag";
import InsertarCalendario from "./modal/InsertarCalendario";



const CalendarioIdiomas = () => {

    const listaReporte = ['75247846', '41262007']
    const usuarioActual = JSON.parse(window.localStorage.getItem("codigo") || "");
    const usuarioPermitido = listaReporte.includes(usuarioActual);

    const navigate = useNavigate()

    const sweet = useSweerAlert();

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])
    // const [comboBoxAula, setComboBoxAula] = useState<Aula[]>([])

    const [idHorario, setIdHorario] = useState<number>(0)

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)
    const [valuePeriodo, SetValuePeriodo] = useState<string>("-")

    const [idAula, setIdAula] = useState<number>(0)
    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [seccion, setSeccion] = useState<string>("")

    const [estado, setEstado] = useState<number>(0)


    const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreSede, setNombreSede] = useState<string>("")
    const [nombreModalidad, setNombreModalidad] = useState<string>("")
    const [nombrePeriodo, setNombrePeriodo] = useState<string>("")
    const [nombreTipoEstudio, setNombreTipoEstudio] = useState("")


    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)
    const refTipoEstudio = useRef<HTMLSelectElement>(null)


    const abortController = useRef(new AbortController());
    const abortControllerNuevo = useRef(new AbortController());
    const abortControllerEditar = useRef(new AbortController());

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);

    const [calendarioLista, setCalendarioLista] = useState<CalendarioPag[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [mensajeCarga, setMensajeCarga] = useState<boolean>(true)

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);
    const [isOpenCalendario, setIsOpenCalendario] = useState(false);

    const [moduloDetalle, setModuloDetalle] = useState(false);

    const [itemHorario, setItemHorario] = useState<HorarioPag>()

    useEffect(() => {
        LoadDataIdioma()
        LoadDataPeriodo()
        LoadDataTipoEstudio()
        setMensajeCarga(true)
    }, [])

    const LoadDataIdioma = async () => {

        setComboBoxIdioma([])

        const response = await ListarIdioma<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxIdioma(response.data.resultado as Idioma[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataPeriodo = async () => {

        setComboBoxPeriodo([])

        const response = await ListarPeriodo<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxPeriodo(response.data.resultado as Periodo[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataTipoEstudio = async () => {

        setComboBoxTipoEstudio([])

        const response = await ListarTipoEstudio<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxTipoEstudio(response.data.resultado as TipoEstudio[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const NuevoHorario = () => {
        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }
        if (idTipoEstudio == 0) {
            refTipoEstudio.current?.focus()
            return
        }
        handleOpenModal()
    }

    const EditarHorario = (horarioId: number, idiomaId: number, sedeId: string, modalidadId: number, periodoId: number, turnoId: number, programaId: number, tipEstudioId: number, estado: number, idAula: number, seccion: string) => {
        setIdHorario(horarioId)

        setIdIdioma(idiomaId)
        setIdSede(sedeId)
        setIdModalidad(modalidadId)
        setIdPeriodo(periodoId)
        setIdTurno(turnoId)
        setIdPrograma(programaId)
        setIdTipoEstudio(tipEstudioId)
        setEstado(estado)
        setSeccion(seccion)

        setIdAula(idAula)
        handleOpenModalEditar()
    }


    // Tabla
    const loadInit = async () => {

        if (loading) return;

        setMensajeCarga(false)

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idPeriodo, idTipoEstudio);
    }

    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    const onEventPaginacion = () => {

        if (loading) return;

        fillTable(idIdioma, idPeriodo, idTipoEstudio);
    }


    const fillTable = async (idIdioma: number, idPeriodo: number, idTipoEstudio: number) => {
        setLoading(true)

        setCalendarioLista([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await ListarCalendarioFiltrosPag<ListasPag>(idIdioma, idPeriodo, idTipoEstudio, posPagina, filaPagina);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setCalendarioLista(response.data.resultado as CalendarioPag[])
            setLoading(false);
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            if (response.getStatus() == 401) {
                return;
            }

            if (response.getStatus() == 403) {
                return;
            }

            setCalendarioLista([]);
            setLoading(false);
        }
    }


    const handleOpenModuloDetalle = (idiomaNombre: string, sedeNombre: string, modalidadNombre: string, idiomaId: number, horarioId: number, item: HorarioPag) => {
        setModuloDetalle(true)

        setNombreIdioma(idiomaNombre)
        setNombreSede(sedeNombre)
        setNombreModalidad(modalidadNombre)
        setIdIdioma(idiomaId)
        setIdHorario(horarioId)
        setIdTipoEstudio(item.tipEstudioId)

        setItemHorario(item)
    }

    const handleCloseModuloDetalle = () => {
        setModuloDetalle(false)
    }


    // Nuevo
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    // Editar
    const handleOpenModalEditar = () => {
        setIsOpenModalEditar(true);
    };

    const handleCloseModalEditar = () => {
        setIsOpenModalEditar(false);
    };

    //Calendario
    const handleOpenModalCalendario = () => {
        setIsOpenCalendario(true);
    };

    const handleCloseModalCalendario = () => {
        setIsOpenCalendario(false);
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        <InsertarCalendario
                            show={isOpenModal}
                            hide={handleCloseModal}
                        />
                        {
                            usuarioPermitido ? (
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">
                                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                        <div className="m-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                                <div className="text-sm">
                                                    <p>No tiene permisos para este modulo</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (

                                <div className="p-1 bg-Solid">
                                    <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro Calendario</h2>

                                    <div className="w-full">

                                        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
                                            <div>
                                                <label
                                                    className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                >
                                                    Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                </label>
                                                <select
                                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                    ref={refIdioma}
                                                    value={idIdioma}
                                                    onChange={(event) => {
                                                        const selectedIdiomaId = event.currentTarget.value;
                                                        setIdIdioma(parseInt(selectedIdiomaId));

                                                        const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                                        if (selectedIdioma) {
                                                            setNombreIdioma(selectedIdioma.idiomaNombre);
                                                        } else {
                                                            setNombreIdioma("");
                                                        }
                                                    }}
                                                >
                                                    <option value={0}>- Seleccione -</option>
                                                    {
                                                        comboBoxIdioma.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.idiomaId}>
                                                                    {item.idiomaNombre}
                                                                </option>
                                                            );
                                                        })
                                                    }

                                                </select>
                                            </div>

                                            <div>
                                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                    Periodo
                                                </label>
                                                <select
                                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                    //ref={refPeriodo}
                                                    value={idPeriodo}
                                                    onChange={(event) => {
                                                        const selectedPeriodoId = event.currentTarget.value;
                                                        setIdPeriodo(parseInt(selectedPeriodoId));

                                                        const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                                        if (selectedPeriodo) {
                                                            SetValuePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                                        } else {
                                                            SetValuePeriodo("-");
                                                        }
                                                    }}
                                                >
                                                    <option value={0}>- Seleccione -</option>
                                                    {
                                                        comboBoxPeriodo.map((item, index) => {


                                                            return (
                                                                <option key={index} value={item.periodoId}>
                                                                    {item.anio} - {item.mes}
                                                                </option>
                                                            );

                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                    Tipo Estudio <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                </label>
                                                <select
                                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                    ref={refTipoEstudio}
                                                    value={idTipoEstudio}
                                                    onChange={(event) => {
                                                        const selectedTipoEstudioId = event.currentTarget.value;
                                                        setIdTipoEstudio(parseInt(selectedTipoEstudioId));

                                                        const selectedTipoEstudio = comboBoxTipoEstudio.find(item => item.tipEstudioId.toString() === selectedTipoEstudioId);

                                                        if (selectedTipoEstudio) {
                                                            setNombreTipoEstudio(`${selectedTipoEstudio.tipoEstudio}`);
                                                        } else {
                                                            setNombreTipoEstudio("");
                                                        }
                                                    }}
                                                >
                                                    <option value={0}>- Seleccione -</option>
                                                    {
                                                        comboBoxTipoEstudio.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.tipEstudioId}>
                                                                    {item.tipoEstudio}
                                                                </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>

                                            <div>
                                                <label
                                                    className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                >
                                                    Opciones
                                                </label>
                                                <div className="flex gap-2">
                                                    <button
                                                        className="flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400 gap-2"
                                                        onClick={loadInit}
                                                    >
                                                        <i className="bi bi-search" /> BUSCAR
                                                    </button>
                                                    <button
                                                        className="flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400 gap-2"
                                                        onClick={NuevoHorario}
                                                    >
                                                        <i className="bi bi-plus-circle-fill" /> NUEVO
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative overflow-auto rounded-md my-6">
                                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                                <thead className="align-bottom">
                                                    <tr>
                                                        <th rowSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                        <th rowSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Año</th>
                                                        <th rowSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">T. Estudio</th>
                                                        <th colSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Proceso</th>
                                                        <th colSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Matrícula</th>
                                                        <th colSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Clases</th>
                                                        <th colSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Notas</th>

                                                        <th rowSpan={2} className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Opciones</th>
                                                    </tr>
                                                    <tr>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Inicio</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fin</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Inicio</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fin</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Inicio</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fin</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Inicio</th>
                                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fin</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        loading ? (
                                                            <tr className="text-center bg-white border-b">
                                                                <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                                                    <div className="flex items-center justify-center">
                                                                        <LoaderSvg /> <span>Cargando datos...</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            calendarioLista.length == 0 ?
                                                                (
                                                                    <tr className="text-center bg-white border-b">
                                                                        <td colSpan={13} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td>
                                                                    </tr>
                                                                )
                                                                :
                                                                (
                                                                    calendarioLista.map((item, index) => {

                                                                        return (
                                                                            <tr key={index} className="bg-white border-b">
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio + ' - ' + convertirNumeroAMes(item.mes)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tipoEstudio}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_cal_ini)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_cal_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_mat_ini)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_mat_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_clases_ini)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_clases_fin)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{convertirFormatoFechaSql(item.f_nota_ini)}</td>
                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">-{/*convertirFormatoFechaSql(item.f_nota_ini)*/}</td>

                                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                    <button
                                                                                        title="Editar"
                                                                                        className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                                    //onClick={() => EditarHorario(item.horarioId, item.idiomaId, item.sedeId, item.modalidadId, item.periodoId, item.turnoId, item.programaId, item.tipEstudioId, item.estado, item.aulasId, item.seccion)}
                                                                                    >
                                                                                        <i className="bi bi-pencil-fill text-sm"></i>

                                                                                    </button>
                                                                                    {" "}
                                                                                    <button
                                                                                        title="Detalle"
                                                                                        className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                    //onClick={() => handleOpenModuloDetalle(item.idiomaNombre, item.sede, item.modalidad, item.idiomaId, item.horarioId, item)}
                                                                                    >
                                                                                        <i className="bi bi-calendar4-week text-sm"></i>

                                                                                    </button>
                                                                                    {" "}
                                                                                    {/* <button
                                                                                            title="Borrar"
                                                                                            className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md px-2 py-1"
                                                                
                                                                                        >
                                                                                            <i className="bi bi-trash3-fill text-sm"></i>
                                                                                        </button> */}

                                                                                </td>


                                                                            </tr>
                                                                        );
                                                                    })
                                                                )
                                                        )

                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                                            <div>

                                                <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span>

                                            </div>
                                            <nav className="bg-white rounded-md">
                                                <ul className="flex">

                                                    <Paginacion
                                                        loading={loading}
                                                        restart={restart.current}
                                                        paginacion={paginacion.current}
                                                        totalPaginacion={totalPaginacion.current}
                                                        fillTable={paginacionTable}
                                                    />

                                                </ul>
                                            </nav>
                                        </div>

                                    </div>

                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default CalendarioIdiomas
