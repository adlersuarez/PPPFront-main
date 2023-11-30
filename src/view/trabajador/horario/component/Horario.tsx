import { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';
import CustomModal from '../../../../component/Modal.component';

type Props = {
    data: object[];
    color: object[];
    handleOpenModalHorarioDetProcesoEditar: () => void
    //handleShow: () => void;
}

const Horario = (props: Props) => {

    // const [horario, setHorario] = useState<object[]>([])
    // const [allowResizing] = useState<boolean>(false);
    // const [allowDragging] = useState<boolean>(false);
    // const [allowAdding] = useState<boolean>(false);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [horarioDetActual, setHorarioDetActual] = useState<any>({})

    useEffect(() => {
        // console.log(props.color)
        // console.log(prop)
    }, []);

    const renderCard = (item: any) => {

        // console.log(props.color)

        const horario = item.appointmentData

        return (

            <div className={`p-1  my-1 rounded-sm`} style={{ backgroundColor: `${horario.color}` }} >
                <p className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{horario.asignatura}</p>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{horario.docenteId}</p>
                <p className="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400" style={{ fontSize: '10px' }}>{horario.docente}</p>

                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a> */}
                <p className="mb-1 font-bold text-xs text-gray-700 dark:text-gray-400">{horario.horaIni} - {horario.horaFin}</p>
            </div>

        )
    }

    const handleOpenModal = (e: any) => {

        setIsOpenModal(true)
        setHorarioDetActual(e.appointmentData)
    }

    const handleCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <>
            <CustomModal
                isOpen={isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {
                    // setIdTurno(0)
                    setHorarioDetActual({})

                }}
                onClose={handleCloseModal}
            >

                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Opciones de asignatura: {horarioDetActual.asignatura}</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={handleCloseModal}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="m-4">

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1">
                                        <div className="text-sm">
                                            <p>Docente: <span className="text-blue-700 font-bold">{horarioDetActual.docenteId} - {horarioDetActual.docente}</span></p>
                                            <p>Seccion: <span className="text-blue-700 font-bold">{horarioDetActual.seccion}</span></p>
                                            <p>Turno: <span className="text-blue-700 font-bold">{horarioDetActual.turno}</span></p>
                                            <p>horario: Desde <span className="text-blue-700 font-bold">{horarioDetActual.horaIni}</span> hasta <span className="text-blue-700 font-bold">{horarioDetActual.horaFin}</span></p>
                                            <p>Tipo de Estudio: <span className="text-blue-700 font-bold">{horarioDetActual.tipoEstudio}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-yellow-500 bg-yellow-500 text-white p-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 active:ring-yellow-400"
                            onClick={() => {
                                handleCloseModal();
                                props.handleOpenModalHorarioDetProcesoEditar()
                            }}
                        >
                            <i className="bi bi-pencil-fill mr-1"></i> Editar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                        >
                            <i className="bi bi-people-fill mr-1"></i> Matriculados
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                            onClick={handleCloseModal}
                        >
                            <i className="bi bi-x-circle mr-1"></i> Cerrar
                        </button>
                    </div>

                    {/* <div className="relative flex flex-wrap justify-center mt-4">
                        <span className="text-xs mb-2">
                            Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
                        </span>
                    </div> */}
                </div>

            </CustomModal>



            <Scheduler
                timeZone="America/Lima"

                defaultCurrentView="week"
                dataSource={props.data}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                cellDuration={30}
                showCurrentTimeIndicator={false}

                onAppointmentTooltipShowing={(e) => e.cancel = true}
                width={"100%"}
                height={"100%"}
                appointmentRender={renderCard}
                onAppointmentClick={(e: any) => handleOpenModal(e)}
                editing={false}
            >
                <View
                    type="week"
                    startDayHour={6}
                    endDayHour={22}

                />
                <Resource
                    dataSource={props.color}
                    fieldExpr="roomId"
                // label="Room"
                />
            </Scheduler>
            {

                /*
                
                                <Scheduler
                                    className=""
                
                                    timeZone="America/Lima"
                                    dataSource={props.data}
                                    views={[]}
                                    //showEmptyCells={true}
                                    // allowPrint={true}             
                                    defaultCurrentView="week"
                                    // defaultCurrentDate={currentDate}             
                                    // appointmentComponent={Appointment}
                                    // appointmentTooltipComponent={AppointmentTooltip}
                                    // showAppointmentToolTip={true}
                                    // onAppointmentClick={editarAsignatura}
                                    //   onContentReady={onContentReady}
                                    onAppointmentTooltipShowing={(e) => e.cancel = true}
                                    // showFullTooltip={true}            
                                    height={"100%"}
                                    width={"100%"}
                                    cellDuration={30}
                                    showAllDayPanel={false}
                                    editing={false}
                                //showDatePicker={false}
                                // allowTimeZoneEditing={false}  
                
                                // startDayHour={Math.min(...horario.map(evento => new Date(evento.startDate).getHours()))||7}
                                // endDayHour={Math.max(...horario.map(evento => new Date(evento.endDate).getHours()))+1||24}
                                >
                
                
                                </Scheduler>
                */

            }

        </>
    )
}



export default Horario