import ExcluidoPracticas from "@/model/interfaces/practicas/excluidoPracticas"
import Modal from "../../../../../component/pages/modal/ModalComponente"
import { formatoFecha_Date_fechaSlash } from "@/helper/herramienta.helper"

type Props = {
    show: boolean
    hide: () => void
    datos: ExcluidoPracticas[]
}

const RevisionExcluido: React.FC<Props> = ({ show, hide, datos }) => {

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}>
                <span className="text-upla-100 font-bold uppercase text-lg ml-2">
                    <i className="bi bi-calendar-minus mr-2" />Dias excluidos
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col w-full rounded-t-md  border-upla-100 border overflow-hidden text-sm font-bold'>
                        {/* Cabecera */}
                        <div className="w-full flex uppercase bg-upla-100 text-white border-gray-200 py-1.5">
                            <div className="w-24 text-center">Fecha</div>
                            <div className="flex-grow text-left px-3">Motivo</div>

                        </div>
                        <div className='flex flex-col max-h-92 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100'>
                            {/* Filas de datos */}
                            {datos.map((excludedDay, index) => (
                                <div key={index} className="flex bg-white border-b border-gray-200 py-2 text-sm font-normal">
                                    <div className="w-24 text-center flex-shrink-0">{formatoFecha_Date_fechaSlash(excludedDay.fechaExcluida)}</div>
                                    <div className="flex-grow text-left px-3">{excludedDay.motivo}</div>
                                </div>
                            ))}
                        </div>
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

export default RevisionExcluido