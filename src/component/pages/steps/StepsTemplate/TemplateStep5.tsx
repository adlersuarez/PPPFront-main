import { useEffect, useRef, useState } from "react";
import ControlActividades from "../../modalForms/ModalTemplate5/ModalControlActividades";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import { ListarDatosUnidadTematica } from "@/network/rest/practicas.network";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import Listas from "@/model/interfaces/Listas.model.interface";
import DocumentoDespliegue from "./Contenedor/DocumentoDespliegue";
import ModalUnidadTemática from "../../modalForms/ModalTemplate5/ModalUnidadTematica";
import { ProcesoPasosEstudiante } from "@/helper/requisitos.helper";
import RequisitosListaEstudiante from "./Contenedor/RequisitoEstudiante";

const TemplateStep5 = () => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const [show, setShow] = useState<boolean>(false)
    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTematica[]>([])
    const [idUnidad, setIdUnidad] = useState<number>(0)
    const [numeroUnidad, setNumeroUnidad] = useState<number>(0)

    const handleClose = () => setShow(false)

    const handleShow = (unidadId: number) => {
        setIdUnidad(unidadId)
        // setShow(true)

        const unidadEncontrada = unidadesTematicas.find((unidad) => unidad.unidadTematicaId == unidadId)
        setNumeroUnidad(unidadEncontrada?.numeroUnidad ?? 0)
        handleShowInformeFinal()
    }

    const ListarUnidadTematica = async () => {
        setUnidadesTematicas([])
        const response = await ListarDatosUnidadTematica<Listas>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as UnidadTematica[]
            setUnidadesTematicas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        ListarUnidadTematica()
    }, [])

    //
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (posicion: number) => {
        setOpenIndex(openIndex === posicion ? null : posicion)
    }

    //
    const [showInformeFinal, setShowInformeFinal] = useState<boolean>(false)
    const handleCloseInformeFinal = () => setShowInformeFinal(false)
    const handleShowInformeFinal = () => setShowInformeFinal(true)

    const [estadoInit, setEstadoInit] = useState<boolean>(false)
    const changeEstado = () => setEstadoInit(!estadoInit)

    //
    //Requisitos step 5
    const requisitos = ProcesoPasosEstudiante[4].requisitos ?? []

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ControlActividades show={show} hide={handleClose} unidadId={idUnidad} numero={numeroUnidad} />
            <ModalUnidadTemática numero={numeroUnidad} show={showInformeFinal} hide={handleCloseInformeFinal} changeInit={changeEstado} />

            <ContenedorSteps
                numero={5}
                titulo="FICHA DE CONTROL DE ACTIVIDADES"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <RequisitosListaEstudiante
                            requisitos={requisitos}
                        />
                    </div>
                </ContenedorSteps.Informacion>
                <ContenedorSteps.Proceso>
                    <div className='flex flex-col h-full'>

                        <EstadoTemplate
                            paso={5}
                        />

                        <hr className="my-2" />

                        <div className="flex flex-col gap-2 h-full">

                            {
                                unidadesTematicas.length !== 0 ?
                                    unidadesTematicas.map((unidad, index) => (
                                        <DocumentoDespliegue
                                            key={index}
                                            titulo={`UNIDAD TEMÁTICA ${unidad.numeroUnidad}`}
                                            tipoDoc={`UT${unidad.numeroUnidad}`}
                                            posicion={index + 1}
                                            onToggle={handleToggle}
                                            openIndex={openIndex}
                                            openAction={() => handleShow(unidad.unidadTematicaId)}
                                            estadoInit={estadoInit}
                                        />
                                    ))

                                    :
                                    <div className="bg-red-50 border border-red-400 text-red-500 border-dashed rounded-md p-4 px-6 m-auto">
                                        Es necesario completar primero el plan de actividades
                                    </div>
                            }

                        </div>

                    </div>
                </ContenedorSteps.Proceso>
            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep5;