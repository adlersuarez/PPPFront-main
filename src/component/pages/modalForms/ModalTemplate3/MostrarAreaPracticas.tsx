import Modal from "../../modal/ModalComponente"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import { corregirDNI } from "@/helper/herramienta.helper"

type Props = {
    show: boolean
    hide: () => void
}

const MostrarAreaPracticas: React.FC<Props> = ({ show, hide }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const asignatura = useSelector((state: RootState) => state.infoEstudiante.asignatura)

    const datosCarta = {
        empresaNombre: "",
        empresaRuc: "",
        empresaDireccion: "",
        empresaDPD: "",
        areaDireccion: "",
        areaDPD: "",
        jefeNombreCompleto: "",
        jefeDni: "",
        jefeCargoNombre: "",
    }

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-building mr-2" /> EMPRESA
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Nombre :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaNombre}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>RUC :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaRuc}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Estado :</div>
                                <span className="text-blue-700 font-bold">{'ACTIVO'}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Condición domicilio :</div>
                                <span className="text-blue-700 font-bold">{'HABIDO'}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Dirección :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaDireccion}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Ubicación :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaDPD}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-vcard mr-2" /> ÁREA DE TRABAJO
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Dirección :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaDireccion}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Ubicación :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.empresaDPD}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-workspace mr-2" /> JEFE INMEDIATO
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Nombre :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.jefeNombreCompleto}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>DNI :</div>
                                <span className="text-blue-700 font-bold">{corregirDNI(datosCarta.jefeDni)}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap'>Cargo :</div>
                                <span className="text-blue-700 font-bold">{datosCarta.jefeCargoNombre}</span>
                            </div>
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

export default MostrarAreaPracticas