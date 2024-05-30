import React, { Suspense, useEffect, useRef, useState } from "react";
import ContainerVIstas from "@/component/Container";
import { ListarAsignaturasPeriodo, ListarCarrerasPorFacultad, ListarDocentesCarreraAsignatura, ListarFacultades, ListarPeriodos, ReporteDatosDiasPracticas, ReporteDatosGenerales, ReporteDatosGradoJefe, ReporteDatosRankEmpresa, ReporteDatosTipoEmpresa } from "@/network/rest/reportes.network";
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
import DatosGenerales from "@/model/interfaces/reportes/datosGenerales";

import TipoEmpresa from "@/model/interfaces/reportes/tipoEmpresa";
import RankEmpresa from "@/model/interfaces/reportes/rankEmpresa";
import TipoGradoJefe from "@/model/interfaces/reportes/tipoGradoJefe";
import TipoDia from "@/model/interfaces/reportes/tipoDia";
import { agregarColorHexTipoEmpresa, agregarColorHexTipoGradoJefe, bgColorReportes, convertirBgColortoArrayRGBA, getCantidadesRankEmpresa, getCantidadesTipoDia, getCantidadesTipoEmpresa, getCantidadesTipoGradoJefe, getLabelsRankEmpresa, getLabelsTipoDia, getLabelsTipoEmpresa, getLabelsTipoGradoJefe, totalTipoEmpresa, totalTipoGradoJefe } from "@/helper/reporte.color";
import { HelperColor } from "../componentes/HelperColor";

const CardDashboard = React.lazy(() => import('../componentes/CardDashboard'))
const NoResultados = React.lazy(() => import('../componentes/NoResultados'))
const PieChart = React.lazy(() => import('../graficos/PieMultiple'))
const BarChart = React.lazy(() => import('../graficos/BarMultiple'))

const Dashboard: React.FC = () => {

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

    /// REPORTES
    const [datosDashboard, setDatosDashboard] = useState<DatosGenerales | null>(null)

    const LoadDashbboardGeneral = async () => {
        setDatosDashboard(null)
        const response = await ReporteDatosGenerales<DatosGenerales>(carreraId, asignaturaId, docenteId, Number(periodoId))
        if (response instanceof Response) {
            const data = response.data as DatosGenerales
            setDatosDashboard(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    ///PRUEBA GRAFICOS
    const [listaTipoEmpresa, setListaTipoEmpresa] = useState<TipoEmpresa[]>([])
    const [listaRankEmpresa, setListaRankEmpresa] = useState<RankEmpresa[]>([])
    const [listaGradoJefe, setListaGradoJefe] = useState<TipoGradoJefe[]>([])
    const [listaDiasPracticas, setListaDiasPracticas] = useState<TipoDia[]>([])

    const LoadDatosTipoEmpresa = async () => {
        setListaTipoEmpresa([])
        const response = await ReporteDatosTipoEmpresa<Listas>(carreraId, asignaturaId, docenteId, Number(periodoId))

        if (response instanceof Response) {
            const data = response.data.resultado as TipoEmpresa[]
            setListaTipoEmpresa(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    const LoadDatosRankEmpresa = async () => {
        setListaRankEmpresa([])
        const response = await ReporteDatosRankEmpresa<Listas>(carreraId, asignaturaId, docenteId, Number(periodoId))

        if (response instanceof Response) {
            const data = response.data.resultado as RankEmpresa[]
            setListaRankEmpresa(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    const LoadDatosGradoJefe = async () => {
        setListaGradoJefe([])
        const response = await ReporteDatosGradoJefe<Listas>(carreraId, asignaturaId, docenteId, Number(periodoId))

        if (response instanceof Response) {
            const data = response.data.resultado as TipoGradoJefe[]
            setListaGradoJefe(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    const LoadDatosDiasPracticas = async () => {
        setListaDiasPracticas([])
        const response = await ReporteDatosDiasPracticas<Listas>(carreraId, asignaturaId, docenteId, Number(periodoId))

        if (response instanceof Response) {
            const data = response.data.resultado as TipoDia[]
            setListaDiasPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadDashbboardGeneral()
        LoadDatosTipoEmpresa()
        LoadDatosRankEmpresa()
        LoadDatosGradoJefe()
        LoadDatosDiasPracticas()

    }, [carreraId, asignaturaId, docenteId, periodoId])

    const tipoEmpresaDatos = {
        data: [
            {
                id: '1',
                data: getCantidadesTipoEmpresa(listaTipoEmpresa),
                backgroundColor: convertirBgColortoArrayRGBA(bgColorReportes),
            }
        ],
        labels: getLabelsTipoEmpresa(listaTipoEmpresa),
        total: totalTipoEmpresa(listaTipoEmpresa),
        dataLeyenda: agregarColorHexTipoEmpresa(listaTipoEmpresa, bgColorReportes)
    }

    const rankEmpresaDatos = {
        data: [
            {
                id: '1',
                label: 'Cantidad',
                data: getCantidadesRankEmpresa(listaRankEmpresa),
                bgColor: bgColorReportes[1].backgroundRGBA,
                borderColor: bgColorReportes[1].borderRGBA,
                borderWidth: 2
            }
        ],
        labels: getLabelsRankEmpresa(listaRankEmpresa),
        dataTable: listaRankEmpresa
    }

    const tipoGradoJefe = {
        data: [
            {
                id: '1',
                data: getCantidadesTipoGradoJefe(listaGradoJefe),
                backgroundColor: convertirBgColortoArrayRGBA(bgColorReportes),
            }
        ],
        labels: getLabelsTipoGradoJefe(listaGradoJefe),
        total: totalTipoGradoJefe(listaGradoJefe),
        dataLeyenda: agregarColorHexTipoGradoJefe(listaGradoJefe, bgColorReportes)
    }

    const tipoDiaSemana = {
        data: [
            {
                id: '1',
                label: 'Cantidad',
                data: getCantidadesTipoDia(listaDiasPracticas),
                bgColor: bgColorReportes[1].backgroundRGBA,
                borderColor: bgColorReportes[1].borderRGBA,
                borderWidth: 2
            }
        ],
        labels: getLabelsTipoDia(listaDiasPracticas),
        dataTable: listaDiasPracticas
    }

    return (
        <ContainerVIstas titulo='DASHBOARD - PRÁCTICAS PREPROFESIONALES' retornar>
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
                                            <option value="0">Todos</option>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-4">
                    <Suspense fallback={<div>Cargando...</div>}>
                        <CardDashboard
                            bgGradient="from-blue-400 to-upla-100"
                            iconClass="bi-pencil-square"
                            title="Estudiantes"
                            quantity={datosDashboard?.cantTotal ?? 0}
                            description="Matriculados"
                        />
                    </Suspense>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <CardDashboard
                            bgGradient="from-green-700 to-green-300"
                            iconClass="bi-check-lg"
                            title="Estudiantes"
                            quantity={datosDashboard?.cantActivo ?? 0}
                            description="Activos"
                        />
                    </Suspense>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <CardDashboard
                            bgGradient="from-red-700 to-pink-300"
                            iconClass="bi-exclamation-triangle-fill"
                            title="Estudiantes"
                            quantity={datosDashboard?.cantInactivo ?? 0}
                            description="No activos"
                        />
                    </Suspense>
                    <Suspense fallback={<div>Cargando...</div>}>
                        <CardDashboard
                            bgGradient="from-blue-400 to-blue-600"
                            iconClass="bi-file-earmark-arrow-down"
                            title="Cartas de presentación"
                            quantity={datosDashboard?.cantGenerada ?? 0}
                            description="Generadas"
                        />
                    </Suspense>

                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <HelperColor />
                    {/* PIE chart - Tipo Empresa*/}
                    <div className="sm:relative bg-gray-100 p-4 shadow rounded-md flex flex-col gap-4">
                        <div className="sm:absolute flex cursor-default">
                            <h2 className="bg-upla-100 text-white p-2 px-4 font-medium rounded">Tipo Empresa</h2>
                        </div>
                        {
                            listaTipoEmpresa.length != 0 ?
                                <div className="flex flex-col sm:flex-row sm:h-[280px] gap-y-4 gap-x-12 sm:my-auto">
                                    <div className="flex flex-col justify-end">
                                        <div className="flex flex-col gap-2 justify-center bg-white p-2 px-3 rounded cursor-default sm:w-48 ">
                                            <div className="flex flex-col gap-2">
                                                {
                                                    tipoEmpresaDatos.dataLeyenda.map((data, index) => (
                                                        <div key={index} className="flex justify-between hover:scale-105">
                                                            <div className="flex gap-2 text-sm">
                                                                <div className={`my-auto border border-white w-8 h-4 bg-[${data.hexColor}]/[0.5]`} />
                                                                <span className="my-auto">{data.tipoEmpresa}</span>
                                                            </div>
                                                            <span className="my-auto font-medium text-lg ml-4 text-upla-100">{data.cantidad}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <hr />
                                            <div className="flex justify-between hover:scale-105">
                                                <span className="my-auto font-medium"> Total</span>
                                                <span className="my-auto font-bold text-2xl ml-4 text-upla-200">{tipoEmpresaDatos.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 m-auto sm:h-[280px]">
                                        <Suspense fallback={<div>Cargando...</div>}>
                                            <PieChart
                                                data={tipoEmpresaDatos.data}
                                                labels={tipoEmpresaDatos.labels}
                                                legend={false}
                                                tipo={'porcentaje'}
                                            />
                                        </Suspense>

                                    </div>

                                </div>
                                :
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <NoResultados />
                                </Suspense>

                        }

                    </div>

                    {/* BARRAS vertical -  Empresas*/}
                    <div className="sm:relative bg-gray-100 p-4 shadow rounded-md flex flex-col gap-4">
                        <div className="sm:absolute flex cursor-default sm:right-4">
                            <h2 className="bg-upla-100 text-white p-2 px-4 font-medium rounded">Rank empresas</h2>
                        </div>
                        {
                            listaRankEmpresa.length != 0 ?
                                <>
                                    <div className="p-4 hidden sm:block bg-white rounded-md">
                                        <BarChart
                                            data={rankEmpresaDatos.data}
                                            labels={rankEmpresaDatos.labels}
                                            legend={false}
                                            indexAxis={'y'}
                                        />
                                    </div>
                                    <div className="sm:hidden block">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {rankEmpresaDatos.dataTable.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                                                            {item.empresaNombre}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg text-right text-gray-500">
                                                            {item.cantidad}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <NoResultados />
                                </Suspense>
                        }

                    </div>

                    {/* PIE chart -  Grado Jefe inmediato*/}
                    <div className="sm:relative bg-gray-100 p-4 shadow rounded-md flex flex-col gap-4">
                        <div className="sm:absolute flex cursor-default">
                            <h2 className="bg-upla-100 text-white p-2 px-4 font-medium rounded">Grado académico Jefe inmediato</h2>
                        </div>
                        {
                            listaGradoJefe.length != 0 ?
                                <div className="flex flex-col sm:flex-row sm:h-[280px] gap-y-4 gap-x-12 sm:my-auto">
                                    <div className="flex flex-col justify-end">
                                        <div className="flex flex-col gap-2 justify-center bg-white p-2 px-3 rounded cursor-default sm:w-40 ">
                                            <div className="flex flex-col">
                                                {
                                                    tipoGradoJefe.dataLeyenda.map((data, index) => (
                                                        <div key={index} className="flex justify-between hover:scale-105">
                                                            <div className="flex gap-2 text-xs">
                                                                <div className="my-auto border border-white w-6 h-3 bg-[#FF638450]/[0.5]" />
                                                                <span className="my-auto">{data.gradoNombre}</span>
                                                            </div>
                                                            <span className="my-auto font-medium text-base ml-4 text-upla-100">{data.cantidad}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 m-auto sm:h-[280px]">
                                        <PieChart
                                            data={tipoGradoJefe.data}
                                            labels={tipoGradoJefe.labels}
                                            legend={false}
                                            tipo={'porcentaje'}
                                        />
                                    </div>

                                </div>
                                :
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <NoResultados />
                                </Suspense>
                        }
                    </div>

                    {/* BARRAS vertical -  Empresas*/}
                    <div className="sm:relative bg-gray-100 p-4 shadow rounded-md flex flex-col gap-4">
                        <div className="sm:absolute flex cursor-default sm:right-4">
                            <h2 className="bg-upla-100 text-white p-2 px-4 font-medium rounded">Días de la semana</h2>
                        </div>
                        {
                            listaDiasPracticas.length != 0 ?
                                <>
                                    <div className="p-4 hidden sm:block bg-white rounded-md">
                                        <BarChart
                                            data={tipoDiaSemana.data}
                                            labels={tipoDiaSemana.labels}
                                            legend={false}
                                            indexAxis={'x'}
                                        />
                                    </div>
                                    <div className="sm:hidden block">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {tipoDiaSemana.dataTable.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-500">
                                                            {item.diaNombre}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-lg text-right text-gray-500">
                                                            {item.cantidad}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                                :
                                <Suspense fallback={<div>Cargando...</div>}>
                                    <NoResultados />
                                </Suspense>
                        }
                    </div>
                </div>
            </div>
        </ContainerVIstas>
    )
}

export default Dashboard;