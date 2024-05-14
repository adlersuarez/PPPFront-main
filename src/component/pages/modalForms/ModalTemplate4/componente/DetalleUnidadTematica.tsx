import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Listas from "@/model/interfaces/Listas.model.interface"
import ActividadUnidad from "@/model/interfaces/planActividades/actividades"
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica"
import { ObtenerActividadesUnidadTematicaEspecifica } from "@/network/rest/practicas.network"
import { useEffect, useRef, useState } from "react"
import ActividadesUnidadTematica from "./ActividadesUnidadTematica"

type Props = {
    unidad: UnidadTematica
}

const DetalleUnidadTematica: React.FC<Props> = ({ unidad }) => {

    const abortController = useRef(new AbortController())
    const [actividadesUnidad, setActividadesUnidad] = useState<ActividadUnidad[]>([])

    const ObtenerActividadesUnidad = async () => {
        setActividadesUnidad([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidad.unidadTematicaId, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        ObtenerActividadesUnidad()
    }, [unidad])

    return (
        <div className="border-2 border-gray-400">
            <div className="w-full bg-gray-400 p-1 text-center text-white font-medium">
                UNIDAD TEMÁTICA {unidad.numeroUnidad}
            </div>
            <div className="flex flex-col p-2 gap-2">
                <div className="flex rounded border-upla-100 border">
                    <div className="w-24 bg-upla-100 text-white p-2 font-medium text-sm shrink-0">
                        Objetivo Específico
                    </div>
                    <div className="p-2 px-3 text-sm">
                        {unidad.objetivoEspecifico}
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                    <span className="font-semibold">Actividades:</span>
                    <div className="flex flex-col gap-1">
                        {
                            actividadesUnidad.map((act, index) => (
                                <ActividadesUnidadTematica
                                    key={index}
                                    actividad={act}
                                />
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )

}

export default DetalleUnidadTematica