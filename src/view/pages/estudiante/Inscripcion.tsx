import { NavLink } from 'react-router-dom';
import ButtonLink from '../../../component/pages/buttons/ButtonLink';
//import ModalidadCard from '../../component/cards/ModalidadCard';
import images from '../../../helper/images.helper';

import ModalidadCard from '@/component/pages/cards/ModalidadCard';

const Inscripcion = () => {

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="flex rounded-lg h-60">
                        <div className="w-7/12 bg-gray-50 p-4 flex flex-col justify-between">
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-xl'>Prácticas Pre Profesionales</h1>
                                <p>
                                    Damos la bienvenida a los participantes de las prácticas preprofesionales en la Universidad Peruana Los Andes (UPLA). Este periodo representa una etapa fundamental en su formación académica, donde se integrarán en un entorno que propicia la aplicación de conocimientos teóricos en situaciones prácticas y desafiantes.

                                    Las prácticas preprofesionales constituyen un componente esencial de nuestro compromiso con la excelencia académica y la preparación integral de nuestros estudiantes. Durante este proceso, los participantes tendrán la oportunidad de poner a prueba y consolidar sus habilidades adquiridas en el aula, al tiempo que se familiarizan con los protocolos y procedimientos específicos de su campo de estudio.
                                </p>
                            </div>
                            <div className="flex justify-start gap-8">
                                <ButtonLink
                                    to={'/inicio/inscripcion'}
                                    icon={'bi-info-circle'}
                                    nombre={'Manual'}
                                />
                                <ButtonLink
                                    to={'/inicio/inscripcion'}
                                    icon={'bi-info-circle'}
                                    nombre={'Reglamento'}
                                />
                                <ButtonLink
                                    to={'/inicio/inscripcion'}
                                    icon={'bi-info-circle'}
                                    nombre={'Soporte'}
                                />
                            </div>
                        </div>

                        <div className="w-5/12 bg-blue-300">
                            <img src={images.portada} className="h-full w-full object-cover" alt="Flowbite Logo" />
                        </div>
                    </div>

                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <p className="text-lg font-semibold m-auto">Estado estudiante</p>

                            <div className="space-x-4 flex ml-4">
                                <span className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded m-auto">
                                    Habilitado
                                </span>
                                <span className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded m-auto">
                                    Deshabilitado
                                </span>
                            </div>
                        </div>

                        <div className="">
                            <NavLink
                                to={''}
                                className="text-blue-500 hover:underline m-auto">
                                <span>Requisitos</span>
                                <i className={`bi bi-info-circle ml-2 text-lg`} />
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <div className="flex-auto mb-3">
                        <p className="text-lg font-semibold m-auto">Modalidades</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                        <ModalidadCard
                            imagen={images.modalidad_efectiva}
                            titulo={'CURRICULAR'}
                            resumen={''}
                            to={'/inicio/proceso'}
                            info={''}
                        />
                        <ModalidadCard
                            imagen={images.modalidad_convalidacion}
                            titulo={'CONVALIDACIÓN'}
                            resumen={''}
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