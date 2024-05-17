import RequisitosLista from './componente/RequisitosLista';
import { ProcesoPasosDocente } from '@/helper/requisitos.helper';
import { useState } from 'react';
import ModalFichaRegistro from './modal/ModalFichaRegistro';
import DocumentoDespliegueDocente from './componente/DocumentoDespliegueDocente';
import ModalFichaMonitoreo from './modal/ModalFichaMonitoreo';
import ModalFichaEvaluacion from './modal/ModalFichaEvaluacion';

interface Paso3Props {
    estudianteId: string
    periodo: string
    idAsi: string
}

const Paso7 = (datos: Paso3Props) => {

    const [showFichaRegistro, setShowFichaRegistro] = useState<boolean>(false)
    const handleCloseFichaRegistro = () => setShowFichaRegistro(false)
    const handleShowFichaRegistro = () => setShowFichaRegistro(true)

    const [showFichaMonitoreo, setShowFichaMonitoreo] = useState<boolean>(false)
    const handleCloseFichaMonitoreo = () => setShowFichaMonitoreo(false)
    const handleShowFichaMonitoreo = () => setShowFichaMonitoreo(true)

    const [showFichaEvaluacion, setShowFichaEvaluacion] = useState<boolean>(false)
    const handleCloseFichaEvaluacion = () => setShowFichaEvaluacion(false)
    const handleShowFichaEvaluacion = () => setShowFichaEvaluacion(true)

    //
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (posicion: number) => {
        setOpenIndex(openIndex === posicion ? null : posicion)
    }

    const [estadoInitFR, setEstadoInitFR] = useState<boolean>(false)
    const changeEstadoFR = () => setEstadoInitFR(!estadoInitFR)

    const [estadoInitFM, setEstadoInitFM] = useState<boolean>(false)
    const changeEstadoFM = () => setEstadoInitFM(!estadoInitFM)

    const [estadoInitFE, setEstadoInitFE] = useState<boolean>(false)
    const changeEstadoFE = () => setEstadoInitFE(!estadoInitFE)


    //Requisitos paso 7
    const requisitos = ProcesoPasosDocente[6].requisitos ?? []

    return (
        <div className='flex flex-col gap-4'>
            <ModalFichaRegistro show={showFichaRegistro} hide={handleCloseFichaRegistro} changeInit={changeEstadoFR} estudianteId={datos.estudianteId} periodoString={datos.periodo} asiId={datos.idAsi} />
            <ModalFichaMonitoreo show={showFichaMonitoreo} hide={handleCloseFichaMonitoreo} changeInit={changeEstadoFM} estudianteId={datos.estudianteId} periodoString={datos.periodo} asiId={datos.idAsi} />
            <ModalFichaEvaluacion show={showFichaEvaluacion} hide={handleCloseFichaEvaluacion} changeInit={changeEstadoFE} estudianteId={datos.estudianteId} periodoString={datos.periodo} asiId={datos.idAsi} />

            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-7-square-fill mr-2`} />
                <h1 className="font-bold">CARGAR DE DOCUMENTOS</h1>
            </div>
            <div className="flex flex-col">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12 p-3 sm:p-6 bg-gray-100 rounded-md w-full">
                    <RequisitosLista
                        requisitos={requisitos}
                    />

                    <div className="flex flex-col gap-y-4 col-span-2">
                        <DocumentoDespliegueDocente
                            titulo='FICHA DE REGISTRO'
                            tipoDoc='FR'
                            posicion={1}
                            onToggle={handleToggle}
                            openIndex={openIndex}
                            openAction={handleShowFichaRegistro}
                            estadoInit={estadoInitFR}

                            estudianteId={datos.estudianteId}
                        />
                        <DocumentoDespliegueDocente
                            titulo='FICHA DE MONITOREO'
                            tipoDoc='FM'
                            posicion={2}
                            onToggle={handleToggle}
                            openIndex={openIndex}
                            openAction={handleShowFichaMonitoreo}
                            estadoInit={estadoInitFM}

                            estudianteId={datos.estudianteId}
                        />
                        <DocumentoDespliegueDocente
                            titulo='FICHA DE EVALUACIÓN'
                            tipoDoc='FE'
                            posicion={3}
                            onToggle={handleToggle}
                            openIndex={openIndex}
                            openAction={handleShowFichaEvaluacion}
                            estadoInit={estadoInitFE}

                            estudianteId={datos.estudianteId}
                        />

                    </div>

                    <div className="sm:hidden flex text-red-600 p-2 rounded-md text-center bg-red-100 border border-red-500 border-dashed font-medium px-4 text-sm">
                        Tenga en cuenta que la validación de documentos requiere el uso de un dispositivo con pantalla más grande.
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Paso7;