import { NavLink, RouteComponentProps } from "react-router-dom";

const MatriculaInterna = (props: RouteComponentProps<{}>) => {
    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full  min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                        <div className="p-2">
                            <h2 className="text-2xl font-bold mb-6">
                                Datos del estudiante
                                <i className="bi bi-person-fill text-lg text-gray-500"></i><span className="text-gray-500 text-base font-normal">Centro de Idiomas</span>
                            </h2>

                            {
                                // DATOS DEL ESTUDIANTE - DNI
                            }

                            <div className='flex justify-around'>
                                <div className='flex w-1/2'>
                                    <h3 className='font-bold w-full m-auto pr-2'>DNI: </h3>
                                    <input
                                        type="number"
                                        className="px-2 py-2 text-gray-500 h-8 my-auto rounded-md w-full"
                                        placeholder="70232084"
                                        onChange={() => { }}
                                    />
                                </div>
                            </div>
                            <br />

                            {
                                // DATOS DEL ESTUDIANTE
                            }
 
                            <div className='flex justify-center'>
                                <div className='flex w-1/2'>
                                    <h3 className='font-bold m-auto pr-2'>ESTUDIANTE: </h3>
                                    <input
                                        type="text"
                                        className="px-2 py-2 text-gray-500 h-8 my-auto rounded-md w-full"
                                        placeholder="QUINTANA ORE YANG YHONATAN"
                                        disabled
                                    />
                                    {
                                        // MODALIDAD,CARRERA Y SEMESTRE DEL ESTUDIANTE
                                    }
                                </div>
                            </div>
                            <br />
                            <div className='flex justify-around'>
                                <div className='flex'>
                                    <h3 className='font-bold m-auto pr-2'>CARRERA PROFESIONAL: </h3>
                                    <input
                                        type="text"
                                        className="px-4 py-2 text-gray-500 h-8 my-auto rounded-md uppercase"
                                        placeholder="Ingenieria de Sistemas"
                                        disabled
                                    />
                                </div>
                                <div className='flex'>
                                    <h3 className='font-bold m-auto pr-2'>MODALIDAD: </h3>
                                    <input
                                        type="text"
                                        className="px-4 py-2 text-gray-500 h-8 my-auto rounded-md uppercase"
                                        placeholder="Presencial"
                                        disabled
                                    />
                                </div>
                                <div className='flex'>
                                    <h3 className='font-bold m-auto pr-2'>SEMESTRE: </h3>
                                    <input
                                        type="number"
                                        className="px-4 py-2 text-gray-500 h-8 my-auto rounded-md uppercase"
                                        placeholder="4"
                                        disabled
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mt-2">
                        <div className="w-full max-w-full px-3 flex-0">
                            <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                                <div className="p-2">

                                    <h2 className="text-2xl font-bold mb-6"> Verificacion de pago <i className="bi bi-receipt-cutoff text-lg text-gray-500"></i> <span className="text-gray-500 text-base font-normal">Centro de Idiomas</span></h2>

                                    <div className='flex justify-around'>
                                        <div className='flex flex-col'>
                                            <div className="rounded-lg p-4 border border-gray-300 shadow-md max-w-xs mx-auto">
                                                <h2 className="text-xl font-bold mb-2">RECIBO N°1 <i className="bi bi-receipt text-lg text-gray-500"></i></h2>
                                                <p><strong>Código:</strong> 12345</p>
                                                <p><strong>Tipo:</strong> Matricula Centro de Idiomas</p>
                                                <p><strong>Fecha:</strong> 18 de Octubre, 2023</p>
                                            </div>
                                        </div>

                                        {/* <div className='flex flex-col'>
                                            <div className="rounded-lg p-4 border border-gray-300 shadow-md max-w-xs mx-auto">
                                                <h2 className="text-xl font-bold mb-2">RECIBO N°2 <i className="bi bi-receipt text-lg text-gray-500"></i></h2>
                                                <p><strong>Código:</strong> 56789</p>
                                                <p><strong>Tipo:</strong> Matricula Centro de Idiomas</p>
                                                <p><strong>Fecha:</strong> 18 de Octubre, 2023</p>
                                            </div>
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-wrap -mx-3 mt-2">
                        <div className="w-full max-w-full px-3 flex-0">
                            <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">
                                <div className="p-2">
                                    <h2 className="text-2xl font-bold mb-6"> Proceso de Matricula <i className="bi bi-house-fill text-lg text-gray-500"></i> <span className="text-gray-500 text-base font-normal">Centro de Idiomas</span></h2>
                                    <div className="w-full">
                                        {
                                            // DATOS DE MATRICULA
                                        }

                                        <div className='flex justify-around'>
                                            <div className='flex'>
                                                <h3 className='font-bold m-auto pr-2'>IDIOMA: </h3>
                                                <select
                                                    id="select-idioma"
                                                    defaultValue={'0'}
                                                    onChange={(e) => {
                                                        // SetIdioma(e.target.value);
                                                    }}
                                                >
                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                    {
                                                        // idiomas.map(idioma => {
                                                        //     return (
                                                        //         <option key={idioma.id} value={idioma.id}>{idioma.idioma_nombre}</option>
                                                        //     )
                                                        // })
                                                        <>
                                                            <option value="">Ingles</option>
                                                            <option value="">Japones</option>
                                                            <option value="">Japones</option>
                                                            <option value="">Italiano</option>
                                                        </>
                                                    }
                                                </select>
                                            </div>
                                            <div className='flex'>
                                                <h3 className='font-bold m-auto pr-2'>TIPO:</h3>
                                                <select
                                                    id="select-tipo"
                                                    defaultValue={'0'}
                                                    onChange={(e) => {
                                                        // SetTipo(e.target.value);
                                                    }}
                                                >
                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                    {
                                                        // tipos.map(tipo => {
                                                        //     return (
                                                        //         <option key={tipo.id} value={tipo.id}>{tipo.tipo_nombre}</option>
                                                        //     )
                                                        // })
                                                        <>
                                                            <option value="">Regular</option>
                                                            <option value="">Acelerado</option>
                                                        </>
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        {/* <div className='flex justify-around'>
                                            <div className="rounded-lg p-4 border text-center border-yellow-300 shadow-md max-w-xs mx-auto">
                                                <span><i className="bi bi-exclamation-triangle-fill text-2xl text-yellow-300"></i></span>
                                                <p><strong>Necesita realizar el pago correspondiente para registrar su matricula</strong></p>
                                            </div>
                                        </div> */}
                                        {
                                            // INSTRUCTORES
                                        }

                                        <br />
                                        <div className='flex justify-around'>
                                            <div className='flex'>
                                                <h3 className='font-bold m-auto pr-2'>INSTRUCTOR :</h3>
                                                <select
                                                    id="select-instructor-1"
                                                    defaultValue={'0'}
                                                    onChange={(e) => {
                                                        // SetInstructor(e.target.value);
                                                    }}
                                                >
                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                    {
                                                        // instructores.map(instructor => {
                                                        //     return (
                                                        //         <option key={instructor.id} value={instructor.id}>{instructor.nombre}</option>
                                                        //     )
                                                        // })
                                                        <>
                                                            <option value="">Instructor 1</option>
                                                            <option value="">Instructor 2</option>
                                                            <option value="">Instructor 3</option>
                                                            <option value="">Instructor 4</option>
                                                        </>
                                                    }
                                                </select>
                                            </div>

                                            {/* <div className='flex'>
                                                                <h3 className='font-bold m-auto pr-2'>INSTRUCTOR 2:</h3>
                                                                <select
                                                                    id="select-instructor-2"
                                                                    defaultValue={'0'}
                                                                    onChange={(e) => {
                                                                        SetInstructor_2(e.target.value);
                                                                    }}
                                                                >
                                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                                    {
                                                                        instructorFiltrado.map(instructor_2 => {
                                                                            return (
                                                                                <option key={instructor_2.id} value={instructor_2.id}>{instructor_2.nombre}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div> */}

                                        </div>
                                        <hr className='my-4' />
                                        {
                                            // HORARIO
                                        }
                                        <br />
                                        <div className='flex justify-around'>
                                            <div className='flex'>
                                                <h3 className='font-bold m-auto pr-2'>HORARIO:</h3>
                                                <select
                                                    id="select-horario-1"
                                                    defaultValue={'0'}
                                                    onChange={(e) => {
                                                        // SetHorario(e.target.value);
                                                    }}
                                                >
                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                    {
                                                        // horarios.map(horario => {
                                                        //     return (
                                                        //         <option key={horario.id} value={horario.id}>{horario.hora}</option>
                                                        //     )
                                                        // })
                                                        <>
                                                            <option value="">Horario 1</option>
                                                            <option value="">Horario 2</option>
                                                            <option value="">Horario 3</option>
                                                            <option value="">Horario 4</option>
                                                            <option value="">Horario 5</option>
                                                        </>
                                                    }
                                                </select>
                                            </div>

                                            {/* <div className='flex'>
                                                                <h3 className='font-bold m-auto pr-2'>HORARIO 2:</h3>
                                                                <select
                                                                    id="select-horario-2"
                                                                    defaultValue={'0'}
                                                                    onChange={(e) => {
                                                                        SetHorario_2(e.target.value);
                                                                    }}
                                                                >
                                                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                                                    {
                                                                        horarioFiltrado.map(horario_2 => {
                                                                            return (
                                                                                <option key={horario_2.id} value={horario_2.id}>{horario_2.hora}</option>
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </div> */}

                                        </div>



                                        <hr className='my-4' />
                                        {
                                            //REGISTRAR MATRICULA
                                        }
                                        <br />
                                        <div className='flex justify-end'>
                                            <div className='flex'>
                                                <button
                                                    className="bg-[#26b594] hover:bg-[#227964] text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <NavLink
                                                        to="/inicio/matricula_x_nivel">
                                                        Registrar matricula
                                                    </NavLink>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatriculaInterna