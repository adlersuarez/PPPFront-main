type EstadoElemento = {
    estado?: number;
}

const EstadoElementos = ({estado}: EstadoElemento) => {

    var titulo = ''
    var color = ''
    var icono = ''

    switch (estado) {
        case 1:
            titulo = 'Completo'
            color = 'green-400'
            icono = 'check-lg'
            break;

        case 2:
            titulo = 'Requerido'
            color = 'yellow-400'
            icono = 'exclamation-lg'
            break;

        case 3:
            titulo = 'Apoyo'
            color = 'blue-400'
            icono = 'plus-lg'
            break;

        default:
            break;
    }

    return (
        <div
            title={titulo}
            className={`flex bg-${color} text-white rounded-sm w-6 h-6`}
        >
            <i className={`bi bi-${icono} m-auto`} />
        </div>
    );
};

export default EstadoElementos;