import Modal from "../../modal/ModalComponente"
import { useRef, useState } from "react"
import { VerificacionDatos } from "../componentes/VerificacionDatos"
import DatosEmpresa from "@/model/interfaces/empresa/empresa"
import { FormularioEmpresa } from "../componentes/DatosEmpresa"
import toast from "react-hot-toast"
import useSweerAlert from "../../../hooks/useSweetAlert"
import RestError from "@/model/class/resterror.model.class"
import Response from "@/model/class/response.model.class"
import { RegistrarCartaPresentacion } from "@/network/rest/practicas.network"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import { Types } from "@/model/enum/types.model"
import { RegistroEmpresaCarta } from "@/model/interfaces/datosEnviados/registroEmpresaCarta"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"

type Props = {
    operacion: string
    fechaOperacion: string
    show: boolean
    hide: () => void

    init: () => void
    initEstado: () => void
}

const ModalAgregarEmpresa: React.FC<Props> = ({ show, hide, init, operacion, fechaOperacion, initEstado }) => {

    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const [step, setStep] = useState<number>(1)
    const sweet = useSweerAlert()
    const abortController = useRef(new AbortController())

    const handleNextStep = () => {
        if (formularioEmpresa.ruc.trim().length !== 11) {
            toast.error('Debe ingresar un RUC válido, con estado: ACTIVO y condición domicilio: HABIDO')
            return
        }
        if (formularioEmpresa.tipo_empresa_id === "0") {
            toast.error('Seleccione el tipo de empresa.')
            return
        }
        if (formularioEmpresa.dni_jefe.trim().length !== 8) {
            toast.error("Debe ingresar el DNI válido, y obtener el resultado")
            return
        }
        if (formularioEmpresa.id_grado_instruccion === "0") {
            toast.error('Seleccione el grado de instrucción del representante de la empresa.')
            return
        }
        if (formularioEmpresa.id_cargo_jefe === "0") {
            toast.error('Seleccione el cargo que asume el representante de la empresa.')
            return
        }
        if(formularioEmpresa.celular_jefe.trim() === ""){
            toast.error('Debe ingresar el número de celular del representante de la empresa.')
            return
        }
        if(formularioEmpresa.email_jefe.trim() === ""){
            toast.error('Debe ingresar el correo electrónico del representante de la empresa.')
            return
        }

        if (step < 2) setStep(step + 1)
    }

    const handlePrevStep = () => { if (step > 1) setStep(step - 1) }

    const [formularioEmpresa, setFormularioEmpresa] = useState<DatosEmpresa>({
        ruc: '',
        tipo_empresa_id: '0',
        nombre_empresa: '',
        direccion_empresa: '',
        dpd_empresa: '',
        ubigeo_empresa: '',
        estado_empresa: '',
        condicion_domicilio: '',
        dni_jefe: '',
        nombre_jefe: '',
        apellidoP_jefe: '',
        apellidoM_jefe: '',
        id_grado_instruccion: '0',
        grado_instruccion: '',
        id_cargo_jefe: '0',
        cargo_jefe: '',
        celular_jefe: '',
        email_jefe: ''
    })

    const modificarEmpresaDatos = (nuevosDatos: DatosEmpresa) => {
        setFormularioEmpresa(prevState => ({
            ...prevState,
            ...nuevosDatos
        }))
    }

    const limpiarFormulario = () => {
        setFormularioEmpresa({
            ruc: '',
            tipo_empresa_id: '0',
            nombre_empresa: '',
            direccion_empresa: '',
            dpd_empresa: '',
            ubigeo_empresa: '',
            estado_empresa: '',
            condicion_domicilio: '',
            dni_jefe: '',
            nombre_jefe: '',
            apellidoP_jefe: '',
            apellidoM_jefe: '',
            id_grado_instruccion: '0',
            grado_instruccion: '',
            id_cargo_jefe: '0',
            cargo_jefe: '',
            celular_jefe: '',
            email_jefe: ''
        })
    }

    const cerrarModal = () => {
        setStep(1)
        hide()
        limpiarFormulario()
    }

    const handleRegistrarEmpresa = () => {
        if (operacion.trim() === '') {
            return
        }

        const params: RegistroEmpresaCarta = {
            codigoOperacion: operacion,
            fechaOperacion: fechaOperacion,
            periodoId: periodo,
            jsonEmpresa:
            {
                empresaRuc: formularioEmpresa.ruc,
                empresaNombre: formularioEmpresa.nombre_empresa,
                direccion: formularioEmpresa.direccion_empresa,
                depProvDist: formularioEmpresa.dpd_empresa,
                ubigeoEmpresa: formularioEmpresa.ubigeo_empresa,
                tipoEmpresaId: Number(formularioEmpresa.tipo_empresa_id)
            },
            jsonRepresentante:
            {
                gradoId: Number(formularioEmpresa.id_grado_instruccion),
                cargoId: Number(formularioEmpresa.id_cargo_jefe),
                repDni: formularioEmpresa.dni_jefe,
                repNombres: formularioEmpresa.nombre_jefe,
                repApellidoPat: formularioEmpresa.apellidoP_jefe,
                repApellidoMat: formularioEmpresa.apellidoM_jefe,
                repEmail: formularioEmpresa.email_jefe,
                repCelular: formularioEmpresa.celular_jefe
            }
        }

       sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {
                //console.log(params)

                sweet.openInformation("Mensaje", "Procesando información...")

                const response = await RegistrarCartaPresentacion<RespValue>(params, abortController.current)

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "La carta de presentación ha sido generada satisfactoriamente.", () => {
                            init() // Actualizar la lista de Cartas
                            initEstado() // Actualizar estadoPasos
                            cerrarModal() // Cerrar modal
                        })
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return
                    if (response.getStatus() == 401) return
                    if (response.getStatus() == 403) return

                    sweet.openWarning("Error", "Por favor, comuníquese con la Oficina de Informática.", () => { })
                }

            }
        })
    }

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={cerrarModal}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col">
                    {step === 1 && <FormularioEmpresa datos={formularioEmpresa} modificar={modificarEmpresaDatos} />}
                    {step === 2 && <VerificacionDatos datos={formularioEmpresa} />}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex justify-end">
                    <div className="mb-3 lg:mb-0 hidden">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-2 w-full sm:w-64 gap-3">
                        <button
                            onClick={handlePrevStep}
                            className={`text-gray-500 bg-white hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 ${step == 1 && 'hidden'}`}
                        >
                            Atrás
                        </button>
                        <button
                            onClick={handleNextStep}
                            className={`text-gray-500 bg-white hover:bg-upla-100 hover:border-upla-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 ${step == 2 ? 'hidden' : 'col-start-2'}`}
                        >
                            Siguiente
                        </button>
                        <button
                            onClick={handleRegistrarEmpresa}
                            className={`text-white bg-gray-400 hover:bg-green-400 hover:border-green-400 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 ${step == 1 && 'hidden'}`}
                        >
                            Registrar
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default ModalAgregarEmpresa