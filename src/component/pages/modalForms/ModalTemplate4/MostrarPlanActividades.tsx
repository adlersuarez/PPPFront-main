import Modal from "../../modal/ModalComponente"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import { useEffect, useRef, useState } from "react"
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica"
import Listas from "@/model/interfaces/Listas.model.interface"
import { ListarDatosUnidadTematica, ObtenerObjetivoGeneral } from "@/network/rest/practicas.network"
import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import DetalleUnidadTematica from "./componente/DetalleUnidadTematica"
import ObjetivoGeneral from "@/model/interfaces/planActividades/objetivoGeneral"
import { formatoFecha_Date_completo, formatoFecha_Date_fechaSlash } from "@/helper/herramienta.helper"

type Props = {
    show: boolean
    hide: () => void
    cambios: boolean
}

const MostrarPlanActividades: React.FC<Props> = ({ show, hide, cambios }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTematica[]>([])
    const [objetivoGeneral, setObjetivoGeneral] = useState<ObjetivoGeneral | null>(null)

    const ListarUnidadTematica = async () => {
        setUnidadesTematicas([])
        const response = await ListarDatosUnidadTematica<Listas>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as UnidadTematica[]
            setUnidadesTematicas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    //
    const MostrarObjetivoGenearl = async () => {
        setObjetivoGeneral(null)
        const response = await ObtenerObjetivoGeneral<ObjetivoGeneral>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as ObjetivoGeneral
            setObjetivoGeneral(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        ListarUnidadTematica()
        MostrarObjetivoGenearl()
    }, [cambios])

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='flex flex-col sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-2 justify-between'>
                                <div className="my-auto">
                                    <i className="bi bi-building mr-2" /> PLAN DE ACTIVIDADES
                                </div>
                                <div className="rounded bg-white px-2 py-1 my-auto text-sm cursor-default"
                                    title={"Fecha registro:  " + formatoFecha_Date_completo(objetivoGeneral?.fechaRegistro ?? '')}>
                                    <span>
                                        <i className="bi bi-calendar2-event mr-2 text-upla-100" />
                                        {formatoFecha_Date_fechaSlash(objetivoGeneral?.fechaRegistro ?? '')}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-500 text-lg">Objetivo General</span>
                                    </div>
                                    <div className="bg-white p-2 px-4 rounded">
                                        {objetivoGeneral?.objetivoGeneral}
                                    </div>
                                </div>
                                <hr />
                                <div className="border border-gray-400 rounded-md overflow-hidden">
                                    <div className="p-2 flex flex-col gap-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100 bg-white">
                                        {
                                            unidadesTematicas.map((unidad, index) => (
                                                <DetalleUnidadTematica
                                                    key={index}
                                                    unidad={unidad}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex sm:justify-end">
                    <button onClick={hide}
                        className={`w-full sm:w-auto text-white bg-green-400 hover:scale-105 hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-green-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                    >
                        Hecho
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default MostrarPlanActividades