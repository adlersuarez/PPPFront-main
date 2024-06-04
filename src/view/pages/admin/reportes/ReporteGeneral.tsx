import React, { useEffect, useRef, useState } from "react";
import ContainerVIstas from "@/component/Container";
import { ListarAsignaturasPeriodo, ListarCarrerasPorFacultad, ListarDocentesCarreraAsignatura, ListarFacultades, ListarPeriodos, ReporteListarSeccion } from "@/network/rest/reportes.network";
import Listas from "@/model/interfaces/Listas.model.interface";
import Facultad from "@/model/interfaces/reportes/facultad";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Carrera from "@/model/interfaces/reportes/carrera";
import Asignatura from "@/model/interfaces/reportes/asignatura";
import Docente from "@/model/interfaces/reportes/docente";
import Periodos from "@/model/interfaces/reportes/periodos";
import { convertirANumerosRomanos } from "@/helper/herramienta.helper";
import { LoaderSvg } from "@/component/Svg.component";
import SeccionDetalle from "@/model/interfaces/reportes/seccionDetalle";
import { ButtonGenerarReporte } from "./componentes/ButtonGenerarReporte";

const ReporteGeneral: React.FC = () => {

    const abortController = useRef(new AbortController())

    const [facultadId, setFacultadId] = useState<string>('02') //Por defecto es 00, pero para la fac CAC por ahora sera 02
    const [carreraId, setCarreraId] = useState<string>('00')
    const [asignaturaId, setAsignaturaId] = useState<string>('000000')
    const [docenteId, setDocenteId] = useState<string>('00000000')
    const [periodoId, setPeriodoId] = useState<number | string>(0)

    const [facultades, setFacultades] = useState<Facultad[]>([])
    const [carreras, setCarreras] = useState<Carrera[]>([])
    const [asignaturas, setAsignaturas] = useState<Asignatura[]>([])
    const [docentes, setDocentes] = useState<Docente[]>([])
    const [periodos, setPeriodos] = useState<Periodos[]>([])

    const LimpiarSelect = () => {
        setFacultadId('02')
        setCarreraId('00')
        setAsignaturaId('000000')
        setDocenteId('00000000')
    }

    const LoadPeriodos = async () => {
        setPeriodos([])
        const response = await ListarPeriodos<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Periodos[]
            setPeriodos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadFacultad = async () => {
        setFacultades([])
        const response = await ListarFacultades<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Facultad[]
            setFacultades(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadCarrera = async () => {
        setCarreras([])
        const response = await ListarCarrerasPorFacultad<Listas>(facultadId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Carrera[]
            setCarreras(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadAsignatura = async () => {
        setAsignaturas([])
        const response = await ListarAsignaturasPeriodo<Listas>(Number(periodoId), carreraId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Asignatura[]
            setAsignaturas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDocente = async () => {
        setDocentes([])
        const response = await ListarDocentesCarreraAsignatura<Listas>(Number(periodoId), carreraId, asignaturaId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Docente[]
            setDocentes(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadPeriodos()
        LoadFacultad()
    }, [])

    useEffect(() => {
        LoadCarrera()
    }, [facultadId])

    useEffect(() => {
        LoadAsignatura()
    }, [carreraId, periodoId])

    useEffect(() => {
        LoadDocente()
    }, [asignaturaId, carreraId, periodoId])

    useEffect(() => {
        const today = new Date()

        // Encuentra el periodo que corresponde a la fecha actual
        const currentPeriodo = periodos.find((peri) => {
            const inicio = new Date(peri.inicio)
            const final = new Date(peri.final)
            return today >= inicio && today <= final
        })

        // Si existe un periodo actual, selecciona su periodoId
        if (currentPeriodo) {
            setPeriodoId(currentPeriodo.periodoId.toString())
        }
    }, [periodos])

    const selectedPeriodo = periodos.find((peri) => peri.periodoId === Number(periodoId))
    const isCurrentPeriod = selectedPeriodo
        ? new Date() >= new Date(selectedPeriodo.inicio) && new Date() <= new Date(selectedPeriodo.final)
        : false

    /// TABLA GENERAL
    const [loading, setLoading] = useState<boolean>(false)
    const [secciones, setSecciones] = useState<SeccionDetalle[]>([])

    const LoadSecciones = async () => {
        setLoading(false)
        setSecciones([])
        const response = await ReporteListarSeccion<Listas>(carreraId, asignaturaId, docenteId, Number(periodoId))

        if (response instanceof Response) {
            const data = response.data.resultado as SeccionDetalle[]
            setSecciones(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(true)
    }


    useEffect(() => {
        LoadSecciones()
    }, [carreraId, asignaturaId, docenteId, periodoId])

    //

    return (
        <ContainerVIstas titulo='REPORTE GENERAL' retornar>
            <div className="flex flex-col p-2 gap-8">
                <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-8 ">
                    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-x-8 gap-y-3 w-full">
                        <div className="flexx flex-col gap-2 justify-between hidden">
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-semibold text-gray-400">Facultad:</span>
                                <select
                                    value={facultadId}
                                    onChange={(e) => setFacultadId(e.target.value)}
                                    className="w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm"
                                >
                                    <option value="00">Todas</option>
                                    {facultades.map((fac, index) => (
                                        <option key={index} value={fac.facultadId}>
                                            {fac.facultadNombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="bg-upla-100 flex gap-4 text-white p-3 text-xl justify-center font-semibold rounded-md">
                                <i className="bi bi-person-lock text-3xl animate-pulse" />
                                <span className="my-auto">ADMINISTRADOR GENERAL</span>
                            </div>
                        </div>
                        <div className="flex xhidden text-upla-100 uppercase bg-gray-50 border border-upla-100 rounded-md overflow-hidden">
                            <div className="flex flex-col">
                                <div className="bg-upla-100 text-white text-lg p-2 px-4 uppercase font-semibold">
                                    <i className="bi bi-person-square my-auto mr-2 " /> Facultad
                                </div>
                                <span className="m-auto text-center text-lg sm:text-2xl font-bold px-5 py-3">Ciencias Administrativas y Contables</span>
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-y-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-semibold text-gray-400">Carrera profesional:</span>
                                <select
                                    value={carreraId}
                                    onChange={(e) => setCarreraId(e.target.value)}
                                    className="w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm"
                                >
                                    <option value="00">Todas</option>
                                    {carreras.map((carr, index) => (
                                        <option key={index} value={carr.carreraId}>
                                            {carr.carreraNombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 w-full">
                                    <span className="text-lg font-semibold text-gray-400">Periodo:</span>
                                    <div className="relative">
                                        <select
                                            value={periodoId}
                                            onChange={(e) => setPeriodoId(e.target.value)}
                                            className="w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm"
                                        >
                                            {/*<option value="0">Todos</option>*/}
                                            {periodos.map((peri) => (
                                                <option key={peri.periodoId} value={peri.periodoId}>
                                                    {peri.anio + ' - ' + convertirANumerosRomanos(peri.semestre)}
                                                </option>
                                            ))}
                                        </select>
                                        {isCurrentPeriod && (
                                            <span className="absolute left-24 top-1/2 transform -translate-y-1/2 px-2 py-0.5 rounded text-xs font-medium bg-green-400 text-white">
                                                Actual
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-end">
                                    <button title="Limpiar datos seleccionados"
                                        onClick={() => LimpiarSelect()}
                                        className="bg-gray-400 hover:bg-green-400 text-white p-2 px-3 rounded-md hover:scale-105 font:medium">
                                        <i className="bi bi-arrow-clockwise text-2xl" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-semibold text-gray-400">Asignatura:</span>
                                <select
                                    value={asignaturaId}
                                    onChange={(e) => setAsignaturaId(e.target.value)}
                                    className="w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm"
                                >
                                    <option value="000000">Todas</option>
                                    {asignaturas.map((asi, index) => (
                                        <option key={index} value={asi.asignaturaId}>
                                            {carreraId == '00' && asi.carreraId + ' - '}{asi.asignaturaNombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-lg font-semibold text-gray-400">Docente:</span>
                                <select
                                    value={docenteId}
                                    onChange={(e) => setDocenteId(e.target.value)}
                                    className="w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm"
                                >
                                    <option value="00000000">Todos</option>
                                    {docentes.map((doc, index) => (
                                        <option key={index} value={doc.per_Id}>
                                            {doc.perNombre.trim()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full overflow-y-auto">

                    <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                        <thead className="align-bottom">
                            <tr>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Carrera</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>

                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Semestre</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Asignatura</th>

                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sección</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Docente</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Reporte</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                !loading ? (
                                    <tr className="text-center bg-white border-b">
                                        <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                            <div className="flex items-center justify-center">
                                                <LoaderSvg /> <span>Cargando datos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    secciones.length == 0 ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={8} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                        </tr>
                                        :
                                        (
                                            secciones.map((item, index) => {

                                                return (
                                                    <tr key={index} className="bg-white border-b">
                                                        <td className="text-sm p-2 text-left">
                                                            {item.carrera}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.sede}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.anioActual + ' - ' + convertirANumerosRomanos(item.semestreActual)}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {convertirANumerosRomanos(item.nivel)}
                                                        </td>
                                                        <td className="text-sm p-2 text-left">
                                                            {item.asignatura}
                                                        </td>
                                                        <td className="text-sm p-2 text-center font-medium">
                                                            {item.seccion}
                                                        </td>
                                                        <td className="text-sm p-2 text-left font-medium">
                                                            {item.docente.trim()}
                                                        </td>
                                                        <td className="text-xs p-2 text-center align-middle border-b border-solid">

                                                            <ButtonGenerarReporte
                                                                datos={item}
                                                                periodoId={Number(periodoId)}
                                                            />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </ContainerVIstas>
    )
}

export default ReporteGeneral;