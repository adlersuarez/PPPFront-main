import { ReactNode } from 'react';
import EstadoTemplate from './EstadoTemplate';

type ContenedorStepsProps = {
    numero: number
    titulo: string
    children: ReactNode
}

const ContenedorSteps = ({ numero, titulo, children }: ContenedorStepsProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex text-gray-400">
                <i className={`bi bi-${numero}-square-fill mr-4 text-xl`} />
                <h1 className="font-bold text-xl">{titulo}</h1>
            </div>
            <div className='flex flex-col sm:flex-row gap-4'>
                {children}
            </div>
        </div>
    )
}

const Informacion = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full sm:w-1/2 flex flex-col bg-gray-100 rounded-lg p-4">
            {children}
        </div>
    )
}

const Proceso = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full sm:w-1/2 flex flex-col bg-gray-100 rounded-lg p-4">
            {children}
        </div>
    )
}

ContenedorSteps.Informacion = Informacion
ContenedorSteps.Proceso = Proceso

export default ContenedorSteps