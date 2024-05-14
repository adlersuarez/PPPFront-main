import React from "react"

interface AlertProps {
    step: number
}

const MensajePasoNoCargado: React.FC<AlertProps> = ({ step }) => {
    let message = ""

    switch (step) {
        case 1:
            message = "El estudiante aún no ha registrado una Carta de Presentación"
            break
        case 2:
            message = "El estudiante aún no ha cargado su Carta de Aceptación"
            break
        case 3:
            message = "El estudiante aún no ha registrado los datos de su Área de trabajo"
            break
        case 4:
            message = "El estudiante aún no ha registrado su Plan de Actividades"
            break
        case 5:
            message = "El estudiante aún no ha registrado ninguna Unidad Temática"
            break
        case 6:
            message = "El estudiante aún no ha registrado ningún documento"
            break
        default:
            message = "Mensaje por defecto"
    }

    return (
        <div className="w-full col-span-3 text-center p-8 border-[2px] border-gray-400 border-dashed bg-gray-100 text-xl rounded">
            <p className="font-medium text-gray-500">
                <i className="animate-pulse text-upla-100 mr-2 bi bi-info-circle-fill" />
                {message}
            </p>
        </div>
    )
}

export default MensajePasoNoCargado
