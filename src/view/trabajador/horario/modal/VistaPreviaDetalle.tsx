import { diaSelect } from "@/helper/herramienta.helper";
import CustomModal from "../../../../component/Modal.component";

type Props = {
    isOpenModal: boolean,
    handleCloseModalInfo: () => void
    horario: any
    setHorarioDetActual: () => void
    handleOpenModalDetEditar: () => void
}

const VistaPreviaDetalle = (props: Props) => {

    const diaSeleccionado = diaSelect.find(dia => dia.id === props.horario.dia);
    const nombreDia = diaSeleccionado ? diaSeleccionado.dia : 'Día no válido';

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

                <div className="relative flex flex-col min-w-0 w-80 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                    <div className="flex justify-between">
                        <h6 className="py-1 px-4 font-bold text-lg"> {props.horario.asignatura}</h6>
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
                                    <div className="text-sm flex flex-col gap-1">
                                        <p>
                                            Instructor:
                                            <span className="ml-2 text-blue-700 font-bold">
                                                {props.horario.docente?.trim() ? (
                                                    props.horario.docente
                                                ) : (
                                                    <span className="bg-yellow-300 text-white px-2 py-0.5 rounded-lg">Sin asignar</span>
                                                )}
                                            </span>
                                        </p>

                                        <p>Capacidad:
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.capacidad}</span>
                                        </p>
                                        <p>Día:
                                            <span className="ml-2 text-blue-700 font-bold">{nombreDia}</span>
                                        </p>
                                        <p>
                                            Horario
                                            :
                                            
                                            <span className="mx-2 text-blue-700 font-bold">{props.horario.horaIni?.slice(0, -3)}</span>
                                            -
                                            <span className="ml-2 text-blue-700 font-bold">{props.horario.horaFin?.slice(0, -3)}</span>
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
                            <i className="bi bi-pencil-fill mr-1"></i> Editar Horario
                        </button>
                        {/* <button
                            className="ml-1 flex items-center rounded border-md border-green-500 bg-green-500 text-white p-2 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400"
                        >
                            <i className="bi bi-people-fill mr-1"></i> Matriculados
                        </button> */}
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