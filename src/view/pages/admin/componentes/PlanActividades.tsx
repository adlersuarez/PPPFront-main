import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import Listas from "@/model/interfaces/Listas.model.interface"
import ActividadUnidad from "@/model/interfaces/planActividades/actividades"
import ObjetivoGeneral from "@/model/interfaces/planActividades/objetivoGeneral"
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica"
import { ListarDatosUnidadTematica, ObtenerActividadesUnidadTematicaEspecifica, ObtenerObjetivoGeneral } from "@/network/rest/practicas.network"
import { RootState } from "@/store/configureStore.store"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { BotonUnidadesAdmin } from "./BotonUnidadesAdmin"
import { ActividadesUnidadAdmin } from "./ActividadesUnidadAdmin"
import { EstudianteNoCompletado } from "./EstudianteNoCompletado"

interface Horario {
    estudianteId: string
}

export const PlanActividadesAdmin: React.FC<Horario> = ({ estudianteId }) => {

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTematica[]>([])
    const [objetivoGeneral, setObjetivoGeneral] = useState<ObjetivoGeneral | null>(null)

    const [unidadTematicaSeleccionada, setUnidadesTematicaSeleccionada] = useState<UnidadTematica | null>(null)

    const ListarUnidadTematica = async () => {
        setUnidadesTematicas([])
        const response = await ListarDatosUnidadTematica<Listas>(estudianteId, periodo, abortController.current)
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
        const response = await ObtenerObjetivoGeneral<ObjetivoGeneral>(estudianteId, periodo, abortController.current)
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
        const encontrado = unidadesTematicas.find((unidad) => unidad.numeroUnidad === idUnidad)
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

    if (objetivoGeneral?.procesoId == 0) {
        return (
            <EstudianteNoCompletado valor={5} />
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 w-full gap-y-6 sm:gap-x-8'>
            <div className="flex flex-col gap-3">
                <BotonUnidadesAdmin
                    label="OBJETIVO GENERAL"
                    isSelected={selectedButton === 0}
                    onClick={() => handleButtonClick(0)}
                />
                <hr />
                <BotonUnidadesAdmin
                    label="Unidad Temática 1"
                    isSelected={selectedButton === 1}
                    onClick={() => handleButtonClick(1)}
                />
                <BotonUnidadesAdmin
                    label="Unidad Temática 2"
                    isSelected={selectedButton === 2}
                    onClick={() => handleButtonClick(2)}
                />
                <BotonUnidadesAdmin
                    label="Unidad Temática 3"
                    isSelected={selectedButton === 3}
                    onClick={() => handleButtonClick(3)}
                />
                <BotonUnidadesAdmin
                    label="Unidad Temática 4"
                    isSelected={selectedButton === 4}
                    onClick={() => handleButtonClick(4)}
                />
            </div>
            <div className="flex flex-col col-span-2 rounded-md border border-upla-100 overflow-hidden">
                <div className="p-2 bg-upla-100 font-semibold text-base uppercase text-white text-center">
                    {selectedButton === 0 && "OBJETIVO GENERAL"}
                    {selectedButton === 1 && "Unidad Temática 1"}
                    {selectedButton === 2 && "Unidad Temática 2"}
                    {selectedButton === 3 && "Unidad Temática 3"}
                    {selectedButton === 4 && "Unidad Temática 4"}
                </div>
                <div className="flex h-full">
                    {
                        selectedButton === 0 ?
                            <div className="font-medium text-center flex text-lg p-4 bg-white w-full h-full">
                                <span className="m-auto">
                                    {objetivoGeneral?.objetivoGeneral}
                                </span>
                            </div>
                            :
                            <div className="flex flex-col w-full">
                                <div className="flex border-b border-upla-100">
                                    <div className="w-24 shrink-0 font-medium text-upla-100 text-sm bg-blue-50 border-r border-upla-100 text-center p-2">
                                        Objetivo Específico
                                    </div>
                                    <div className="flex-wrap p-3 bg-white w-full text-sm">
                                        {unidadTematicaSeleccionada?.objetivoEspecifico}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 p-3 bg-white h-full">
                                    {
                                        actividadesUnidad.map((act, index) => (
                                            <ActividadesUnidadAdmin
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
    )
}
