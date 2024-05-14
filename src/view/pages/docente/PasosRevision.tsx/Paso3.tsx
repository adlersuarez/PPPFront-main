import { formatoFecha_Date_fechaSlash } from "@/helper/herramienta.helper";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import DuracionPracticas from "@/model/interfaces/practicas/duracionPracticas";
import ExcluidoPracticas from "@/model/interfaces/practicas/excluidoPracticas";
import { ListarDetalleDuracion, ListarDetalleExcluido, ObtenerDatosAreaTrabajo, ObtenerDatosDuracion } from "@/network/rest/practicas.network";
import { RootState } from "@/store/configureStore.store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import RevisionDuracion from "./componente/RevisionDuracion";
import RevisionExcluido from "./componente/RevisionExcluido";
import AreaTrabajoPracticas from "@/model/interfaces/empresa/areaTrabajoPracticas";
import DuracionDetallePracticas from "@/model/interfaces/horario/duracionPracticas";
import MensajePasoNoCargado from "./componente/MensajePasoNoCargado";

interface Paso3Props {
    estudianteId: string
}

const Paso3 = (datos: Paso3Props) => {

    //const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [listaDiasPracticas, setListaDiasPracticas] = useState<DuracionPracticas[]>([])
    const [listaDiasExcluido, setListaDiasExcluido] = useState<ExcluidoPracticas[]>([])

    //Area practicas
    const [datosAreaTrabajo, setDatosAreaTrabajo] = useState<AreaTrabajoPracticas | null>(null)

    const LoadAreaPracticas = async () => {
        const response = await ObtenerDatosAreaTrabajo<AreaTrabajoPracticas>(datos.estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as AreaTrabajoPracticas
            setDatosAreaTrabajo(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [duracionPracticas, setDuracionPracticas] = useState<DuracionDetallePracticas | null>(null)

    const LoadDuracionPracticas = async () => {
        const response = await ObtenerDatosDuracion<DuracionDetallePracticas>(datos.estudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as DuracionDetallePracticas
            setDuracionPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadAreaPracticas()
        LoadDuracionPracticas()
    }, [])

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
        LoadDuracion(duracionPracticas?.duracionId ?? 0)
        LoadExcluido(duracionPracticas?.duracionId ?? 0)
    }, [duracionPracticas])

    const [verDuracion, setVerDuracion] = useState<boolean>(false)
    const [verExcluido, setVerExcluido] = useState<boolean>(false)

    const handleShowDuracion = () => setVerDuracion(true)
    const handleCloseDuracion = () => setVerDuracion(false)

    const handleShowExcluido = () => setVerExcluido(true)
    const handleCloseExcluido = () => setVerExcluido(false)

    return (
        <div className='flex flex-col gap-4'>

            <RevisionDuracion show={verDuracion} hide={handleCloseDuracion} datos={listaDiasPracticas} tipo={duracionPracticas?.tipoDias ?? ''} />
            <RevisionExcluido show={verExcluido} hide={handleCloseExcluido} datos={listaDiasExcluido} />

            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-3-square-fill mr-2`} />
                <h1 className="font-bold">DATOS ÁREA DE TRABAJO - DURACIÓN</h1>
            </div>
            <div className="flex flex-col">
                {
                    datosAreaTrabajo?.empresaId !== 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12 p-3 sm:p-6 bg-gray-100 rounded-md w-full">
                            <div className={`flex flex-col gap-4 h-auto`}>
                                <div className='flex flex-col bg-white rounded border border-gray-400'>
                                    <div className="flex bg-gray-400 text-white gap-4 text-left whitespace-normal">
                                        <span className="font-bold py-2 px-4">
                                            {datosAreaTrabajo?.empresaNombre}
                                        </span>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col text-sm">
                                        <div className="flex text-gray-400 gap-2 p-2">
                                            <p className="w-2/5 font-semibold">RUC</p>
                                            <span className="font-bold w-3/5">
                                                {datosAreaTrabajo?.empresaRuc}
                                            </span>
                                        </div>
                                        <hr />
                                        <div className="flex flex-col p-2 gap-2">
                                            <div className="flex text-gray-400 gap-2">
                                                <p className="w-2/5 font-semibold">RESPONSABLE</p>
                                                <span className="font-semibold w-3/5">
                                                    {datosAreaTrabajo?.representante}

                                                </span>
                                            </div>

                                            <div className="flex text-gray-400 gap-2">
                                                <p className="w-2/5 font-semibold">CARGO</p>
                                                <span className="font-semibold w-3/5">
                                                    {datosAreaTrabajo?.repCargo}
                                                </span>
                                            </div>
                                            <div className="flex text-gray-400 gap-2">
                                                <p className="w-2/5 font-semibold">GRADO</p>
                                                <span className="font-semibold w-3/5">
                                                    {datosAreaTrabajo?.repGrado}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col border-[3px] border-gray-400 bg-white">
                                <div className="bg-gray-400 text-white p-2 text-center">
                                    <h2 className="font-bold text-lg sm:text-xl">ÁREA DE TRABAJO</h2>
                                </div>
                                <div className="flex flex-col gap-4 p-4 text-sm">
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">DIRECCIÓN</div>
                                        <div className="w-2/3">{datosAreaTrabajo?.direccionAreaPracticas}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">UBICACIÓN</div>
                                        <div className="w-2/3">{datosAreaTrabajo?.depProvDist}</div>
                                    </div>
                                    {
                                        duracionPracticas !== null &&
                                        <div className="flex gap-2">
                                            <div className="w-1/3 font-semibold uppercase">DURACIÓN</div>
                                            <div className="w-2/3">
                                                {formatoFecha_Date_fechaSlash(duracionPracticas?.fechaInicio ?? '') + ' - ' + formatoFecha_Date_fechaSlash(duracionPracticas?.fechaFinal ?? '')}
                                                {
                                                    listaDiasExcluido.length !== 0 &&
                                                    <button title="Días excluidos"
                                                        onClick={handleShowExcluido}
                                                        className="ml-4 bg-gray-400 text-white hover:scale-105 text-sm hover:bg-red-400 px-2 rounded py-1">
                                                        <i className="bi bi-calendar2-x" />
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    }
                                    {
                                        listaDiasPracticas.length !== 0 &&
                                        <div className="flex gap-2">
                                            <div className="w-1/3 font-semibold uppercase">HORARIO</div>
                                            <div className="w-2/3">
                                                <button
                                                    onClick={handleShowDuracion}
                                                    className="bg-gray-400 text-white hover:scale-105 hover:bg-upla-100 px-2 rounded py-0.5 text-base">
                                                    <i className="bi bi-eye mr-1" /> Mostrar
                                                </button>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col border-[3px] border-gray-400 bg-white">
                                <div className="bg-gray-400 text-white p-2 text-center">
                                    <h2 className="font-bold text-lg sm:text-xl">JEFE INMEDIATO</h2>
                                </div>
                                <div className="flex flex-col gap-4 p-4 text-sm">
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">NOMBRE</div>
                                        <div className="w-2/3">{datosAreaTrabajo?.jefeInmediato}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">GRADO</div>
                                        <div className="w-2/3">{datosAreaTrabajo?.jefeGrado}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">CARGO</div>
                                        <div className="w-2/3"> {datosAreaTrabajo?.jefeCargo}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">TELÉFONO</div>
                                        <div className="w-2/3"> {datosAreaTrabajo?.jefeCelular}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="w-1/3 font-semibold uppercase">CORREO</div>
                                        <div className="w-2/3"> {datosAreaTrabajo?.jefeEmail}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <MensajePasoNoCargado step={3} />
                }
            </div>
        </div>
    )
}

export default Paso3