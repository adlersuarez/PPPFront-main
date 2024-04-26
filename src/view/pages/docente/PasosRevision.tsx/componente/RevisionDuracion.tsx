import DuracionPracticas from "@/model/interfaces/practicas/duracionPracticas"
import Modal from "../../../../../component/pages/modal/ModalComponente"
import { convertirDuracionAMostrarFlexible } from "@/helper/herramienta.helper"
import { useEffect, useState } from "react"
import MostrarDuracionFlexible from "@/model/interfaces/practicas/mostrarDuracionFlexible"
//import MostrarDuracionEstandar from "@/model/interfaces/practicas/mostrarDuracionRegular"

type Props = {
    show: boolean
    hide: () => void
    datos: DuracionPracticas[]
    tipo: string
}

const RevisionDuracion: React.FC<Props> = ({ show, hide, tipo, datos }) => {

    const [mostrarDatosFlexible, setMostrarDatosFlexible] = useState<MostrarDuracionFlexible[]>([])
    //const [mostrarDatosEstandar, setMostrarDatosEstandar] = useState<MostrarDuracionEstandar | null>(null)

    useEffect(() => {
        setMostrarDatosFlexible(convertirDuracionAMostrarFlexible(datos))
       // setMostrarDatosEstandar(convertirDuracionAMostrarRegular(datos))
    }, [datos])

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}>
                <span className="text-upla-100 font-bold uppercase text-lg ml-2">
                    <i className="bi bi-calendar3-week mr-2" />Horario prácticas
                </span>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3">
                    <div className="text-lg">
                        <p className="font-semibold text-gray-500">Tipo de horario : <span className="text-blue-500 font-medium uppercase">{tipo}</span></p>
                    </div>

                    <div className={`grid grid-cols-2 sm:grid-cols-${mostrarDatosFlexible.length} bg-gray-100 rounded-md p-4 gap-4`}>
                        {
                            mostrarDatosFlexible.map((item, index) => (
                                <div key={index} className="border border-upla-100 bg-white">
                                    <div className="border-b border-upla-100 text-center font-medium bg-upla-100 text-white uppercase text-sm py-0.5">
                                        {item.diaNombre}
                                    </div>
                                    <div className="flex flex-col text-center text-sm">
                                        {
                                            item.detalleDia.map((detalle, ind) => (
                                                <div key={ind} className={`py-0.5 my-auto ${ind%2==0?'bg-gray-100':'bg-white'}`}>
                                                    {detalle.horaInicio} - {detalle.horaFin}
                                                    {/*convertirHora24to12(detalle.horaInicio)} - {convertirHora24to12(detalle.horaFin)*/}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
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

export default RevisionDuracion