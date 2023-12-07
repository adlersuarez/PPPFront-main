import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import { Scheduler, View, Resource } from 'devextreme-react/scheduler';
import CustomModal from '../../../component/Modal.component';

//import '../component/style/horario.css'

type Props = {
    isOpenModal: boolean,
    data: object[];
    color: object[];
    idIdioma: number,
    idHorario: number,
    handleCloseModal: () => void
}

const Horario = (props: Props) => {

    const renderCard = (item: any) => {

        const horario = item.appointmentData

        return (
            <div className={`p-1  my-1 rounded-sm`} style={{ backgroundColor: `${horario.color}` }} >
                <p className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">{horario.asignatura}</p>
                {/* <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{horario.docenteId}</p> */}
                <p className="mb-1 text-xs font-normal text-gray-700 dark:text-gray-400" style={{ fontSize: '10px' }}>{horario.docente}</p>
                <p className="mb-1 font-bold text-xs text-gray-700 dark:text-gray-400">{horario.horaIni} - {horario.horaFin}</p>
            </div>
        )
    }

    const dayOfWeekNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    function renderDateCell(cellData: any) {
        return (
            <React.Fragment>
                {/*<div className="name">{dayOfWeekNames[cellData.date.getDay()]}</div>
                <div className="number">{cellData.date.getDate()}</div>*/}
                {
                    <div className='flex justify-center gap-2 '>
                        <div className="name my-auto text-xs sm:text-base">{dayOfWeekNames[cellData.date.getDay()]}</div>
                        {/*<div className="number text-xl my-auto">{cellData.date.getDate()}</div>*/}
                    </div>
                }
            </React.Fragment>
        );
    }

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {
                    /*setIdTurno(0)
                    setIdPrograma(0)
                    setIdTipoEstudio(0)
                    setSeccion("0")
                    setEstado(true)*/
                }}
                onClose={props.handleCloseModal}
            >
                <div className='relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3'>
                    <div className="flex justify-between px-4 py-2">
                        <h6 className="py-1 font-bold text-lg">HORARIO</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModal}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">
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
                            //onAppointmentClick={(e: any) => handleOpenModal(e)}
                            editing={false}
                        >
                            <View
                                type="week"
                                startDayHour={6}
                                endDayHour={12}
                                dateCellRender={renderDateCell}
                            />
                            <Resource
                                dataSource={props.color}
                                fieldExpr="roomId"
                            // label="Room"
                            />
                        </Scheduler>
                    </div>

                </div>

            </CustomModal>

        </>
    )
}


export default Horario