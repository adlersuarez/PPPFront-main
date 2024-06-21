import { useEffect } from "react"
import Modal from "../../modal/ModalComponente"
import CartaPresentacionDatos from "@/model/interfaces/cartaPresentacion/cartaPresentacion"
import { convertirANumerosRomanos, corregirDNI } from "@/helper/herramienta.helper"

type Props = {
    datosCarta: CartaPresentacionDatos
    show: boolean
    hide: () => void
}

const ModalMostrarDatos: React.FC<Props> = ({ show, hide, datosCarta }) => {

    useEffect(() => {
    }, [datosCarta])

    if (datosCarta == null) {
        return
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
                                <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.empresaNombre}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>RUC :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.empresaRuc}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Estado :</div>
                                <span className="text-upla-100 font-bold">{'ACTIVO'}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Condición :</div>
                                <span className="text-upla-100 font-bold">{'HABIDO'}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Dirección :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.empresaDireccion}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Ubicación :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.empresaDPD}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-workspace mr-2" /> REPRESENTANTE
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.repNombreCompleto}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>DNI :</div>
                                <span className="text-upla-100 font-bold">{corregirDNI(datosCarta.repDni)}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Cargo :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.repCargoNombre}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-vcard mr-2" /> PRACTICANTE
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.estNombreCompleto}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Código :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.estId}</span>
                            </div>

                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Facultad :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.estFacultad}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Carrera :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.estCarrera}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Nivel :</div>
                                <span className="text-upla-100 font-bold">{convertirANumerosRomanos(datosCarta.estNivel)}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Curso :</div>
                                <span className="text-upla-100 font-bold">{datosCarta.estCurso}</span>
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

export default ModalMostrarDatos