import { useEffect, useState } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';

type Props = {
    data: object[];
    color: object[];
    //handleShow: () => void;
}

const Horario = (props: Props) => {

    // const [horario, setHorario] = useState<object[]>([])

    const [allowResizing] = useState<boolean>(false);
    const [allowDragging] = useState<boolean>(false);
    const [allowAdding] = useState<boolean>(false);

    useEffect(() => {
        console.log(props.data)
    }, []);

    const renderCard = (item: any) => {
        // console.log(item)
        const horario = item.appointmentData
        return (

            <div className={`p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
                
                <p className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{horario.asignatura}</p>
                
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{horario.docenteId} - {horario.docente}</p>
                {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a> */}
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{horario.hIni} - {horario.hFin}</p>
            </div>

        )
    }


    return (
        <>

            <Scheduler
                timeZone="America/Lima"
                defaultCurrentView="week"
                dataSource={props.data}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                cellDuration={30}
                showCurrentTimeIndicator={false}
                // onAppointmentClick={() => <>
                //     <div>Hola</div>
                // </>}
                // onAppointmentRendered={() => (
                //     <>
                //         <div>Hola</div>
                //     </>
                // )

                // }
                // onAppointmentTooltipShowing={(e) => (<>
                //     <div>Hola</div>
                // </>)}
                // editing={{
                //     allowAdding,
                //     allowResizing,
                //     allowDragging,
                // }}
                // height={"100%"}
                width={"100%"}
                height={600}
                appointmentRender={renderCard}
                editing={false}
            >
                <View
                    type="week"
                    startDayHour={6}
                    endDayHour={22}
                />
                <Resource
                    // dataSource={}
                    fieldExpr="roomId"
                    label="Room"
                // showEmptyCells={true}
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