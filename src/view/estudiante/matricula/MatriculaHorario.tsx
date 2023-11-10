import React from 'react';
import { NavLink, RouteComponentProps } from "react-router-dom";
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource, DataCellProps } from 'devextreme-react/scheduler';
import { CellData as SchedulerCellData } from 'devextreme-react/scheduler';


// import { Scheduler, View, Resource } from 'devextreme-react/scheduler';

const MatriculaHorario = (props: RouteComponentProps<{}>) => {

    const resourcesList = ['Assignee', 'Room', 'Priority'];

    const data = [
        {
            text: 'HORARIO REGULAR 1',
            roomId: 1,
            startDate: new Date(2023, 10, 6, 8, 0),
            endDate: new Date(2023, 10, 6, 9, 30),
            recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        }, {
            text: 'HORARIO REGULAR 2',
            roomId: 2,
            startDate: new Date(2023, 10, 6, 9, 30),
            endDate: new Date(2023, 10, 6, 11, 0),
            recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        }, {
            text: 'HORARIO REGULAR 3',
            roomId: 3,
            startDate: new Date(2023, 10, 6, 11, 0),
            endDate: new Date(2023, 10, 6, 12, 30),
            recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        }, {
            text: 'HORARIO REGULAR 4',
            roomId: 4,
            startDate: new Date(2023, 10, 6, 12, 30),
            endDate: new Date(2023, 10, 6, 14, 0),
            recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        }, {
            text: 'HORARIO INTENSIVO 1',
            roomId: 5,
            startDate: new Date(2023, 10, 12, 8, 0),
            endDate: new Date(2023, 10, 12, 11, 0),

        }, {
            text: 'HORARIO INTENSIVO 2',
            roomId: 6,
            startDate: new Date(2023, 10, 12, 11, 0),
            endDate: new Date(2023, 10, 12, 14, 0),
        },
    ];

    const colorCR = [
        {
            text: 'ClassRoom 1',
            id: 1,
            color: '#6C3483',
        },
        {
            text: 'ClassRoom 2',
            id: 2,
            color: '#1ABC9C',
        },
        {
            text: 'ClassRoom 3',
            id: 3,
            color: '#F1C40F',
        },
        {
            text: 'ClassRoom 4',
            id: 4,
            color: '#D35400',
        },
        {
            text: 'ClassRoom 5',
            id: 5,
            color: '#2ECC71',
        },
        {
            text: 'ClassRoom 6',
            id: 6,
            color: '#5D6D7E',
        },
    ];

    const turno = [
        {
            text: 'Mañana',
            id: 1,
        },
        {
            text: 'Tarde',
            id: 2,
        },
        {
            text: 'Noche',
            id: 3,
        },
    ]

    function renderDateCell(){
        return (
            <React.Fragment>
                <div>hola</div> 
            </React.Fragment>
        )
    }

    return (
        <>
            <Scheduler
                defaultCurrentView="week"
                dataSource={data}
                showAllDayPanel={false}
                firstDayOfWeek={1}
                cellDuration={30}
                // showNavigator={false}
            >
                <View
                    type="week"
                    startDayHour={8}
                    endDayHour={14}
                />
                <Resource
                    dataSource={colorCR}
                    fieldExpr="roomId"
                    label="Room"
                />

            </Scheduler>
        </>
    )
}
export default MatriculaHorario