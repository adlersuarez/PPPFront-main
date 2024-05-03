type EstadoElemento = {
    estado?: number
}

const EstadoProceso = ({ estado }: EstadoElemento) => {

    let color = ''
    let texto = ''
    let icon = ''

    switch (estado) {
        case 1:
            color = 'green-500'
            texto = 'Completado'
            icon = 'bi-check-circle'
            break

        case 0:
            color = 'gray-400'
            texto = 'En proceso'
            icon = 'bi-clock-history'
            break

        default:
            break
    }

    return (
        <div className={`flex rounded-md bg-${color} text-white text-xs px-2 w-auto gap-2 cursor-default`} >
            <i className={`bi ${icon} my-auto`} />
            <span className="my-auto">{texto}</span>
        </div>
    );
};

export default EstadoProceso;