interface EstadoUnidadTematica {
    valor: number
}

export const EstadoRequisito: React.FC<EstadoUnidadTematica> = ({ valor }) => {

    let iconoClass = ''
    let descripcion = ''
    let colorFondo = ''

    switch (valor) {
        case 1:
            iconoClass = 'bi-hourglass-bottom' // Icono de reloj para "En proceso"
            descripcion = 'Pendiente'
            colorFondo = 'gray-400'
            break
        case 2:
            iconoClass = 'bi-check-lg' // Icono de marca de verificación para "Aceptado"
            descripcion = 'Completado'
            colorFondo = 'green-400'
            break
        case 3:
            iconoClass = 'bi-dash-lg' // Icono de marca de verificación para "Aceptado"
            descripcion = 'anulado'
            colorFondo = 'red-400'
            break
        default:
            iconoClass = 'bi-question-square' // Icono de interrogación para estados desconocidos
            descripcion = 'Desconocido'
            colorFondo = 'black'
            break
    }

    return (
        <div title={descripcion}
            className={`inline-block bg-${colorFondo} text-white text-xs w-6 h-6 flex mx-auto rounded-full hover:scale-110`}>
            <i className={`bi ${iconoClass} m-auto`} />
        </div>
    )
}
