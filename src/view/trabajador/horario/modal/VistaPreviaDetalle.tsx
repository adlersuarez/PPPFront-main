import CustomModal from "../../../../component/Modal.component";

type Props = {
    isOpenModal: boolean,
    handleCloseModalInfo: () => void
    horario: any
    setHorarioDetActual: () => void
    handleOpenModalDetEditar: () => void
}

const VistaPreviaDetalle = (props: Props) => {

    //console.log(props.horario)

    return (
        <>
            <CustomModal
                isOpen={props.isOpenModal}
                onOpen={() => {

                }}
                onHidden={() => {

                }}
                onClose={props.handleCloseModalInfo}
            >

                <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 font-bold text-lg">Opciones de asignatura: {props.horario.asignatura}</h6>
                        <button
                            className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                            onClick={props.handleCloseModalInfo}>
                            <i className="bi bi-x-circle text-lg"></i>
                        </button>
                    </div>
                    <div className="w-full px-4 pb-2 pt-4">

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                            <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                <div className="grid grid-cols-1 md:grid-cols-1 m-4">
                                    <div className="text-sm flex flex-col">
                                        <p>Instructor:
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.docenteId} - {props.horario.docente}</span>
                                        </p>
                                        <p>Sección:
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.seccion}</span>
                                        </p>
                                        <p>Turno:
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.turno}</span>
                                        </p>
                                        <p>
                                            Horario
                                            :
                                            Desde
                                            <span className="mx-2 text-blue-700 font-bold">{props.horario.horaIni}</span>
                                            hasta
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.horaFin}</span>
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="relative flex flex-wrap justify-center">
                        <button
                            className="ml-1 flex items-center rounded border-md border-yellow-500 bg-yellow-500 text-white p-2 hover:bg-yellow-700 focus:ring-2 focus:ring-yellow-400 active:ring-yellow-400"
                            onClick={() => {
                                props.handleCloseModalInfo();
                                //props.handleOpenModalHorarioDetProcesoEditar()
                                props.handleOpenModalDetEditar()
                            }}
                        >
                            <i className="bi bi-pencil-fill mr-1"></i> Editar
                        </button>
                        <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                        >
                            <i className="bi bi-people-fill mr-1"></i> Matriculados
                        </button>
                    </div>

                    {/* <div className="relative flex flex-wrap justify-center mt-4">
    <span className="text-xs mb-2">
        Todos los campos con <i className="bi bi-asterisk text-xs text-red-500"></i> son oblicatorios
    </span>
</div> */}
                </div>
            </CustomModal>
        </>
    )
}

export default VistaPreviaDetalle