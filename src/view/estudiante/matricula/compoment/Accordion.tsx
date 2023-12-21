import { useRef, useState } from 'react';
import AccordionItem from './AccordionItem';
import { BiCalendar } from 'react-icons/bi';

import Cargando from '@/component/Cargando';
import MatriculaPago from '@/model/interfaces/pago/matriculaPago';
import PensionPago from '@/model/interfaces/pago/pensionPago';
import { MatriculaExistentePeriodo } from '@/network/rest/idiomas.network';
import RespValue from '@/model/interfaces/RespValue.model.interface';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model.enum';

type Props = {
    pasoActual: number

    load: boolean
    loadMatricula: boolean
    loadPension: boolean

    dataMatricula: MatriculaPago[]
    dataPension: PensionPago[]
    handleMatriculaProceso: () => void;
}

const Accordion = (props: Props) => {

    const codigo = JSON.parse(window.localStorage.getItem("codigo") || "");

    const [isOpen, setIsOpen] = useState(false);

    // const operMatri = props.dataMatricula[0]?.operacion
    // const operPens = props.dataPension[0]?.operacion

    const [ matriculaExistente, setMatriculaExistente ] = useState(false)


    const abortController = useRef(new AbortController());

    const toggleAccordion = () => {

        tieneMatricula()
        
        if(matriculaExistente) return

        setIsOpen(!isOpen);
    };

    const tieneMatricula = async () =>{


        const response = await MatriculaExistentePeriodo<RespValue>(codigo, abortController.current)
        if (response instanceof Response) {


            const result = response.data.value

            if(result == "MATRICULADO"){
                setMatriculaExistente(true)

            }else if(result == "NOMATRICULADO"){
                setMatriculaExistente(false)
            }
            

        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }



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
                        props.load ?
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

                                                    props.loadMatricula ?
                                                        (
                                                            <div className='mt-4'>
                                                                <Cargando />
                                                            </div>

                                                        )
                                                        :
                                                        (
                                                            <>
                                                                {
                                                                    props.dataMatricula[0].operacion == "utilizado" ?
                                                                        (
                                                                            <>
                                                                                <span className="text-green-600"> Pago registrado en uso </span> <i className="bi bi-check-square-fill text-xl text-green-700"></i>
                                                                            </>
                                                                        ) :

                                                                        props.dataMatricula[0].operacion == "inpago" ?

                                                                            (
                                                                                <>
                                                                                    <span className="text-red-600"> No hay pagos registrados </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <>
                                                                                    <span className="text-green-600"> Pagado - {props.dataMatricula[0].operacion}  </span> <i className="bi bi-check-square-fill text-xl text-green-700"></i>
                                                                                </>

                                                                            )
                                                                }

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
                                                    props.loadPension ?
                                                        (
                                                            <div className='mt-4'>
                                                                <Cargando />
                                                            </div>

                                                        ) : (

                                                            <>
                                                                {
                                                                    props.dataPension[0].operacion == "utilizado" ?
                                                                        (
                                                                            <>
                                                                                <span className="text-red-600"> No hay pago de pension registrado </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                                            </>
                                                                        ) :

                                                                        props.dataPension[0].operacion == "inpago" ?

                                                                            (
                                                                                <>
                                                                                    <span className="text-red-600"> No hay pagos registrados </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                                                </>
                                                                            )
                                                                            :
                                                                            (
                                                                                <>
                                                                                    <span className="text-green-600"> Pagado - {props.dataPension[0].operacion} </span> <i className="bi bi-check-square-fill text-xl text-green-700"></i>
                                                                                </>

                                                                            )
                                                                }

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
                                    Realiza tu matrícula <span className="text-blue-600"> ¡Este paso es imprescindible!</span>
                                </h3>
                            </div>

                            <hr />


                            {isOpen && (
                                <>
                                    <div className="p-3">
                                        <AccordionItem
                                            icono={BiCalendar}
                                            titulo={`Matricúlate - elige tu horario`}
                                            handleMatriculaModalidad={props.handleMatriculaProceso}
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
