interface Paso3Props {
    datosArea: {
        areaEspecifica: string;
        direccion: string;
        diasPracticas: string;
        horario: string;
        inicioPracticas: string;
        finPracticas: string;
    };
    datosJefe: {
        dni: string;
        nombre: string;
        grado: string;
        cargo: string;
        correo: string;
        celular: string;
    };
    datosEmpresa: {
        nombre: string;
        ruc: string;
        responsable: string;
        dni: string;
        cargo: string;
    }
}


const Paso3: React.FC<{ elementos: Paso3Props }> = ({ elementos }) => {


    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-3-square-fill`} />
                <h1 className="font-bold">FICHA DE DATOS ÁREA DE TRABAJO</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                <div className={`flex flex-col  gap-4 h-auto`}>
                    <div className='flex flex-col bg-white rounded border'>
                        <div className="flex bg-gray-400 text-white gap-4 text-center">
                            <span className="font-bold py-2 mx-auto">
                                {elementos.datosEmpresa.nombre}
                            </span>
                        </div>
                        <hr />
                        <div className="flex flex-col  text-sm sm:text-lg">
                            <div className="flex text-gray-400 gap-2 p-2">
                                <p className="w-2/5">RUC:</p>
                                <span className="font-bold w-3/5">
                                    {elementos.datosEmpresa.ruc}
                                </span>
                            </div>
                            <hr />
                            <div className="flex flex-col p-2 gap-2">
                                <div className="flex text-gray-400 gap-2">
                                    <p className="w-2/5">RESPONSABLE:</p>
                                    <span className="font-bold w-3/5">
                                        {elementos.datosEmpresa.responsable}
                                    </span>
                                </div>
                                <div className="flex text-gray-400 gap-2">
                                    <p className="w-2/5">DNI:</p>
                                    <span className="font-bold w-3/5">
                                        {elementos.datosEmpresa.dni}
                                    </span>
                                </div>
                                <div className="flex text-gray-400 gap-2">
                                    <p className="w-2/5">CARGO:</p>
                                    <span className="font-bold w-3/5">
                                        {elementos.datosEmpresa.cargo}
                                    </span>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="flex flex-col gap-4">
                    <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                        <h2 className="font-bold text-xl sm:text-2xl">ÁREA DE TRABAJO</h2>
                    </div>
                    <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold ">Área</div>
                            <div className="w-2/3">{elementos.datosArea.areaEspecifica}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">Dirección</div>
                            <div className="w-2/3">{elementos.datosArea.direccion}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">DURACIÓN</div>
                            <div className="w-2/3">{elementos.datosArea.diasPracticas}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">HORARIO</div>
                            <div className="w-2/3">{elementos.datosArea.horario}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 ">
                    <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                        <h2 className="font-bold text-xl sm:text-2xl">JEFE INMEDIATO</h2>
                    </div>
                    <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold ">NOMBRE</div>
                            <div className="w-2/3">{elementos.datosJefe.nombre}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">DNI</div>
                            <div className="w-2/3">{elementos.datosJefe.dni}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">GRADO</div>
                            <div className="w-2/3">{elementos.datosJefe.grado}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">CARGO</div>
                            <div className="w-2/3"> {elementos.datosJefe.cargo}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">TELÉFONO</div>
                            <div className="w-2/3"> {elementos.datosJefe.celular}</div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-1/3 font-bold">CORREO</div>
                            <div className="w-2/3"> {elementos.datosJefe.correo}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paso3;