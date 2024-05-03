import { useEffect, useRef, useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ListaElementos from "./Contenedor/ListaElementos";
import ModalInformeFinal from "../../modalForms/ModalTemplate6/ModalInformeFinal";
import ModalConvenioPracticas from "../../modalForms/ModalTemplate6/ModalConvenioPracticas";
import ModalConstanciaEmpresa from "../../modalForms/ModalTemplate6/ModalConstanciaEmpresa";
import ModalAsistenciaVisada from "../../modalForms/ModalTemplate6/ModalAsistenciaVisada";
import MostrarDocumentoUrl from "@/model/interfaces/documento/mostrarDocumento";
import { MostrarDocumento } from "@/network/rest/practicas.network";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import VistaPreviaDocumentosFile from "@/component/VistaPreviaDocumentosFile";
import { obtenerArchivosVistaPrevia } from "@/helper/herramienta.helper";
import FilePreview from "@/model/interfaces/documento/filePreview";
import DocumentoDespliegue from "./Contenedor/DocumentoDespliegue";

const TemplateStep6 = () => {

    const Caracteristicas = [
        {
            descripcion: 'Descarga el formato de informe final',
            estado: 1,
        },
        {
            descripcion: 'Constancia de prácticas emitido por la empresa',
            estado: 2,
        },

    ]

    const Importante = [
        {
            descripcion: 'Plazo máximo de ## días posteriores de iniciar el proceso.'
        },
    ]

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    const [docUrlMostrado, setDocUrlMostrado] = useState<MostrarDocumentoUrl | null>(null)
    const [tipoDocMostrado, setTipoDocMostrado] = useState<string>('')
    const [archivosVistaPrevia, setArchivoVistaPrevia] = useState<FilePreview[]>([])
    /////
    const ObtenerDocumento = async (tipoDoc: string) => {
        setDocUrlMostrado(null)
        const response = await MostrarDocumento<MostrarDocumentoUrl>(tipoDoc, codigo, periodo, abortController.current)
        console.log(tipoDoc)
        console.log(response)
        if (response instanceof Response) {
            const data = response.data as MostrarDocumentoUrl
            setDocUrlMostrado(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        if (tipoDocMostrado !== '') {
            ObtenerDocumento(tipoDocMostrado)
        }
    }, [tipoDocMostrado])

    useEffect(() => {
        if (docUrlMostrado !== null) {
            setArchivoVistaPrevia(obtenerArchivosVistaPrevia(docUrlMostrado))
        }
    }, [docUrlMostrado])

    //////////Vista previa Documentos
    const [showDoc, setShowDoc] = useState<boolean>(false)
    const handleShowDoc = (tipoDoc: string) => {
        setTipoDocMostrado(tipoDoc)
        setShowDoc(true)
    }
    const handleCloseDoc = () => setShowDoc(false)

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

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ModalInformeFinal show={showInformeFinal} hide={handleCloseInformeFinal} changeInit={changeEstadoIF} />
            <ModalConvenioPracticas show={showConvenioPracticas} hide={handleCloseConvenioPracticas} changeInit={changeEstadoCP}/>
            <ModalConstanciaEmpresa show={showConstanciaEmpresa} hide={handleCloseConstanciaEmpresa} changeInit={changeEstadoCE}/>
            <ModalAsistenciaVisada show={showAsistenciaVisada} hide={handleCloseAsistenciaVisada} changeInit={changeEstadoAV}/>

            <VistaPreviaDocumentosFile show={showDoc} close={handleCloseDoc} files={archivosVistaPrevia} />

            <ContenedorSteps
                numero={6}
                titulo="INFORME FINAL"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo="Características"
                            elementos={Caracteristicas}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo="Importante"
                            elementos={Importante}
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
    );
};

export default TemplateStep6;