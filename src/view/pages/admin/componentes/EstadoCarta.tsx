interface EstadoCartaProps {
    valor: number
}

export const EstadoCartaAdmin: React.FC<EstadoCartaProps> = ({ valor }) => {
    let descripcion = ''
    let colorFondo = ''

    switch (valor) {
        case 1:
            descripcion = 'Pendiente'
            colorFondo = 'gray-400'
            break
        case 2:
            descripcion = 'Aceptado'
            colorFondo = 'green-400'
            break
        case 3:
            descripcion = 'Descartado'
            colorFondo = 'gray-400'
            break
        case 4:
            descripcion = 'Anulado'
            colorFondo = 'red-400'
            break
        default:
            descripcion = 'Desconocido'
            colorFondo = 'black'
            break
    }

    return (
        <div className={`rounded px-2 py-0.5 border font-semibold border-white text-sm bg-${colorFondo}`}>
            {descripcion}
        </div>
    )
}