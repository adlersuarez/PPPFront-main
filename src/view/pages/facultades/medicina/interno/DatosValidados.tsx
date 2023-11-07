const DatosValidados = () => {

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    

                    <h1 className="text-blue-800 mb-4 font-bold text-2xl">Pre-Registro estudiantes</h1>

                    <div className="w-full max-w-screen-xl mx-auto">
                        <div className="flex gap-4">
                            {/* Columna 1 */}
                            <div className="w-1/2 shadow">
                                <div className="bg-blue-800 text-white p-2 flex gap-2">
                                    <i className="bi bi-person-fill text-2xl my-auto" />
                                    <span className="my-auto">Información Personal y de Contacto</span>
                                </div>
                                <div className="flex flex-col p-4 gap-4">
                                    <div className="">
                                        <label
                                            htmlFor="tipoDocumento"
                                            className="block text-gray-500 font-medium">
                                            Tipo de Documento
                                        </label>
                                        <select
                                            id="tipoDocumento"
                                            name="tipoDocumento"
                                            className="w-full border rounded px-3 py-2">
                                            {/* Agrega opciones aquí */}
                                        </select>
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="pais"
                                            className="block text-gray-500 font-medium">
                                            País de Procedencia
                                        </label>
                                        <select
                                            id="pais"
                                            name="pais"
                                            className="w-full border rounded px-3 py-2">
                                            {/* Agrega opciones aquí */}
                                        </select>
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="numeroDocumento"
                                            className="block text-gray-500 font-medium">
                                            Número de Documento
                                        </label>
                                        <input
                                            type="text"
                                            //ref={textRef}
                                            value={'75644383'}
                                            id="numeroDocumento"
                                            name="numeroDocumento"
                                            className="w-full border rounded px-3 py-2 bg-gray-200"
                                            readOnly
                                        />
                                        {/*<button
                                            onClick={copyToClipboard}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer absolute top-0 right-0 m-2"
                                        >
                                            Copiar al Portapapeles
                                        </button>*/}
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="correoElectronico"
                                            className="block text-gray-500 font-medium">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Ejm:   JuanPerez@gmail.com"
                                            id="correoElectronico"
                                            name="correoElectronico"
                                            className="w-full border rounded px-3 py-2" />
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="numeroTelefono"
                                            className="block text-gray-500 font-medium">
                                            Número Telefónico
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Ejm:   964 158 897"
                                            id="numeroTelefono"
                                            name="numeroTelefono"
                                            className="w-full border rounded px-3 py-2" />
                                    </div>
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className="w-1/2 shadow h-auto">
                                <div className="bg-[#2196F3] text-white p-2 flex gap-2">
                                    <i className="bi bi-person-fill text-2xl my-auto" />
                                    <span className="my-auto">Datos profesionales / académicos</span>
                                </div>
                                <div className="flex flex-col p-4 gap-4">
                                    <div className="">
                                        <label
                                            htmlFor="universidad"
                                            className="block text-gray-600">
                                            Universidad de Procedencia
                                        </label>
                                        <input
                                            type="text"
                                            value={'UPLA'}
                                            id="universidad"
                                            name="universidad"
                                            className="w-full border rounded px-3 py-2 bg-gray-200"
                                            readOnly />
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="escuela"
                                            className="block text-gray-600">
                                            Escuela Profesional
                                        </label>
                                        <input
                                            type="text"
                                            value={'Medicina Humana'}
                                            id="escuela"
                                            name="escuela"
                                            className="w-full border rounded px-3 py-2 bg-gray-200"
                                            readOnly />
                                    </div>

                                    <div className="">
                                        <label
                                            htmlFor="anioEstudio"
                                            className="block text-gray-600">Año de Estudio</label>
                                        <input
                                            type="text"
                                            value={'2023-II'}
                                            id="anioEstudio"
                                            name="anioEstudio"
                                            className="w-full border rounded px-3 py-2 bg-gray-200 "
                                            readOnly />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                </div>
            </div>
        </div>
    )

}


export default DatosValidados;