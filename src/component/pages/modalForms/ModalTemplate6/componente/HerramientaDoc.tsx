import VistaPreviaDocumentosFile from '@/component/VistaPreviaDocumentosFile';
import { obtenerNombreArchivo } from '@/helper/herramienta.helper';
import React, { useState } from 'react';

interface HerramientaDoc {
    titulo: string
    tipoDoc: 'pdf' | 'docx'
    urlDownload: string
    urlShow: string
}

const HerramientaDoc: React.FC<HerramientaDoc> = ({ urlDownload, urlShow, titulo, tipoDoc }) => {

    //////////Vista previa Documentos
    const [showDoc, setShowDoc] = useState<boolean>(false)
    const handleShowDoc = () => setShowDoc(true)
    const handleCloseDoc = () => setShowDoc(false)
   
    ///descargar
    const handleDownloadFile = () => {

        const fileName = obtenerNombreArchivo(urlDownload)
        const filePath = urlDownload
    
        fetch(filePath)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(new Blob([blob]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                link.parentNode?.removeChild(link)
            })
            .catch(error => console.error('Error al descargar el archivo:', error))
    }

    return (
        <div className="flex flex-col border border-upla-100 bg-white rounded-md overflow-hidden">
            <VistaPreviaDocumentosFile
                show={showDoc}
                close={handleCloseDoc}
                files={[{
                    nombre: titulo,
                    url: urlShow,
                    download: urlDownload
                }]}
            />

            <div className="flex justify-between p-2 bg-upla-100">
                <span className="text-sm text-white">{titulo}</span>
                <div className="my-auto text-xs bg-white p-0.5 px-2 rounded">Formato: <span className="font-medium"><i>{tipoDoc}</i> <i className={`bi ${tipoDoc === 'pdf' && 'bi-file-earmark-pdf-fill text-red-600'} ${tipoDoc === 'docx' && 'bi-file-earmark-word-fill text-blue-600'}`} /></span></div>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full p-3 px-6">
                <button
                    onClick={handleShowDoc}
                    className="bg-gray-100 py-1 text-sm rounded border border-gray-400 hover:border-upla-100 hover:bg-upla-100 hover:text-white hover:scale-105 w-full">
                    <i className="bi bi-eye mr-2" /> Ver
                </button>
                <button
                    onClick={() => handleDownloadFile()}
                    className="bg-gray-100 py-1 text-sm rounded border border-gray-400 hover:border-upla-100 hover:bg-upla-100 hover:text-white hover:scale-105 w-full">
                    <i className="bi bi-download mr-2" /> Descargar
                </button>
            </div>
        </div>
    )
}

export default HerramientaDoc