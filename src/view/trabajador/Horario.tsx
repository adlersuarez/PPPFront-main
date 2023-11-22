import { useState } from 'react';
//import { RouteComponentProps } from "react-router-dom";
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';

//import notify from 'devextreme/ui/notify';

type Props = {
    data: object[];
    color: object[];
    handleShow: () => void;
}

const Horario = (props: Props) => {

    const [allowResizing, setAllowResizing] = useState<boolean>(false);
    const [allowDragging, setAllowDragging] = useState<boolean>(false);
    const [allowAdding, setAllowAdding] = useState<boolean>(false);

    return (
        <>
            <Scheduler
                defaultCurrentView="week"
                dataSource={props.data}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                cellDuration={30}
                showCurrentTimeIndicator={false}
                onAppointmentClick={props.handleShow}
                editing={{
                    allowAdding,
                    allowResizing,
                    allowDragging,
                }}
            >
                <View
                    type="week"
                    startDayHour={8}
                    endDayHour={14}
                />
                <Resource
                    dataSource={props.color}
                    fieldExpr="roomId"
                    label="Room"
                />
            </Scheduler>
        </>
    )
}
export default Horario