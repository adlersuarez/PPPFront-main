

import { useState } from "react";

import ValidarCelular from "./modal/ValidarDatos";
import ValidarCorreo from "./modal/ValidarCorreo";

type DatosType = {
    dni: string;
    email: string;
    telefono: string;
};

const Registro = () => {

    const [datos, setDatos] = useState<DatosType>({
        dni: '71254763',
        email: '',
        telefono: '',
    });

    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showMail, setShowMail] = useState<boolean>(false);
    const handleCloseMail = () => setShowMail(false);
    const handleShowMail = () => setShowMail(true);

    //const textRef = useRef<HTMLInputElement>(null);

    /*const copyToClipboard = () => {
        if (textRef.current) {
            textRef.current.select();
            console.log(textRef)
            document.execCommand("copy");
            window.getSelection()?.removeAllRanges();
        }
    };*/

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <ValidarCelular datos={datos} show={show} hide={handleClose} />

                    <ValidarCorreo datos={datos} show={showMail} hide={handleCloseMail} />

                    <h1 className="text-blue-800 mb-4 font-bold text-2xl">Pre-Registro estudiantes</h1>

                    <div className="w-full max-w-screen-xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Columna 1 */}
                            <div className="shadow">
                                <div className="bg-blue-800 text-white px-4 py-2 flex gap-2">
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

                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="correoElectronico"
                                                className="block text-gray-500 font-medium">
                                                Correo Electrónico
                                            </label>
                                            <div className="bg-green-400 px-1 h-5 text-white rounded-sm flex gap-2 text-xs">
                                                <i className="bi bi-check-circle my-auto " /> 
                                                <span className="my-auto">Validado</span>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-2 justify-between">
                                            <div className="flex w-full">
                                                <input
                                                    type="email"
                                                    placeholder="Ejm:   JuanPerez@gmail.com"
                                                    id="correoElectronico"
                                                    name="correoElectronico"
                                                    className="w-full border rounded px-3 py-2"
                                                    value={datos.email}
                                                    onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                                                />

                                            </div>

                                            <button
                                                onClick={handleShowMail}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded flex gap-2 justify-center"
                                            >
                                                <i className="bi bi-patch-check my-auto text-xl sm:text-lg" />
                                                <span className="hidden sm:flex my-auto">Validar</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="">
                                    <div className="flex justify-between">
                                            <label
                                                htmlFor="correoElectronico"
                                                className="block text-gray-500 font-medium">
                                                Número Telefónico
                                            </label>
                                            <div className="bg-green-400 px-1 h-5 text-white rounded-sm flex gap-2 text-xs">
                                                <i className="bi bi-check-circle my-auto" /> 
                                                <span className="my-auto">Validado</span>
                                            </div>
                                        </div>
                                        <div className="w-full flex gap-2 justify-between">
                                            <div className="flex w-full">
                                                <input
                                                    type="text"
                                                    placeholder="Ejm:   964 158 897"
                                                    id="numeroTelefono"
                                                    name="numeroTelefono"
                                                    className="w-full border rounded px-3 py-2"
                                                    value={datos.telefono}
                                                    onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
                                                />
                                                
                                            </div>
                                            <button
                                                onClick={handleShow}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded flex gap-2 justify-center"
                                            >
                                                <i className="bi bi-patch-check my-auto text-xl sm:text-lg" />
                                                <span className="hidden sm:flex my-auto">Validar</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className="shadow h-auto">
                                <div className="bg-[#2196F3] text-white px-4 py-2 flex gap-2">
                                    <i className="bi bi-person-vcard-fill text-2xl my-auto" />
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
                                            value={'Universidad Peruana Los Andes'}
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
                    <div className="w-full flex justify-end">
                        <button
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Confirmar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )

}


export default Registro;