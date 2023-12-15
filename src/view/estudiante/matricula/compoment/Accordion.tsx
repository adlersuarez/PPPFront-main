import { useEffect, useRef, useState } from 'react';
import AccordionItem from './AccordionItem';
import { BiCalendar } from 'react-icons/bi';
import Asignatura from '@/model/interfaces/asignatura/asignatura';
import { ListarAsignaturaPreMatriculaEstudiante, ValidarMatriculaExistente } from '@/network/rest/idiomas.network';
import Listas from '../../../../model/interfaces/Listas.model.interface';

import Response from "../../../../model/class/response.model.class";
import RestError from "../../../../model/class/resterror.model.class";
import { Types } from "../../../../model/enum/types.model.enum";
import Cargando from '@/component/Cargando';
import RespValue from '@/model/interfaces/RespValue.model.interface';
//import { objetoApi } from '@/model/types/objetoApi.mode';

type Props = {
    pasoActual: number;
    // cambiarPaso: (paso: number) => void;
    tipoPago: number;
    pagoAnio: boolean;
    pagoMes: boolean;
    anioActual: number,

    loadPagos: boolean
    handleMatriculaModalidad: () => void;
}

const Accordion = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    const [asigPreMatriEstudiante, setAsigPreMatriEstudiante] = useState<Asignatura[]>([])
    const [primeraMatricula, setPrimeraMatricula] = useState(false)

    // const [nivelMatricula] = useState(2)


    const abortController = useRef(new AbortController());

    const cod = JSON.parse(window.localStorage.getItem("codigo") || "");

    useEffect(() => {
        LoadDataAsigPreMatriEstudiante()
        LoadValidarMatriculExistente()
        console.log(asigPreMatriEstudiante)
        console.log(primeraMatricula)
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

    
    const LoadValidarMatriculExistente = async () => {
        setPrimeraMatricula(false)

        const response = await ValidarMatriculaExistente<RespValue>(cod)
        if (response instanceof Response) {

            console.log(response)

            if (response.data.value == "0"){
                setPrimeraMatricula(true)
            } 
            if (response.data.value == "1"){
                setPrimeraMatricula(false)
            } 

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



    return (
        <div className="border border-gray-300 p-4 rounded-b">
            {/* ...otros pasos... */}

            {
                // Paso 1
                props.pasoActual === 1 &&
                <div className="border-l-4 border-blue-500 pl-4">
                    <h2 className="text-xl font-semibold">
                        <span className="text-blue-600">Verificación de pagos</span>
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
                            <span className="text-xl text-blue-600">Matricúlate</span>
                        </h2>
                        <p>Completa tu matrícula, seleccionando tu idioma y horarios</p>
                        <div className="border border-gray-300 rounded-lg shadow-md mt-4">
                            <div
                                className="flex justify-between items-center cursor-pointer p-3"
                                onClick={toggleAccordion}
                            >
                                <h3 className="text-lg font-semibold">
                                Realiza tu matrícula <span className="text-red-600"> ¡Este paso es imprescindible!</span>
                                </h3>
                            </div>

                            <hr />


                            {isOpen && (
                                <>
                                    <div className="p-3">
                                        <AccordionItem
                                            icono={BiCalendar}
                                            titulo={`Matricúlate - elige tus horarios`}
                                            handleMatriculaModalidad={props.handleMatriculaModalidad}
                                        />
                                        
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
