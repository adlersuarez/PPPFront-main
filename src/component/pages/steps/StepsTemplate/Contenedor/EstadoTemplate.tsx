import { useEffect, useRef, useState } from "react";
import EstadoProceso from "./EstadoProceso";
import EstadoPracticas from "@/model/interfaces/practicas/estadoPracticas";
import { ObtenerEstadoPracticasEstudiante } from "@/network/rest/practicas.network";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { LoaderSvg } from "@/component/Svg.component";
//import EstadoTiempo from "./EstadoTiempo";

type DatosEstado = {
    paso: number
    //estado: number
    /*fecha: {
        presentacion: string
    }*/
}

const EstadoTemplate: React.FC<DatosEstado> = ({ paso }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const [estado_model2, setEstado_model] = useState<number[]>([])
    const [cargaEstado, setCargaEstado] = useState<boolean>(true)

    const LoadEstadoPracticas = async () => {
        setCargaEstado(true)
        setEstado_model([])
        const response = await ObtenerEstadoPracticasEstudiante<EstadoPracticas>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoPracticas
            setEstado_model(Object.values(data))
            setCargaEstado(false)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadEstadoPracticas()
    }, [paso])

    return (
        <div className="flex justify-between">
            <span className='font font-bold text-gray-500'>ESTADO</span>
            <div className='flex gap-2'>
                {
                    cargaEstado ?

                        <div className="flex my-auto">
                            <LoaderSvg />
                        </div>
                        :
                        <EstadoProceso
                            estado={estado_model2[paso - 1]}
                        />
                }

                {/*<EstadoTiempo
                    fecha={datos.fecha.presentacion}
                />*/}
            </div>
        </div>
    )
}

export default EstadoTemplate