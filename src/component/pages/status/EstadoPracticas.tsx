import React from 'react';

interface EstadoPracticasProps {
    estado: number;
}

const EstadoPracticas: React.FC<EstadoPracticasProps> = (props) => {
    let estado = '';
    let bgColor = '';
    let textColor = '';

    switch (props.estado) {
        case 1:
            estado = 'Inscrito';
            bgColor = 'bg-gray-400';
            textColor = 'text-gray-100';
            break;
        case 2:
            estado = 'En Proceso';
            bgColor = 'bg-yellow-200';
            textColor = 'text-gray-500';
            break;
        case 3:
            estado = 'Desaprobado';
            bgColor = 'bg-red-400';
            textColor = 'text-white';
            break;
        case 4:
            estado = 'Aprobado';
            bgColor = 'bg-green-500';
            textColor = 'text-gray-100';
            break;
        default:
            estado = 'Desconocido';
            bgColor = 'bg-gray-700';
            textColor = 'text-gray-200';
    }

    return <span className={`px-2 py-1 rounded text-xs font-bold ${bgColor} ${textColor}`}>{estado}</span>;
};

export default EstadoPracticas;