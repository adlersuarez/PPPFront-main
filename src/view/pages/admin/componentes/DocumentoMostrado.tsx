import DocumentoAdmin from '@/model/interfaces/documento/mostrarDocumentoAdmin';
import React, { useState } from 'react';
import { EstadoDocumentoAdmin } from './EstadoDocumentoAdmin';
import { formatoFecha_Date_completo, obtenerArchivosVistaPreviaAdmin } from '@/helper/herramienta.helper';
import VistaPreviaDocumentosFile from '@/component/VistaPreviaDocumentosFile';
import FilePreview from '@/model/interfaces/documento/filePreview';

interface CartaPresentacion {
    documento: DocumentoAdmin
}

export const DocumentoMostradoAdmin: React.FC<CartaPresentacion> = ({ documento }) => {


    const [archivosVistaPrevia, setArchivoVistaPrevia] = useState<FilePreview[]>([])
    const [showDoc, setShowDoc] = useState<boolean>(false)

    const handleShowDoc = () => {
        setArchivoVistaPrevia(obtenerArchivosVistaPreviaAdmin(documento))
        setShowDoc(true)
    }
    const handleCloseDoc = () => setShowDoc(false)

    return (
        <div className='flex flex-col sm:flex-row bg-white border border-upla-100 rounded justify-between'>
            <VistaPreviaDocumentosFile show={showDoc} close={handleCloseDoc} files={archivosVistaPrevia} />

            <div className='flex bg-upla-100 p-1 px-4 text-white w-full sm:w-60 text-center sm:text-left shrink-0 font-medium'>
                <span className='my-auto w-full'>{documento.descripcionDoc}</span>
            </div>
            {
                documento.estadoDocumento !== 0 &&
                <>
                    <div className='flex p-2 sm:w-88 sm:justify-start justify-center w-full'>
                        <span className='mr-2 my-auto text-xs hidden sm:flex shrink-0'>Fecha registro : </span>
                        <div className='my-auto bg-gray-200 font-medium text-sm px-2 rounded-md'>
                            {formatoFecha_Date_completo(documento.fechaRegistro)}
                        </div>
                    </div>

                    <div className='p-1 flex justify-center'>
                        <button onClick={handleShowDoc} title={documento.documentoCifrado}
                            className='text-sm bg-gray-400 text-white px-2 rounded-md hover:bg-upla-100 hover:font-medium hover:scale-105'>
                            <i className="animate-pulse bi bi-eye mr-2" /> Ver documento
                        </button>
                    </div>
                </>

            }

            <div className='flex p-1 w-full sm:w-44 shrink-0 justify-center sm:justify-end'>
                <div className='my-auto'>
                    <EstadoDocumentoAdmin valor={documento.estadoDocumento} />
                </div>
            </div>
        </div>
    )
}