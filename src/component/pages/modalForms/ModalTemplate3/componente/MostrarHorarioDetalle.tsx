import { useEffect, useRef, useState } from "react"
import Modal from "../../../modal/ModalComponente"
import HorarioEstudiante from "@/model/interfaces/horario/horarioEstudiante"
import { ListarHorarioEstudiante } from "@/network/rest/services.network"
import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import { DetalleDuracion } from "@/model/interfaces/datosEnviados/registroDuracionPractica"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import { combinarHorariosDetalle, convertirHora24to12, obtenerHorarioDesdeJSON } from "@/helper/herramienta.helper"
import 'devextreme/dist/css/dx.light.css';
import './style/horario.css'
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';
import HorarioItem from "@/model/interfaces/horario/horarioItem"

type Props = {
    show: boolean
    hide: () => void
    horarioElegido: DetalleDuracion[]
}

const MostrarHorarioDetalle: React.FC<Props> = ({ show, hide, horarioElegido }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const abortController = useRef(new AbortController())

    const [horario, setHorario] = useState<HorarioEstudiante[]>([])

    ////HORARIO ESTUDIANTE
    const loadHorarioEstudiante = async () => {

        const params = {
            codigo: codigo,
            modalidad: "",
            sede: "",
            carrera: "",
            facultad: "",
            especialidad: "",
            opcion: ""
        }

        const response = await ListarHorarioEstudiante<HorarioEstudiante[]>(params, abortController.current)

        if (response instanceof Response) {
            setHorario(response.data)
            return
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return

        }
    }

    useEffect(() => {
        loadHorarioEstudiante()
    }, [])

    /// scheduler
    const [dataHorario, setDataHorario] = useState<object[]>([])

    const colorRender = [
        { id: '#EF9A9A', nombreColor: 'Rojo', color: '#EF9A9A' },
        { id: '#81C784', nombreColor: 'Verde', color: '#81C784' },
    ]

    const dayOfWeekNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

    function renderDateCell(cellData: any) {
        return (
            <div className='flex justify-center gap-2 '>
                <div className="name my-auto text-base">{dayOfWeekNames[cellData.date.getDay()]}</div>
                {/* <div className="number text-xl my-auto">{cellData.date.getDate()}</div> */}
            </div>
        )
    }

    const [horarioMostrado, setHorarioMostrado] = useState<HorarioItem[]>([])

    useEffect(() => {
        setHorarioMostrado(combinarHorariosDetalle(obtenerHorarioDesdeJSON(horario), horarioElegido))
    }, [horarioElegido, horario])

    useEffect(() => {
        dataRenderHorario()
    }, [horarioMostrado])

    const dataRenderHorario = () => {

        if (horarioMostrado.length > 0) {

            setDataHorario(
                horarioMostrado.map((item) => {

                    const currentDate = new Date()

                    const startDate = new Date(currentDate)
                    const endDate = new Date(currentDate)

                    const [startHour, startMin] = item.horaIni.split(":")
                    const [endHour, endMin] = item.horaFin.split(":")

                    startDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0)
                    endDate.setHours(parseInt(endHour), parseInt(endMin), 0, 0)

                    return {
                        detHorarioId: item.detHorarioId,
                        asiId: item.asiId,
                        asignatura: item.asignatura,
                        diaId: item.diaId,
                        dia: item.dia,
                        horaIni: item.horaIni,
                        horaFin: item.horaFin,
                        color: item.color,
                        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.diaId - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.diaId - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),
                        recurrenceRule: 'FREQ=WEEKLY',
                    }
                })
            )
        }
    }

    const renderCard = (item: any) => {

        const horario = item.appointmentData

        return (
            <div className="flex flex-col h-full justify-between gap-2"
                title={horario.asignatura + ' ---- ' + convertirHora24to12(horario.horaIni) + ' - ' + convertirHora24to12(horario.horaFin)}>
                <div className="p-0.5 ">
                    <div className="flex text-upla-100 w-full whitespace-normal bg-white p-1 rounded text-center uppercase overflow-hidden">
                        <span className="font-normal text-xs">{horario.asignatura}</span>
                    </div>
                </div>
                <div className="p-1">
                    <div className="flex gap-1 justify-between px-2 rounded bg-white p-1 overflow-hidden">
                        <i className="text-upla-100 bi bi-clock" />
                        <span className="my-auto font-medium text-xs text-gray-500">
                            {convertirHora24to12(horario.horaIni)}
                            <span>{" - "}</span>
                            {convertirHora24to12(horario.horaFin)}
                        </span>
                    </div>
                </div>

            </div>
        )
    }

    return (

        <Modal onShow={show} maxWidth="max-w-[1500px]">
            <Modal.Header closeButton onHide={hide}>
                <div className="flex gap-8">
                    <span className="text-upla-100 font-bold ml-2 text-lg uppercase">
                        <i className="mr-2 bi bi-info-circle-fill" />
                        Detalle horario prácticas
                    </span>
                </div>

            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100 border-2 border-upla-100'>
                <div className="min-w-[1200px]"> 
                    <Scheduler
                        timeZone="America/Lima"
                        defaultCurrentView="week"
                        dataSource={dataHorario}
                        showAllDayPanel={false}
                        firstDayOfWeek={1}
                        cellDuration={60}
                        showCurrentTimeIndicator={false}

                        onAppointmentTooltipShowing={(e) => e.cancel = true}
                        width={"100%"}
                        height={"100%"}
                        appointmentRender={renderCard}
                        //onAppointmentClick={(e: any) => handleOpenModalInfo(e)}
                        editing={false}
                    >
                        <View
                            type="week"
                            startDayHour={7}
                            endDayHour={24}
                            dateCellRender={renderDateCell}
                        />
                        <Resource
                            dataSource={colorRender}
                            fieldExpr="color"
                        />
                    </Scheduler>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-between">
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex flex-row gap-2">
                            <div className="my-auto bg-[#EF9A9A] w-10 h-5 shrink-0"/>
                            <span className="my-auto font-medium text-gray-500">Horario Académico</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <div className="my-auto bg-[#81C784] w-10 h-5 shrink-0"/>
                            <span className="my-auto font-medium text-gray-500">Horario Prácticas preprofesionales</span>
                        </div>
                    </div>
                    <div className="flex">
                        <button
                            onClick={hide}
                            className={`text-white h-10 bg-green-400 hover:bg-upla-100 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10`}
                        >
                            Hecho
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default MostrarHorarioDetalle