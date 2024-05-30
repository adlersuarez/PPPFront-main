import { obtenerNombreArchivo } from '@/helper/herramienta.helper';
import FilePreview from '@/model/interfaces/documento/filePreview';
import React, { useEffect, useRef, useState } from 'react';

interface ModalFunctions {
    show: boolean
    close: () => void
    files: FilePreview[] // Arreglo de URLs
}

const VistaPreviaDocumentosFile: React.FC<ModalFunctions> = ({ show, close, files }) => {

    const [selectedFile, setSelectedFile] = useState<FilePreview | null>(null)

    const changeSelectFile = (file: FilePreview) => {
        setSelectedFile(file)
    }

    const tipoDocActual = (urlArchivo: string, nombreArchivo: string): string => {
        if (nombreArchivo.endsWith('.pdf') || urlArchivo.endsWith('.pdf')) {
            return 'pdf'
        }
        if (nombreArchivo.endsWith('.jpg') || urlArchivo.endsWith('.jpg') || nombreArchivo.endsWith('.png') || urlArchivo.endsWith('.png') || nombreArchivo.endsWith('.jpeg') || urlArchivo.endsWith('.jpeg')) {
            return 'img'
        }
        return '-'
    }

    useEffect(() => {
        setSelectedFile(files[0])
    }, [files])

    const [startIndex, setStartIndex] = useState<number>(0)
    const [itemsPerPage, setItemsPerPage] = useState<number>(0)

    const containerRef = useRef<HTMLDivElement>(null) // Especifica el tipo de elemento como HTMLDivElement
    const itemWidth = 200 // Ancho de cada elemento en píxeles
    const [ancho, setAncho] = useState<string>("w-full")

    useEffect(() => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.clientWidth
            setItemsPerPage(Math.floor(containerWidth / itemWidth))
            setAncho("w-fit")
        }
    }, [containerRef.current])

    const handleNext = () => {
        if (startIndex + itemsPerPage < files.length) {
            setStartIndex(prevIndex => prevIndex + 1)
        }
    }

    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(prevIndex => prevIndex - 1)
        }
    }

    const handleDownloadFile = () => {

        const fileName = obtenerNombreArchivo(selectedFile?.download ?? selectedFile?.nombre ?? '')
        const filePath = selectedFile?.download ?? selectedFile?.url ?? ''

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
        <>
            {show &&
                <div className="fixed top-0 left-0 flex flex-col w-full h-full bg-black bg-opacity-70 z-[1000]">
                    <div className='bg-black text-white'>
                        <div className="flex justify-between items-center p-2 px-4">
                            <div className='flex gap-8'>
                                <button className="flex hover:bg-gray-800 rounded w-8 h-8" onClick={close}>
                                    <i className="m-auto bi bi-arrow-left text-white text-lg" />
                                </button>
                                <div className='cursor-default my-auto'>{selectedFile?.nombre}</div>
                            </div>

                            <button onClick={handleDownloadFile}
                            //href={selectedFile?.url} download={selectedFile?.download ? selectedFile.download : selectedFile?.nombre}
                                className='flex hover:bg-gray-800 rounded w-8 h-8'
                            >
                                <i className="m-auto bi bi-cloud-download" />
                            </button>
                        </div>
                    </div>
                    <div className="flex p-4 rounded-lg h-full">
                        {selectedFile &&
                            <div className='flex m-auto h-full w-[800px]'>
                                {tipoDocActual(selectedFile.url, selectedFile.nombre) === 'pdf' &&
                                    <embed className="w-full m-auto h-full" src={selectedFile.url} type="application/pdf" />
                                }
                                {tipoDocActual(selectedFile.url, selectedFile.nombre) === 'img' &&
                                    <img className="w-full m-auto object-contain" src={selectedFile.url} alt="Preview" />
                                }
                                {tipoDocActual(selectedFile.url, selectedFile.nombre) === '-' &&
                                    <div className="h-64 m-auto flex flex-col justify-center gap-4">
                                        <span className='text-white font-semibold text-xl'>Documento sin vista previa.</span>
                                        <a href={selectedFile?.url} download={selectedFile?.nombre}
                                            className='flex hover:bg-gray-800 rounded text-center mx-auto border border-gray-400 hover:scale-105 text-gray-400 p-1 px-3'
                                        >
                                            Descargar
                                        </a>
                                    </div>
                                }
                            </div>

                        }
                    </div>
                    <div className="flex justify-between gap-16 p-2 py-8 bg-black">

                        <button onClick={handlePrevious} disabled={startIndex === 0}
                            className='bg-white text-black text-2xl w-12 rounded hover:bg-gray-300 hover:scale-105'
                        >
                            <i className="bi bi-chevron-left" />
                        </button>

                        <div className={`flex ${ancho} gap-4 overflow-hidden`} ref={containerRef}>
                            {files.slice(startIndex, startIndex + itemsPerPage).map((file, index) => (
                                <div key={index} onClick={() => changeSelectFile(file)} role='button'
                                    className={`flex flex-col p-4 px-3 rounded border bg-white text-black h-24 justify-between w-[200px]`}
                                >
                                    <div className='flex w-full text-3xl text-center'>
                                        <span className='m-auto'>
                                            {tipoDocActual(file.url, file.nombre) === 'img' && <i className="bi bi-file-earmark-image " />}
                                            {tipoDocActual(file.url, file.nombre) === 'pdf' && <i className="bi bi-filetype-pdf" />}
                                        </span>
                                    </div>
                                    <span title={file.nombre} className='line-clamp-1 px-2 text-xs w-full text-center'>{file.nombre}</span>
                                </div>
                            ))}
                        </div>

                        <button onClick={handleNext} disabled={startIndex + itemsPerPage >= files.length}
                            className='bg-white text-black text-2xl w-12 rounded hover:bg-gray-300 hover:scale-105'
                        >
                            <i className="bi bi-chevron-right" />
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default VistaPreviaDocumentosFile
