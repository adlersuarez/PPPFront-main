import React, { Suspense, useEffect, useRef, useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps";
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";
import MostrarDocumentoUrl from "@/model/interfaces/documento/mostrarDocumento";
import { formatoFecha_Date_fechaSlash, obtenerArchivosVistaPrevia } from "@/helper/herramienta.helper";
import Listas from "@/model/interfaces/Listas.model.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { EstadoDocumento, MostrarDocumento } from "@/network/rest/practicas.network";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import EstadoValor from "@/model/interfaces/estado/EstadoValor";
import FilePreview from "@/model/interfaces/documento/filePreview";
import { ProcesoPasosEstudiante } from "@/helper/requisitos.helper";
import RequisitosListaEstudiante from "./Contenedor/RequisitoEstudiante";
import { SuspenseModal } from "@/component/suspense/SuspenseModal";

const ModalCargarCartaAceptacion = React.lazy(() => import("../../modalForms/ModalCargarCartaAceptacion"));
const VistaPreviaDocumentosFile = React.lazy(() => import("@/component/VistaPreviaDocumentosFile"));

interface Props {
    InitEstado: () => void
}

const TemplateStep2: React.FC<Props> = ({InitEstado}) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    const [show, setShow] = useState<boolean>(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [listaCartas, setListaCartas] = useState<MostrarDocumentoUrl[]>([])

    const ObtenerDocumento = async (tipoDoc: string) => {
        setListaCartas([])
        const response = await MostrarDocumento<Listas>(tipoDoc, codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as MostrarDocumentoUrl[]
            setListaCartas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }

    const InitDocument = () => {
        InitEstado()
        LoadEstadoCarta()
        ObtenerDocumento('CA')
    }

    useEffect(() => {
        InitDocument()
    }, [])


    //EstadoDocumento
    const [estadoCarta, setEstadoCarta] = useState<number | null>(null)

    const LoadEstadoCarta = async () => {
        // setGrado([])
        const response = await EstadoDocumento<EstadoValor>('CA', codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoValor
            setEstadoCarta(Number(data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [docUrlMostrado, setDocUrlMostrado] = useState<MostrarDocumentoUrl | null>(null)

    const [showDoc, setShowDoc] = useState<boolean>(false)

    const handleShowDoc = (index: number) => {
        const docEncontrado = listaCartas[index]
        setDocUrlMostrado(docEncontrado)
        setShowDoc(true)
    }
    const handleCloseDoc = () => setShowDoc(false)

    const [archivosVistaPrevia, setArchivoVistaPrevia] = useState<FilePreview[]>([])

    useEffect(() => {
        if (docUrlMostrado !== null) {
            setArchivoVistaPrevia(obtenerArchivosVistaPrevia(docUrlMostrado))
        }
    }, [docUrlMostrado])

    //Requisitos step 2
    const requisitos = ProcesoPasosEstudiante[1].requisitos ?? []

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            <Suspense fallback={<SuspenseModal />}>
                <ModalCargarCartaAceptacion show={show} hide={handleClose} init={InitDocument}/>
                <VistaPreviaDocumentosFile show={showDoc} close={handleCloseDoc} files={archivosVistaPrevia} />
            </Suspense>

            <ContenedorSteps
                numero={2}
                titulo="CARTA ACEPTACIÓN"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <RequisitosListaEstudiante
                            requisitos={requisitos}
                        />
                    </div>
                </ContenedorSteps.Informacion>

                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>

                        <EstadoTemplate
                            paso={2}
                        />
                        <hr className="my-2" />

                        <div className="overflow-x-auto p-2 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <span className="my-auto font-semibold text-gray-500 uppercase">
                                    Carta aceptación
                                </span>
                                {
                                    estadoCarta === 0 &&
                                    <button
                                        onClick={handleShow}
                                        className="bg-gray-400 hover:bg-blue-600 text-white px-3 py-1 rounded" >
                                        <i className="bi bi-file-earmark-arrow-up mr-2" />
                                        Adjuntar archivo
                                    </button>
                                }

                            </div>

                            {listaCartas.length !== 0 ?
                                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-6 w-10 py-2 font-bold text-center uppercase text-white text-xs">#</th>
                                            <th className="px-6 w-36 py-2 font-bold text-center uppercase text-white text-xs">Fecha</th>
                                            <th className="px-2 py-2 font-bold text-left uppercase text-white text-xs">Observación</th>
                                            <th className="px-2 w-36 py-2 font-bold text-center uppercase text-white text-xs">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            listaCartas.map((carta, index) => (
                                                <tr key={index} className='bg-white border-b'>
                                                    <td className="text-sm p-2 py-3 text-center content-start border-b border-solid">
                                                        <EstadoRequisito valor={carta.estadoDoc} />
                                                    </td>
                                                    <td className="text-sm p-2 py-3 text-center content-start border-b border-solid cursor-default">
                                                        {formatoFecha_Date_fechaSlash(carta.fechaDoc)}
                                                    </td>
                                                    <td className="text-xs p-2 py-3 text-left content-start border-b border-solid normal-case">
                                                        <div className="bg-gray-100 p-1 border px-2 min-h-10">
                                                            {carta.estadoDoc === 1 && '-- En Proceso --'}
                                                            {carta.estadoDoc === 2 && '-- Sin observaciones --'}
                                                            {carta.estadoDoc === 3 && carta.observacionDoc}
                                                        </div>
                                                    </td>
                                                    <td className="text-sm p-2 text-center content-start border-b border-solid">
                                                        <div className='flex gap-2 mt-1 justify-center'>
                                                            <button onClick={() => handleShowDoc(index)}
                                                                className="bg-gray-400 my-auto hover:bg-blue-500 hover:scale-105 text-white px-3 py-1 rounded" >
                                                                <i className="bi bi-eye mr-1" /> Ver archivo
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }



                                    </tbody>
                                </table>
                                :
                                <div className="flex w-full bg-white h-32 border rounded-md">
                                    <div className="bg-blue-50 border-2 border-upla-100 border-dashed rounded-lg p-2 px-3 m-auto">
                                        <i className="text-upla-100 bi bi-info-circle-fill mr-1" />  Aún no ha adjuntado una carta de aceptación
                                    </div>
                                </div>

                            }
                        </div>

                        {/*<hr className="my-2" />*/}

                        {/*<div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Documento debidamente cargado</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Documento requerido</span>
                            </div>

                        </div>*/}

                    </div>
                </ContenedorSteps.Proceso>

            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep2;