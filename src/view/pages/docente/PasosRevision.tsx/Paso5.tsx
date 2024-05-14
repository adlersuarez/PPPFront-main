import { useState } from "react";
import MostrarDocEstudiante from "./componente/MostrarDocEstudiante";
import MensajePasoNoCargado from "./componente/MensajePasoNoCargado";
import { ProcesoPasosDocente } from "@/helper/requisitos.helper";
import RequisitosLista from "./componente/RequisitosLista";

interface Paso3Props {
    estudianteId: string
}

const Paso5 = (datos: Paso3Props) => {

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (posicion: number) => {
        setOpenIndex(openIndex === posicion ? null : posicion)
    }

    const [estadoInitUT1, setEstadoInitUT1] = useState<boolean>(false)
    const changeEstadoUT1 = () => setEstadoInitUT1(!estadoInitUT1)

    const [estadoInitUT2, setEstadoInitUT2] = useState<boolean>(false)
    const changeEstadoUT2 = () => setEstadoInitUT2(!estadoInitUT2)

    const [estadoInitUT3, setEstadoInitUT3] = useState<boolean>(false)
    const changeEstadoUT3 = () => setEstadoInitUT3(!estadoInitUT3)

    const [estadoInitUT4, setEstadoInitUT4] = useState<boolean>(false)
    const changeEstadoUT4 = () => setEstadoInitUT4(!estadoInitUT4)

    //Requisitos paso 5
    const requisitos = ProcesoPasosDocente[4].requisitos ?? []

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-5-square-fill mr-2`} />
                <h1 className="font-bold">CONTROL DE ACTIVIDADES</h1>
            </div>
            <div className="flex flex-col ">
                {
                    true ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12 p-3 sm:p-6 bg-gray-100 rounded-md w-full">
                            <RequisitosLista
                                requisitos={requisitos}
                            />
                            <div className="flex flex-col gap-y-4 col-span-2">
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='UNIDAD TEMÁTICA 1'
                                    tipoDoc='UT1'
                                    posicion={1}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoUT1}
                                    estadoInit={estadoInitUT1}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='UNIDAD TEMÁTICA 2'
                                    tipoDoc='UT2'
                                    posicion={2}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoUT2}
                                    estadoInit={estadoInitUT2}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='UNIDAD TEMÁTICA 3'
                                    tipoDoc='UT3'
                                    posicion={3}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoUT3}
                                    estadoInit={estadoInitUT3}
                                />
                                <MostrarDocEstudiante
                                    estId={datos.estudianteId}
                                    titulo='UNIDAD TEMÁTICA 4'
                                    tipoDoc='UT4'
                                    posicion={4}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    openAction={changeEstadoUT4}
                                    estadoInit={estadoInitUT4}
                                />
                            </div>

                            <div className="sm:hidden flex text-red-600 p-2 rounded-md text-center bg-red-100 border border-red-500 border-dashed font-medium px-4 text-sm">
                                Tenga en cuenta que la validación de documentos requiere el uso de un dispositivo con pantalla más grande.
                            </div>
                        </div>
                        :
                        <MensajePasoNoCargado step={5} />
                }



            </div>
        </div>
    );
};

export default Paso5;