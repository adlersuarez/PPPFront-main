import { useState } from "react";
import MostrarDocEstudiante from "./componente/MostrarDocEstudiante";
import MensajePasoNoCargado from "./componente/MensajePasoNoCargado";
import { ProcesoPasosDocente } from "@/helper/requisitos.helper";
import RequisitosLista from "./componente/RequisitosLista";

interface Paso3Props {
    estudianteId: string
}

const Paso6 = (datos: Paso3Props) => {

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

    //Requisitos paso 6
    const requisitos = ProcesoPasosDocente[5].requisitos ?? []

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-6-square-fill mr-2`} />
                <h1 className="font-bold">PRESENTACIÓN DE DOCUMENTOS</h1>
            </div>
            <div className="flex flex-col">
                {
                    true ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12 p-3 sm:p-6 bg-gray-100 rounded-md w-full">
                            <RequisitosLista
                                requisitos={requisitos}
                            />

                            <div className="flex flex-col gap-y-4 col-span-2">
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='INFORME FINAL'
                                    tipoDoc='IF'
                                    posicion={1}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoIF}
                                    estadoInit={estadoInitIF}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='CONVENIO DE PRÁCTICAS'
                                    tipoDoc='CP'
                                    posicion={2}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoCP}
                                    estadoInit={estadoInitCP}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='CONSTANCIA EMPRESA'
                                    tipoDoc='CE'
                                    posicion={3}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoCE}
                                    estadoInit={estadoInitCE}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='ASISTENCIA VISADA'
                                    tipoDoc='AV'
                                    posicion={4}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoAV}
                                    estadoInit={estadoInitAV}
                                />
                            </div>

                            <div className="sm:hidden flex text-red-600 p-2 rounded-md text-center bg-red-100 border border-red-500 border-dashed font-medium px-4 text-sm">
                                Tenga en cuenta que la validación de documentos requiere el uso de un dispositivo con pantalla más grande.
                            </div>
                        </div>
                        :
                        <MensajePasoNoCargado step={6} />
                }

            </div>
        </div>
    );
};

export default Paso6;