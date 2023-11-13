import { useState } from 'react';
import ModalDatosAreaTrabajo from '../../modalForms/ModalDatosAreaTrabajo';
import ModalDatosJefeInmediato from '../../modalForms/ModalDatosJefeInmediato';
import ContenedorSteps from './Contenedor/ContenedorSteps';
import ListaElementos from './Contenedor/ListaElementos';
import EstadoTemplate from './Contenedor/EstadoTemplate';
import EstadoRequisito from './Contenedor/EstadoRequisito';

const TemplateStep3 = () => {

    const [showArea, setShowArea] = useState<boolean>(false);
    const [showJefe, setShowJefe] = useState<boolean>(false);

    const handleCloseArea = () => setShowArea(false);
    const handleShowArea = () => setShowArea(true);

    const handleCloseJefe = () => setShowJefe(false);
    const handleShowJefe = () => setShowJefe(true);

    const Requisitos = [
        {
            descripcion: 'Fecha de inicio y finalización de practicas',
            estado: 1,
        },
        {
            descripcion: 'Datos del centro laboral',
            estado: 2,
        },
        {
            descripcion: 'Datos del área de trabajo',
            estado: 3,
        },
        {
            descripcion: 'Datos del jefe inmediato',
        },
    ]

    const Procedimientos = [
        {
            descripcion: 'Rellenar ficha'
        },
    ]

    const EstadoActual = {
        estado: 1,
        fecha: {
            presentacion: '2023-11-10T16:10:00.000'
        }
    }

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            <ModalDatosAreaTrabajo show={showArea} hide={handleCloseArea} />

            <ModalDatosJefeInmediato show={showJefe} hide={handleCloseJefe} />

            <ContenedorSteps
                numero={3}
                titulo='FICHA DE JEFE INMEDIATO'
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo='Requisitos'
                            elementos={Requisitos}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo='Procedimiento'
                            elementos={Procedimientos}
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
                                            <EstadoRequisito estado={1} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos del área de trabajo
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowArea}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowArea}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-gray-100 border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito estado={2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos del jefe inmediato
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowJefe}>Iniciar</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowJefe}>Ver</button>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>

                        <hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Datos completos, puede continuar con el procedimiento</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Datos incompletos, por favor rellene todos los formularios</span>
                            </div>

                        </div>

                    </div>
                </ContenedorSteps.Proceso>
            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep3;