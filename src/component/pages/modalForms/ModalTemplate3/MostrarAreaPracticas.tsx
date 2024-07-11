import Modal from "../../modal/ModalComponente"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import { useEffect, useRef, useState } from "react"
import AreaTrabajoPracticas from "@/model/interfaces/empresa/areaTrabajoPracticas"
import { ObtenerDatosAreaTrabajo } from "@/network/rest/practicas.network"
import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"

type Props = {
    show: boolean
    hide: () => void

    valor: boolean
}

const MostrarAreaPracticas: React.FC<Props> = ({ show, hide, valor }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const [datosAreaTrabajo, setDatosAreaTrabajo] = useState<AreaTrabajoPracticas | null>(null)

    const LoadAreaPracticas = async () => {
        const response = await ObtenerDatosAreaTrabajo<AreaTrabajoPracticas>(codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as AreaTrabajoPracticas
            setDatosAreaTrabajo(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadAreaPracticas()
    }, [valor])

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
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.empresaNombre}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>RUC :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.empresaRuc}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Estado :</div>
                                <span className="text-upla-100 font-bold">{'ACTIVO'}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Condición :</div>
                                <span className="text-upla-100 font-bold">{'HABIDO'}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-vcard mr-2" /> ÁREA DE TRABAJO
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Dirección :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.direccionAreaPracticas}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Ubigeo :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.ubigeo}</span>
                            </div>
                        </div>
                    </div>

                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className='flex sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>
                                <i className="bi bi-person-workspace mr-2" /> JEFE INMEDIATO
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.jefeInmediato}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Cargo :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.jefeCargo}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Celular :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.jefeCelular}</span>
                            </div>
                            <div className='w-full flex gap-3'>
                                <div className='whitespace-nowrap w-20 shrink-0'>Email :</div>
                                <span className="text-upla-100 font-bold">{datosAreaTrabajo?.jefeEmail}</span>
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