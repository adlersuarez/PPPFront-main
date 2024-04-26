import { LoaderSvg } from '@/component/Svg.component';
import React, { useState, useEffect } from 'react';

export const CargandoPagos: React.FC = () => {
    const [puntos, setPuntos] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setPuntos(prev => prev === '...' ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex w-40 ">
            <LoaderSvg />
            <span className="text-gray-600 text-sm ml-2 my-auto">Buscando pagos{puntos}</span>
        </div>
    )
}

