import React, { ReactNode } from 'react';
import Volver from './Volver';

interface ContainerProps {
    titulo?: string
    retornar?: boolean
    children: ReactNode
}

const ContainerVIstas: React.FC<ContainerProps> = ({ titulo, children, retornar: volver }) => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full lg:w-4/5 xl:w-10/12 mx-auto p-3 sm:py-8">
                <div className="flex flex-col w-full h-auto min-w-0 break-words bg-white opacity-100 lg:px-8 px-0 gap-4">
                    {volver &&
                        <div className="hidden sm:flex text-2xl text-gray-400 font-bold gap-2">
                            <Volver /> {titulo}
                        </div>
                    }
                    <div className='border rounded-lg p-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContainerVIstas