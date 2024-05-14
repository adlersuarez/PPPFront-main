import { useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ModalInformeFinal from "../../modalForms/ModalTemplate6/ModalInformeFinal";
import ModalConvenioPracticas from "../../modalForms/ModalTemplate6/ModalConvenioPracticas";
import ModalConstanciaEmpresa from "../../modalForms/ModalTemplate6/ModalConstanciaEmpresa";
import ModalAsistenciaVisada from "../../modalForms/ModalTemplate6/ModalAsistenciaVisada";
import DocumentoDespliegue from "./Contenedor/DocumentoDespliegue";
import { ProcesoPasosEstudiante } from "@/helper/requisitos.helper";
import RequisitosListaEstudiante from "./Contenedor/RequisitoEstudiante";

const TemplateStep6 = () => {

    const [showInformeFinal, setShowInformeFinal] = useState<boolean>(false)
    const handleCloseInformeFinal = () => setShowInformeFinal(false)
    const handleShowInformeFinal = () => setShowInformeFinal(true)

    const [showConvenioPracticas, setShowConvenioPracticas] = useState<boolean>(false)
    const handleCloseConvenioPracticas = () => setShowConvenioPracticas(false)
    const handleShowConvenioPracticas = () => setShowConvenioPracticas(true)

    const [showConstanciaEmpresa, setShowConstanciaEmpresa] = useState<boolean>(false)
    const handleCloseConstanciaEmpresa = () => setShowConstanciaEmpresa(false)
    const handleShowConstanciaEmpresa = () => setShowConstanciaEmpresa(true)

    const [showAsistenciaVisada, setShowAsistenciaVisada] = useState<boolean>(false)
    const handleCloseAsistenciaVisada = () => setShowAsistenciaVisada(false)
    const handleShowAsistenciaVisada = () => setShowAsistenciaVisada(true)

    //
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (posicion: number) => {
        setOpenIndex(openIndex === posicion ? null : posicion)
    }

    const [estadoInitIF, setEstadoInitIF] = useState<boolean>(false)
    const changeEstadoIF = () => setEstadoInitIF(!estadoInitIF)

    const [estadoInitCP, setEstadoInitCP] = useState<boolean>(false)
    const changeEstadoCP = () => setEstadoInitCP(!estadoInitCP)

    const [estadoInitCE, setEstadoInitCE] = useState<boolean>(false)
    const changeEstadoCE = () => setEstadoInitCE(!estadoInitCE)

    const [estadoInitAV, setEstadoInitAV] = useState<boolean>(false)
    const changeEstadoAV = () => setEstadoInitAV(!estadoInitAV)

    //Requisitos step 6
    const requisitos = ProcesoPasosEstudiante[5].requisitos ?? []

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ModalInformeFinal show={showInformeFinal} hide={handleCloseInformeFinal} changeInit={changeEstadoIF} />
            <ModalConvenioPracticas show={showConvenioPracticas} hide={handleCloseConvenioPracticas} changeInit={changeEstadoCP} />
            <ModalConstanciaEmpresa show={showConstanciaEmpresa} hide={handleCloseConstanciaEmpresa} changeInit={changeEstadoCE} />
            <ModalAsistenciaVisada show={showAsistenciaVisada} hide={handleCloseAsistenciaVisada} changeInit={changeEstadoAV} />

            <ContenedorSteps
                numero={6}
                titulo="INFORME FINAL"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <RequisitosListaEstudiante
                            requisitos={requisitos}
                        />
                    </div>
                </ContenedorSteps.Informacion>

                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>

                        <EstadoTemplate
                            paso={6}
                        />

                        <hr className="my-2" />

                        <div className="flex flex-col gap-2">

                            <DocumentoDespliegue
                                titulo='INFORME FINAL'
                                tipoDoc='IF'
                                posicion={1}
                                onToggle={handleToggle}
                                openIndex={openIndex}
                                openAction={handleShowInformeFinal}
                                estadoInit={estadoInitIF}
                            />
                            <DocumentoDespliegue
                                titulo='CONVENIO DE PRÁCTICAS'
                                tipoDoc='CP'
                                posicion={2}
                                onToggle={handleToggle}
                                openIndex={openIndex}
                                openAction={handleShowConvenioPracticas}
                                estadoInit={estadoInitCP}
                            />
                            <DocumentoDespliegue
                                titulo='CONSTANCIA DE EMPRESA'
                                tipoDoc='CE'
                                posicion={3}
                                onToggle={handleToggle}
                                openIndex={openIndex}
                                openAction={handleShowConstanciaEmpresa}
                                estadoInit={estadoInitCE}
                            />
                            <DocumentoDespliegue
                                titulo='ASISTENCIA VISADA'
                                tipoDoc='AV'
                                posicion={4}
                                onToggle={handleToggle}
                                openIndex={openIndex}
                                openAction={handleShowAsistenciaVisada}
                                estadoInit={estadoInitAV}
                            />

                        </div>

                        {/*<hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Documentos debidamente cargados</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Documentos requeridos</span>
                            </div>
                        </div>*/}
                    </div>

                </ContenedorSteps.Proceso>
            </ContenedorSteps>
        </div>
    )
}

export default TemplateStep6