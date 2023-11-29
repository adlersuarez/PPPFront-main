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
        // console.log(props.data)
    }, []);


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
                onAppointmentClick={() => { }}
                editing={{
                    allowAdding,
                    allowResizing,
                    allowDragging,
                }}
            >
                <View
                    type="week"
                    startDayHour={6}
                    endDayHour={22}
                />
                <Resource
                    // dataSource={props}
                    fieldExpr="roomId"
                    label="Room"
                />
            </Scheduler>
            {

                /*
                <Scheduler
                    className=""

                    timeZone="America/Lima"
                    dataSource={props.data}
                    views={[]}
                    // showEmptyCells={true}
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