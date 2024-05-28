import { generateExcel } from "@/helper/reporte.helper";
import SeccionDetalle from "@/model/interfaces/reportes/seccionDetalle";
import { useState } from "react";

interface Props {
    datos: SeccionDetalle
    periodoId: number
}

export const ButtonGenerarReporte: React.FC<Props> = ({ datos, periodoId }) => {
    const [descargando, setDescargando] = useState<boolean>(false)

    const reporteNuevo = async () => {
        setDescargando(true)
        try {
            await generateExcel(datos.car_Id, datos.asi_Id, datos.per_Id, datos.sed_Id, datos.seccion, periodoId)
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error)
        }
        setDescargando(false)
    }

    return (
        <button
            disabled={descargando}
            onClick={() => reporteNuevo()}
            className={` hover:bg-upla-100 rounded px-2 py-1 text-white font-medium hover:scale-y-105 ${descargando ? 'opacity-50  bg-green-500' : 'bg-gray-400'}`}
        >
            <i className={`bi bi-${descargando ? 'file-earmark-excel' : 'download'} mr-2`} />
            {descargando ? 'Descargando...' : 'Generar Reporte'}
        </button>
    )
}