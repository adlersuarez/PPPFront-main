import Modal from "../modal/ModalComponente"
import { useState } from "react"

type Props = {
    show: boolean
    hide: () => void
}

const ModalCartaPresentacion = (props: Props) => {

    const [step, setStep] = useState<number>(1)

    const handleNextStep = () => { if (step < 2) setStep(step + 1) }

    const handlePrevStep = () => { if (step > 1) setStep(step - 1) }

    //console.log(props)

    const datos = {
        dni: '76634282',
        nombres: 'Doe',
        apellido_paterno: 'Rodriguez',
        apellido_materno: 'Gutierrez',
        correo_institucional: `prueba@upla.edu.pe`,
        correo: '',
        celular: '',
        telefono: '',
        direccion: '',
        id_departamento: '',
        id_provincia: '',
        id_distrito: '',
    }

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className="max-w-2xl mx-auto p-4">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-4">Paso {step}</h1>
                        {step === 1 && 'Datos de empresa'}
                        {step === 2 && 'Verificacion'}
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                            onClick={handlePrevStep}
                            disabled={step === 1}
                        >
                            Atrás
                        </button>
                        <button
                            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded"
                            onClick={handleNextStep}
                            disabled={step === 2}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                    <div className="lg:col-span-7/12 mb-3 lg:mb-0">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:mt-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default ModalCartaPresentacion