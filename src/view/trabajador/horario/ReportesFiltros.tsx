import { useEffect, useRef, useState } from "react";
import { ListarIdioma, ListarModalidad, ListarPeriodo, ListarSede, ListarTipoEstudio, ReporteHorarioAsignatura, ReporteMatricula } from '../../../network/rest/idiomas.network';
import Listas from '../../../model/interfaces/Listas.model.interface';
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";
import Response from "../../../model/class/response.model.class";
import ReportesInfo from '../../../model/interfaces/trabajador/reportesInfo'
import { Bandera } from '../../../component/Iconos';
import Idioma from "@/model/interfaces/idioma/idioma";
import Sede from "@/model/interfaces/sede/sede";
import Modalidad from "@/model/interfaces/modalidad/modalidad";
import Periodo from "@/model/interfaces/periodo/periodo";
import TipoEstudio from "@/model/interfaces/tipo-estudio/tipoEstudio";



const Reporte = () => {
    const [comboBoxIdioma, setComboBoxIdioma] = useState<Idioma[]>([])
    const [comboBoxSede, setComboBoxSede] = useState<Sede[]>([]);
    const [comboBoxModalidad, setComboBoxModalidad] = useState<Modalidad[]>([]);
    const [comboBoxPeriodo, setComboBoxPeriodo] = useState<Periodo[]>([])
    const [comboBoxTipoEstudio, setComboBoxTipoEstudio] = useState<TipoEstudio[]>([])

    const [idIdioma, setIdIdioma] = useState<number>(0)
    const [idSede, setIdSede] = useState<string>("0")
    const [idModalidad, setIdModalidad] = useState<number>(0)
    const [idPeriodo, setIdPeriodo] = useState<number>(0)
    const [idTipoEstudio, setIdTipoEstudio] = useState<number>(0)

    const [reporteDisponibles, setReporteDisponible] = useState<any[]>([]);

    const abortController = useRef(new AbortController());


    useEffect(() => {

        LoadDataIdioma()
        LoadDataSede()
        LoadDataModalidad()
        LoadDataPeriodo()
        LoadDataTipoEstudio()
    }, [])


    const LoadRepHorarioAsignatura = async () => {

        setReporteDisponible([])

        const response = await ReporteHorarioAsignatura<Listas>(idIdioma, idSede, idModalidad, idPeriodo, idTipoEstudio, abortController.current);
        if (response instanceof Response) {
            // console.log(response.data);
            setReporteDisponible(response.data.resultado);
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage());
        }
    }

    //carga de datos
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


    return (
        <>

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Reporte de Matriculados con filtros</h2>

                <div className="w-full">

                    <div className="flex flex-col shadow-md border-solid border-2 border-gray-300 ">
                        <div className="bg-teal-500 h-1 flex flex-col justify-center items-center"></div>

                        <div className="w-full  p-4">
                            <div className="bg-teal-400 rounded-md p-4 flex items-center">
                                <div className="bg-teal-500 rounded-full p-3 mr-4">
                                    <Bandera className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold mb-2 text-white">Información</h2>
                                    <h3 className="text-gray-200">Te mostramos el consolidado de matriculados</h3>
                                    <h3 className="text-gray-200">El reporte pertence al perido académico 2024-1 y es la que fue eligida hasta la fecha 28/12/2023.</h3>

                                </div>
                            </div>
                        </div>


                    </div>


                    <div className="p-6">
                        <h2 className="text-xl mb-5">Reporte de matriculados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-4">
                            <div>
                                <label
                                    className="font-mont block mb-1 text-sm font-medium text-gray-900 "
                                >
                                    Idioma
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    //ref={refIdioma}
                                    value={idIdioma}
                                    onChange={(event) => {
                                        const selectedIdiomaId = event.currentTarget.value;
                                        setIdIdioma(parseInt(selectedIdiomaId));

                                        /*const selectedIdioma = comboBoxIdioma.find(item => item.idiomaId.toString() === selectedIdiomaId);

                                        if (selectedIdioma) {
                                            setNombreIdioma(selectedIdioma.idiomaNombre);
                                        } else {
                                            setNombreIdioma("");
                                        }*/
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
                                    Sede
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    //ref={refSede}
                                    value={idSede}
                                    onChange={(event) => {
                                        const selectedSedeId = event.currentTarget.value;
                                        setIdSede(selectedSedeId);

                                        /*const selectedSede = comboBoxSede.find(item => item.sedeId.toString() === selectedSedeId);

                                        if (selectedSede) {
                                            setNombreSede(selectedSede.sede);
                                        } else {
                                            setNombreSede("");
                                        }*/
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
                                    Modalidad
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    //ref={refModalidad}
                                    value={idModalidad}
                                    onChange={(event) => {
                                        const selectedModalidadId = event.currentTarget.value;
                                        setIdModalidad(parseInt(selectedModalidadId));

                                        /*const selectedModalidad = comboBoxModalidad.find(item => item.modalidadId === parseInt(selectedModalidadId));

                                        if (selectedModalidad) {
                                            setNombreModalidad(selectedModalidad.modalidad);
                                        } else {
                                            setNombreModalidad("");
                                        }*/
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
                                    Periodo
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    //ref={refPeriodo}
                                    value={idPeriodo}
                                    onChange={(event) => {
                                        const selectedPeriodoId = event.currentTarget.value;
                                        setIdPeriodo(parseInt(selectedPeriodoId));

                                        /*const selectedPeriodo = comboBoxPeriodo.find(item => item.periodoId.toString() === selectedPeriodoId);

                                        if (selectedPeriodo) {
                                            setNombrePeriodo(`${selectedPeriodo.anio} - ${selectedPeriodo.mes}`);
                                        } else {
                                            setNombrePeriodo("");
                                        }*/
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
                                    Tipo Estudio
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    //ref={refTipoEstudio}
                                    value={idTipoEstudio}
                                    onChange={(event) => {
                                        const selectedTipoEstudioId = event.currentTarget.value;
                                        setIdTipoEstudio(parseInt(selectedTipoEstudioId));

                                        /*const selectedTipoEstudio = comboBoxTipoEstudio.find(item => item.tipEstudioId.toString() === selectedTipoEstudioId);

                                        if (selectedTipoEstudio) {
                                            setNombreTipoEstudio(`${selectedTipoEstudio.tipoEstudio}`);
                                        } else {
                                            setNombreTipoEstudio("");
                                        }*/
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
                                <div className="relative flex flex-wrap">
                                    <button
                                        className="ml-1 flex items-center rounded border-md p-2 text-xs border-gray-500 bg-gray-500 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                        onClick={LoadRepHorarioAsignatura}
                                    >
                                        <i className="bi bi-search mr-1"></i> BUSCAR
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* Tabla de Datos */}
                        {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-center rtl:text-right">
                                <thead className="text-xs text-white uppercase h-16 bg-teal-500 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">#</th>
                                        <th scope="col" className="px-6 py-3">Código</th>
                                        <th scope="col" className="px-6 py-3">Nombres</th>
                                        <th scope="col" className="px-6 py-3">Facultad</th>
                                        <th scope="col" className="px-6 py-3">Carrera</th>
                  
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportesDisponibles.map((ciclo, index) => (
                                        <tr key={index} className="border-">
                    
                                            <td className="px-6 py-4">{index + 1}</td>
                                            <td className="px-6 py-4">{ciclo.codigo}</td>
                                            <td className="px-6 py-4">{ciclo.estPaterno + ' ' + ciclo.estMaterno + ' ' + ciclo.estNombres}</td>
                                            <td className="px-6 py-4">{ciclo.facultad}</td>
                                            <td className="px-6 py-4">{ciclo.carrera}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> */}

                        <div className="relative overflow-auto rounded-md my-6">
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                                <thead className="align-bottom">
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs" style={{ width: '5%' }}>#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Modalidad</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">T. Estudio</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Aula</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Seccion</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Turno</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Asignatura</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Cantidad</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Capacidad</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Dias</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Inicio</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">H. Fin</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {

                                        // loading ? (
                                        //     <tr className="text-center bg-white border-b">
                                        //         <td colSpan={7} className="text-sm p-2 border-b border-solid">
                                        //             <div className="flex items-center justify-center">
                                        //                 <LoaderSvg /> <span>Cargando datos...</span>
                                        //             </div>
                                        //         </td>
                                        //     </tr>
                                        // ) : (
                                            reporteDisponibles.length == 0 ?
                                                (
                                                    <tr className="text-center bg-white border-b">
                                                        {/* <td colSpan={7} className="text-sm p-2  border-b border-solid">{mensajeCarga == true ? "Seleccione los item para buscar" : "No hay datos para mostrar."}</td> */}
                                                        <td colSpan={13} className="text-sm p-2  border-b border-solid">No ay datos disponibles</td>
                                                    </tr>
                                                )
                                                :
                                                (
                                                    reporteDisponibles.map((item, index) => {

                                                        return (
                                                            <tr key={index} className="bg-white border-b">
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{++index}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.anio} - {item.mes}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.modalidad}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.tipoEstudio}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.aula}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.seccion}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.turno}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.asignatura}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.cantidad}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.capacidad}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.dias}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaInicio}</td>
                                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.horaFin}</td>



                                                            </tr>
                                                        );
                                                    })
                                                )
                                        // )

                                    }
                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Reporte;
