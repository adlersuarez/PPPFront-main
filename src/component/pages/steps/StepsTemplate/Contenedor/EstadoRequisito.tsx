type EstadoElemento = {
    estado?: number;
}

const EstadoRequisito = ({ estado }: EstadoElemento) => {

    var titulo = ''
    var color = ''
    var icono = ''
    
    switch (estado) {
        case 1:
            titulo = 'Completado'
            color = 'green-500'
            icono = 'check-lg'
            break;

        case 2:
            titulo = 'Requerido'
            color = 'yellow-300'
            icono = 'exclamation-lg'
            break;

        default:
            break;
    }

    return (
        <div
        title={titulo} 
            className={`rounded-full bg-${color} text-white items-center justify-center w-6 h-6 flex mx-auto`}>
            <i className={`bi bi-${icono} m-auto`} />
        </div>
    );
};

export default EstadoRequisito;