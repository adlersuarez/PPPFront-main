const TemplateStep6 = () => {
    return (
        <div className="mt-10 rounded shadow-lg border p-4 w-full">

            <div className="flex">
                <div className="w-1/2 pr-4">
                    <div className="flex text-gray-400">
                        <i className="bi bi-6-square-fill mr-4 text-xl" />
                        <h1 className="font-bold text-xl">EVALUACIÓN DE DESEMPEÑO</h1>
                    </div>

                    <h2 className="font-semibold text-lg">Características</h2>
                    <ul className="list-disc">

                        <li className="mb-1 ml-8">Se realizará una visita inopinada o se enviará una ficha de evaluación de desempeño a su jefe inmediato</li>

                    </ul>
                    <hr className="my-2" />
                    <h2 className="font-semibold text-lg">Importante</h2>
                    <ul className="list-disc">
                        <li className="mb-1 ml-8">Cuando su jefe inmediato evalúe tu desempeño, el sistema te permitirá subir tu informe final, de lo contrario no podrás subir tu informe final</li>
                    </ul>
                </div>

                <div className="w-1/2 pl-4 border-l flex flex-col justify-between">
                    <div>
                        <div className="mb-4 flex">
                            <p className="text-lg font-semibold">Estado:</p>
                            {/* Completado */}
                            <div className="flex ml-2 rounded-lg bg-green-500 text-white px-2">
                                <span className="m-auto">Completado</span>
                            </div>

                            {/* Proceso */}
                            <div className="flex ml-2 rounded-lg bg-yellow-400 text-white px-2">
                                <span className="m-auto">En proceso</span>
                            </div>

                            {/* Duración */}
                            <div className="flex ml-2 rounded-lg bg-yellow-400 text-white px-2">
                                <i className="bi bi-clock-history m-auto mr-1" />
                                <span className="m-auto">15 días</span>
                            </div>

                            {/* Duración */}
                            <div className="flex ml-2 rounded-lg bg-red-700 text-white px-2">
                                <i className="bi bi-clock-history m-auto mr-1" />
                                <span className="m-auto">5 días</span>
                            </div>

                        </div>



                        <div className='flex flex-col gap-2'>
                           

                            <div className="flex items-center">
                                <div className="rounded-full bg-yellow-400 text-white items-center justify-center w-6 flex">
                                    <i className="bi bi-exclamation-lg m-auto" />
                                </div>

                                <span className="ml-4">Evaluación de desempeño</span>

                                <div className="ml-auto">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2">Ver</button>
                                </div>
                            </div>

                            
                        </div>

                    </div>

                    <div>
                        <hr className="mb-4" />
                        <div className="flex flex-col gap-2">
                            <div>
                                <span className="bg-green-200 rounded-lg px-4 text-green-600 font-semibold">Evaluación completada</span>
                            </div>
                            <div>
                                <span className="bg-red-200 rounded-lg px-4 text-red-600 font-semibold">Evaluación requerida</span>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TemplateStep6;