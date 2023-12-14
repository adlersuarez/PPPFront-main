
type Props = {
    pasoActual: number;
    cambiarPaso: (paso: number) => void;
}

const AccordionMatriculaIdioma = (props: Props) => {
    return (
        <>
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

                        { /*/                            props.loadPagos ?
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

                        /*/}



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
                                    onClick={()=>{}}
                                >
                                    <h3 className="text-lg font-semibold">
                                        Idioma: <span className="text-red-600">Ingles</span>
                                    </h3>
                                </div>

                                <hr />


                                {/*/ isOpen && (
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
                                                            primeraMatricula={primeraMatricula}
                                                            nivelMatricula={primeraMatricula ? 1 : nivelMatricula}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </>
                                )/*/}
                            </div>
                        </div>
                    )}
                {/* ...otros pasos... */}
            </div>
        </>
    )
}
export default AccordionMatriculaIdioma