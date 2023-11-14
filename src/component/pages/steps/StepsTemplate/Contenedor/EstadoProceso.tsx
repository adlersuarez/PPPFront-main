type EstadoElemento = {
    estado?: number;
}

const EstadoProceso = ({ estado }: EstadoElemento) => {

    var color = ''
    var texto = ''

    switch (estado) {
        case 1:
            color = 'green-500'
            texto = 'Completado'
            break;

        case 2:
            color = 'yellow-300'
            texto = 'En proceso'
            break;

        default:
            break;
    }

    return (
        <div
            className={`flex rounded-lg bg-${color} text-white text-xs px-2 w-auto`}>
            <span className="m-auto">{texto}</span>
        </div>
    );
};

export default EstadoProceso;