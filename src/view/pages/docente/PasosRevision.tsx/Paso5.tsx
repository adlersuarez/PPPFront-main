import React, { useState } from "react";
import MostrarDocEstudiante from "./componente/MostrarDocEstudiante";

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

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-5-square-fill`} />
                <h1 className="font-bold">FICHA DE CONTROL DE ACTIVIDADES</h1>
            </div>
            <div className="flex bg-gray-100 p-4 rounded">
                {
                    true ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                            <div className="flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4 sm:gap-8">
                                    <div className="flex flex-col gap-1 text-gray-500">
                                        <h2 className="text-lg font-semibold uppercase ">Requisitos a considerar</h2>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex"><div className="shrink-0 w-6"><i className="bi bi-dot" /></div> Escaneado a colores</div>
                                            <div className="flex"><div className="shrink-0 w-6"><i className="bi bi-dot" /></div>Debidamente firmada y sellada por la empresa</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 flex flex-col gap-4 col-span-2">
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
                        </div>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha cargado su Carta de Aceptación</p>
                        </div>
                }

            </div>
        </div>
    );
};

export default Paso5;