import { formatoFechaOperacion } from '@/helper/herramienta.helper';
import PagoCarta from '@/model/interfaces/pagos/pagoCarta';
import React from 'react';
import { Tooltip } from 'react-tooltip';

interface OperacionButtonProps {
    item: PagoCarta
    handleSeleccionarOperacion: (operacion: string) => void;
}

export const ButtonOperacion: React.FC<OperacionButtonProps> = ({ item, handleSeleccionarOperacion }) => {

    return (
        <div data-tooltip-id={`Operacion-${item.operacion}-${item.fecha_operacion}-${item.monto_operacion}`}
            role="button"
            onClick={() => handleSeleccionarOperacion(item.operacion)}
            className={`bg-gray-400 hover:bg-upla-100 text-white font-semibold text-xs p-1 px-2 hover:scale-105`}
        >
            {item.operacion}
            <Tooltip id={`Operacion-${item.operacion}-${item.fecha_operacion}-${item.monto_operacion}`} variant='light' opacity={1} className='border-[1.5px] border-gray-700' arrowColor='gray'>
                <div className='flex flex-col py-1 max-w-80 gap-1.5 max-h-80 overflow-hidden'>
                    <span className='text-xs'>Código Operación: <span className='text-sm text-upla-100 font-bold ml-2'>{item.operacion}</span></span>
                    <hr />
                    <span className='text-xs'>Fecha de pago: <span className='text-sm text-upla-100 font-bold ml-2'>{formatoFechaOperacion(item.fecha_operacion)}</span></span>
                </div>
            </Tooltip>
        </div>
    )
}
