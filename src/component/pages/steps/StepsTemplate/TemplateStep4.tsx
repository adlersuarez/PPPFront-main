import React, { Suspense, useEffect, useRef, useState } from "react";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { EstadoPlanActividades, ObtenerEstadoModificaPlan } from "@/network/rest/practicas.network";
import EstadoValor from "@/model/interfaces/estado/EstadoValor";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import { ProcesoPasosEstudiante } from "@/helper/requisitos.helper";
import RequisitosListaEstudiante from "./Contenedor/RequisitoEstudiante";
import { SuspenseModal } from "@/component/suspense/SuspenseModal";
import EstadoEditarPlan from "@/model/interfaces/planActividades/estadoEditar";

const ModalCargarPlan = React.lazy(() => import("../../modalForms/ModalTemplate4/ModalCargarPlan"));
const MostrarPlanActividades = React.lazy(() => import("../../modalForms/ModalTemplate4/MostrarPlanActividades"));
const ModalEditarPlan = React.lazy(() => import("../../modalForms/ModalTemplate4/ModalEditarPlan"));

interface Props {
    InitEstado: () => void
}

const TemplateStep4: React.FC<Props> = ({ InitEstado }) => {

    const codigoEst = useSelector((state: RootState) => state.infoEstudiante.est_Id)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    const [show, setShow] = useState<boolean>(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    // Mostrar plan
    const [showPlanDatos, setShowPlanDatos] = useState<boolean>(false)

    const handleClosePlanDatos = () => setShowPlanDatos(false)
    const handleShowPlanDatos = () => setShowPlanDatos(true)

    // Editar plan
    const [showEditarPlan, setShowEditarPlan] = useState<boolean>(false)

    const handleCloseEditar = () => setShowEditarPlan(false)
    const handleShowEditar = () => setShowEditarPlan(true)

    const [estadoEditar, setEstadoEditar] = useState<boolean | null>(null)

    /////
    const [estadoPlan, setEstadoPlan] = useState<number | null>(null)

    const LoadEstadoPlan = async () => {
        // setGrado([])
        const response = await EstadoPlanActividades<EstadoValor>(periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoValor
            setEstadoPlan(Number(data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadEstadoEdicion = async () => {
        // setGrado([])/* CAMBIAR         AQUI
        const response = await ObtenerEstadoModificaPlan<EstadoEditarPlan>(codigoEst,periodo)
        if (response instanceof Response) {
            const data = response.data as EstadoEditarPlan
            setEstadoEditar(data.estado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const Init = () => {
        InitEstado()
        LoadEstadoPlan()
        LoadEstadoEdicion()
    }

    useEffect(() => {
        Init()
    }, [])

    //actualizar
    const [cambios, setCambios] = useState<boolean>(false)
    const handleChangeCambios = () => setCambios(!cambios)

    //Requisitos step 4
    const requisitos = ProcesoPasosEstudiante[3].requisitos ?? []

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <Suspense fallback={<SuspenseModal />}>
                <ModalCargarPlan show={show} hide={handleClose} init={Init} change={handleChangeCambios} />
                <MostrarPlanActividades show={showPlanDatos} hide={handleClosePlanDatos} cambios={cambios} />
                <ModalEditarPlan show={showEditarPlan} hide={handleCloseEditar} init={Init} change={handleChangeCambios} />
            </Suspense>

            <ContenedorSteps
                numero={4}
                titulo="PLAN DE ACTIVIDADES"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <RequisitosListaEstudiante
                            requisitos={requisitos}
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
                                                {(estadoPlan === 1 && estadoEditar === true) &&
                                                    <button
                                                        onClick={handleShowEditar}
                                                        className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >
                                                        Editar
                                                    </button>

                                                }

                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>

                </ContenedorSteps.Proceso>
            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep4;