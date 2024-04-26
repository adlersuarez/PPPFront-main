import React, { ChangeEvent, useEffect, useState } from 'react';

interface Props {
    posicion: number
    onToggle: (posicion: number) => void
    openIndex: number | null
    objetivoGeneral: string
    handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const ObjetivoGeneral: React.FC<Props> = ({ posicion, onToggle, openIndex, objetivoGeneral, handleChange }) => {


    const [completado, setCompletado] = useState<boolean>(false) // si lleno el objetivo general

    useEffect(() => {
        if (objetivoGeneral === '') {
            setCompletado(false)
        } else {
            setCompletado(true)
        }
    }, [objetivoGeneral])

    return (
        <div className='flex flex-col border border-gray-300'>
            <div className="px-4 py-2 flex flex-row justify-between bg-gray-300 cursor-pointer font-medium text-gray-500" onClick={() => onToggle(posicion)}>
                <div className='flex gap-4'>
                    <h2>OBJETIVO GENERAL</h2>
                    {completado &&
                        <div className='flex'>
                            <span className='bg-green-400 text-white rounded-md px-2 py-1 font-normal text-xs'>
                                <i className="bi bi-check-circle mr-2" />
                                Completado
                            </span>
                        </div>
                    }
                </div>
                <div className={`transition-all duration-500 transform ${openIndex === posicion ? 'rotate-180' : ''}`}>
                    <i className="bi bi-chevron-down" />
                </div>
            </div>

            <div className="overflow-hidden bg-white border border-gray-300">
                <div className={`transition-height duration-500 ${openIndex === posicion ? 'h-20' : 'h-0'}`}>
                    <textarea
                        value={objetivoGeneral}
                        placeholder="Ej. Realizar ..."
                        className="w-full rounded-md px-4 border-0 focus-visible:ring-blue-200
                                    transition-colors duration-300 ease-in-out focus:ring-0 text-sm h-20 resize-none scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default ObjetivoGeneral