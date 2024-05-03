import VistaPreviaDocumentosFile from "@/component/VistaPreviaDocumentosFile";
import { EstadoRequisito } from "@/component/pages/steps/StepsTemplate/Contenedor/EstadoRequisito";
import { formatoFecha_Date_fechaSlash, obtenerArchivosVistaPrevia } from "@/helper/herramienta.helper";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import FilePreview from "@/model/interfaces/documento/filePreview";
import MostrarDocumentoUrl from "@/model/interfaces/documento/mostrarDocumento";
import { MostrarDocumento } from "@/network/rest/practicas.network";
import { RootState } from "@/store/configureStore.store";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ModalValidarDocumento from "./componente/ValidarDocumento";

interface DatosProps {
    estudianteId: string
}

const Paso2 = (datos: DatosProps) => {

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [idDocument, setIdDocument] = useState<number>(0)
    const [showValidar, setShowValidar] = useState<boolean>(false)
    const handleCloseValidar = () => setShowValidar(false)
    const handleShowValidar = (idDocumnet: number) => {
        setIdDocument(idDocumnet)
        setShowValidar(true)
    }
    const [listaCartas, setListaCartas] = useState<MostrarDocumentoUrl[]>([])

    const ObtenerDocumento = async (tipoDoc: string) => {
        setListaCartas([])
        const response = await MostrarDocumento<Listas>(tipoDoc, datos.estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as MostrarDocumentoUrl[]
            setListaCartas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        Init()
    }, [])

    const Init = () => {
        ObtenerDocumento('CA')
    }


    /////Mostrar documento
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

    return (
        <div className='flex flex-col gap-4'>
            <VistaPreviaDocumentosFile show={showDoc} close={handleCloseDoc} files={archivosVistaPrevia} />
            <ModalValidarDocumento show={showValidar} hide={handleCloseValidar} tipoDoc='CA' changeInit={Init} idDoc={idDocument} />

            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-2-square-fill`} />
                <h1 className="font-bold">CARTA DE ACEPTACIÓN</h1>
            </div>
            <div className="flex bg-gray-100 p-4 rounded">
                {
                    listaCartas.length !== 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                            <div className="flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4 sm:gap-8">
                                    <div className="flex flex-col gap-1 text-gray-500">
                                        <h2 className="text-lg font-semibold uppercase ">Requisitos a considerar</h2>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex"><div className="shrink-0 w-6"><i className="bi bi-dot" /></div> Escaneado a colores</div>
                                            <div className="flex"><div className="shrink-0 w-6"><i className="bi bi-dot" /></div>Debidamente firmada y sellada por la empresa</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 flex flex-col gap-4 col-span-2">
                                <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                    <thead>
                                        <tr>
                                            <th className="px-6 w-10 py-2 font-bold text-center uppercase text-white text-xs">#</th>
                                            <th className="px-6 w-36 py-2 font-bold text-center uppercase text-white text-xs">Fecha</th>
                                            <th className="px-2 py-2 font-bold text-left uppercase text-white text-xs">Observación</th>
                                            <th className="px-2 w-60 py-2 font-bold text-center uppercase text-white text-xs">Acción</th>
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
                                                            {
                                                                carta.estadoDoc === 1 &&
                                                                <button onClick={() => handleShowValidar(carta.idDoc)}
                                                                    className="bg-gray-400 my-auto hover:bg-blue-500 hover:scale-105 text-white px-3 py-1 rounded" >
                                                                    <i className="bi bi-card-checklist mr-1" /> Validar
                                                                </button>
                                                            }

                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha cargado su Carta de Aceptación</p>
                        </div>
                }

            </div>
        </div>
    )
}

export default Paso2;