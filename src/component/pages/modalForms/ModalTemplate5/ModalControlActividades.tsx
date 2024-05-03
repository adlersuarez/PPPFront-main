import Modal from "../../modal/ModalComponente"
import { useEffect, useRef, useState } from "react"
import useSweerAlert from "../../../../component/hooks/useSweetAlert"

import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica"
import { ObtenerActividadesUnidadTematicaEspecifica, ObtenerDatosUnidadTematicaEspecifica } from "@/network/rest/practicas.network"
import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import { CargarImagenUnidad } from "./componente/CargarImagenUnidad"
import ActividadUnidad from "@/model/interfaces/planActividades/actividades"
import Listas from "@/model/interfaces/Listas.model.interface"
import UnidadTematicaRegistro from "@/model/interfaces/planActividades/unidadRegistro"
import { ImagenUnidad } from "./componente/ImagenUnidad"
import GaleriaUnidadTematica from "./componente/GaleriaUnidadTematica"

type Props = {
    show: boolean
    hide: () => void
    numero: number
    unidadId: number
}

const ControlActividades: React.FC<Props> = ({ show, hide, unidadId, numero }) => {

    const sweet = useSweerAlert()

    const abortController = useRef(new AbortController())

    const cerrarModal = () => {
        hide()
    }

    const [unidadTem, setUnidadTem] = useState<UnidadTematica | null>(null)
    const [actividadesUnidad, setActividadesUnidad] = useState<ActividadUnidad[]>([])

    const ObtenerUnidadTematica = async () => {
        setUnidadTem(null)
        const response = await ObtenerDatosUnidadTematicaEspecifica<UnidadTematica>(unidadId, abortController.current)
        if (response instanceof Response) {
            const data = response.data as UnidadTematica
            setUnidadTem(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const ObtenerActividadesUnidad = async () => {
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
        if (unidadId !== 0) {
            ObtenerUnidadTematica()
            ObtenerActividadesUnidad()
        }
    }, [unidadId])


    ////////////////////////////////////
    // Estados para el objetivo, actividades, imágenes y descripciones
    const [images, setImages] = useState<UnidadTematicaRegistro[]>([
        {
            registroUnidadId: 1,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/practicaspreprofesionales.jpeg",
            fechaUnidadImagen: "2024-04-01",
            descripcionRegistro: "Me enfoqué en realizar un análisis exhaustivo de los estados financieros de una empresa. Este análisis implicó revisar detalladamente los balances, el estado de resultados y el flujo de efectivo. Identifiqué tendencias en los datos financieros y áreas de mejora que podrían aumentar la eficiencia y rentabilidad de la empresa en el futuro.",
            fechaRegistro: "2024-04-01",
            orientacion: "H"
        },
        {
            registroUnidadId: 2,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/1585.jpg",
            fechaUnidadImagen: "2024-04-02",
            descripcionRegistro: "Participé activamente en la elaboración de un informe detallado de costos para un proyecto de inversión. Este informe implicó el análisis minucioso de los costos directos e indirectos asociados al proyecto, así como la estimación de los posibles ingresos. Mi contribución consistió en calcular y proyectar los costos futuros, evaluando su impacto en la rentabilidad del proyecto.",
            fechaRegistro: "2024-04-02",
            orientacion: "V"
        },
        {
            registroUnidadId: 3,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/creatives.jpg",
            fechaUnidadImagen: "2024-04-03",
            descripcionRegistro: "Me involucré en la revisión y ajuste de presupuestos para varios departamentos de una empresa. Trabajé en estrecha colaboración con el equipo financiero para identificar áreas de gastos innecesarios y oportunidades de inversión estratégica. Mi enfoque estuvo en asegurar que los presupuestos estuvieran alineados con las metas financieras de la empresa, optimizando así su rendimiento económico.",
            fechaRegistro: "2024-04-03",
            orientacion: "H"
        },
        {
            registroUnidadId: 4,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/business.jpg",
            fechaUnidadImagen: "2024-04-04",
            descripcionRegistro: "Colaboré estrechamente en la preparación de informes financieros trimestrales. Esto incluyó recopilar y analizar datos financieros relevantes, como ingresos, gastos, y rentabilidad. Además, contribuí en la elaboración de análisis detallados sobre la salud financiera de la empresa, identificando áreas de mejora y recomendando acciones correctivas. Estos informes fueron presentados a la dirección para respaldar la toma de decisiones estratégicas.",
            fechaRegistro: "2024-04-04",
            orientacion: "V"
        },
        ////////////////////
        {
            registroUnidadId: 5,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/1585.jpg",
            fechaUnidadImagen: "2024-04-02",
            descripcionRegistro: "Participé activamente en la elaboración de un informe detallado de costos para un proyecto de inversión. Este informe implicó el análisis minucioso de los costos directos e indirectos asociados al proyecto, así como la estimación de los posibles ingresos. Mi contribución consistió en calcular y proyectar los costos futuros, evaluando su impacto en la rentabilidad del proyecto.",
            fechaRegistro: "2024-04-02",
            orientacion: "V"
        },
        {
            registroUnidadId: 6,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/creatives.jpg",
            fechaUnidadImagen: "2024-04-03",
            descripcionRegistro: "Me involucré en la revisión y ajuste de presupuestos para varios departamentos de una empresa. Trabajé en estrecha colaboración con el equipo financiero para identificar áreas de gastos innecesarios y oportunidades de inversión estratégica. Mi enfoque estuvo en asegurar que los presupuestos estuvieran alineados con las metas financieras de la empresa, optimizando así su rendimiento económico.",
            fechaRegistro: "2024-04-03",
            orientacion: "H"
        },
        {
            registroUnidadId: 7,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/business.jpg",
            fechaUnidadImagen: "2024-04-04",
            descripcionRegistro: "Colaboré estrechamente en la preparación de informes financieros trimestrales. Esto incluyó recopilar y analizar datos financieros relevantes, como ingresos, gastos, y rentabilidad. Además, contribuí en la elaboración de análisis detallados sobre la salud financiera de la empresa, identificando áreas de mejora y recomendando acciones correctivas. Estos informes fueron presentados a la dirección para respaldar la toma de decisiones estratégicas.",
            fechaRegistro: "2024-04-04",
            orientacion: "V"
        },
        {
            registroUnidadId: 8,
            unidadTematicaId: 1,
            imagenUrl: "../Imagenes/business.jpg",
            fechaUnidadImagen: "2024-04-04",
            descripcionRegistro: "Colaboré estrechamente en la preparación de informes financieros trimestrales. Esto incluyó recopilar y analizar datos financieros relevantes, como ingresos, gastos, y rentabilidad. Además, contribuí en la elaboración de análisis detallados sobre la salud financiera de la empresa, identificando áreas de mejora y recomendando acciones correctivas. Estos informes fueron presentados a la dirección para respaldar la toma de decisiones estratégicas.",
            fechaRegistro: "2024-04-04",
            orientacion: "V"
        },
    ])

    // Función para manejar la subida de imágenes
    // Función para agregar una nueva imagen con descripción

    const [showNewImg, setShowNewImg] = useState<boolean>(false)

    const handleShowNewImg = () => setShowNewImg(true)
    const handleCloseNewImg = () => setShowNewImg(false)

    const [showGaleria, setShowGaleria] = useState<boolean>(false)
    const handleShowGaleria = () => setShowGaleria(true)
    const handleCloseGaleria = () => setShowGaleria(false)

    const [unidadSeleccionada, setUnidadSeleccioanda] = useState<number>(1)
    const changeUnidadSeleccionada = (newUnidad: number) => setUnidadSeleccioanda(newUnidad)


    return (

        <Modal onShow={show} maxWidth="max-w-5xl">
            <Modal.Header closeButton onHide={cerrarModal}> <h1 className="text-upla-100 ml-2 font-bold text-xl">UNIDAD TEMÁTICA {numero}</h1></Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4">

                    <CargarImagenUnidad
                        show={showNewImg}
                        hide={handleCloseNewImg}
                        fechaIni={unidadTem?.fechaInicioUnidad ?? ''}
                        fechaFin={unidadTem?.fechaFinUnidad ?? ''}
                    />

                    <GaleriaUnidadTematica
                        show={showGaleria}
                        close={handleCloseGaleria}
                        imagenes={images}
                        idSeleccionado={unidadSeleccionada}
                    />

                    <div className="flex flex-col gap-3 col-span-1 md:pr-3">
                        <div className="bg-gray-100 border-gray-400 border rounded-md overflow-hidden">
                            <div className="flex justify-between text-lg font-medium text-gray-500 bg-gray-200 border-b border-gray-400 p-1 px-2">Objetivo Especifico</div>
                            <div className="p-2 text-sm">{unidadTem?.objetivoEspecifico}</div>
                        </div>
                        <div className="bg-gray-100 border-gray-400 border rounded-md overflow-hidden">
                            <div className="flex justify-between font-medium text-gray-500 bg-gray-200 border-b border-gray-400 p-1 px-2">
                                Actividades
                            </div>
                            <div className="flex p-2 px-1 pr-3">
                                <div className="flex flex-col gap-1.5">
                                    {actividadesUnidad.map((activity, index) => (
                                        <div key={index} className="text-sm flex">
                                            <div className="w-5 text-center flex-shrink-0">
                                                <i className="text-base text-upla-100 bi bi-dot" />
                                            </div>
                                            <div className="flex-grow">
                                                {activity.actividad}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col col-span-2  border border-gray-400 rounded-md overflow-hidden">
                        <div className="flex justify-between text-lg font-medium text-gray-500 bg-gray-200 border-b border-gray-400 p-1 px-2">
                            Registro de Actividades realizadas
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100">
                            <button onClick={handleShowNewImg}
                                className="flex bg-gray-400 hover:bg-gray-600 hover:scale-105 text-white p-1 px-2 rounded-md">
                                <div className="m-auto flex flex-col gap-2">
                                    <i className="bi bi-plus-square text-3xl" />
                                    <span className="font-medium">Nuevo Registro</span>
                                </div>
                            </button>
                            {
                                images.map((image, index) => (
                                    <ImagenUnidad
                                        imagenActividad={image}
                                        key={index}
                                        openGaleria={handleShowGaleria}
                                        changeUnidad={changeUnidadSeleccionada}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex justify-end">
                    <div className="mb-3 lg:mb-0 hidden">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="flex justify-end ">
                        <button
                            onClick={hide}
                            className={`text-white bg-gray-400 hover:bg-green-400 hover:border-green-400 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                        >
                            Hecho
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default ControlActividades