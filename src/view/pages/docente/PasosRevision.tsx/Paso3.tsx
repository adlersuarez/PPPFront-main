import { formatoFecha_Date_fechaSlash } from "@/helper/herramienta.helper";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import EmpresaElegidaRespuesta from "@/model/interfaces/empresa/empresaElegidaRespuesta";
import DuracionPracticas from "@/model/interfaces/practicas/duracionPracticas";
import ExcluidoPracticas from "@/model/interfaces/practicas/excluidoPracticas";
import { ListarDetalleDuracion, ListarDetalleExcluido, ObtenerDatosEmpresaElegidaDocente } from "@/network/rest/practicas.network";
import { RootState } from "@/store/configureStore.store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RevisionDuracion from "./componente/RevisionDuracion";
import RevisionExcluido from "./componente/RevisionExcluido";

interface Paso3Props {
    estudianteId: string
}

const Paso3 = (datos: Paso3Props) => {

    //const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [valoresEmpresa, setValoresEmpresa] = useState<EmpresaElegidaRespuesta | null>(null)
    const [listaDiasPracticas, setListaDiasPracticas] = useState<DuracionPracticas[]>([])
    const [listaDiasExcluido, setListaDiasExcluido] = useState<ExcluidoPracticas[]>([])

    const LoadCartas = async () => {
        const response = await ObtenerDatosEmpresaElegidaDocente<EmpresaElegidaRespuesta>(datos.estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as EmpresaElegidaRespuesta
            setValoresEmpresa(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadDuracion = async (DuracionId: number) => {
        const response = await ListarDetalleDuracion<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as DuracionPracticas[]
            setListaDiasPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadExcluido = async (DuracionId: number) => {
        const response = await ListarDetalleExcluido<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ExcluidoPracticas[]
            setListaDiasExcluido(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadCartas()
    }, [])

    useEffect(() => {
        LoadDuracion(valoresEmpresa?.duracionId ?? 0)
        LoadExcluido(valoresEmpresa?.duracionId ?? 0)
    }, [valoresEmpresa])

    const [verDuracion, setVerDuracion] = useState<boolean>(false)
    const [verExcluido, setVerExcluido] = useState<boolean>(false)

    const handleShowDuracion = () => setVerDuracion(true)
    const handleCloseDuracion = () => setVerDuracion(false)

    const handleShowExcluido = () => setVerExcluido(true)
    const handleCloseExcluido = () => setVerExcluido(false)

    console.log(valoresEmpresa)

    return (
        <div className='flex flex-col gap-4'>

            <RevisionDuracion show={verDuracion} hide={handleCloseDuracion} datos={listaDiasPracticas} tipo={valoresEmpresa?.tipoDias ?? ''} />
            <RevisionExcluido show={verExcluido} hide={handleCloseExcluido} datos={listaDiasExcluido} />

            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-3-square-fill`} />
                <h1 className="font-bold">FICHA DE DATOS ÁREA DE TRABAJO</h1>
            </div>
            {
            valoresEmpresa !== null ?
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                    <div className={`flex flex-col  gap-4 h-auto`}>
                        <div className='flex flex-col bg-white rounded border'>
                            <div className="flex bg-gray-400 text-white gap-4 text-left whitespace-normal">
                                <span className="font-bold py-2 px-4">
                                    {valoresEmpresa?.empresaNombre}
                                </span>
                            </div>
                            <hr />
                            <div className="flex flex-col  text-sm sm:text-lg">
                                <div className="flex text-gray-400 gap-2 p-2">
                                    <p className="w-2/5">RUC:</p>
                                    <span className="font-bold w-3/5">
                                        {valoresEmpresa?.empresaRuc}
                                    </span>
                                </div>
                                <hr />
                                <div className="flex flex-col p-2 gap-2">
                                    <div className="flex text-gray-400 gap-2">
                                        <p className="w-2/5">RESPONSABLE:</p>
                                        <span className="font-bold w-3/5">
                                            {valoresEmpresa?.representante}
                                        </span>
                                    </div>

                                    <div className="flex text-gray-400 gap-2">
                                        <p className="w-2/5">CARGO:</p>
                                        <span className="font-bold w-3/5">
                                            {valoresEmpresa?.repCargo}
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                            <h2 className="font-bold text-xl sm:text-2xl">ÁREA DE TRABAJO</h2>
                        </div>
                        <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">Dirección</div>
                                <div className="w-2/3">{valoresEmpresa?.direccionAreaPracticas}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">DURACIÓN</div>
                                <div className="w-2/3">
                                    {formatoFecha_Date_fechaSlash(valoresEmpresa?.fechaInicio ?? '') + ' - ' + formatoFecha_Date_fechaSlash(valoresEmpresa?.fechaFinal ?? '')}
                                </div>
                            </div>
                            {
                                listaDiasPracticas.length !== 0 &&
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">HORARIO</div>
                                    <div className="w-2/3">
                                        <button
                                            onClick={handleShowDuracion}
                                            className="bg-green-400 text-white hover:scale-105 hover:bg-green-600 px-2 rounded-md py-0.5">
                                            <i className="bi bi-eye" /> Mostrar
                                        </button>
                                    </div>
                                </div>
                            }
                            {
                                listaDiasExcluido.length !== 0 &&
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">Excluidos</div>
                                    <div className="w-2/3">
                                        <button
                                            onClick={handleShowExcluido}
                                            className="bg-green-400 text-white hover:scale-105 hover:bg-green-600 px-2 rounded-md py-0.5">
                                            <i className="bi bi-eye" /> Mostrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 ">
                        <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                            <h2 className="font-bold text-xl sm:text-2xl">JEFE INMEDIATO</h2>
                        </div>
                        <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold ">NOMBRE</div>
                                <div className="w-2/3">{valoresEmpresa?.jefeInmediato}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">GRADO</div>
                                <div className="w-2/3">{valoresEmpresa?.jefeGrado}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">CARGO</div>
                                <div className="w-2/3"> {valoresEmpresa?.jefeCargo}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">TELÉFONO</div>
                                <div className="w-2/3"> {" ---- "}</div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3 font-bold">CORREO</div>
                                <div className="w-2/3"> {" ---- "}</div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                    <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha completado los datos de su Área de trabajo</p>
                </div>
            }

        </div>
    );
};

export default Paso3;