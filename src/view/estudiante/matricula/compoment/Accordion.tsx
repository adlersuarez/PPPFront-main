import { useEffect, useState } from 'react';
import AccordionItem from './AccordionItem';
import { BiCalendar } from 'react-icons/bi';
// import Asignatura from '@/model/interfaces/asignatura/asignatura';
// import { ListarAsignaturaPreMatriculaEstudiante } from '@/network/rest/idiomas.network';
// import Listas from '../../../../model/interfaces/Listas.model.interface';

// import Response from "../../../../model/class/response.model.class";
// import RestError from "../../../../model/class/resterror.model.class";
// import { Types } from "../../../../model/enum/types.model.enum";
import Cargando from '@/component/Cargando';

type Props = {
    pasoActual: number
    opeMatricula: string
    opePension: string

    load: boolean
    handleMatriculaModalidad: () => void;
}

const Accordion = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    // console.log(props.opeMatricula)

    // const [nivelMatricula] = useState(2)

    //const abortController = useRef(new AbortController());

    // const cod = JSON.parse(window.localStorage.getItem("codigo") || "");

    useEffect(() => {

    }, [])


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
                                                    props.opeMatricula == "" ?
                                                        (
                                                            <>
                                                                <span className="text-red-600"> No tiene operaciones asociadas </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="text-green-600"> Número de operación. {props.opeMatricula}</span> <i className="bi bi-check-square-fill text-xl text-green-700"></i>
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
                                                    props.opePension == "" ?
                                                        (
                                                            <>
                                                                <span className="text-red-600"> Pendiente </span> <i className="bi bi-x-circle-fill text-xl text-red-700"></i>
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
