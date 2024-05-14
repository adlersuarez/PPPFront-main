import React from 'react'

interface props {
    valor: number
    className?: string
}

export const EstudianteNoCompletado: React.FC<props> = ({ valor, className }) => {
    let mensaje = ''

    switch (valor) {
        case 1:
            mensaje = 'El estudiante aún no ha generado su carta de presentación'
            break
        case 2:
            mensaje = 'Aun no hay empresa seleccionada'
            break
        case 3:
            mensaje = 'El estudiante aún no ha completado el formulario de área de trabajo'
            break
        case 4:
            mensaje = 'El estudiante aún no ha completado el formulario de duración de prácticas'
            break
        case 5:
            mensaje = 'El estudiante aún no ha completado el formulario de plan de actividades'
            break
        default:
            mensaje = 'Valor no válido'
            break
    }

    return (
        <div className={`text-center font-medium text-gray-500 text-lg py-2 px-5 border-[2px] bg-blue-50 border-upla-100 m-auto border-dashed rounded-md ${className}`}>
            <i className="text-upla-100 bi bi-info-circle-fill mr-2" />
            {mensaje}
        </div>
    )
}