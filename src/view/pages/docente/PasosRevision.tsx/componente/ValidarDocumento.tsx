import { useState } from "react"
import Modal from "../../../../../component/pages/modal/ModalComponente"

import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Response from "@/model/class/response.model.class"

import useSweerAlert from "../../../../../component/hooks/useSweetAlert"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import { ValidarDocumento } from "@/network/rest/practicas.network"
import toast from "react-hot-toast"
import { obtenerDescripcion } from "@/helper/herramienta.helper"

type Props = {
    idDoc: number
    tipoDoc: string
    show: boolean
    hide: () => void
    changeInit: () => void
}

const ModalValidarDocumento: React.FC<Props> = ({ show, hide, changeInit, tipoDoc, idDoc }) => {

    const sweet = useSweerAlert()
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const validarDocumento = () => {

        if (aprobado === null) {
            toast.error("Es necesario seleccionar una opción")
            return
        }
        if (aprobado === false && observacionDocumento.trim() == "") {
            toast.error("Es necesario detallar el motivo por el cual se rechaza")
            return
        }

        const params = {
            documentosId: idDoc,
            periodoId: periodo,
            tipoValidacion: aprobado ? 'A' : 'R',
            tipoDocumento: tipoDoc,
            observacion: observacionDocumento
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                console.log(params)

                const response = await ValidarDocumento<RespValue>(params)

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "El documento ha sido validado satisfactoriamente.", () => {
                            changeInit()
                            hide()
                        })
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return
                    if (response.getStatus() == 401) return
                    if (response.getStatus() == 403) return

                    console.log(response.getMessage())

                    sweet.openWarning("Error", "Por favor, comuníquese con la Oficina de Informática.", () => { })
                }
            }
        })
    }

    ///
    const [observacionDocumento, setObservacionDocumento] = useState<string>("")
    const [aprobado, setAprobado] = useState<boolean | null>(null)

    const closeModal = () => {
        setAprobado(null)
        setObservacionDocumento("")
        hide()
    }

    const Aprobar = (tipo: boolean) => {
        if (tipo === true) {
            setAprobado(true)
            setObservacionDocumento("")
        }
        if (tipo === false) {
            setAprobado(false)
        }
    }

    const estadoAprobado = aprobado === true || aprobado === null

    return (

        <Modal onShow={show} maxWidth="max-w-xl">
            <Modal.Header closeButton onHide={closeModal}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3">

                    <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex text-upla-100'>
                            <i className="bi bi-clipboard-check ml-2 text-2xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto uppercase'>VALIDAR - {obtenerDescripcion(tipoDoc)}</span>
                        </div>

                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='flex flex-col sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className="flex flex-col gap-6">

                                <div className="flex flex-col gap-4">
                                    <span className="text-gray-500 font-medium flex gap-2">
                                        Revisión de Documento
                                    </span>
                                    <div className="grid grid-cols-2 gap-4 ">
                                        <button
                                            className={`bg-${aprobado === true ? 'green-400 text-white font-medium' : 'white'} py-2 px-4 rounded-md border border-gray-300`}
                                            onClick={() => Aprobar(true)}
                                        >
                                            Documento válido
                                        </button>
                                        <button
                                            className={`bg-${aprobado === false ? 'red-400 text-white font-medium' : 'white'} py-2 px-4 rounded-md border border-gray-300`}
                                            onClick={() => Aprobar(false)}
                                        >
                                            Necesita corregir
                                        </button>
                                    </div>

                                </div>


                                <div className="flex flex-col h-full">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500 font-medium">
                                            Detalle (<i className="text-red-400 text-sm">Requerido si se observa el documento</i>)
                                        </span>
                                        <textarea
                                            disabled={estadoAprobado}
                                            value={observacionDocumento}
                                            placeholder={estadoAprobado ? 'No requerido' : "Ej. El documento no tiene ..."}
                                            className={`w-full rounded-md px-4 border border-gray-300 focus-visible:ring-blue-200
                                            transition-colors duration-300 ease-in-out focus:ring-0 text-sm h-40 resize-none scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100 ${estadoAprobado && 'bg-gray-200'}`}
                                            onChange={(e) => setObservacionDocumento(e.target.value)}
                                        />

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex sm:justify-end">
                    <button onClick={validarDocumento}
                        className={`w-full sm:w-auto text-white bg-green-400 hover:scale-105 hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-green-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                    >
                        Guardar cambios
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalValidarDocumento