import Modal from "../../modal/ModalComponente"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"

type Props = {
    show: boolean
    hide: () => void
}

const MostrarDuracionHorario: React.FC<Props> = ({ show, hide }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const asignatura = useSelector((state: RootState) => state.infoEstudiante.asignatura)


    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <span className="font-medium text-gray-400 text-lg">DURACIÓN PRÁCTICAS PREPROFESIONALES</span>
                    <div className="flex gap-8">
                        <div>
                            Fecha Inicio: <span className="text-blue-500 font-medium">25/05/2024</span>
                        </div>
                        <div>
                            Fecha Fin: <span className="text-blue-500 font-medium">25/05/2024</span>
                        </div>
                    </div>
                    <div>
                        Horario de practicas
                    </div>
                    <div>
                     <b>aqui</b> va el detalle
                    </div>
                    <div>
                        <b>lista</b> dias excluidos
                    </div>
                    <div>
                        <b>botones</b>  --- mostrar horario con calendario
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex sm:justify-end">
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