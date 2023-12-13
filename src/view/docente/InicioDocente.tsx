
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Response from "../../model/class/response.model.class";

import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";

import Idioma from "../../model/interfaces/idioma/idioma";
import Sede from "../../model/interfaces/sede/sede";
import Modalidad from "../../model/interfaces/modalidad/modalidad";
import Periodo from "../../model/interfaces/periodo/periodo";

import Listas from "../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarSede, ListarPeriodo, ListarHorarioPag } from "../../network/rest/idiomas.network";

import useSweerAlert from "../../component/hooks/useSweetAlert"

import HorarioPag from "../../model/interfaces/horario/horarioPag";
import ListasPag from "../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../component/Paginacion.component";
import { LoaderSvg } from "../../component/Svg.component";
import ModalHorarioAgregar from "../trabajador/horario/modal/HorarioAgregar";
import ModalHorarioEditar from "../trabajador/horario/modal/HorarioEditar";

import { formatDateTimeToFecha } from '../../helper/herramienta.helper'
import ModuloHorarioDetalle from "../trabajador/horario/HorarioDetalle";


const InicioDocente = () => {

    const navigate = useNavigate()

    const sweet = useSweerAlert();

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])

    const [idHorario, setIdHorario] = useState<number>(0)

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)

    const [idTurno, setIdTurno] = useState<number>(0)
    const [idPrograma, setIdPrograma] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const [seccion, setSeccion] = useState<string>("0")
    const [estado, setEstado] = useState<number>(0)


    const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreSede, setNombreSede] = useState<string>("")
    const [nombreModalidad, setNombreModalidad] = useState<string>("")
    const [nombrePeriodo, setNombrePeriodo] = useState<string>("")

    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)
    const refPeriodo = useRef<HTMLSelectElement>(null)

    const abortController = useRef(new AbortController());
    const abortControllerNuevo = useRef(new AbortController());
    const abortControllerEditar = useRef(new AbortController());

    const anioActual = new Date().getFullYear();

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);
    const [horarioLista, setHorarioLista] = useState<HorarioPag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [mensajeCarga, setMensajeCarga] = useState<boolean>(true)

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);

    const [moduloDetalle, setModuloDetalle] = useState(false);

    useEffect(() => {
        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()

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

    const LoadDataSede = async () => {

        setComboBoxSede([])

        const response = await ListarSede<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxSede(response.data.resultado as Sede[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDataModalidad = async () => {

        setComboBoxModalidad([])

        const response = await ListarModalidad<Listas>(abortController.current)
        if (response instanceof Response) {
            setComboBoxModalidad(response.data.resultado as Modalidad[])
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


    const NuevoHorario = () => {
        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }


        handleOpenModal()
    }

    const EditarHorario = (horarioId: number, idiomaId: number, sedeId: string, modalidadId: number, periodoId: number, turnoId: number, programaId: number, tipEstudioId: number, seccion: string, estado: number) => {
        setIdHorario(horarioId)

        setIdIdioma(idiomaId)
        setIdSede(sedeId)
        setIdModalidad(modalidadId)
        setIdPeriodo(periodoId)
        setIdTurno(turnoId)
        setIdPrograma(programaId)
        setIdTipoEstudio(tipEstudioId)

        setSeccion(seccion)
        setEstado(estado)

        handleOpenModalEditar()
    }

    // Tabla
    const loadInit = async () => {


        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }

        if (loading) return;

        setMensajeCarga(false)

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idSede, idModalidad, idPeriodo);
    }

    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }

    const onEventPaginacion = () => {

        if (idIdioma == 0) {
            refIdioma.current?.focus();
            return
        }
        if (idSede == "0") {
            refSede.current?.focus()
            return
        }
        if (idModalidad == 0) {
            refModalidad.current?.focus()
            return
        }
        if (idPeriodo == 0) {
            refPeriodo.current?.focus()
            return
        }

        if (loading) return;

        fillTable(idIdioma, idSede, idModalidad, idPeriodo);
    }

    const fillTable = async (idIdioma: number, idSede: string, idModalidad: number, idPeriodo: number) => {
        setLoading(true)

        setHorarioLista([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await ListarHorarioPag<ListasPag>(idIdioma, idSede, idModalidad, idPeriodo, posPagina, filaPagina);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setHorarioLista(response.data.resultado as HorarioPag[])
            setLoading(false);
            // console.log(response.data.resultado)
            console.log(response)
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            if (response.getStatus() == 401) {
                return;
            }

            if (response.getStatus() == 403) {
                return;
            }

            setHorarioLista([]);
            setLoading(false);
        }
    }


    const handleOpenModuloDetalle = (idiomaNombre: string, sedeNombre: string, modalidadNombre: string, idiomaId: number, horarioId: number) => {
        setModuloDetalle(true)

        setNombreIdioma(idiomaNombre)
        setNombreSede(sedeNombre)
        setNombreModalidad(modalidadNombre)
        setIdIdioma(idiomaId)
        setIdHorario(horarioId)
    }

    const handleCloseModuloDetalle = () => {
        setModuloDetalle(false)
    }


    // Modal
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    //Editar
    const handleOpenModalEditar = () => {
        setIsOpenModalEditar(true);
    };

    const handleCloseModalEditar = () => {
        setIsOpenModalEditar(false);
    };


    // tabla

    const dataTable = [
        {
            codigo: "Q004SA1",
            nombre: "Juan Bartolome Sancho",
            notaA: 15,
            notaB: 15,
            notaC: 15,
            notaD: 15,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
        {
            codigo: "Q004SA2",
            nombre: "Maria Rosa Torres",
            notaA: 15,
            notaB: 15,
            notaC: 15,
            notaD: 15,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
        {
            codigo: "Q004SA3",
            nombre: "Pedro Mendez Loayza",
            notaA: 15,
            notaB: 15,
            notaC: 15,
            notaD: 15,
            notaP1: 0,
            notaEP: 0,
            notaEF: 0,
            notaPF: 0,
        },
    ]

    const data = [
        [
            "Codigo",
            "Nombre",
            "Nota A",
            "Nota B",
            "Nota C",
            "Nota D",
            "Nota P1",
            "Nota EP",
            "Nota EF",
            "Nota PF",
        ],
        [
            "Q0004SA1",
            "Juan Bartolome Sancho",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
        ],
        [
            "Q0004SA2",
            "Maria Rosa Torres",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
            "15",
        ],
    ]

    const [editableData, setEditableData] = useState([...data]);

    const handleInputChange = (value: any, rowIndex: any, cellIndex: any) => {
        const newData = [...editableData];
        newData[rowIndex][cellIndex] = value;
        setEditableData(newData);
    };


    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        {/*/
                            moduloDetalle == true ? (
                                <ModuloHorarioDetalle
                                    idHorario={idHorario}
                                    idIdioma={idIdioma}
                                    nombreIdioma={nombreIdioma}
                                    nombreSede={nombreSede}
                                    nombreModalidad={nombreModalidad}
                                    sweet={sweet}
                                    abortControl={abortControllerNuevo.current}
                                    handleCloseModuloDetalle={handleCloseModuloDetalle} />
                            ) : (

                                <>

                                    <ModalHorarioAgregar
                                        isOpenModal={isOpenModal}
                                        idIdioma={idIdioma}
                                        idSede={idSede}
                                        idModalidad={idModalidad}
                                        idPeriodo={idPeriodo}
                                        nombreIdioma={nombreIdioma}
                                        nombreSede={nombreSede}
                                        nombreModalidad={nombreModalidad}
                                        nombrePeriodo={nombrePeriodo}
                                        sweet={sweet}
                                        abortControl={abortControllerNuevo.current}
                                        handleCloseModal={handleCloseModal} />

                                    <ModalHorarioEditar
                                        isOpenModal={isOpenModalEditar}
                                        idHorario={idHorario}
                                        idIdioma={idIdioma}
                                        idSede={idSede}
                                        idModalidad={idModalidad}
                                        idPeriodo={idPeriodo}
                                        idTurno={idTurno}
                                        idPrograma={idPrograma}
                                        idTipoEstudio={idTipoEstudio}
                                        seccion={seccion}
                                        estado={estado}

                                        nombreIdioma={nombreIdioma}
                                        nombreSede={nombreSede}
                                        nombreModalidad={nombreModalidad}
                                        nombrePeriodo={nombrePeriodo}

                                        loadinit={loadInit}

                                        sweet={sweet}
                                        abortControl={abortControllerEditar.current}
                                        handleCloseModal={handleCloseModalEditar} />

                                    {
                                        // Contenido  
                                    }

                                    <div className="p-1 bg-Solid">
                                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Horarios</h2>

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
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Sede <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refSede}
                                                        value={idSede}
                                                        onChange={(event) => {
                                                            const selectedSedeId = event.currentTarget.value;
                                                            setIdSede(selectedSedeId);

                                                            const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                                            if (selectedSede) {
                                                                setNombreSede(selectedSede.sede);
                                                            } else {
                                                                setNombreSede("");
                                                            }
                                                        }}
                                                    >
                                                        <option value="0">- Seleccione -</option>
                                                        {
                                                            comboBoxSede.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.sedeId}>
                                                                        {item.sede}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refModalidad}
                                                        value={idModalidad}
                                                        onChange={(event) => {
                                                            const selectedModalidadId = event.currentTarget.value;
                                                            setIdModalidad(parseInt(selectedModalidadId));

                                                            const selectedModalidad = comboBoxModalidad.find(item => item.modalidadId === parseInt(selectedModalidadId));

                                                            if (selectedModalidad) {
                                                                setNombreModalidad(selectedModalidad.modalidad);
                                                            } else {
                                                                setNombreModalidad("");
                                                            }
                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxModalidad.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.modalidadId}>
                                                                        {item.modalidad}
                                                                    </option>
                                                                );
                                                            })
                                                        }

                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                                        Periodo <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refPeriodo}
                                                        value={idPeriodo}
                                                        onChange={(event) => {
                                                            const selectedPeriodoId = event.currentTarget.value;
                                                            setIdPeriodo(parseInt(selectedPeriodoId));

                                                            const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                                            if (selectedPeriodo) {
                                                                setNombrePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                                            } else {
                                                                setNombrePeriodo("");
                                                            }
                                                        }}
                                                    >
                                                        <option value={0}>- Seleccione -</option>
                                                        {
                                                            comboBoxPeriodo.map((item, index) => {

                                                                if (item.anio === anioActual) {
                                                                    return (
                                                                        <option key={index} value={item.periodoId}>
                                                                            {item.anio} - {item.mes}
                                                                        </option>
                                                                    );
                                                                }

                                                                return null;
                                                            })
                                                        }
                                                    </select>
                                                </div>

                                                <div>
                                                    <label
                                                        className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                                    >
                                                        Aula <i className="bi bi-asterisk text-xs text-red-500"></i>
                                                    </label>
                                                    <select
                                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                                        ref={refSede}
                                                        value={idSede}
                                                        onChange={(event) => {
                                                            const selectedSedeId = event.currentTarget.value;
                                                            setIdSede(selectedSedeId);

                                                            const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                                            if (selectedSede) {
                                                                setNombreSede(selectedSede.sede);
                                                            } else {
                                                                setNombreSede("");
                                                            }
                                                        }}
                                                    >
                                                        <option value="0">- Seleccione -</option>
                                                        {
                                                            comboBoxSede.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.sedeId}>
                                                                        {item.sede}
                                                                    </option>
                                                                );
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
                                                    <div className="relative flex flex-wrap">
                                                        <button
                                                            className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                                            onClick={loadInit}
                                                        >
                                                            <i className="bi bi-search mr-1"></i> BUSCAR
                                                        </button>
                                                        <button
                                                            className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400"
                                                            onClick={NuevoHorario}
                                                        >
                                                            <i className="bi bi-plus-circle-fill mr-1"></i> NUEVO
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative overflow-auto rounded-md my-6">
                                                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                                    <thead className="align-bottom">
                                                        <tr>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '10%' }}>Idioma</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidas</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">F. Registro</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>Editar</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>Detalle</th>
                                                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>Eliminar</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {

                                                            loading ? (
                                                                <tr className="text-center bg-white border-b">
                                                                    <td colSpan={9} className="text-sm p-2 border-b border-solid">
                                                                        <div className="flex items-center justify-center">
                                                                            <LoaderSvg /> <span>Cargando datos...</span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ) : (
                                                                horarioLista.length == 0 ?
                                                                    (
                                                                        <tr className="text-center bg-white border-b">
                                                                            <td colSpan={9} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione Idioma, Sede, Modalidad para buscar" : "No hay datos para mostrar."}</td>
                                                                        </tr>
                                                                    )
                                                                    :
                                                                    (
                                                                        horarioLista.map((item, index) => {

                                                                            return (
                                                                                <tr key={index} className="bg-white border-b">
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.idiomaNombre}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.sede}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio} - {item.mes}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">{formatDateTimeToFecha(item.fechaRegistra)}</td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                        <button
                                                                                            title="Editar"
                                                                                            className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md px-2 py-1"
                                                                                            onClick={() => EditarHorario(item.horarioId, item.idiomaId, item.sedeId, item.modalidadId, item.periodoId, item.turnoId, item.programaId, item.tipEstudioId, item.seccion, item.estado)}
                                                                                        >
                                                                                            <i className="bi bi-pencil-fill text-sm"></i>

                                                                                        </button>

                                                                                    </td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                        <button
                                                                                            title="Detalle"
                                                                                            className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md px-2 py-1"
                                                                                            onClick={() => handleOpenModuloDetalle(item.idiomaNombre, item.sede, item.modalidad, item.idiomaId, item.horarioId)}
                                                                                        >
                                                                                            <i className="bi bi-list text-sm"></i>

                                                                                        </button>
                                                                                    </td>
                                                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                                        <button
                                                                                            title="Borrar"
                                                                                            className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md px-2 py-1"
                                                                                        // onClick={() => onEventDetalle(item.codigo)}
                                                                                        >
                                                                                            <i className="bi bi-trash3-fill text-sm"></i>

                                                                                        </button>
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

                                </>

                            )
                        /*/}
                        {
                            <table className="min-w-full divide-y divide-gray-200">
                                {/* Encabezados de la tabla */}
                                <thead className="bg-gray-50">
                                    <tr>
                                        {editableData[0].map((header, index) => (
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                {/* Cuerpo de la tabla */}
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {editableData.slice(1).map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <td
                                                    key={cellIndex}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                >
                                                    <input
                                                        type="text"
                                                        value={cell}
                                                        onChange={(e) =>
                                                            handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1 w-full"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        }

                        {
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >CODIGO</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOMBRE</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA A</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA B</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA C</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA D</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA PRACTICA (20%)</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA EXAMEN MC (40%)</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA EXAMEN FINAL (40%)</th>
                                        <th
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >NOTA FINAL</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                     {
                                        dataTable.map((item , index) => {
                                            return(
                                                <tr 
                                                key={index}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center"
                                                >
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >{item.codigo}</td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >{item.nombre}</td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaA}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaB}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaC}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaD}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        disabled
                                                        value={item.notaP1}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaEP}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaEF}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                    <td
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                                    >
                                                        <input
                                                        type="text"
                                                        value={item.notaPF}
                                                        onChange={(e) => {}
                                                            //handleInputChange(e.target.value, rowIndex, cellIndex)
                                                        }
                                                        className="border-2 border-gray-300 p-1"
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                     }
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default InicioDocente
