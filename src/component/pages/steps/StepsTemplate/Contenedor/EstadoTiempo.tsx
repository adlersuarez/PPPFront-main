import React from 'react';

type EstadoElemento = {
    fecha?: string; // Cambiado el nombre para evitar conflicto con la variable fecha
}

const EstadoTiempo: React.FC<EstadoElemento> = ({ fecha }) => {
    const currentDate = new Date();
    const targetDate = fecha ? new Date(`${fecha}`) : null;

    if (!targetDate) {
        return null;
    }

    const differenceInTime = targetDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    const differenceInHours = Math.floor((differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600));
    const differenceInMinutes = Math.floor((differenceInTime % (1000 * 3600)) / (1000 * 60));

    let color = '';
    let formattedText = '';

    if (differenceInDays >= 2) {
        color = 'bg-green-500';
        formattedText = `${differenceInDays} días`;
    } else if (differenceInDays >= 1) {
        color = 'bg-yellow-500';
        formattedText = '1 día';
    } else if (differenceInHours >= 2) {
        color = 'bg-yellow-500';
        formattedText = `${differenceInHours} horas`;
    } else if (differenceInHours >= 1) {
        color = 'bg-red-500';
        formattedText = '1 hora';
    } else if (differenceInMinutes > 0) {
        color = 'bg-red-500';
        formattedText = `${differenceInMinutes} min`;
    } else {
        // La fecha ya ha pasado
        color = 'bg-red-500';
        formattedText = 'Tiempo acabado';
    }

    return (
        <div className={`flex rounded-lg ${color} text-white text-xs px-2 w-auto gap-2`}>
            <i className="bi bi-clock-history my-auto" />
            <span className="m-auto">{formattedText}</span>
        </div>
    );
};

export default EstadoTiempo;
