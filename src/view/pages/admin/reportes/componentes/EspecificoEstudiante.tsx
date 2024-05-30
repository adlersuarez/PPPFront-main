import { convertirANumerosRomanos } from '@/helper/herramienta.helper';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Listas from '@/model/interfaces/Listas.model.interface';
import CartaPresentacionDatos from '@/model/interfaces/cartaPresentacion/cartaPresentacion';
import DocumentoAdmin from '@/model/interfaces/documento/mostrarDocumentoAdmin';
import AreaTrabajoPracticas from '@/model/interfaces/empresa/areaTrabajoPracticas';
import EmpresaElegidaRespuesta from '@/model/interfaces/empresa/empresaElegidaRespuesta';
import DuracionDetallePracticas from '@/model/interfaces/horario/duracionPracticas';
import { MostrarDocumentosAdmin, ObtenerDatosAreaTrabajo, ObtenerDatosCartaPresentacionAdmin, ObtenerDatosDuracion, ObtenerDatosEmpresaElegidaDocente } from '@/network/rest/practicas.network';
import { RootState } from '@/store/configureStore.store';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { CartaPresentacionAdmin } from '../../componentes/CartaPresentacion';
import { EstudianteNoCompletado } from '../../componentes/EstudianteNoCompletado';
import { EmpresaSeleccionadaAdmin } from '../../componentes/EmpresaSeleccionada';
import { AreaPracticasAdmin } from '../../componentes/AreaPracticas';
import { HorarioAdmin } from '../../componentes/Horario';
import { PlanActividadesAdmin } from '../../componentes/PlanActividades';
import { DocumentoMostradoAdmin } from '../../componentes/DocumentoMostrado';
import InformacionEstudiante from '@/model/interfaces/reportes/informacionEstudiante';
import { ReporteInformacionEstudiante } from '@/network/rest/reportes.network';

interface StudentDetailsProps {
    codEstudiante: string
    buscar: boolean
}

const EspecificoEstudiante: React.FC<StudentDetailsProps> = ({ codEstudiante, buscar }) => {

    const abortController = useRef(new AbortController())
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const [buscando, setBuscando] = useState<boolean>(false)
    const [estudianteId, setEstudianteId] = useState<string>("0")

    useEffect(() => {
        setEstudianteId(codEstudiante)
    }, [codEstudiante])

    useEffect(() => {
        setBuscando(buscar)
    }, [buscar])

    ///CARTAS
    const [cartaPresentDatos, setCartaPresentDatos] = useState<CartaPresentacionDatos[]>([])

    const LoadDatosCartas = async () => {
        setCartaPresentDatos([])
        const response = await ObtenerDatosCartaPresentacionAdmin<Listas>(estudianteId, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as CartaPresentacionDatos[]
            setCartaPresentDatos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }
    //EMPRESA ELEGIDA
    const [empresaDatos, setEmpresaDatos] = useState<EmpresaElegidaRespuesta | null>(null)

    const LoadDatosEmpresa = async () => {
        const response = await ObtenerDatosEmpresaElegidaDocente<EmpresaElegidaRespuesta>(estudianteId, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EmpresaElegidaRespuesta
            setEmpresaDatos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    //AREA DE TRABAJO
    const [datosAreaTrabajo, setDatosAreaTrabajo] = useState<AreaTrabajoPracticas | null>(null)

    const LoadAreaPracticas = async () => {
        const response = await ObtenerDatosAreaTrabajo<AreaTrabajoPracticas>(estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as AreaTrabajoPracticas
            setDatosAreaTrabajo(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    //Duracion Practicas
    const [duracionPracticas, setDuracionPracticas] = useState<DuracionDetallePracticas | null>(null)

    const LoadDuracionPracticas = async () => {
        const response = await ObtenerDatosDuracion<DuracionDetallePracticas>(estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as DuracionDetallePracticas
            setDuracionPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    //DOCUMENTOS
    const [listaDocumentos, setListaDocumentos] = useState<DocumentoAdmin[]>([])

    const ObtenerDocumento = async () => {
        setListaDocumentos([])
        const response = await MostrarDocumentosAdmin<Listas>(estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as DocumentoAdmin[]
            setListaDocumentos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }


    //DATOS ESTUDIANTE
    const [datosEstudiante, setDatosDocente] = useState<InformacionEstudiante | null>(null)

    const LoadDatosDocente = async () => {
        setDatosDocente(null)
        const response = await ReporteInformacionEstudiante<InformacionEstudiante>(estudianteId, periodo)
        if (response instanceof Response) {
            const data = response.data as InformacionEstudiante
            setDatosDocente(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        if (estudianteId != "0" && buscando) {
            LoadDatosCartas()
            LoadDatosEmpresa()
            LoadAreaPracticas()
            LoadDuracionPracticas()
            ObtenerDocumento()

            LoadDatosDocente()
        }

    }, [estudianteId, buscando])

    return (
        <div>
            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                <div className="flex justify-between border-b-2 border-gray-200 py-2 px-4 text-lg sm:text-2xl">
                    <div className="font-bold flex flex-col sm:flex-row sm:gap-4">
                        {
                            ((datosEstudiante == null || datosEstudiante?.seccion == '') && buscar == false) &&
                            <span className="text-gray-500 my-auto font-medium text-lg">
                                <i className="bi bi-info-circle-fill mr-4 text-upla-100" />
                                Buscar información del <b>ESTUDIANTE</b>
                            </span>
                        }
                        {
                            ((datosEstudiante == null || datosEstudiante?.seccion == '') && buscar == true) &&
                            <span className="text-gray-500 my-auto font-medium text-lg">
                                <i className="bi bi-dash-circle-fill mr-4 text-red-400" />
                                No se encontró un <b>ESTUDIANTE</b> con el código proporcionado para Prácticas preprofesionales
                            </span>
                        }
                        {
                            (datosEstudiante?.seccion != '' && datosEstudiante != null) &&
                            <>
                                <span className='text-gray-500'>{datosEstudiante?.estudiante}</span>
                                <span className='text-upla-100'>{datosEstudiante?.est_Id}</span>
                            </>
                        }

                    </div>
                    <i className={`text-white bi bi-caret-down-fill transform my-auto`} />
                </div>
                <div className={`p-4 ${(datosEstudiante?.seccion != '' && datosEstudiante != null) ? 'block' : 'hidden'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-lg sm:text-lg w-full">
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Facultad: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.facultad}</span>
                        </div>
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Carrera: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.carrera}</span>
                        </div>
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Sede: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.sede}</span>
                        </div>
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Periodo: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.anioActual} - {convertirANumerosRomanos(datosEstudiante?.periodoActual ?? '')}</span>
                        </div>
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Asignatura: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.asignatura}</span>
                        </div>
                        <div className='flex gap-2 font-bold text-gray-500'>
                            <div className="w-28 shrink-0">Sección: </div>
                            <span className="font-medium text-upla-100">{datosEstudiante?.seccion}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-lg border-2 border-gray-300 mt-4 border-t-4">
                {
                     (datosEstudiante?.seccion != '' && datosEstudiante != null) ?
                        <div className="border-b-2 border-gray-200 p-4">
                            <div className='flex flex-col gap-y-6 '>
                                <div className='flex flex-col gap-2'>
                                    <div className='text-upla-100 font-bold text-lg'>
                                        <span className='uppercase'>
                                            Cartas de presentación
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 bg-gray-100 p-4 gap-4 rounded-md'>
                                        {
                                            cartaPresentDatos.length !== 0 ?
                                                cartaPresentDatos.map((cartaDatos, index) => (
                                                    <CartaPresentacionAdmin
                                                        key={index}
                                                        cartaDatos={cartaDatos}
                                                    />
                                                ))
                                                :
                                                <EstudianteNoCompletado valor={1} className='sm:col-span-3 lg:col-span-4' />
                                        }

                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='text-upla-100 font-bold text-lg'>
                                        <span className='uppercase'>
                                            Empresa Seleccionada - Área de prácticas - Horario <i className="hidden ml-2 text-green-400 bi bi-check-circle-fill" />
                                        </span>

                                    </div>
                                    <div className='grid grid-cols-1 lg:grid-cols-3 bg-gray-100 p-4 rounded-md gap-4'>

                                        <EmpresaSeleccionadaAdmin
                                            datosEmpresa={empresaDatos}
                                        />
                                        <AreaPracticasAdmin
                                            datosArea={datosAreaTrabajo}
                                        />
                                        <HorarioAdmin
                                            horario={duracionPracticas}
                                        />
                                    </div>

                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='text-upla-100 font-bold text-lg'>
                                        <span className='uppercase'>
                                            Plan de actividades <i className="hidden ml-2 text-green-400 bi bi-check-circle-fill" />
                                        </span>

                                    </div>
                                    <div className='flex bg-gray-100 rounded p-4'>
                                        <PlanActividadesAdmin estudianteId={estudianteId} />
                                    </div>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <div className='text-upla-100 font-bold text-lg'>
                                        <span className='uppercase'>
                                            Documentos<i className="hidden ml-2 text-green-400 bi bi-check-circle-fill" />
                                        </span>

                                    </div>
                                    <div className='flex flex-col bg-gray-100 p-4 rounded-md gap-4'>
                                        {listaDocumentos.map((doc, index) => (
                                            <DocumentoMostradoAdmin
                                                key={index}
                                                documento={doc}
                                            />
                                        ))
                                        }


                                    </div>
                                </div>

                            </div>
                        </div>
                        :
                        <div className='bg-gray-50 p-2 m-auto text-center'>
                            NO HAY DATOS PARA MOSTRAR
                        </div>
                }
            </div>
        </div>
    )
}

export default EspecificoEstudiante