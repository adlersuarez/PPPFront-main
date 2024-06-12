import { convertirANumerosRomanos } from '@/helper/herramienta.helper';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Listas from '@/model/interfaces/Listas.model.interface';
import ListaSeccion from '@/model/interfaces/docente/listaSeccion';
import SeccionesDocente from '@/model/interfaces/docente/secciones';
import InformacionDocente from '@/model/interfaces/reportes/informacionDocente';
import { ListarSeccionAlumnos } from '@/network/rest/practicas.network';
import { ReporteInformacionDocente } from '@/network/rest/reportes.network';
import EstadosAlumno from '@/view/pages/docente/PasosRevision.tsx/componente/EstadosAlumno';
import React, { useEffect, useRef, useState } from 'react';

interface DocenteDetailsProps {
    codDocente: string
    carId: string
    asiId: string
    sedeId: string
    periodo: number
    seccion: string

    secciones: SeccionesDocente[]
    buscar: boolean
}

const EspecificoDocente: React.FC<DocenteDetailsProps> = ({ carId, asiId, codDocente, sedeId, periodo, seccion, buscar, secciones }) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [alumnosSeccion, setAlumnosSeccion] = useState<ListaSeccion[]>([])

    const [docenteId, setDocenteId] = useState<string>("00000000")
    const [carreraId, setCarreraId] = useState<string>("00")
    const [asignaturaId, setAsignaturaId] = useState<string>("000000")
    const [sedId, setSedId] = useState<string>("00")
    const [seccionId, setSeccionId] = useState<string>("00")
    const [periodoId, setPeriodoId] = useState<number>(0)

    const [listaSecciones, setListaSecciones] = useState<SeccionesDocente[]>([])
    const [buscando, setBuscando] = useState<boolean>(false)

    useEffect(() => {
        setDocenteId(codDocente)
        setCarreraId(carId)
        setAsignaturaId(asiId)
        setSedId(sedeId)
        setSeccionId(seccion)
        setPeriodoId(periodo)
        setListaSecciones(secciones)
    }, [carId, asiId, codDocente, sedeId, periodo, seccion, secciones])

    useEffect(() => {
        setBuscando(buscar)
    }, [buscar])

    const abortController = useRef(new AbortController())

    const LoadListaSeccion = async () => {
        setLoading(true)
        setAlumnosSeccion([])
        const response = await ListarSeccionAlumnos<Listas>(carreraId, asignaturaId, docenteId, sedId, seccionId, periodoId, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ListaSeccion[]
            setAlumnosSeccion(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(false)
    }

    //DATOS DOCENTE
    const [datosDocente, setDatosDocente] = useState<InformacionDocente | null>(null)

    const LoadDatosDocente = async () => {
        setDatosDocente(null)
        const response = await ReporteInformacionDocente<InformacionDocente>(docenteId, carreraId, asignaturaId, sedId, seccionId, periodoId)
        if (response instanceof Response) {
            const data = response.data as InformacionDocente
            setDatosDocente(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        if (docenteId != '00000000' && carreraId != '00' && asignaturaId != '000000' && sedId != '00' && seccionId != '00' && periodoId != 0 && buscando) {
            LoadListaSeccion()
            LoadDatosDocente()
        }
    }, [docenteId, carreraId, asignaturaId, sedId, seccionId, periodoId, buscando])

    return (
        <div className="w-full">
            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                <div className="flex justify-between border-b-2 border-gray-200 py-2 px-4 text-lg sm:text-2xl">
                    <div className="font-bold flex flex-col sm:flex-row sm:gap-4 w-full">
                        {
                            ((datosDocente == null || datosDocente?.seccion == '') && buscar == false) &&
                            <span className="text-gray-500 my-auto font-medium text-lg">
                                <i className="bi bi-info-circle-fill mr-4 text-upla-100" />
                                Buscar información del personal <b>DOCENTE</b>
                            </span>
                        }
                        {
                            (listaSecciones.length > 1 && (datosDocente == null || datosDocente?.seccion == '')) &&
                            <span className="text-gray-500 my-auto font-medium text-lg">
                                <i className="bi bi-info-circle-fill mr-4 text-upla-100" />
                                Seleccione la <b>SECCIÓN</b> específica del docente
                            </span>
                        }
                        {
                            ((datosDocente == null || datosDocente?.seccion == '') && buscar == true && listaSecciones.length <= 1) &&
                            <span className="text-gray-500 my-auto font-medium text-lg">
                                <i className="bi bi-dash-circle-fill mr-4 text-red-400" />
                                No se encontró un <b>DOCENTE</b> con el código proporcionado para Prácticas preprofesionales
                            </span>
                        }
                        {
                            (datosDocente?.seccion != '' && datosDocente != null) &&
                            <>
                                <span className="text-gray-500">{datosDocente?.docente}</span>
                                <span className="text-upla-100">{datosDocente?.per_Id}</span>
                            </>
                        }

                    </div>
                    <i className="text-white bi bi-caret-down-fill transform my-auto" />
                </div>
                <div className={`p-4 ${(datosDocente?.seccion != '' && datosDocente != null) ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-lg sm:text-lg w-full">
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Facultad: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.facultad}</span>
                        </div>
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Carrera: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.carrera}</span>
                        </div>
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Sede: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.sede}</span>
                        </div>
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Periodo: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.anioActual} - {convertirANumerosRomanos(datosDocente?.periodoActual ?? '')}</span>
                        </div>
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Asignatura: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.asignatura}</span>
                        </div>
                        <div className="flex gap-2 font-bold text-gray-500">
                            <div className="w-28 shrink-0">Sección: </div>
                            <span className="font-medium text-upla-100">{datosDocente?.seccion}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-full mt-4 overflow-y-auto">
                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                    <thead className="align-bottom">
                        <tr>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Código</th>
                            <th className="px-6 py-2 font-bold text-left uppercase align-middle text-white text-xs">Estudiante</th>
                            <th className="px-6 py-2 font-bold text-left uppercase align-middle text-white text-xs">Empresa de prácticas</th>
                            <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr className="text-center bg-white border-b">
                                <td colSpan={6} className="text-sm p-2 border-b border-solid">
                                    <div className="flex items-center justify-center gap-4">
                                        <span>Cargando datos...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : alumnosSeccion.length === 0 ? (
                            <tr className="text-center bg-white border-b">
                                <td colSpan={6} className="text-sm p-2 border-b border-solid">No hay datos para mostrar.</td>
                            </tr>
                        ) : (
                            alumnosSeccion.map((item, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="text-sm p-2 text-center">{index + 1}</td>
                                    <td className="text-sm p-2 text-center font-medium text-gray-500">{item.est_Id}</td>
                                    <td className="text-sm px-6 p-2 text-left">
                                        {item.apellidoPaterno + " " + item.apellidoMaterno + " " + item.nombres}
                                    </td>
                                    <td className="text-sm px-6 p-2 text-left">
                                        {item.empresaNombre ? (
                                            <span className="flex">
                                                <i className="mr-2 text-lg text-green-400 bi bi-check-circle-fill" />
                                                <p className="my-auto">{item.empresaNombre}</p>
                                            </span>
                                        ) : (
                                            <span className="text-xs bg-gray-200 p-1 px-2 rounded-md">-- No registrado --</span>
                                        )}
                                    </td>
                                    <td className="text-sm p-2 text-center">
                                        <EstadosAlumno EstudianteId={item.est_Id} />
                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EspecificoDocente