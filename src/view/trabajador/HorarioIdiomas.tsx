
import { useEffect, useRef, useState } from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";

import Response from "../../model/class/response.model.class";
import RestError from "../../model/class/resterror.model.class";
import { Types } from "../../model/enum/types.model.enum";

import Idioma from "../../model/interfaces/idioma/idioma";
import Sede from "../../model/interfaces/sede/sede";
import Modalidad from "../../model/interfaces/modalidad/modalidad";

import Listas from "../../model/interfaces/Listas.model.interface";
import { ListarIdioma, ListarModalidad, ListarSede, ListarHorarioPag } from "../../network/rest/idiomas.network";

import useSweerAlert from "../../component/hooks/useSweetAlert"

import HorarioPag from "../../model/interfaces/horario/horarioPag";
import ListasPag from "../../model/interfaces/ListasPag.model.interface";
import Paginacion from "../../component/Paginacion.component";
import { LoaderSvg } from "../../component/Svg.component";
import HorarioProceso from "./HorarioProceso";


const HorarioIdiomas = (props: RouteComponentProps<{}>) => {

    const sweet = useSweerAlert();

    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)

    const [nombreIdioma, setNombreIdioma] = useState<string>("")
    const [nombreSede, setNombreSede] = useState<string>("")
    const [nombreModalidad, setNombreModalidad] = useState<string>("")

    const refIdioma = useRef<HTMLSelectElement>(null)
    const refSede = useRef<HTMLSelectElement>(null)
    const refModalidad = useRef<HTMLSelectElement>(null)

    const abortController = useRef(new AbortController());
    const abortControllerNuevo = useRef(new AbortController());

    // Tabla
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);
    const [horarioLista, setHorarioLista] = useState<HorarioPag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    //Modal
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        DataIdioma()
        DataSede()
        DataModalidad()
    }, [])

    const DataIdioma = async () => {

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

    const DataSede = async () => {

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

    const DataModalidad = async () => {

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

        handleOpenModal()
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

        if (loading) return;

        paginacion.current = 1;
        restart.current = true;
        fillTable(idIdioma, idSede, idModalidad);
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

        if (loading) return;

        fillTable(idIdioma, idSede, idModalidad);
    }

    const fillTable = async (idIdioma: number, idSede: string, idModalidad: number) => {
        setLoading(true)

        setHorarioLista([]);

        const posPagina: number = ((paginacion.current - 1) * filasPorPagina.current)
        const filaPagina: number = filasPorPagina.current

        const response = await ListarHorarioPag<ListasPag>(idIdioma, idSede, idModalidad, posPagina, filaPagina);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setHorarioLista(response.data.resultado as HorarioPag[])
            setLoading(false);
            console.log(response.data.resultado)
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

    // Modal
    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };


    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <HorarioProceso
                            isOpenModal={isOpenModal}
                            idIdioma={idIdioma}
                            idSede={idSede}
                            idModalidad={idModalidad}
                            nombreIdioma={nombreIdioma}
                            nombreSede={nombreSede}
                            nombreModalidad={nombreModalidad}
                            sweet={sweet}
                            // loadInit={loadInit}
                            abortControl={abortControllerNuevo.current}
                            handleCloseModal={handleCloseModal} />

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => props.history.goBack()} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registro de Horarios</h2>

                            <div className="w-full">

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
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
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Idioma</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidas</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Editar</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Detalle</th>
                                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Eliminar</th>
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
                                                    horarioLista.length == 0 ?
                                                        (
                                                            <tr className="text-center bg-white border-b">
                                                                <td colSpan={8} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
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
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">Aula</td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                            <button
                                                                                title="Editar"
                                                                                className="focus:outline-none text-white bg-yellow-300 hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-300 rounded-md text-sm px-4 py-2"
                                                                            // onClick={() => onEventDetalle(item.codigo)}
                                                                            >
                                                                                <i className="bi bi-pencil-fill text-sm"></i>

                                                                            </button>

                                                                        </td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                            <button
                                                                                title="Borrar"
                                                                                className="focus:outline-none text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                                            // onClick={() => onEventDetalle(item.codigo)}
                                                                            >
                                                                                <i className="bi bi-list text-sm"></i>

                                                                            </button>
                                                                        </td>
                                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                                            <button
                                                                                title="Borrar"
                                                                                className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 rounded-md text-sm px-4 py-2"
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

                    </div>
                </div>
            </div>

        </>
    )
}

export default HorarioIdiomas
