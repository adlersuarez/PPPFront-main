import { useState } from "react";
import MostrarDocEstudiante from "./componente/MostrarDocEstudiante";

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

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-6-square-fill`} />
                <h1 className="font-bold">PRESENTACIÓN DE DOCUMENTOS</h1>
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

export default Paso6;