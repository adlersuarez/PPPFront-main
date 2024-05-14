import React from 'react';

interface EstadoDocumentoAdminProps {
    valor: number
}

export const EstadoDocumentoAdmin: React.FC<EstadoDocumentoAdminProps> = ({ valor }) => {
    let estado = ''
    let color = ''

    switch (valor) {
        case 1:
            estado = 'Pendiente de revisión'
            color = 'gray-400'
            break
        case 2:
            estado = 'Documento validado'
            color = 'green-400'
            break
        case 3:
            estado = 'Enviado para corrección'
            color = 'red-400'
            break
        default:
            estado = 'Documento no cargado'
            color = 'gray-500'
            break
    }

    return (
        <div className={`text-xs font-medium p-0.5 px-2 rounded-md bg-${color} text-white`}>
            <span>{estado}</span>
        </div>
    )
}