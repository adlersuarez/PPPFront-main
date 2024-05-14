import { useState } from "react"
import Modal from "../../../../../component/pages/modal/ModalComponente"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Response from "@/model/class/response.model.class"
import VistaPreviaDocumentosFile from "@/component/VistaPreviaDocumentosFile"
import useSweerAlert from "../../../../../component/hooks/useSweetAlert"
import { RegistrarDocumentoDocente } from "@/network/rest/cargarArchivos.network"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import FilePreview from "@/model/interfaces/documento/filePreview"

type Props = {
    show: boolean
    hide: () => void
    changeInit: () => void

    estudianteId: string
    periodoString: string
    asiId: string
}

const ModalFichaMonitoreo: React.FC<Props> = ({ show, hide, changeInit, estudianteId, periodoString, asiId  }) => {

    const sweet = useSweerAlert()

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    //Datos para el nombre del archivo

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const maxFileSizeInBytes = 5 * 1024 * 1024; // 5MB

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {

            const fileSize = (file.size / (1024 * 1000)).toFixed(2) // 1024*1024

            if (file.size > maxFileSizeInBytes) {
                toast.error(`El tamaño del archivo: ${fileSize} MB, excede el tamaño máximo permitido.`)
                return
            }
            setSelectedFile(file)
        }
    }

    const handleEliminarFile = () => {
        setSelectedFile(null)
    }


    const handleGuardarCambios = () => {
        if (selectedFile) {
            //Carta aceptacion es CA-
            const nombreArchivo: string = "FM-" + estudianteId + "-" + periodoString + "-" + asiId + ".pdf"

            // Crear una nueva instancia de File con el nuevo nombre
            const archivoConNuevoNombre = new File([selectedFile], nombreArchivo, {
                type: selectedFile.type,
            })

            sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
                if (value) {
                    const formData = new FormData()
                    formData.append('Archivo', archivoConNuevoNombre)

                    sweet.openInformation("Mensaje", "Procesando información...")

                    const response = await RegistrarDocumentoDocente<RespValue>('FM', estudianteId, periodo, formData)

                    if (response instanceof Response) {
                        if (response.data.value == "procesado") {
                            sweet.openSuccess("¡Operación completada con éxito!", "La ficha de monitoreo ha sido cargada satisfactoriamente.", () => {
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
    }

    //////////Vista previa Documentos
    const [showDoc, setShowDoc] = useState<boolean>(false)
    const handleShowDoc = () => setShowDoc(true)
    const handleCloseDoc = () => setShowDoc(false)

    const archivosVistaPrevia: FilePreview[] = [
        {
            nombre: selectedFile?.name ?? '',
            url: selectedFile ? URL.createObjectURL(selectedFile) : '',
        },
    ]

    //Código de asignatura

    return (

        <Modal onShow={show} maxWidth="max-w-[500px]">
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3">
                    <VistaPreviaDocumentosFile
                        show={showDoc}
                        close={handleCloseDoc}
                        files={archivosVistaPrevia}
                    />
                    <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex text-upla-100'>
                            <i className="bi bi-clipboard-check ml-2 text-2xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>FICHA DE MONITOREO</span>
                        </div>

                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='flex flex-col sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className="flex">
                                <div className="flex flex-col h-full w-full">
                                    <div className="flex flex-col gap-1 h-full w-full">
                                        <label htmlFor="fileInput" className='font-bold text-gray-500 flex items-center'>
                                            Seleccionar Archivo <span className="ml-1 font-medium">(Max 5MB)</span> <i className="text-red-500 bi bi-asterisk text-xs ml-1" />
                                        </label>
                                        <div className="flex flex-col gap-4 w-full">
                                            <input type="file" id="fileInput" className="border rounded-md text-xs w-full h-full bg-white" accept=".pdf"
                                                onChange={handleFileChange} />
                                            {
                                                selectedFile &&
                                                <div className="flex bg-white p-2 w-full">
                                                    <button className="my-auto border text-upla-100 hover:bg-blue-50 border-upla-100 px-2 py-0.5 text-xs flex gap-3 rounded-md ">
                                                        <span onClick={() => handleShowDoc()} >{selectedFile?.name}</span>
                                                        <span onClick={handleEliminarFile}
                                                            className="hover:text-red-500" role="button">
                                                            <i className="bi bi-x-lg" />
                                                        </span>
                                                    </button>

                                                </div>

                                            }
                                        </div>

                                       

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex sm:justify-end">
                    <button onClick={handleGuardarCambios}
                        className={`w-full sm:w-auto text-white bg-green-400 hover:scale-105 hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-green-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                    >
                        Registrar ficha de monitoreo
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalFichaMonitoreo