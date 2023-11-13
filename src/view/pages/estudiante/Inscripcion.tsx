//import Alerta from '@/component/Alerta';
import ButtonLink from '../../../component/pages/buttons/ButtonLink';
//import ModalidadCard from '../../component/cards/ModalidadCard';
import images from '../../../helper/images.helper';

import ModalidadCard from '@/component/pages/cards/ModalidadCard';

const Inscripcion = () => {

    /*const sweet = () => {
        Alerta().fire({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000
        });
        
    };*/


    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-lg">
                        <div className="flex flex-col justify-between">
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-2xl text-gray-400'>PRÁCTICAS PREPROFESIONALES</h1>
                                <p className='text-sm'>
                                    <strong>Las prácticas preprofesionales (PPP)</strong> son un requisito para egresar de su especialidad. El alumno es responsable de escoger el lugar y momento de la realización de las PPP, el mismo que deberá ser autorizado por su coordinador(a) de especialidad.
                                </p>
                                {/*
                                <button onClick={sweet}>
                                    boton
                                </button>
                                */}
                                <hr className='my-2' />
                                <div className='flex flex-col gap-2'>
                                    <h2 className='font-bold text-gray-400'>FINALIDAD</h2>
                                    <ul className=" list-inside list-none pl-2 text-sm flex flex-col gap-1">
                                        <li className='flex gap-2'>
                                            <i className="bi bi-caret-right-fill text-gray-400" />
                                            <p>Complementar y afirmar los conocimientos impartidos en la universidad con la experiencia en la actividad profesional.</p>
                                        </li>
                                        <li className='flex gap-2'>
                                            <i className="bi bi-caret-right-fill text-gray-400" />
                                            <p>Lograr una adecuada adaptación del estudiante a la actividad profesional.</p>
                                        </li>
                                        <li className='flex gap-2'>
                                            <i className="bi bi-caret-right-fill text-gray-400" />
                                            <p>Lograr en el estudiante el desarrollo de habilidades, destrezas y sólida formación ética en el desempeño de sus funciones.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-col sm:border-l-2'>
                            <hr className='sm:hidden py-2' />
                            <div className='flex flex-col gap-2 sm:pl-4'>
                                <h2 className='font-bold text-gray-400'>HERRAMIENTAS DE APOYO</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                                    <ButtonLink
                                        to={'/inicio/inscripcion'}
                                        nombre={'Manual'}
                                    />
                                    <ButtonLink
                                        to={'/inicio/reglamentos'}
                                        nombre={'Reglamento'}
                                    />
                                    <ButtonLink
                                        to={'/inicio/inscripcion'}
                                        nombre={'Soporte'}
                                    />
                                    <ButtonLink
                                        to={'/inicio/inscripcion'}
                                        nombre={'Requisitos'}
                                    />
                                </div>
                            </div>


                        </div>

                    </div>


                </div>

                {/*<div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <p className="text-lg font-semibold m-auto">Estado estudiante</p>

                            <div className="space-x-4 flex ml-4 text-white">
                                <span className="bg-green-500 py-1 px-2 rounded m-auto">
                                    Habilitado
                                </span>
                                <span className="bg-red-500 py-1 px-2 rounded m-auto">
                                    Deshabilitado
                                </span>
                            </div>
                        </div>

                        {
                            <div className="">
                                <NavLink
                                    to={''}
                                    className="text-blue-500 hover:underline m-auto">
                                    <span>Requisitos</span>
                                    <i className={`bi bi-info-circle ml-2 text-lg`} />
                                </NavLink>
                            </div>
                        }
                    </div>
                </div>*/}

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <div className="flex-auto mb-3">
                        <p className="text-lg font-bold m-auto text-gray-400">MODALIDADES</p>
                        <p>Existen 2 modalidades, elige la que se adecue a tu situación</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <ModalidadCard
                            imagen={images.modalidad_efectiva}
                            titulo={'CURRICULAR'}
                            resumen={'Esta modalidad brinda a los estudiantes en formación la oportunidad de poner en práctica sus conocimientos, habilidades y aptitudes en un entorno laboral real.'}
                            to={'/inicio/proceso'}
                            info={''}
                        />
                        <ModalidadCard
                            imagen={images.modalidad_convalidacion}
                            titulo={'CONVALIDACIÓN'}
                            resumen={'Esta modalidad está dirigida a estudiantes que se encuentran empleados de manera formal en una empresa y desempeñando actividades relacionadas con su carrera.'}
                            to={''}
                            info={''}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Inscripcion;