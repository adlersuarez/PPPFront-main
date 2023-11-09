

interface ContactData {
    nombre: string;
    telefono: string;
    correo: string;
    direccion: string;
}

const Contacto = () => {

    const coordinatorData: ContactData = {
        nombre: "Juan Perez",
        telefono: "+51 904182526",
        correo: "coordinador@upla.edu.pe",
        direccion: "123 Calle Principal, Ciudad X",
    };

    const soporteData: ContactData = {
        nombre: "Jose Rodriguez",
        telefono: "+51 96632100",
        correo: "soporte@upla.edu.pe",
        direccion: "123 Calle Principal, Ciudad X",
    };

    const docenteData: ContactData = {
        nombre: "Edison Ponce",
        telefono: "+51 984456852",
        correo: "docente@upla.edu.pe",
        direccion: "123 Calle Principal, Ciudad X",
    };

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border gap-8">

                    <div className="flex-auto mb-3">
                        <h1 className='font-bold text-2xl text-gray-400'>CONTACTOS</h1>
                        <p className="leading-normal text-sm dark:text-white dark:opacity-60"></p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 md:grid-cols-1">
                        <div className="bg-white rounded-lg shadow max-w-3xl p-4 flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 pr-4 mb-4 sm:mb-0">
                                <div className="flex flex-col relative mb-8 pl-4 text-right justify-between h-full">
                                    <div className="absolute top-8 left-8 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 w-16 h-16 flex items-center justify-center rounded-full">
                                        <i className="bi bi-person-fill text-white text-4xl"></i>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-3xl font-bold">Coordinador</h2>
                                        <p className="text-xl">{coordinatorData.nombre}</p>
                                        <p className="text-xs">Oficina #####</p>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-xs text-center">Aquí puedes encontrar los detalles de contacto del coordinador de la oficina X.</p>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h2 className="text-xl font-bold mb-4">Detalles</h2>

                                <div className="flex items-center mb-4">
                                    <i className="bi bi-telephone-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{coordinatorData.telefono}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <i className="bi bi-envelope-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{coordinatorData.correo}</p>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-geo-alt-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{coordinatorData.direccion}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow max-w-3xl p-4 flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 pr-4 mb-4 sm:mb-0">
                                <div className="flex flex-col relative mb-8 pl-4 text-right justify-between h-full">
                                    <div className="absolute top-8 left-8 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 w-16 h-16 flex items-center justify-center rounded-full">
                                        <i className="bi bi-person-fill text-white text-4xl"></i>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-3xl font-bold">Soporte</h2>
                                        <p className="text-xl">{soporteData.nombre}</p>
                                        <p className="text-xs">Oficina #####</p>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-xs text-center">Aquí puedes encontrar los detalles de contacto del coordinador de la oficina X.</p>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h2 className="text-xl font-bold mb-4">Detalles</h2>

                                <div className="flex items-center mb-4">
                                    <i className="bi bi-telephone-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{soporteData.telefono}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <i className="bi bi-envelope-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{soporteData.correo}</p>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-geo-alt-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{soporteData.direccion}</p>
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="bg-white rounded-lg shadow max-w-3xl p-4 flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 pr-4 mb-4 sm:mb-0">
                                <div className="flex flex-col relative mb-8 pl-4 text-right justify-between h-full">
                                    <div className="absolute top-8 left-8 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 w-16 h-16 flex items-center justify-center rounded-full">
                                        <i className="bi bi-person-fill text-white text-4xl"></i>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-3xl font-bold">Docente</h2>
                                        <p className="text-xl">{docenteData.nombre}</p>
                                        <p className="text-xs">Oficina #####</p>
                                    </div>
                                    <div>
                                        <p className="mb-0 text-xs text-center">Aquí puedes encontrar los detalles de contacto del coordinador de la oficina X.</p>
                                    </div>
                                </div>

                            </div>
                            <div className="w-full sm:w-1/2 bg-gray-100 p-4 rounded-lg shadow-inner">
                                <h2 className="text-xl font-bold mb-4">Detalles</h2>

                                <div className="flex items-center mb-4">
                                    <i className="bi bi-telephone-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{docenteData.telefono}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <i className="bi bi-envelope-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{docenteData.correo}</p>
                                </div>
                                <div className="flex items-center">
                                    <i className="bi bi-geo-alt-fill text-gray-600 text-xl mr-3"></i>
                                    <p>{docenteData.direccion}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacto;