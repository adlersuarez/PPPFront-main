import { RouteComponentProps, useHistory } from "react-router-dom";
import { LoaderSvg } from "../../../../../component/Svg.component";
import { logout } from "../../../../../store/authSlice.store";
import { useEffect, useRef, useState } from "react";
import RestError from "../../../../../model/class/resterror.model.class";
import Response from "../../../../../model/class/response.model.class";
import { BuscarIngresoPersona } from "../../../../../network/rest/ingreso.network";
import { Types } from "../../../../../model/enum/types.model";
import { useDispatch } from "react-redux";
import Data from "../../../../../model/interfaces/ingreso/data.model.interface";
import Persona from "../../../../../model/interfaces/ingreso/persona.model.interface";
import Responde from "../../../../../model/interfaces/soporte/responde.model.interface";
import Paginacion from "../../../../../component/Paginacion.component";

const PorPesona = (props: RouteComponentProps<{}>) => {

    /**
     * Funcion de redux encargado de realizar la acciones de los reducer
     */
    const dispatch = useDispatch();

    const history = useHistory();

    /**
     * Variables encargadas del manejo del listado de las 
     * preguntas frecuentes. 
     */
    const opcion = useRef<number>(0);
    const paginacion = useRef<number>(0);
    const restart = useRef<boolean>(false);
    const totalPaginacion = useRef<number>(0);
    const filasPorPagina = useRef<number>(10);
    const [buscar, setBuscar] = useState<string>("");
    const [personas, setPersonas] = useState<Persona[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Funcion que inicia la carga de datos
     */
    const loadInit = async () => {
        if (loading) return;

        paginacion.current = 1;
        restart.current = true;
        fillTable("");
        opcion.current = 0;
    }

    /**
     * 
     */
    const onEvenBuscar = async (value: string) => {
        if (loading) return;

        if (value.trim().length === 0) return;

        paginacion.current = 1;
        restart.current = false;
        fillTable(value.trim());
        opcion.current = 1;
    }

    /**
     * 
     */
    const paginacionTable = (listid: number) => {
        paginacion.current = listid;
        restart.current = false;
        onEventPaginacion();
    }


    /**
     * 
     */
    const onEventPaginacion = () => {
        switch (opcion.current) {
            case 0:
                fillTable("");
                break;
            case 1:
                fillTable(buscar);
                break;

            default: fillTable("");
        }
    }

    /**
     * 
     */
    const fillTable = async (buscar: string) => {
        setLoading(true);
        setPersonas([]);

        const data: Data = {
            buscar: buscar.trim(),
            posicionPagina: ((paginacion.current - 1) * filasPorPagina.current),
            filasPorPagina: filasPorPagina.current
        }

        const response = await BuscarIngresoPersona<Responde>(data);

        if (response instanceof Response) {
            totalPaginacion.current = Math.ceil(response.data.total / filasPorPagina.current);
            setPersonas(response.data.resultado as Persona[])
            setLoading(false);
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;

            if (response.getStatus() == 401) {
                dispatch(logout());
                return;
            }

            if (response.getStatus() == 403) {
                dispatch(logout());
                return;
            }

            setPersonas([]);
            setLoading(false);
        }
    }

    /**
    * 
    */
    useEffect(() => {
        loadInit();


    }, []);

    // 
    const onEventDetalle = (codigo: string) => {
        history.push(`${props.match.path}/detalle`,
            {
                codigo: codigo,
            }
        );
    }

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className=" relative flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="flex items-start justify-between flex-col lg:flex-row">
                        <div>
                            <h5 className="mb-0 font-bold text-lg">Sistema de Control de Acceso</h5>
                            <p className="">Reporte de ingresos de estudiante, docente, no docente, visitante y vehículo.</p>
                        </div>

                        <div className="my-3 flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => {
                                    loadInit()
                                }}>
                                <span className="mr-2">Recargar</span>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto">
                        <div>
                            <label className="inline-block mb-2 ml-1 text-sm text-slate-700">Buscar para iniciar la busqueda:</label>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Ingrese los datos de la persona..."
                                className="text-sm block w-full appearance-none rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:outline-none"
                                value={buscar}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setBuscar(event.currentTarget.value);
                                    onEvenBuscar(event.currentTarget.value);
                                }}
                            />
                        </div>
                    </div>

                    <div className="relative overflow-auto rounded-md my-6">
                        <table className="w-full text-gray-700 bg-upla-100 border">
                            <thead className="align-bottom">
                                <tr>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">#</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle text-white text-xs w-[40%]">Información</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle text-white text-xs w-[25%]">Tipo</th>
                                    <th className="px-6 py-3 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">Ver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={6} className="text-sm p-2 border-b border-solid">
                                                <div className="flex items-center justify-center">
                                                    <LoaderSvg /> <span>Cargando datos...</span>
                                                </div>
                                            </td>
                                        </tr>
                                        :
                                        personas.length == 0 ?
                                            <tr className="text-center bg-white border-b">
                                                <td colSpan={6} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                            </tr>
                                            :
                                            personas.map((item, index) => {
                                                return (
                                                    <tr key={index} className="bg-white border-b">
                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">{item.id}</td>
                                                        <td className="text-sm p-2 text-left align-middle border-b border-solid">{item.nombres}, {item.apellidoPaterno + " " + item.apellidoMaterno}</td>
                                                        <td className="text-sm p-2 text-left align-middle border-b border-solid">{item.tipo}</td>
                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                            <button
                                                                className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-red-300  rounded-md text-sm px-4 py-2"
                                                                onClick={()=>onEventDetalle(item.codigo)}>
                                                                <i className="bi bi-file-medical text-base"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                }
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                        <div>
                            <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900">{paginacion.current}-{totalPaginacion.current}</span> de <span className="font-semibold text-gray-900">{filasPorPagina.current} </span>filas </span>
                        </div>
                        <nav className="bg-white rounded-md">
                            <ul className="flex">
                                <Paginacion
                                    loading={loading}
                                    restart={restart.current}
                                    paginacion={paginacion.current}
                                    totalPaginacion={totalPaginacion.current}
                                    fillTable={paginacionTable}
                                />
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PorPesona;
