interface EstadoCartaProps {
    valor: number
}

export const EstadoCarta: React.FC<EstadoCartaProps> = ({ valor }) => {
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
            descripcion = 'Aceptado'
            colorFondo = 'green-400'
            break
        case 3:
            iconoClass = 'bi-x-lg' // Icono de equis para "Descartado"
            descripcion = 'Descartado'
            colorFondo = 'gray-400'
            break
        case 4:
            iconoClass = 'bi-exclamation-triangle' // Icono de triángulo de advertencia para "Anulado"
            descripcion = 'Anulado'
            colorFondo = 'red-400'
            break
        default:
            iconoClass = 'bi-question-square' // Icono de interrogación para estados desconocidos
            descripcion = 'Desconocido'
            colorFondo = 'black'
            break
    }

    return (
        <div className={`inline-block bg-${colorFondo} text-white text-xs w-6 h-6 flex mx-auto rounded-full hover:scale-110`}>
            <i className={`bi ${iconoClass} m-auto`} title={descripcion}></i>
        </div>
    )
}
