import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import ObjetivoGeneral from "@/model/interfaces/planActividades/objetivoGeneral";
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica";
import { ListarDatosUnidadTematica, ObtenerActividadesUnidadTematicaEspecifica, ObtenerObjetivoGeneral } from "@/network/rest/practicas.network";
import { RootState } from "@/store/configureStore.store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BotonUnidades } from "./componente/BotonUnidades";
import ActividadUnidad from "@/model/interfaces/planActividades/actividades";
import ActividadesUnidad from "./componente/ActividadesUnidad";
import MensajePasoNoCargado from "./componente/MensajePasoNoCargado";

interface Paso3Props {
    estudianteId: string
}

const Paso4 = (datos: Paso3Props) => {

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTematica[]>([])
    const [objetivoGeneral, setObjetivoGeneral] = useState<ObjetivoGeneral | null>(null)

    const [unidadTematicaSeleccionada, setUnidadesTematicaSeleccionada] = useState<UnidadTematica | null>(null)

    const ListarUnidadTematica = async () => {
        setUnidadesTematicas([])
        const response = await ListarDatosUnidadTematica<Listas>(datos.estudianteId, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as UnidadTematica[]
            setUnidadesTematicas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    //
    const MostrarObjetivoGenearl = async () => {
        setObjetivoGeneral(null)
        const response = await ObtenerObjetivoGeneral<ObjetivoGeneral>(datos.estudianteId, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as ObjetivoGeneral
            setObjetivoGeneral(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const MostrarSeleccion = (idUnidad: number) => {
        const encontrado = unidadesTematicas.find((unidad) => unidad.unidadTematicaId === idUnidad)
        setUnidadesTematicaSeleccionada(encontrado ?? null)
    }

    useEffect(() => {
        ListarUnidadTematica()
        MostrarObjetivoGenearl()
    }, [])

    //BOTONES CAMBIOS
    const [selectedButton, setSelectedButton] = useState(0)

    const handleButtonClick = (buttonNumber: number) => {
        setSelectedButton(buttonNumber)
    }

    useEffect(() => {
        if (selectedButton !== 0) {
            MostrarSeleccion(selectedButton)
        }
    }, [selectedButton])

    //actividades
    const [actividadesUnidad, setActividadesUnidad] = useState<ActividadUnidad[]>([])

    const ObtenerActividadesUnidad = async (unidadId: number) => {
        setActividadesUnidad([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidadId, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        if (unidadTematicaSeleccionada) {
            ObtenerActividadesUnidad(unidadTematicaSeleccionada.unidadTematicaId)
        }
    }, [unidadTematicaSeleccionada])


    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-4-square-fill mr-2`} />
                <h1 className="font-bold">PLAN DE ACTIVIDADES</h1>
            </div>
            <div className="flex flex-col">
                {
                    objetivoGeneral?.procesoId !== 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-16">

                            <div className="flex flex-col gap-3">
                                <BotonUnidades
                                    label="OBJETIVO GENERAL"
                                    isSelected={selectedButton === 0}
                                    onClick={() => handleButtonClick(0)}
                                />
                                <hr />
                                <BotonUnidades
                                    label="Unidad Temática 1"
                                    isSelected={selectedButton === 1}
                                    onClick={() => handleButtonClick(1)}
                                />
                                <BotonUnidades
                                    label="Unidad Temática 2"
                                    isSelected={selectedButton === 2}
                                    onClick={() => handleButtonClick(2)}
                                />
                                <BotonUnidades
                                    label="Unidad Temática 3"
                                    isSelected={selectedButton === 3}
                                    onClick={() => handleButtonClick(3)}
                                />
                                <BotonUnidades
                                    label="Unidad Temática 4"
                                    isSelected={selectedButton === 4}
                                    onClick={() => handleButtonClick(4)}
                                />
                            </div>
                            <div className="flex flex-col col-span-2 rounded-md border-4 border-gray-400">

                                <div className="p-2 bg-gray-400 font-semibold text-lg uppercase text-white text-center">
                                    {selectedButton === 0 && "OBJETIVO GENERAL"}
                                    {selectedButton === 1 && "Unidad Temática 1"}
                                    {selectedButton === 2 && "Unidad Temática 2"}
                                    {selectedButton === 3 && "Unidad Temática 3"}
                                    {selectedButton === 4 && "Unidad Temática 4"}
                                </div>
                                <div className="flex h-full">
                                    {
                                        selectedButton === 0 ?
                                            <div className="font-medium text-center m-auto text-lg p-4">
                                                {objetivoGeneral?.objetivoGeneral}
                                            </div>
                                            :
                                            <div className="flex flex-col w-full">
                                                <div className="flex border-b-4 border-gray-400">
                                                    <div className="w-24 shrink-0 font-medium text-gray-500 bg-gray-200  text-center p-2">
                                                        Objetivo Específico
                                                    </div>
                                                    <div className="flex-wrap p-3">
                                                        {unidadTematicaSeleccionada?.objetivoEspecifico}
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3 p-3">
                                                    {
                                                        actividadesUnidad.map((act, index) => (
                                                            <ActividadesUnidad
                                                                key={index}
                                                                actividad={act}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                    }

                                </div>
                            </div>


                        </div>
                        :
                        <MensajePasoNoCargado step={4} />
                }
            </div>
        </div>
    )
}

export default Paso4