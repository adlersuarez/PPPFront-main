import Modal from "../../modal/ModalComponente"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import { useEffect, useRef, useState } from "react"
import MostrarDuracionFlexible from "@/model/interfaces/practicas/mostrarDuracionFlexible"
import ExcluidoPracticas from "@/model/interfaces/practicas/excluidoPracticas"
import { convertirDuracionAMostrarFlexible, convertirHorarioDetalle, formatoFecha_Date_fechaSlash } from "@/helper/herramienta.helper"
import DuracionPracticas from "@/model/interfaces/practicas/duracionPracticas"
import { ListarDetalleDuracion, ListarDetalleExcluido, ObtenerDatosDuracion } from "@/network/rest/practicas.network"
import Listas from "@/model/interfaces/Listas.model.interface"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Response from "@/model/class/response.model.class"
import DuracionDetallePracticas from "@/model/interfaces/horario/duracionPracticas"
import MostrarHorarioDetalle from "./componente/MostrarHorarioDetalle"

type Props = {
    show: boolean
    hide: () => void

    valor: boolean
}

const MostrarDuracionHorario: React.FC<Props> = ({ show, hide, valor }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const [mostrarDatosFlexible, setMostrarDatosFlexible] = useState<MostrarDuracionFlexible[]>([])
    const [listaDiasPracticas, setListaDiasPracticas] = useState<DuracionPracticas[]>([])
    const [listaDiasExcluidos, setListaDiasExcluido] = useState<ExcluidoPracticas[]>([])

    const [duracionPracticas, setDuracionPracticas] = useState<DuracionDetallePracticas | null>(null)

    const abortController = useRef(new AbortController())

    const LoadDuracion = async (DuracionId: number) => {
        const response = await ListarDetalleDuracion<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as DuracionPracticas[]
            setListaDiasPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadExcluido = async (DuracionId: number) => {
        const response = await ListarDetalleExcluido<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ExcluidoPracticas[]
            setListaDiasExcluido(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDuracionPracticas = async () => {
        const response = await ObtenerDatosDuracion<DuracionDetallePracticas>(codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as DuracionDetallePracticas
            setDuracionPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadDuracionPracticas()
    }, [valor])

    useEffect(() => {
        LoadDuracion(duracionPracticas?.duracionId ?? 0)
        LoadExcluido(duracionPracticas?.duracionId ?? 0)
    }, [duracionPracticas?.duracionId])

    useEffect(() => {
        setMostrarDatosFlexible(convertirDuracionAMostrarFlexible(listaDiasPracticas))
    }, [listaDiasPracticas])

    //mostrarHorario
    const [verHorario, setVerHorario] = useState<boolean>(false)
    const handleOpenHorario = () => setVerHorario(true)
    const handleCloseHorario = () => setVerHorario(false)

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <MostrarHorarioDetalle
                    show={verHorario}
                    hide={handleCloseHorario}
                    horarioElegido={convertirHorarioDetalle(listaDiasPracticas)}
                //horarioElegido={convertirAFormatoDeseado(selectedDays, tipoHorarioSeleccionado)}
                />
                <div className="flex flex-col gap-4">
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-calendar-range mr-2" />DURACIÓN PRÁCTICAS
                            </div>
                            <div className='w-full flex flex-col sm:flex-row sm:col-span-2 justify-center gap-3 sm:gap-8 mb-3'>
                                <div className="bg-white px-2 py-1 rounded">
                                    Fecha Inicio: <span className="text-blue-500 font-medium">{formatoFecha_Date_fechaSlash(duracionPracticas?.fechaInicio ?? '')}</span>
                                </div>
                                <div className="bg-white px-2 py-1 rounded">
                                    Fecha Fin: <span className="text-blue-500 font-medium">{formatoFecha_Date_fechaSlash(duracionPracticas?.fechaFinal ?? '')}</span>
                                </div>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Cantidad de días :</div>
                                <span className="text-blue-700 font-bold">{duracionPracticas?.cantDias}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Horas semanales :</div>
                                <span className="text-blue-700 font-bold">{duracionPracticas?.cantHorasSemanales}</span>
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-100 w-full rounded-lg p-4 flex flex-col gap-4">
                        <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1 justify-between'>
                            <div>
                                <i className="bi bi-clock mr-2" />HORARIO
                            </div>
                            <span className="uppercase font-bold text-blue-700">{duracionPracticas?.tipoDias}</span>
                        </div>

                        <div className={`grid grid-cols-2 sm:grid-cols-${mostrarDatosFlexible.length}  rounded-md gap-4`}>
                            {
                                mostrarDatosFlexible.map((item, index) => (
                                    <div key={index} className="border border-upla-100 bg-white">
                                        <div className="border-b border-upla-100 text-center font-medium bg-upla-100 text-white uppercase text-sm py-0.5">
                                            {item.diaNombre}
                                        </div>
                                        <div className="flex flex-col text-center text-sm">
                                            {
                                                item.detalleDia.map((detalle, ind) => (
                                                    <div key={ind} className={`py-0.5 my-auto ${ind % 2 == 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                                        {detalle.horaInicio} - {detalle.horaFin}
                                                        {/*convertirHora24to12(detalle.horaInicio)} - {convertirHora24to12(detalle.horaFin)*/}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="bg-gray-100 w-full rounded-lg p-4 flex flex-col gap-4">
                        <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                            <i className="bi bi-calendar-x mr-2" />DÍAS EXCLUIDOS
                        </div>
                        <div className='flex flex-col gap-1 max-h-40 overflow-y-auto border border-gray-100 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100'>
                            {listaDiasExcluidos.map((excludedDay, index) => (
                                <div key={index} className="flex bg-white text-sm font-normal border border-upla-100">
                                    <div className="py-2 w-24 bg-upla-100 text-white text-center flex-shrink-0">{formatoFecha_Date_fechaSlash(excludedDay.fechaExcluida)}</div>
                                    <div className="py-2 flex-grow text-left px-3">{excludedDay.motivo}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex sm:justify-between">
                    <button onClick={handleOpenHorario}
                        className={`w-full sm:w-auto text-white bg-gray-400 hover:scale-105 hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                    >
                        <i className="bi bi-calendar3 mr-2" /> Mostrar horario
                    </button>
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

export default MostrarDuracionHorario