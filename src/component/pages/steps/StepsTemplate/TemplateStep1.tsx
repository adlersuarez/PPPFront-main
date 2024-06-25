import React, { useState, Suspense, useRef, useEffect } from 'react';
import ContenedorSteps from './Contenedor/ContenedorSteps';
import EstadoTemplate from './Contenedor/EstadoTemplate';
import { EstadoCarta } from '../../modalForms/componentes/EstadoCarta';
import CartaPresentacionDatos from '@/model/interfaces/cartaPresentacion/cartaPresentacion';
import Listas from '@/model/interfaces/Listas.model.interface';
import { ConsultaPagoCartaPresentacion, ConsultaPagoTramite, ObtenerDatosCartaPresentacion } from '@/network/rest/practicas.network';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';
import Response from '@/model/class/response.model.class';
import PagoCarta from '@/model/interfaces/pagos/pagoCarta';
import { CargandoPagos } from '../../carga/CargandoPagos';
import { LoaderSvg } from '@/component/Svg.component';
import { convertirFechaPago_aaaa_mm_dd, formatoFecha_Date_fechaSlash, validadoCarta } from '@/helper/herramienta.helper';
import { ProcesoPasosEstudiante } from '@/helper/requisitos.helper';
import RequisitosListaEstudiante from './Contenedor/RequisitoEstudiante';
import ImportanteListaEstudiante from './Contenedor/ImportanteEstudiante';
import { SuspenseModal } from '@/component/suspense/SuspenseModal';

import toast from 'react-hot-toast';
import { ObtenerCartaPresentacionEspecifica } from '@/network/rest/documentos.network';
import { ButtonOperacion } from '../../buttons/ButtonOperacion';
//import { generarCartaPdfMake } from '@/helper/docpdf.helper';

const ModalAgregarEmpresa = React.lazy(() => import('../../modalForms/ModalTemplate1/ModalAgregarEmpresa'));
const ModalMostrarDatos = React.lazy(() => import('../../modalForms/ModalTemplate1/ModalMostrarDatos'));

interface Props {
    InitEstado: () => void
}

const TemplateStep1: React.FC<Props> = ({ InitEstado }) => {

    //Código de asignatura
    const idAsign = useSelector((state: RootState) => state.infoEstudiante.asi_Id)

    const abortController = useRef(new AbortController())

    const [operacionSeleccionada, setOperacionSeleccionada] = useState<string>('')
    const [fechaOperacionSeleccionada, setFechaOperacionSeleccionada] = useState<string>('')

    const [showDatos, setShowDatos] = useState<boolean>(false)

    const [showEmpresa, setShowEmpresa] = useState<boolean>(false)
    const [dataDetalle, setDataDetalle] = useState<any>(null)

    const handleOpenDetalle = (data: CartaPresentacionDatos) => {
        setDataDetalle(data)
        handleShowDatos()
    }

    const handleCloseDatos = () => setShowDatos(false)
    const handleShowDatos = () => setShowDatos(true)

    const handleShowAgregarEmpresa = () => setShowEmpresa(true)
    const handleCloseEmpresa = () => setShowEmpresa(false)

    const [mostrarDatos, setMostrarDatos] = useState<boolean>(false)

    const handleSeleccionarOperacion = (codOperacion: string) => {
        setOperacionSeleccionada(codOperacion)
        const pagoEncontrado = pagosCarta.find(pago => pago.operacion === codOperacion);
        setFechaOperacionSeleccionada(convertirFechaPago_aaaa_mm_dd(pagoEncontrado?.fecha_operacion ?? ''))
    }

    const [pagosCarta, setPagosCarta] = useState<PagoCarta[]>([])
    const [cargarDatosCarta, setCargarDatosCarta] = useState<boolean>(false)

    const LoadPagosCarta = async () => {
        setCargarDatosCarta(true)
        setPagosCarta([])
        const response = await ConsultaPagoCartaPresentacion<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as PagoCarta[]
            setPagosCarta(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setCargarDatosCarta(false)
    }


    const LoadPagosTramite = async () => {
        setCargarDatosCarta(true)
        setPagosCarta([])
        const response = await ConsultaPagoTramite<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as PagoCarta[]
            setPagosCarta(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setCargarDatosCarta(false)
    }


    const [cartaPresentDatos, setCartaPresentDatos] = useState<CartaPresentacionDatos[]>([])

    const LoadDatosCartas = async () => {
        setCartaPresentDatos([])
        const response = await ObtenerDatosCartaPresentacion<Listas>(operacionSeleccionada, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as CartaPresentacionDatos[]
            setCartaPresentDatos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }

    const [cargaGenerarSolicitud, setCargaGenerarSolicitud] = useState<boolean>(false)

    const generarSolicitud = async (cartaId: number) => {
        setCargaGenerarSolicitud(true)
        const response = await ObtenerCartaPresentacionEspecifica<Blob>(cartaId)
        //  console.log(response)

        if (response instanceof Response) {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            const pdfUrl = window.URL.createObjectURL(pdfBlob)
            const a = document.createElement('a')
            a.href = pdfUrl
            a.download = 'CARTA-PRESENTACION.pdf'
            a.click()

            toast.success("¡El documento se ha generado con éxito!")
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
        setCargaGenerarSolicitud(false)
    }

    ////
    const [tituloPago, setTituloPago] = useState<string>("")

    useEffect(() => {
        // Para PPP 2 y PPP 3 si requieren carta de presentacion y tramite
        if (idAsign === 113296 || idAsign === 123297) {
            LoadPagosCarta()
            setTituloPago("Pago(s) por Derecho de Trámite y por Carta de Presentación")
        }
        // Solo para pago de trámite PP1 y PP2
        if (idAsign === 123276 || idAsign === 123284 || idAsign === 113286) {
            LoadPagosTramite()
            setTituloPago("Pago(s) por Derecho de Trámite")
        }
    }, [])

    useEffect(() => {
        if (operacionSeleccionada) {
            LoadDatosCartas()
        }
    }, [operacionSeleccionada])

    useEffect(() => {
        handleSeleccionarOperacion(pagosCarta[0]?.operacion)
    }, [pagosCarta])



    //Requisitos step 1
    const requisitos = ProcesoPasosEstudiante[0].requisitos ?? []
    const importante = ProcesoPasosEstudiante[0].importante ?? []

    const pagoLista = pagosCarta.filter((pago) => pago.operacion !== '')

    useEffect(() => {

        if (!validadoCarta(cartaPresentDatos)) {
            setMostrarDatos(false)
            return
        }
        if (fechaOperacionSeleccionada.length === 10) {
            setMostrarDatos(true)
            return
        }

    }, [cartaPresentDatos, fechaOperacionSeleccionada])

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            <Suspense fallback={<SuspenseModal />}>
                <ModalAgregarEmpresa show={showEmpresa} hide={handleCloseEmpresa} operacion={operacionSeleccionada} fechaOperacion={fechaOperacionSeleccionada} init={LoadDatosCartas} initEstado={InitEstado} />
                <ModalMostrarDatos show={showDatos} hide={handleCloseDatos} datosCarta={dataDetalle} />
            </Suspense>

            <ContenedorSteps
                numero={1}
                titulo='CARTA DE PRESENTACIÓN'
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col gap-6'>
                        <RequisitosListaEstudiante
                            requisitos={requisitos}
                        />
                        <ImportanteListaEstudiante
                            importante={importante}
                        />
                    </div>
                </ContenedorSteps.Informacion>

                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>
                        <EstadoTemplate
                            paso={1}
                        />
                        <hr className="my-2" />

                        <div className='p-2'>
                            <div className='my-2 bg-white border-upla-100 border flex flex-col '>
                                <div className='font-bold border-b border-b-upla-100 p-2 py-1 sm:py-2 text-sm flex bg-upla-100 text-white'>
                                    <span className='hidden sm:flex px-2'>{tituloPago}:</span>
                                    <span className='flex sm:hidden mx-auto'>Pagos(s) realizados</span>
                                </div>
                                <div className='flex flex-wrap gap-2 p-2 w-full'>
                                    {!cargarDatosCarta ?
                                        pagoLista.length != 0 ?
                                            pagoLista.map((item, index) => (
                                                <ButtonOperacion
                                                    key={index}
                                                    item={item}
                                                    handleSeleccionarOperacion={handleSeleccionarOperacion}
                                                />
                                            ))
                                            :
                                            <div className='flex w-full py-0.5'>

                                                <span className='text-sm mx-auto text-center'>
                                                    <i className="text-yellow-400 bi bi-exclamation-triangle-fill mr-2" />
                                                    Actualmente no hay códigos de operación registrados
                                                </span>
                                            </div>
                                        :
                                        <div className='flex w-full py-0.5'>
                                            <span className='text-sm my-auto px-4 text-center'>
                                                <CargandoPagos />
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='px-2 flex'>
                            <span className='gap-2 text-sm mx-auto bg-blue-100 px-3 py-1 rounded-md text-center border border-upla-100 border-dashed'>
                                <i className="animate-pulse text-upla-100 bi bi-info-circle-fill mr-2" />
                                Puede generar hasta <strong>5</strong> cartas de presentación con un solo pago
                            </span>
                        </div>

                        <hr className="m-2 my-4 border-upla-100" />
                        <div className='uppercase font-bold text-upla-100 px-2 text-lg'>
                            Cartas de presentación generadas
                        </div>
                        <div className='p-1 flex flex-col sm:flex-row justify-between mb-2 px-2 gap-2'>
                            <div className='my-auto bg-white p-1 px-2 rounded-md text-sm border border-upla-100'>
                                Código seleccionado : <span className='font-bold ml-2 text-gray-600'>{operacionSeleccionada}</span>
                            </div>
                            <div className='my-auto'>
                                {
                                    mostrarDatos &&
                                    (
                                        cartaPresentDatos.length < 5 ? (
                                            <button onClick={handleShowAgregarEmpresa} title='Carta de Presentación'
                                                className='px-3 p-1 sm:py-0.5 w-full sm:w-auto bg-green-400 hover:bg-green-500 text-white rounded-md'>
                                                <i className="bi bi-clipboard2-plus mr-2 animate-pulse" />
                                                Agregar Empresa
                                            </button>
                                        ) : (
                                            <div className='text-white bg-gray-400 text-sm px-2 py-0.5 rounded-md'>
                                                Límite superado
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>

                        <div className="overflow-x-auto px-2">

                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 font-bold text-center uppercase align-middle text-white text-xs">/</th>
                                        <th className="px-6 py-2 font-bold text-left uppercase align-middle text-white text-xs">Empresa</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs whitespace-nowrap">F. Registro</th>
                                        <th className="py-2 font-bold text-center uppercase align-middle text-white text-xs">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartaPresentDatos.length != 0 ?
                                            cartaPresentDatos.map((carta, index) => (
                                                <tr key={index} className='bg-white border-b hover:bg-blue-50'>
                                                    <td className="text-sm px-4 p-2 text-center align-middle border-b border-solid">
                                                        <EstadoCarta valor={carta.cartaEstado} />
                                                    </td>
                                                    <td className="text-sm px-6 p-2 text-left align-middle border-b border-solid">
                                                        {carta.empresaNombre}
                                                    </td>
                                                    <td className="text-sm p-2 text-center align-middle border-b border-solid whitespace-nowrap">
                                                        {formatoFecha_Date_fechaSlash(carta.cartaFechaRegistro)}
                                                    </td>
                                                    <td className="text-sm w-9">
                                                        <div className='flex gap-2 p-2'>
                                                            <button onClick={() => handleOpenDetalle(carta)} title='Detalles'
                                                                className="bg-gray-400 hover:bg-blue-500 hover:scale-110 text-white px-4 py-1 rounded transition-colors duration-300" >
                                                                <i className="bi bi-eye" />
                                                            </button>
                                                            <button onClick={() => generarSolicitud(carta.cartaId)} title='Descargar PDF' disabled={cargaGenerarSolicitud}
                                                                className="bg-gray-400 hover:bg-red-700 hover:scale-110 text-white px-4 py-1 rounded transition-colors duration-300" >
                                                                {cargaGenerarSolicitud ? <LoaderSvg /> : <i className="bi bi-download" />}
                                                            </button>
                                                            {/*<button onClick={generarCartaPdfMake} title='Descargar PDF' disabled={cargaGenerarSolicitud}
                                                                className="bg-gray-400 hover:bg-red-700 hover:scale-110 text-white px-4 py-1 rounded transition-colors duration-300" >
                                                                {cargaGenerarSolicitud ? <LoaderSvg /> : <i className="bi bi-download" />}
                                                            </button>*/}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr className='bg-white border-b'>
                                                <td colSpan={4} className="text-xs p-2 text-center align-middle border-b border-solid">
                                                    -- No hay cartas de presentación registradas --
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/*<div className="overflow-x-auto p-2">
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Requisito</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={1} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos personales
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShow}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShow}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos estudiante
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowEstud}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowEstud}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos centro laboral
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowCentro}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowCentro}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>*/}

                        {/*  <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Datos completos, puede descargar la carta de presentación</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Datos incompletos, por favor rellene todos los formularios</span>
                            </div>

                        </div>*/}

                        {/*
                        <div className="flex">
                            <button //onClick={handleShowCarta}
                                //onClick={()=>generatePDF(data)}
                                //onClick={()=>handleCrearSolicitud(data)}
                                onClick={() => handleCrearSolicitudYConvertirAPdf(data)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded m-auto flex">
                                <i className="bi bi-file-earmark-arrow-down w-1/4 m-auto text-3xl" />
                                <span className='w-3/4'>Descargar Carta de Presentación</span>
                            </button>
                        </div>
                        */}
                    </div>

                </ContenedorSteps.Proceso>

            </ContenedorSteps>
        </div>
    );
};

export default TemplateStep1;