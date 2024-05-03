import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Listas from '@/model/interfaces/Listas.model.interface';
import MostrarDocumentoUrl from '@/model/interfaces/documento/mostrarDocumento';
import { MostrarDocumento } from '@/network/rest/practicas.network';
import { RootState } from '@/store/configureStore.store';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { EstadoRequisito } from '../../../../../component/pages/steps/StepsTemplate/Contenedor/EstadoRequisito';
import { formatoFecha_Date_fechaSlash, obtenerArchivosVistaPrevia } from '@/helper/herramienta.helper';
import VistaPreviaDocumentosFile from '@/component/VistaPreviaDocumentosFile';
import FilePreview from '@/model/interfaces/documento/filePreview';
import ModalValidarDocumento from './ValidarDocumento';

interface Props {
    estId: string
    titulo: string
    tipoDoc: string
    posicion: number
    onToggle: (posicion: number) => void
    openIndex: number | null
    openAction: () => void
    estadoInit: boolean
}

const MostrarDocEstudiante: React.FC<Props> = ({ posicion, onToggle, openIndex, titulo, tipoDoc, estadoInit , estId}) => {

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [listaDocumentos, setListaDocumentos] = useState<MostrarDocumentoUrl[]>([])
    const [docUrlMostrado, setDocUrlMostrado] = useState<MostrarDocumentoUrl | null>(null)

    const ObtenerDocumento = async () => {
        setListaDocumentos([])
        const response = await MostrarDocumento<Listas>(tipoDoc, estId, periodo, abortController.current)
        console.log(response)
        if (response instanceof Response) {
            const data = response.data.resultado as MostrarDocumentoUrl[]
            setListaDocumentos(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    }

    const Init = () => {
        ObtenerDocumento()
    }

    useEffect(() => {
        if (docUrlMostrado !== null) {
            setArchivoVistaPrevia(obtenerArchivosVistaPrevia(docUrlMostrado))
        }
    }, [docUrlMostrado])

    useEffect(() => {
        Init()
    }, [estadoInit])

    //////////Vista previa Documentos
    const [showDoc, setShowDoc] = useState<boolean>(false)
    const handleShowDoc = (index: number) => {
        const docEncontrado = listaDocumentos[index]
        setDocUrlMostrado(docEncontrado)
        setShowDoc(true)
    }
    const handleCloseDoc = () => setShowDoc(false)

    const [archivosVistaPrevia, setArchivoVistaPrevia] = useState<FilePreview[]>([])

    ////
    const [idDocument, setIdDocument] = useState<number>(0)
    const [showValidar, setShowValidar] = useState<boolean>(false)
    const handleCloseValidar = () => setShowValidar(false)
    const handleShowValidar = (idDocumnet: number) => {
        setIdDocument(idDocumnet)
        setShowValidar(true)
    }

    return (
        <div className='flex flex-col border-gray-300'>
            <VistaPreviaDocumentosFile show={showDoc} close={handleCloseDoc} files={archivosVistaPrevia} />
            <ModalValidarDocumento show={showValidar} hide={handleCloseValidar} tipoDoc={tipoDoc} changeInit={Init} idDoc={idDocument} />

            <div className="px-4 py-2 flex flex-row justify-between bg-gray-200 cursor-pointer  text-gray-500" >
                <div className='flex gap-4'>
                    <div className='my-auto w-60 font-medium'><h2> {titulo}</h2></div>

                </div>

                <div title={openIndex === posicion ? 'Replegar' : 'Desplegar'} onClick={() => onToggle(posicion)} role='button'
                    className={`my-auto transition-all hover:bg-gray-400 hover:text-white px-1 rounded hover:scale-105 duration-500 transform ${openIndex === posicion ? 'rotate-180' : ''}`} >
                    <i className="bi bi-chevron-down" />
                </div>

            </div>

            <div className="overflow-hidden bg-white border border-gray-300">
                <div className={`transition-height duration-500 ${openIndex === posicion ? 'h-40' : 'h-0'}`}>
                    <div className="flex flex-col h-40 overflow-y-auto">
                        {listaDocumentos.length !== 0 ?
                            <div className='p-1'>
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
                                            listaDocumentos.map((carta, index) => (
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

                            :
                            <div className="flex m-auto">
                                <div className="bg-blue-50 border-2 border-upla-100 border-dashed rounded-lg p-2 px-3 m-auto">
                                    <i className="text-upla-100 bi bi-info-circle-fill mr-1" />  Aún no ha adjuntado un documento
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostrarDocEstudiante