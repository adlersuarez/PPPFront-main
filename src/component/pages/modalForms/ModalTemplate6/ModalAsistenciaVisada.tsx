import { useState } from "react"
import Modal from "../../modal/ModalComponente"
import toast from "react-hot-toast"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Response from "@/model/class/response.model.class"
import VistaPreviaDocumentosFile from "@/component/VistaPreviaDocumentosFile"
import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { RegistrarDocumento } from "@/network/rest/cargarArchivos.network"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import HerramientaDoc from "./componente/HerramientaDoc"

type Props = {
    show: boolean
    hide: () => void
    changeInit: () => void
}

const ModalAsistenciaVisada: React.FC<Props> = ({ show, hide, changeInit }) => {

    const sweet = useSweerAlert()

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const asignatura = useSelector((state: RootState) => state.infoEstudiante.asignatura)

    //Datos para el nombre del archivo
    const anio = useSelector((state: RootState) => state.infoEstudiante.anioActual)
    const per = useSelector((state: RootState) => state.infoEstudiante.periodoActual)
    const codAsig = useSelector((state: RootState) => state.infoEstudiante.asi_Id)

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
            const nombreArchivo: string = "AV-" + codigo + "-" + anio + per + "-" + codAsig + ".pdf"

            // Crear una nueva instancia de File con el nuevo nombre
            const archivoConNuevoNombre = new File([selectedFile], nombreArchivo, {
                type: selectedFile.type,
            })

            sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
                if (value) {
                    const formData = new FormData()
                    formData.append('Archivo', archivoConNuevoNombre)

                    sweet.openInformation("Mensaje", "Procesando información...")

                    const response = await RegistrarDocumento<RespValue>('AV', periodo, formData)

                    if (response instanceof Response) {
                        if (response.data.value == "procesado") {
                            sweet.openSuccess("¡Operación completada con éxito!", "La asistencia visada ha sido cargada satisfactoriamente.", () => {
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

    const archivosVistaPrevia = [
        {
            nombre: selectedFile?.name ?? '',
            url: selectedFile ? URL.createObjectURL(selectedFile) : '',
        },
    ]

    return (

        <Modal onShow={show}>
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
                            <span className='ml-4 font-bold sm:text-xl my-auto'>ASISTENCIA VISADA</span>
                        </div>

                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4'>
                        <div className='flex flex-col sm:gap-x-8 gap-2 sm:gap-y-3'>
                            <div className="grid grid-grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-4">
                                    <div className="text-upla-100 font-semibold">
                                        {asignatura}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500 font-medium flex gap-2">
                                            <div className="animate-pulse">
                                                <i className="animat bi bi-gear" />
                                            </div>  Herramientas de apoyo
                                        </span>
                                        <div className="flex flex-col gap-4 ">

                                            <HerramientaDoc
                                                titulo='Modelo de asistencia'
                                                tipoDoc='docx'
                                                urlDownload='/formatos/fcac/Modelo de Asistencia.docx'
                                                urlShow='/formatos/fcac/Modelo de Asistencia.pdf'
                                            />

                                           
                                        </div>
                                    </div>

                                </div>
                                <div className="flex flex-col h-full">
                                    <div className="flex flex-col gap-1 h-full">
                                        <label htmlFor="fileInput" className='font-bold text-gray-500 flex items-center'>
                                            Seleccionar Archivo <span className="ml-1 font-medium">(Max 5MB)</span> <i className="text-red-500 bi bi-asterisk text-xs ml-1" />
                                        </label>
                                        <div className="flex flex-col gap-2">
                                            <input type="file" id="fileInput" className="border rounded-md text-xs w-full h-full bg-white" accept=".pdf"
                                                onChange={handleFileChange} />
                                            {
                                                selectedFile &&
                                                <div className="flex bg-white p-2">
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

                                        <div className="w-full h-full flex">
                                            {/*
                                                selectedFile &&
                                                <button onClick={() => handleShowDoc()} className="text-sm rounded-md border bg-white border-gray-400 text-gray-400 hover:border-upla-100 hover:text-upla-100 m-auto p-2 px-4  hover:scale-110">
                                                    <i className="bi bi-eye" /> Vista Previa
                                                </button>
                                        */}
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
                        Registrar ASISTENCIA VISADA
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAsistenciaVisada