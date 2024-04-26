import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Volver from '@/component/Volver';
import Paso1 from './PasosRevision.tsx/Paso1';
import Paso2 from './PasosRevision.tsx/Paso2';
import Paso3 from './PasosRevision.tsx/Paso3';
import Paso4 from './PasosRevision.tsx/Paso4';
import Paso5 from './PasosRevision.tsx/Paso5';
import Paso6 from './PasosRevision.tsx/Paso6';
import Paso7 from './PasosRevision.tsx/Paso7';
import Paso8 from './PasosRevision.tsx/Paso8';
import ContainerVIstas from '@/component/Container';

///// interfaces
interface DatosEmpresa {
    ruc: string;
    nombre: string;
    estado: string;
    direccion: string;
}

interface DatosRepresentante {
    dni: string;
    nombre: string;
    grado: string;
    cargo: string;
}

interface Notas {
    P1: string;
    P2: string;
    P3: string;
    P4: string;
    TI: string;
    Py: string;
    EP: string;
}

interface Paso1Props {
    intento: number;
    fecha: string;
    estado: boolean;
    datosEmpresa: DatosEmpresa;
    datosRepresentante: DatosRepresentante;
}

interface Documentos {
    pdfUrl?: string;
    fecha?: string;
    fechaEntrega?: string;
}

interface AreaTrabajo {
    datosArea: {
        areaEspecifica: string;
        direccion: string;
        diasPracticas: string;
        horario: string;
        inicioPracticas: string;
        finPracticas: string;
    };
    datosJefe: {
        dni: string;
        nombre: string;
        grado: string;
        cargo: string;
        correo: string;
        celular: string;
    };
    datosEmpresa: {
        nombre: string;
        ruc: string;
        responsable: string;
        dni: string;
        cargo: string;
    }
}

interface InformeFinal {
    informeFinal: Documentos;
    constancia: Documentos;
}

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
    }

    const [pasoActual, setPasoActual] = useState<number>(1)
    const [showDetalles, setShowDetalles] = useState<boolean>(false)

    const pasos: number[] = [1, 2, 3, 4, 5, 6, 7, 8]


    const datosPaso2: Documentos = {
        pdfUrl: '/Ejemplos/Carta_aceptacion.pdf',
        fecha: '2023-11-25',
        fechaEntrega: '2023-11-30'
    }

    const datosPaso3: AreaTrabajo = {
        datosArea: {
            areaEspecifica: 'Informática',
            direccion: 'Jr. Amazonas 641, Huancayo',
            diasPracticas: '2023-11-20  ---  2024-13-20',
            horario: ' 3:00 PM --- 6:00 PM',
            inicioPracticas: 'Inicio de prácticas',
            finPracticas: 'Fin de prácticas',
        },
        datosJefe: {
            dni: '84371759',
            nombre: 'Karina Sandy, Laura León',
            grado: 'Magister',
            cargo: 'Jefe de Tecnología de la Información y Comunicacionese',
            correo: 'klaural@ditriluz.com.pe',
            celular: '948 325 471',
        },
        datosEmpresa: {
            nombre: 'ELECTROCENTRO S.A.',
            ruc: '20129646099',
            responsable: 'CHUYES CESAR',
            dni: '92761834',
            cargo: 'GERENTE COMERCIAL'
        }
    }

    const datosPaso4: Documentos = {
        pdfUrl: '/Ejemplos/Plan-actividades.pdf',
        fecha: '2023-11-25',
        fechaEntrega: '2023-11-30'
    }

    const datosPaso5: Documentos[] = [
        {
            pdfUrl: '/Ejemplos/Ficha-control.pdf',
            fecha: '2023-11-25',
            fechaEntrega: '2023-11-30'
        },
        {
            pdfUrl: '/Ejemplos/Ficha-control-2.pdf',
            fecha: '2023-12-25',
            fechaEntrega: '2023-12-30'
        },
        {
            pdfUrl: '/Ejemplos/Ficha-control-3.pdf',
            fecha: '2024-01-25',
            fechaEntrega: '2024-01-30'
        }
    ]

    const datosPaso7: InformeFinal = {
        informeFinal: {
            pdfUrl: '/Ejemplos/Informe-final.pdf',
            fecha: '2023-11-25',
            fechaEntrega: '2023-11-30'
        },
        constancia: {
            pdfUrl: '/Ejemplos/Constancia-practicas.pdf',
            fecha: '2023-11-25',
            fechaEntrega: '2023-11-30'
        }
    }

    const [notas, setNotas] = useState<Notas>({
        P1: '',
        P2: '',
        P3: '',
        P4: '',
        TI: '',
        Py: '',
        EP: '',
    })

    const irAlSiguientePaso = () => {
        setPasoActual(pasoActual + 1)
    }

    const irAlPasoAnterior = () => {
        setPasoActual(pasoActual - 1)
    }

    const onNotaChange = (campo: string, valor: string) => {
        setNotas({ ...notas, [campo]: valor })
    }


    let componenteActual: React.ReactNode

    switch (pasoActual) {
        case 1:
            componenteActual = <Paso1 estudianteId={datos.codigo} />
            break
        case 2:
            componenteActual = <Paso2 elementos={datosPaso2} />
            break
        case 3:
            componenteActual = <Paso3 estudianteId={datos.codigo} />
            break
        case 4:
            componenteActual = <Paso4 elementos={datosPaso4} />
            break
        case 5:
            componenteActual = <Paso5 elementos={datosPaso5} />
            break
        case 6:
            componenteActual = <Paso6 />
            break
        case 7:
            componenteActual = <Paso7 elementos={datosPaso7} />
            break
        case 8:
            componenteActual = <Paso8 notas={notas} onNotaChange={onNotaChange} />
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
                    <div className="flex justify-between border-b-2 border-gray-200 py-2 px-4 text-blue-500 text-lg sm:text-2xl">
                        <div className=" font-bold ">
                            {datos.estudiante} - {datos.codigo}
                        </div>
                        <i className={`bi bi-caret-down-fill transform my-auto ${showDetalles ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`${!showDetalles ? 'hidden' : 'flex'} p-4`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-lg sm:text-lg w-full">
                            <p className="font-bold text-gray-500">Facultad: <span className="ml-2 font-normal text-blue-500">{datos.facultad}</span></p>
                            <p className="font-bold text-gray-500">Carrera: <span className="ml-2 font-normal text-blue-500">{datos.carrera}</span></p>
                            <p className="font-bold text-gray-500">Sede: <span className="ml-2 font-normal text-blue-500">{datos.sede}</span></p>
                            <p className="font-bold text-gray-500">Periodo: <span className="ml-2 font-normal text-blue-500">{datos.periodo}</span></p>
                            <p className="font-bold text-gray-500">Asignatura: <span className="ml-2 font-normal text-blue-500">{datos.curso}</span></p>
                            <p className="font-bold text-gray-500">Sección: <span className="ml-2 font-normal text-blue-500">{datos.seccion}</span></p>
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
                                            className={`h-12 w-12 flex items-center justify-center border-4  rounded-full ${paso === pasoActual ? 'border-gray-500 bg-gray-500' : 'border-gray-300 hidden sm:flex'
                                                }`}
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
                                    <button onClick={irAlPasoAnterior} className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
                                        <i className="bi bi-arrow-left text-xl" />
                                        <span className='hidden sm:flex'>Paso Anterior</span>
                                    </button>
                                )
                            }
                            {
                                pasoActual < 8 && (
                                    <button onClick={irAlSiguientePaso} className="bg-gray-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
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