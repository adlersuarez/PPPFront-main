
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { BiCalendar, BiDollarCircle, BiCheck } from 'react-icons/bi';

import Accordion from './compoment/Accordion';
import StepButton from "./compoment/StepButton";

const MatriculaInterna = () => {

    const navigate = useNavigate()

    const [pasoActual, setPasoActual] = useState<number>(1);

    const [pagoAnio, setPagoAnio] = useState(2023)
    const [pagoMes, setPagoMes] = useState(12)

    // 0 -> no pago
    // 1 -> pago normal
    // 2 -> pago intensivo
    const [tipPago] = useState(1)

    const cambiarPaso = (paso: number) => {
        setPasoActual(paso);
    };

    return (
        <>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registrar Matricula</h2>

                            <div className="w-full">


                                <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                    <div
                                        className="border-b-2 border-gray-200 p-2">
                                        <div className="text-sm font-bold">
                                            TENER EN CUENTA
                                        </div>
                                    </div>
                                    <div className="m-2">

                                        <div className="px-4">

                                            <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Fechas límite y plazos: </span> Asegúrate de conocer las fechas límite para realizar los pagos de matrícula y pensiones. Cumplir con estos plazos es fundamental.
                                                </li>
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Formas de pago:</span> Verifica qué métodos de pago acepta la institución. Asegúrate de tener la información necesaria para cada método de pago.
                                                </li>
                                                <li className="pl-4">

                                                    <span className="font-semibold text-gray-900 dark:text-white">Requisitos de matrícula:</span>  Conoce los requisitos específicos para matricularse en los cursos, ya sean restricciones de cupo, requisitos de nivel académico, prerrequisitos, entre otros.

                                                </li>
                                            </ol>

                                        </div>

                                    </div>
                                </div>

                                <br/>

                                <div className="flex justify-center mb-4">
                                    <StepButton paso={1} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={BiCalendar} tipoPago={tipPago}/>
                                    <StepButton paso={2} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={BiDollarCircle} tipoPago={tipPago}/>
                                    <StepButton paso={3} pasoActual={pasoActual} cambiarPaso={cambiarPaso} icono={BiCheck} tipoPago={tipPago}/>
                                </div>

                                <Accordion pasoActual={pasoActual} cambiarPaso={cambiarPaso} tipoPago={tipPago} pagoAnio={pagoAnio} pagoMes={pagoMes} />

                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
export default MatriculaInterna