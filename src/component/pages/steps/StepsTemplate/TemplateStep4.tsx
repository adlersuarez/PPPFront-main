import { useEffect, useRef, useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ListaElementos from "./Contenedor/ListaElementos";
import ModalCargarPlan from "../../modalForms/ModalTemplate4/ModalCargarPlan";
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { EstadoPlanActividades } from "@/network/rest/practicas.network";
import EstadoValor from "@/model/interfaces/estado/EstadoValor";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import MostrarPlanActividades from "../../modalForms/ModalTemplate4/MostrarPlanActividades";

const TemplateStep4 = () => {
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    const Caracteristicas = [
        {
            descripcion: 'Descarga el formato de plan de actividades',
            estado: 1,
        },
        {
            descripcion: 'Registra las posibles actividades a realizar durante todo el periodo de prácticas',
            estado: 2,
        },

    ]

    const Importante = [
        {
            descripcion: 'Plazo máximo de ## días posteriores de iniciar el proceso.'
        },
        {
            descripcion: 'El plan de actividades debe ser escaneado a colores, debidamente firmado y sellado por su jefe inmediato'
        },
    ]


    const [show, setShow] = useState<boolean>(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Mostrar plan
    const [showPlanDatos, setShowPlanDatos] = useState<boolean>(false)

    const handleClosePlanDatos = () => setShowPlanDatos(false)
    const handleShowPlanDatos = () => setShowPlanDatos(true)


    const [estadoPlan, setEstadoPlan] = useState<number | null>(null)

    const LoadEstadoPlan = async () => {
        // setGrado([])
        const response = await EstadoPlanActividades<EstadoValor>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoValor
            setEstadoPlan(Number(data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const Init = () => {
        LoadEstadoPlan()
    }

    useEffect(() => {
        Init()
    }, [])

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ModalCargarPlan show={show} hide={handleClose} init={Init} />
            <MostrarPlanActividades show={showPlanDatos} hide={handleClosePlanDatos} />

            <ContenedorSteps
                numero={4}
                titulo="PLAN DE ACTIVIDADES"
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
                            paso={4}
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
                                            <EstadoRequisito valor={estadoPlan === 0 ? 1 : 2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Plan de actividades
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                {estadoPlan === 0 &&
                                                    <button
                                                        onClick={handleShow}
                                                        className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >
                                                        Subir
                                                    </button>
                                                }
                                                {estadoPlan === 1 &&
                                                    <button
                                                        onClick={handleShowPlanDatos}
                                                        className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >
                                                        Ver
                                                    </button>
                                                }

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Documento debidamente cargado</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Documento requerido</span>
                            </div>
                        </div>
                    </div>

                </ContenedorSteps.Proceso>
            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep4;