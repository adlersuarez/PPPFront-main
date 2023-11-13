import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoRequisito from "./Contenedor/EstadoRequisito";
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ListaElementos from "./Contenedor/ListaElementos";

const TemplateStep6 = () => {

    const Caracteristicas = [
        {
            descripcion: 'Se realizará una visita inopinada o se enviará una ficha de evaluación de desempeño a su jefe inmediato',
        },
    ]

    const Importante = [
        {
            descripcion: 'Cuando su jefe inmediato evalúe tu desempeño, el sistema te permitirá subir tu informe final, de lo contrario no podrás subir tu informe final'
        },
    ]

    const EstadoActual = {
        estado: 2,
        fecha: {
            presentacion: '2023-11-10T16:10:00.000'
        }
    }

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            <ContenedorSteps
                numero={6}
                titulo="EVALUACIÓN DE DESEMPEÑO"
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
                                            <EstadoRequisito estado={1} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Evaluación de desempeño
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Subir</button>
                                                <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                            </div>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>

                        <hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Evaluación de desempeño completada</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Evaluacion de desempeño no completada</span>
                            </div>

                        </div>

                    </div>
                </ContenedorSteps.Proceso>

            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep6;