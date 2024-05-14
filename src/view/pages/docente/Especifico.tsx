import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Paso1 from './PasosRevision.tsx/Paso1';
import Paso2 from './PasosRevision.tsx/Paso2';
import Paso3 from './PasosRevision.tsx/Paso3';
import Paso4 from './PasosRevision.tsx/Paso4';
import Paso5 from './PasosRevision.tsx/Paso5';
import Paso6 from './PasosRevision.tsx/Paso6';
import Paso7 from './PasosRevision.tsx/Paso7';
import ContainerVIstas from '@/component/Container';

const Especifico = () => {

    const location = useLocation()

    const datos = {
        codigo: location.state.codigo,
        estudiante: location.state.nombres,
        facultad: location.state.facultad,
        carrera: location.state.carrera,
        sede: location.state.sede,
        periodo: location.state.periodo,
        semestre: location.state.semestre,
        curso: location.state.curso,
        seccion: location.state.seccion,
        plan: location.state.plan,

        periodoString: location.state.periodoString,
        idAsign: location.state.idAsign
    }

    const [pasoActual, setPasoActual] = useState<number>(1)
    const [showDetalles, setShowDetalles] = useState<boolean>(false)

    const pasos: number[] = [1, 2, 3, 4, 5, 6, 7]

    const irAlSiguientePaso = () => {
        setPasoActual(pasoActual + 1)
    }

    const irAlPasoAnterior = () => {
        setPasoActual(pasoActual - 1)
    }

    let componenteActual: React.ReactNode

    switch (pasoActual) {
        case 1:
            componenteActual = <Paso1 estudianteId={datos.codigo} />
            break
        case 2:
            componenteActual = <Paso2 estudianteId={datos.codigo} />
            break
        case 3:
            componenteActual = <Paso3 estudianteId={datos.codigo} />
            break
        case 4:
            componenteActual = <Paso4 estudianteId={datos.codigo} />
            break
        case 5:
            componenteActual = <Paso5 estudianteId={datos.codigo} />
            break
        case 6:
            componenteActual = <Paso6 estudianteId={datos.codigo} />
            break
        case 7:
            componenteActual = <Paso7 estudianteId={datos.codigo} periodo={datos.periodoString} idAsi={datos.idAsign}/>
            break

        default:
            componenteActual = <div>Paso no válido</div>
    }

    //const current = new Date('2024-04-03 00:00:00');
    // const dayOfWeek = current.toLocaleDateString('es-ES', { weekday: 'long' });

    return (
        <ContainerVIstas titulo='Detalle estudiante' retornar>
            <div className="w-full ">
                <div onClick={() => setShowDetalles(!showDetalles)} className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                    <div className="flex justify-between border-b-2 border-gray-200 py-2 px-4  text-lg sm:text-2xl">
                        <div className="font-bold flex flex-col sm:flex-row sm:gap-4 ">
                            <span className='text-gray-500'>{datos.estudiante}</span>

                            <span className='text-upla-100'>{datos.codigo}</span>
                        </div>
                        <i className={`text-gray-500 bi bi-caret-down-fill transform my-auto ${showDetalles ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`${!showDetalles ? 'hidden' : 'flex'} p-4`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-lg sm:text-lg w-full">
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Facultad: </div> <span className="font-medium text-upla-100">{datos.facultad}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Carrera: </div> <span className="font-medium text-upla-100">{datos.carrera}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Sede: </div> <span className="font-medium text-upla-100">{datos.sede}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Periodo: </div> <span className="font-medium text-upla-100">{datos.periodo}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Asignatura: </div> <span className="font-medium text-upla-100">{datos.curso}</span>
                            </div>
                            <div className='flex gap-2 font-bold text-gray-500'>
                                <div className="w-28 shrink-0">Sección: </div> <span className="font-medium text-upla-100">{datos.seccion}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-lg border-2 border-gray-300 mt-4 border-t-4">
                    <div className="border-b-2 border-gray-200">
                        <div className="flex items-center justify-center p-4 pb-0 sm:p-8">
                            {
                                pasos.map((paso, index) => (
                                    <React.Fragment key={paso}>
                                        {
                                            index > 0 && (
                                                <div className={`hidden sm:flex h-2 w-8 bg-gray-300 ${paso <= pasoActual ? 'bg-blue-500' : ''}`} />
                                            )
                                        }
                                        <button
                                            onClick={() => setPasoActual(paso)}
                                            disabled={paso === pasoActual}
                                            className={`h-12 w-12 flex items-center justify-center border-4 rounded-full
                                                ${paso === pasoActual ? 'border-gray-500 bg-gray-500 scale-110' : 'border-gray-300 hidden sm:flex hover:scale-110 hover:bg-gray-100 hover:text-gray-500'}`}
                                        >
                                            <span className={`font-bold ${paso === pasoActual ? 'text-white text-xl' : 'text-gray-400'}`}>{paso}</span>
                                        </button>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                        <div className="flex gap-3 justify-center p-4 border-b-2 border-gray-200">
                            {
                                pasoActual > 1 && (
                                    <button onClick={irAlPasoAnterior} className="bg-gray-500 hover:bg-upla-100 hover:scale-105 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                                        <i className="bi bi-arrow-left text-xl" />
                                        <span className='hidden sm:flex'>Paso Anterior</span>
                                    </button>
                                )
                            }
                            {
                                pasoActual < pasos.length && (
                                    <button onClick={irAlSiguientePaso} className="bg-gray-500 hover:bg-upla-100 hover:scale-105 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                                        <span className='hidden sm:flex'>Siguiente Paso</span>
                                        <i className="bi bi-arrow-right text-xl" />
                                    </button>
                                )
                            }
                        </div>
                        <div className='p-4 sm:p-8'>
                            {componenteActual}
                        </div>
                    </div>
                </div>
            </div>
        </ContainerVIstas>
    )

}

export default Especifico;