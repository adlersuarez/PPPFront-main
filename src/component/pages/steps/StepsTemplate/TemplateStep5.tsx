import { useEffect, useRef, useState } from "react";
import ControlActividades from "../../modalForms/ModalTemplate5/ModalControlActividades";
import ContenedorSteps from "./Contenedor/ContenedorSteps"
import EstadoTemplate from "./Contenedor/EstadoTemplate";
import ListaElementos from "./Contenedor/ListaElementos";
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import { ListarDatosUnidadTematica } from "@/network/rest/practicas.network";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import Listas from "@/model/interfaces/Listas.model.interface";
import { EstadoRequisito } from "./Contenedor/EstadoRequisito";

const TemplateStep5 = () => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const Caracteristicas = [
        {
            descripcion: 'Descarga el formato de ficha de control',
            estado: 1,
        },
        {
            descripcion: 'Registra las posibles actividades a realizadas por cada semana',
            estado: 2,
        },
    ]

    const Procedimiento = [
        {
            descripcion: 'Plazo máximo de ## días posteriores de iniciar el proceso.'
        },
        {
            descripcion: 'La ficha de control de actividades debe ser escaneada a colores, debidamente firmada y sellada por su jefe inmediato'
        }
    ]

    const EstadoActual = {
        estado: 2,
        fecha: {
            presentacion: '2023-11-10T16:10:00.000'
        }
    }

    const [show, setShow] = useState<boolean>(false)
    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTematica[]>([])
    const [idUnidad, setIdUnidad] = useState<number>(0)
    const [numeroUnidad, setNumeroUnidad] = useState<number>(0)

    const handleClose = () => setShow(false)

    const handleShow = (unidadId: number) => {
        setIdUnidad(unidadId)
        setShow(true)
        const unidadEncontrada = unidadesTematicas.find((unidad) => unidad.unidadTematicaId == unidadId)
        setNumeroUnidad(unidadEncontrada?.numeroUnidad ?? 0)
    }

    const ListarUnidadTematica = async () => {
        setUnidadesTematicas([])
        const response = await ListarDatosUnidadTematica<Listas>(codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as UnidadTematica[]
            setUnidadesTematicas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        ListarUnidadTematica()
    }, [])


    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">
            <ControlActividades show={show} hide={handleClose} unidadId={idUnidad} numero={numeroUnidad} />

            <ContenedorSteps
                numero={5}
                titulo="FICHA DE CONTROL DE ACTIVIDADES"
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo="Características"
                            elementos={Caracteristicas}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo="Procedimiento"
                            elementos={Procedimiento}
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
                                    {
                                        unidadesTematicas.map((unidad, index) => (
                                            <tr className='bg-white border-b' key={index}>
                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                    <EstadoRequisito valor={unidad.estadoUnidad} />
                                                </td>
                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                    Unidad temática {unidad.numeroUnidad}
                                                </td>
                                                <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                    <div className='flex gap-2 justify-center'>
                                                        <button onClick={() => handleShow(unidad.unidadTematicaId)}
                                                            className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >
                                                            Subir
                                                        </button>
                                                        <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" >Ver</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }

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

export default TemplateStep5;