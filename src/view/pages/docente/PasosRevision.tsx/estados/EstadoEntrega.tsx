interface EstadoCartaProps {
    estado: number;
}

const EstadoEntrega: React.FC<EstadoCartaProps> = (props) => {
    let estado = '';
    let bgColor = '';
    let textColor = '';

    switch (props.estado) {
        case 1:
            estado = 'Entregado';
            bgColor = 'bg-green-400';
            textColor = 'text-gray-100';
            break;
        case 2:
            estado = 'Procesp';
            bgColor = 'bg-gray-600';
            textColor = 'text-gray-200';
            break;
        case 3:
            estado = 'No entregado';
            bgColor = 'bg-red-400';
            textColor = 'text-gray-100';
            break;
        default:
            estado = 'Desconocido';
            bgColor = 'bg-gray-700';
            textColor = 'text-gray-200';
    }

    return <span className={`px-2 py-1 rounded text-xs font-bold ${bgColor} ${textColor}`}>{estado}</span>;
};

export default EstadoEntrega;