import UnidadTematicaRegistro from '@/model/interfaces/planActividades/unidadRegistro';
import React, { useEffect, useState } from 'react';

interface ModalFunctions {
    show: boolean
    close: () => void
    imagenes: UnidadTematicaRegistro[]
    idSeleccionado: number
}

const GaleriaUnidadTematica: React.FC<ModalFunctions> = ({ show, close, imagenes, idSeleccionado }) => {

    const [selectedFile, setSelectedFile] = useState<UnidadTematicaRegistro | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)

    const changeSelectFile = (file: UnidadTematicaRegistro) => {
        setSelectedFile(file)
    }

    useEffect(() => {
        /// Para el primero seleccionado
        const imagenSelect = imagenes.find((imagen) => imagen.registroUnidadId == idSeleccionado)
        setSelectedFile(imagenSelect ?? null)
    }, [imagenes, idSeleccionado])


    const showNextImage = () => {
        const nextIndex = selectedIndex + 1;
        if (nextIndex < imagenes.length) {
            setSelectedIndex(nextIndex);
            setSelectedFile(imagenes[nextIndex])
        }
    }

    const showPreviousImage = () => {
        const previousIndex = selectedIndex - 1;
        if (previousIndex >= 0) {
            setSelectedIndex(previousIndex);
            setSelectedFile(imagenes[previousIndex])
        }
    }

    return (
        <>
            {show &&
                <div className="fixed top-0 left-0 flex flex-col w-full h-full bg-black bg-opacity-80 z-[1000]">
                    <div className='bg-black text-white'>
                        <div className="flex justify-between items-center p-2 px-4">
                            <div className='flex gap-8'>
                                <button className="flex hover:bg-gray-800 rounded w-8 h-8" onClick={close}>
                                    <i className="m-auto bi bi-arrow-left text-white text-lg" />
                                </button>
                                <div className='cursor-default my-auto'>Reporte #{selectedFile?.registroUnidadId}  {selectedFile?.fechaUnidadImagen}</div>
                            </div>

                            <a href={selectedFile?.imagenUrl} download={'Reporte #' + selectedFile?.registroUnidadId + ' ' + selectedFile?.fechaUnidadImagen}
                                className='flex hover:bg-gray-800 rounded w-8 h-8'
                            >
                                <i className="m-auto bi bi-cloud-download" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row p-4 sm:justify-center gap-4 sm:gap-16 rounded-lg h-full relative">
                        <div className='absolute sm:w-full w-96 flex justify-between items-center top-1/2 transform -translate-y-1/2 sm:p-8'>
                            <button onClick={showPreviousImage} disabled={selectedIndex == 0}
                                className='text-white text-2xl w-12 h-12 rounded-full bg-gray-400 hover:bg-gray-600 hover:scale-105'>
                                <i className="bi bi-chevron-left" />
                            </button>
                            <button onClick={showNextImage} disabled={selectedIndex == imagenes.length - 1}
                                className='text-white text-2xl w-12 h-12 rounded-full bg-gray-400 hover:bg-gray-600 hover:scale-105'>
                                <i className="bi bi-chevron-right" />
                            </button>
                        </div>

                        {selectedFile &&
                            <div className='sm:my-auto flex w-96 h-96 sm:w-[670px] sm:h-[670px] aspect-square '>
                                <img
                                    className={`m-auto rounded-md  ${selectedFile.orientacion === 'V' ? 'max-h-full aspect-[3/4]' : 'max-w-full aspect-[4/3]'}`}
                                    src={selectedFile.imagenUrl}
                                    alt="Preview"
                                />
                            </div>

                        }
                        <div className='w-full sm:w-[480px] sm:my-auto p-4 bg-white rounded-lg flex flex-col gap-2'>
                            <div className='text-upla-100 font-medium text-lg flex justify-between'>
                                <span>Descripción</span>
                                <span>
                                    <i className="bi bi-calendar3 mr-2" /> {selectedFile?.fechaRegistro}
                                </span>
                            </div>
                            {selectedFile?.descripcionRegistro}
                        </div>
                    </div>
                    <div className="flex justify-between px-4 py-4 bg-black">

                        {/*
                            imagenes.length > itemsPerPage &&
                            <button onClick={handlePrevious} disabled={startIndex === 0}
                                className='bg-white text-black text-2xl w-12 rounded hover:bg-gray-300 hover:scale-105'
                            >
                                <i className="bi bi-chevron-left" />
                            </button>
                    */ }


                        <div className={`flex w-full mx-auto justify-center gap-8 py-3
                        overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500
                        `} >
                            {imagenes.map((file, index) => (
                                <div key={index} onClick={() => changeSelectFile(file)} role='button'
                                    className={`flex flex-col p-2 sm:p-4 px-3 rounded  hover:scale-110 my-auto
                                    ${file.registroUnidadId === selectedFile?.registroUnidadId ? 'bg-upla-100 text-white border-upla-100 border-2 sm:h-[120px] font-semibold' : 'bg-white sm:h-28'}
                                    justify-between sm:w-[200px] sm:min-w-[200px]`}
                                >
                                    <div className='flex w-full text-3xl text-center'>
                                        <span className='m-auto'>
                                            <i className="bi bi-file-earmark-image " />
                                        </span>
                                    </div>
                                    <span title={file.imagenUrl} className='line-clamp-1 px-2 text-xs w-full text-center flex flex-col gap-1'>
                                        <span className='flex justify-center gap-1'>
                                            <span className='hidden sm:flex'>Reporte prácticas</span>
                                            <span>#{index + 1}</span>
                                        </span>
                                        <span className='hidden sm:flex font-medium mx-auto'>
                                            {selectedFile?.fechaUnidadImagen}
                                        </span>
                                    </span>

                                </div>
                            ))}
                        </div>

                        {/*
                            imagenes.length > itemsPerPage &&
                            <button onClick={handleNext} disabled={startIndex + itemsPerPage >= imagenes.length}
                                className='bg-white text-black text-2xl w-12 rounded hover:bg-gray-300 hover:scale-105'
                            >
                                <i className="bi bi-chevron-right" />
                            </button>
                        */}

                    </div>
                </div>
            }
        </>
    )
}

export default GaleriaUnidadTematica
