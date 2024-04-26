import { useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ListaElementos from "./Contenedor/ListaElementos";
import ModalInformeFinal from "../../modalForms/ModalTemplate6/ModalInformeFinal";
import ModalConvenioPracticas from "../../modalForms/ModalTemplate6/ModalConvenioPracticas";
import ModalConstanciaEmpresa from "../../modalForms/ModalTemplate6/ModalConstanciaEmpresa";
import ModalAsistenciaVisada from "../../modalForms/ModalTemplate6/ModalAsistenciaVisada";

const TemplateStep7 = () => {

    const Caracteristicas = [
        {
            descripcion: 'Descarga el formato de informe final',
            estado: 1,
        },
        {
            descripcion: 'Constancia de prácticas emitido por la empresa',
            estado: 2,
        },

    ]

    const Importante = [
        {
            descripcion: 'Plazo máximo de ## días posteriores de iniciar el proceso.'
        },
    ]

    const EstadoActual = {
        estado: 2,
        fecha: {
            presentacion: '2023-11-10T16:10:00.000'
        }
    }

    const [showInformeFinal, setShowInformeFinal] = useState<boolean>(false)
    const handleCloseInformeFinal = () => setShowInformeFinal(false)
    const handleShowInformeFinal = () => setShowInformeFinal(true)

    const [showConvenioPracticas, setShowConvenioPracticas] = useState<boolean>(false)
    const handleCloseConvenioPracticas = () => setShowConvenioPracticas(false)
    const handleShowConvenioPracticas = () => setShowConvenioPracticas(true)

    const [showConstanciaEmpresa, setShowConstanciaEmpresa] = useState<boolean>(false)
    const handleCloseConstanciaEmpresa = () => setShowConstanciaEmpresa(false)
    const handleShowConstanciaEmpresa = () => setShowConstanciaEmpresa(true)

    const [showAsistenciaVisada, setShowAsistenciaVisada] = useState<boolean>(false)
    const handleCloseAsistenciaVisada = () => setShowAsistenciaVisada(false)
    const handleShowAsistenciaVisada = () => setShowAsistenciaVisada(true)

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ModalInformeFinal show={showInformeFinal} hide={handleCloseInformeFinal} />
            <ModalConvenioPracticas show={showConvenioPracticas} hide={handleCloseConvenioPracticas} />
            <ModalConstanciaEmpresa show={showConstanciaEmpresa} hide={handleCloseConstanciaEmpresa} />
            <ModalAsistenciaVisada show={showAsistenciaVisada} hide={handleCloseAsistenciaVisada} />

            <ContenedorSteps
                numero={7}
                titulo="INFORME FINAL"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo="Características"
                            elementos={Caracteristicas}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo="Importante"
                            elementos={Importante}
                        />
                    </div>
                </ContenedorSteps.Informacion>

                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>

                        <EstadoTemplate
                            datos={EstadoActual}
                        />

                        <hr className="my-2" />

                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Requisito</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={0} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Informe final
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button
                                                    onClick={handleShowInformeFinal}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Subir</button>
                                                <button
                                                    onClick={() => { }}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={0} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Convenio de prácticas
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button
                                                    onClick={handleShowConvenioPracticas}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Subir</button>
                                                <button
                                                    onClick={() => { }}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={0} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Constancia de empresa
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button
                                                    onClick={handleShowConstanciaEmpresa}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Subir</button>
                                                <button
                                                    onClick={() => { }}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={0} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Asistencia Visada
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button
                                                    onClick={handleShowAsistenciaVisada}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Subir</button>
                                                <button
                                                    onClick={() => { }}
                                                    className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Documentos debidamente cargados</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Documentos requeridos</span>
                            </div>
                        </div>
                    </div>

                </ContenedorSteps.Proceso>

            </ContenedorSteps>
        </div>
    );
};

export default TemplateStep7;