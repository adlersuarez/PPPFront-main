import { useEffect, useRef, useState } from 'react';
import AccordionItem from './AccordionItem';
import { BiCalendar } from 'react-icons/bi';
import Asignatura from '@/model/interfaces/asignatura/asignatura';
import { ListarAsignaturaPreMatriculaEstudiante } from '@/network/rest/idiomas.network';
import Listas from '../../../../model/interfaces/Listas.model.interface';

import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";
import Cargando from '@/component/Cargando';
//import { objetoApi } from '@/model/types/objetoApi.mode';

type Props = {
    pasoActual: number;
    cambiarPaso: (paso: number) => void;
    tipoPago: number;
    pagoAnio: boolean;
    pagoMes: boolean;
    anioActual: number,
    mesActual: number,
    loadPagos: boolean
}

const Accordion = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const [asigPreMatriEstudiante, setAsigPreMatriEstudiante] = useState<Asignatura[]>([])

    const abortController = useRef(new AbortController());

    const cod = JSON.parse(window.localStorage.getItem("codigo") || "");

    useEffect(() => {
        //console.log(props.loadPagos)
        LoadDataAsigPreMatriEstudiante()

        
        
    }, [])

    const LoadDataAsigPreMatriEstudiante = async () => {

        setAsigPreMatriEstudiante([])

        const response = await ListarAsignaturaPreMatriculaEstudiante<Listas>(cod, abortController.current)
        if (response instanceof Response) {
            setAsigPreMatriEstudiante(response.data.resultado as Asignatura[])
            //console.log(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    
    

    
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const fechaActual: Date = new Date();

    function diaActual() {
        switch (fechaActual.getDay()) {
            case 1:
                return [0, 1, 2, 3, 4, 5, 6]
            case 2:
                return [-1, 0, 1, 2, 3, 4, 5]
            case 3:
                return [-2, -1, 0, 1, 2, 3, 4]
            case 4:
                return [-3, -2, -1, 0, 1, 2, 3]
            case 5:
                return [-4, -3, -2, -1, 0, 1, 2]
            case 6:
                return [-5, -4, -3, -2, -1, 0, 1]
            case 0:
                return [-6, -5, -4, -3, -2, -1, 0]
            default:
                return []
        }
    }

    const diaSemana = diaActual()

    const data = [
        {
            asignatura: 'INGLÉS 1',
            roomId: 2,
            startDate: new Date(2023,11,11,8,0),
            endDate: new Date(2023,11,11,9,30),
            aula: 'ING - 001',
            horaIni: '8:00',
            horaFin: '9:30',
            // recurrenceRule: 'FREQ=WEKLY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            asignatura: 'INGLÉS 1',
            roomId: 2,
            startDate: new Date(2023,11,12,8,0),
            endDate: new Date(2023,11,12,9,30),
            aula: 'ING - 001',
            horaIni: '8:00',
            horaFin: '9:30',
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            asignatura: 'INGLÉS 1',
            roomId: 2,
            startDate: new Date(2023,11,13,8,0),
            endDate: new Date(2023,11,13,9,30),
            aula: 'ING - 001',
            horaIni: '8:00',
            horaFin: '9:30',
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            asignatura: 'INGLÉS 1',
            roomId: 2,
            startDate: new Date(2023,11,14,8,0),
            endDate: new Date(2023,11,14,9,30),
            aula: 'ING - 001',
            horaIni: '8:00',
            horaFin: '9:30',
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
        {
            asignatura: 'INGLÉS 1',
            roomId: 2,
            startDate: new Date(2023,11,15,8,0),
            endDate: new Date(2023,11,15,9,30),
            aula: 'ING - 001',
            horaIni: '8:00',
            horaFin: '9:30',
            // recurrenceRule: 'FREQ=DAILY;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR;COUNT=5',
        },
    ];

    const colorCR = [
        {
            text: 'ClassRoom 1',
            id: 1,
            color: '#6C3483',
        },
        {
            text: 'ClassRoom 2',
            id: 2,
            color: '#1ABC9C',
        },
        {
            text: 'ClassRoom 3',
            id: 3,
            color: '#F1C40F',
        },
        {
            text: 'ClassRoom 4',
            id: 4,
            color: '#D35400',
        },
        {
            text: 'ClassRoom 5',
            id: 5,
            color: '#2ECC71',
        },
        {
            text: 'ClassRoom 6',
            id: 6,
            color: '#5D6D7E',
        },
    ];

    return (
        <div className="bg-gray-100 p-4 rounded-b">
            {/* ...otros pasos... */}

            {
                // Paso 1
                props.pasoActual === 1 &&
                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-lg font-semibold">
                        Paso 1 - <span className="text-blue-600">Verificación de pagos</span>
                    </h2>
                    {/* <p>Paga tus Matricula  y Prension a tiempo</p> */}

                    {
                        props.loadPagos ?
                            (
                                <div className='mt-4'>
                                    <Cargando />
                                </div>
                            ) : (
                                <>
                                    <div className="border border-gray-300 rounded-lg shadow-md mt-4">
                                        <div
                                            className="flex justify-between items-center p-3"
                                        >
                                            <h3 className="text-lg font-semibold">
                                                Matricula:
                                                {
                                                    props.pagoAnio ?
                                                        (
                                                            <>
                                                                <span className="text-green-600"> Pagada para el año {props.anioActual}</span> <i className="bi bi-check-square-fill text-xl text-green-700"></i>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-red-600"> Usted no pago para el año {props.anioActual} </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                            </>
                                                        )
                                                }
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="border border-gray-300 rounded-lg shadow-md mt-4">
                                        <div
                                            className="flex justify-between items-center p-3"
                                        >
                                            <h3 className="text-lg font-semibold">
                                                Pension:
                                                {
                                                    props.pagoMes ?
                                                        (

                                                            <>
                                                                {
                                                                    props.tipoPago == 1 ? (
                                                                        <span className="mx-3 items-center rounded border-md border-blue-500 bg-blue-500 text-white px-2  py-1 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 active:ring-blue-400">
                                                                            <i className="bi bi-check mr-1"></i> Normal
                                                                        </span>
                                                                    ) : props.tipoPago == 2 ? (
                                                                        <span className="mx-3 items-center rounded border-md border-green-500 bg-green-500 text-white px-2  py-1 hover:bg-green-700 focus:ring-2 focus:ring-green-400 active:ring-green-400">
                                                                            <i className="bi bi-check mr-1"></i> Intensivo
                                                                        </span>

                                                                    ) :
                                                                        <>
                                                                            <span className="text-red-600"> Pendiente </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                                        </>

                                                                }
                                                            </>

                                                        ) : (
                                                            <>
                                                                <span className="text-red-600"> Pendiente </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                            </>
                                                        )
                                                }
                                            </h3>
                                        </div>
                                    </div>
                                </>
                            )

                    }



                </div>
            }

            {
                // Paso 2
                props.pasoActual === 2 && (
                    <div className="border-l-4 border-blue-500 pl-4">
                        <h2 className="text-lg font-semibold">
                            Paso 2 - <span className="text-blue-600">Matricúlate</span>
                        </h2>
                        <p>Completa tu matrícula, seleccionando tu idioma y horarios</p>
                        <div className="border border-gray-300 rounded-lg shadow-md mt-4">
                            <div
                                className="flex justify-between items-center cursor-pointer p-3"
                                onClick={toggleAccordion}
                            >
                                <h3 className="text-lg font-semibold">
                                    Idioma: <span className="text-red-600">Ingles</span>
                                </h3>
                            </div>

                            <hr />


                            {isOpen && (
                                <>
                                    <div className="p-3">

                                        {
                                            asigPreMatriEstudiante.map((item, index) => {
                                                return (
                                                    <AccordionItem key={index}
                                                        icono={BiCalendar}
                                                        titulo={`${item.asignatura} - ${item.asiNivel}`}
                                                        descripcion="Super Intensivo Online"
                                                        enlace="/pagos"
                                                        data={data}
                                                        color={colorCR}
                    
                                                    />
                                                )
                                            })

                                            /*
    
                                            <AccordionItem
                                            icono={BiCalendar}
                                            titulo="Ciclo de Inglés 1"
                                            descripcion="Super Intensivo Online"
                                            enlace="/pagos"
                                        />
                                        <AccordionItem
                                            icono={BiCalendar}
                                            titulo="Ciclo de Inglés 2"
                                            descripcion="Super Intensivo Online"
                                            enlace="/pagos"
                                        />
                                        <AccordionItem
                                            icono={BiCalendar}
                                            titulo="Ciclo de Inglés 3"
                                            descripcion="Super Intensivo Online"
                                            enlace="/pagos"
                                        />
                                        */

                                        }


                                        {/* Otros elementos del acordeón */}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            {/* ...otros pasos... */}
        </div>
    );
};

export default Accordion;
