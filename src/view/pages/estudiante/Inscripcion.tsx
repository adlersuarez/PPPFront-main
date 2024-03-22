import ContainerVIstas from '@/component/Container';
import { BotonAnimado } from '@/component/pages/buttons/ButtonAnimado';
import ButtonLink from '@/component/pages/buttons/ButtonLink';
import ModalidadCard from '@/component/pages/cards/ModalidadCard';
import { images } from '@/helper/index.helper';

const Inscripcion = () => {

    /*const sweet = () => {
        Alerta().fire({
            title: 'Auto close alert!',
            text: 'I will close in 2 seconds.',
            timer: 2000
        });
    };*/

    return (
        <ContainerVIstas >
            <div className='flex flex-col p-0 sm:p-2'>
                <div className="grid grid-cols-1 gap-4 rounded-lg">
                    <div className="flex flex-col justify-between">
                        <div className='flex flex-row gap-10'>
                            <div className='flex flex-col gap-2'>
                                <h1 className='font-bold text-2xl text-upla-100'>PRÁCTICAS PREPROFESIONALES</h1>
                                <p className='text-sm text-justify'>
                                    <strong className='text-gray-500'>Las prácticas preprofesionales (PPP)</strong> son un requisito para egresar de su especialidad. El alumno es responsable de escoger el lugar y momento de la realización de las PPP, el mismo que deberá ser autorizado por su coordinador(a) de especialidad.
                                </p>
                                <div className='flex flex-col gap-2 text-xs'>
                                    <h2 className='font-bold text-upla-100'>FINALIDAD</h2>
                                    <ul className=" list-inside list-none pl-2 text-xs flex flex-col gap-1">
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
                                <div className='w-full flex mt-2 sm:mt-4'>
                                    <BotonAnimado
                                        onClick={() => { }}
                                        className='w-full sm:w-auto px-4 py-1 border-upla-100 text-upla-100 border hover:bg-upla-100 hover:text-white'
                                    >
                                        Leer más
                                    </BotonAnimado>
                                </div>
                            </div>
                            <div className='hidden sm:flex w-full h-auto'>
                                <img
                                    src="https://upla.edu.pe/nw/wp-content/uploads/2024/02/MAESTROS-UPLA-e1709162518638-1200x600.jpg"
                                    alt="Imagen Prácticas Preprofesionales"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='my-6' />
                <div className="flex flex-col w-full h-auto min-w-0 bg-white opacity-100">
                    <div className="flex-auto mb-3">
                        <p className="text-lg font-bold m-auto text-gray-400">MODALIDADES</p>
                        <p>Existen 2 modalidades, elige la que se adecue a tu situación</p>
                    </div>

                    <div className="grid grid-grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-start sm:p-4">
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
                <hr className='my-6' />
                <div className='flex flex-col gap-4'>
                    <h2 className='font-bold text-gray-400'>HERRAMIENTAS DE APOYO</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 xl:gap-6">
                        <ButtonLink
                            to={'/inicio/inscripcion'}
                            nombre={'Manual'}
                            icon={'bi-book'}
                            color='bg-upla-100'
                            hover='bg-upla-200'
                        />

                        <ButtonLink
                            to={'/inicio/reglamentos'}
                            nombre={'Reglamento'}
                            icon={'bi-journal-check'}
                            color='bg-upla-100'
                            hover='bg-upla-200'
                        />

                        <ButtonLink
                            to={'/inicio/soporte'}
                            nombre={'Soporte'}
                            icon={'bi-telephone'}
                            color='bg-upla-100'
                            hover='bg-upla-200'
                        />

                        <ButtonLink
                            to={'/inicio/requisitos'}
                            nombre={'Requisitos'}
                            icon={'bi-list-check'}
                            color='bg-upla-100'
                            hover='bg-upla-200'
                        />

                    </div>
                </div>
            </div>

        </ContainerVIstas>
    )
}

export default Inscripcion