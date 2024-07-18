import { ChangeEvent, useEffect, useRef, useState } from "react"
import Modal from "../../modal/ModalComponente"

import ObjetivoGeneralComp from "./componente/ObjetivoGeneral"
import UnidadTematicaComp from "./componente/UnidadTematica"
import { convertirFechaEditarActividades, convertirFormatoFechaInput, formatoFecha_Date_String, obtenerActividades, revertirFormatoFechaForm } from "@/helper/herramienta.helper"
import RegistroPlanActividades from "@/model/interfaces/datosEnviados/registroPlanActividades"
import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { EditarPlanActividades, ListarDatosUnidadTematica, ObtenerActividadesUnidadTematicaEspecifica, ObtenerDiasLaboralesPracticante, ObtenerFechasDuracionPracticas, ObtenerObjetivoGeneral } from "@/network/rest/practicas.network"
import RespValue from "@/model/interfaces/RespValue.model.interface"
import Response from "@/model/class/response.model.class"
import RestError from "@/model/class/resterror.model.class"
import { Types } from "@/model/enum/types.model"
import { useSelector } from "react-redux"
import { RootState } from "@/store/configureStore.store"
import FechaPracticas from "@/model/interfaces/practicas/fechaPracticas"
import DiasPracticas from "@/model/interfaces/practicas/diasPracticas"
import Listas from "@/model/interfaces/Listas.model.interface"
import toast from "react-hot-toast"
import UnidadTematica from "@/model/interfaces/planActividades/unidadTematica"
import ObjetivoGeneral from "@/model/interfaces/planActividades/objetivoGeneral"
import ActividadUnidad from "@/model/interfaces/planActividades/actividades"

interface UnidadTema {
    numero: number
    objetivoEspecifico: string
    fechaInicio: string
    fechaFinal: string
    actividades: string[]
}

type Props = {
    show: boolean
    hide: () => void
    init: () => void

    change: () => void
}

const ModalEditarPlan: React.FC<Props> = ({ show, hide, init, change }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    //------- Obtenerlo de la BBDD -------//
    const [unidadesTematicasEditar, setUnidadesTematicasEditar] = useState<UnidadTematica[]>([])
    const [objetivoGeneralEditar, setObjetivoGeneralEditar] = useState<ObjetivoGeneral | null>(null)

    const [actividadesUnidad1, setActividadesUnidad1] = useState<ActividadUnidad[]>([])
    const ObtenerActividadesUnidad1 = async (unidad: number) => {
        setActividadesUnidad1([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidad, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad1(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    const [actividadesUnidad2, setActividadesUnidad2] = useState<ActividadUnidad[]>([])
    const ObtenerActividadesUnidad2 = async (unidad: number) => {
        setActividadesUnidad2([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidad, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad2(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [actividadesUnidad3, setActividadesUnidad3] = useState<ActividadUnidad[]>([])
    const ObtenerActividadesUnidad3 = async (unidad: number) => {
        setActividadesUnidad3([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidad, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad3(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [actividadesUnidad4, setActividadesUnidad4] = useState<ActividadUnidad[]>([])
    const ObtenerActividadesUnidad4 = async (unidad: number) => {
        setActividadesUnidad4([])
        const response = await ObtenerActividadesUnidadTematicaEspecifica<Listas>(unidad, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as ActividadUnidad[]
            setActividadesUnidad4(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }


    const ListarUnidadTematica = async () => {
        setUnidadesTematicasEditar([])
        const response = await ListarDatosUnidadTematica<Listas>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as UnidadTematica[]
            setUnidadesTematicasEditar(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }
    //
    const MostrarObjetivoGeneral = async () => {
        setObjetivoGeneralEditar(null)
        const response = await ObtenerObjetivoGeneral<ObjetivoGeneral>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as ObjetivoGeneral
            setObjetivoGeneralEditar(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        ListarUnidadTematica()
        MostrarObjetivoGeneral()
    }, [])

    useEffect(() => {
        if (unidadesTematicasEditar.length == 0) {
            return
        }

        ObtenerActividadesUnidad1(unidadesTematicasEditar[0].unidadTematicaId)
        ObtenerActividadesUnidad2(unidadesTematicasEditar[1].unidadTematicaId)
        ObtenerActividadesUnidad3(unidadesTematicasEditar[2].unidadTematicaId)
        ObtenerActividadesUnidad4(unidadesTematicasEditar[3].unidadTematicaId)
    }, [unidadesTematicasEditar])

    ///// EDITAR
    const sweet = useSweerAlert()
    const abortController = useRef(new AbortController())

    // Estado para el objetivo general
    const [objetivoGeneral, setObjetivoGeneral] = useState<string>('')
    // Función para manejar cambios en el objetivo general
    const handleObjetivoGeneralChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setObjetivoGeneral(event.target.value)
    }

    //------------------------ FECHAS INICIO - FIN ------------------------
    const [fechaInicial, setFechaInicial] = useState<string>('')
    const [fechaFinal, setFechaFinal] = useState<string>('')

    const LoadFechasPracticas = async () => {
        setFechaInicial('')
        setFechaFinal('')
        const response = await ObtenerFechasDuracionPracticas<FechaPracticas>(periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as FechaPracticas
            //setEmpresaDatos(data)
            setFechaInicial(formatoFecha_Date_String(data.fechaInicio))
            setFechaFinal(formatoFecha_Date_String(data.fechaFinal))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [diasPracticas, setDiasPracticas] = useState<DiasPracticas[]>([])

    //------------------------ DIAS LABORABLES INICIO - FIN ------------------------
    const LoadDiasPracticas = async () => {
        setDiasPracticas([])
        const response = await ObtenerDiasLaboralesPracticante<Listas>(periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as DiasPracticas[]
            setDiasPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadFechasPracticas()
        LoadDiasPracticas()
    }, [])

    useEffect(() => {
        setObjetivoGeneral(objetivoGeneralEditar?.objetivoGeneral ?? '')
    }, [objetivoGeneralEditar])

    useEffect(() => {
        setUnidadesTematicas((oldUnidadesTematicas) => {
            return oldUnidadesTematicas.map((unidad, index) => {
                if (index === 0) {
                    return {
                        ...unidad,
                        fechaInicio: convertirFormatoFechaInput(fechaInicial)
                    };
                } else if (index === oldUnidadesTematicas.length - 1) {
                    return {
                        ...unidad,
                        fechaFinal: convertirFormatoFechaInput(fechaFinal)
                    }
                } else {
                    return unidad
                }
            })
        })

    }, [fechaInicial, fechaFinal])

    useEffect(() => {
        if (unidadesTematicasEditar.length == 0) {
            return
        }

        setUnidadesTematicas((oldUnidadesTematicas) => {
            return oldUnidadesTematicas.map((unidad, index) => {
                if (index === 0) {
                    return {
                        ...unidad,
                        objetivoEspecifico: unidadesTematicasEditar[0].objetivoEspecifico,
                        fechaFinal: convertirFechaEditarActividades(unidadesTematicasEditar[0].fechaFinUnidad),
                    };
                } else if (index === 1) {
                    return {
                        ...unidad,
                        objetivoEspecifico: unidadesTematicasEditar[1].objetivoEspecifico,
                        fechaInicio: convertirFechaEditarActividades(unidadesTematicasEditar[1].fechaInicioUnidad),
                        fechaFinal: convertirFechaEditarActividades(unidadesTematicasEditar[1].fechaFinUnidad),
                    };
                } else if (index === 2) {
                    return {
                        ...unidad,
                        objetivoEspecifico: unidadesTematicasEditar[2].objetivoEspecifico,
                        fechaInicio: convertirFechaEditarActividades(unidadesTematicasEditar[2].fechaInicioUnidad),
                        fechaFinal: convertirFechaEditarActividades(unidadesTematicasEditar[2].fechaFinUnidad),
                    };
                } else if (index === 3) {
                    return {
                        ...unidad,
                        objetivoEspecifico: unidadesTematicasEditar[3].objetivoEspecifico,
                        fechaInicio: convertirFechaEditarActividades(unidadesTematicasEditar[3].fechaInicioUnidad),
                    };
                } else {
                    return unidad
                }
            })
        })

    }, [unidadesTematicasEditar])

    useEffect(() => {
        if (unidadesTematicasEditar.length == 0) {
            return
        }

        setUnidadesTematicas((oldUnidadesTematicas) => {
            return oldUnidadesTematicas.map((unidad, index) => {
                if (index === 0) {
                    return {
                        ...unidad,
                        actividades: obtenerActividades(actividadesUnidad1)
                    };
                } else if (index === 1) {
                    return {
                        ...unidad,
                        actividades: obtenerActividades(actividadesUnidad2)
                    };
                } else if (index === 2) {
                    return {
                        ...unidad,
                        actividades: obtenerActividades(actividadesUnidad3)
                    };
                } else if (index === 3) {
                    return {
                        ...unidad,
                        actividades: obtenerActividades(actividadesUnidad4)
                    };
                } else {
                    return unidad
                }
            })
        })

    }, [actividadesUnidad1, actividadesUnidad2, actividadesUnidad3, actividadesUnidad4])

    // Estado para las unidades temáticas
    const [unidadesTematicas, setUnidadesTematicas] = useState<UnidadTema[]>([
        {
            numero: 1,
            objetivoEspecifico: '',
            fechaInicio: '',
            fechaFinal: '',
            actividades: []
        },
        {
            numero: 2,
            objetivoEspecifico: '',
            fechaInicio: '',
            fechaFinal: '',
            actividades: []
        },
        {
            numero: 3,
            objetivoEspecifico: '',
            fechaInicio: '',
            fechaFinal: '',
            actividades: []
        },
        {
            numero: 4,
            objetivoEspecifico: '',
            fechaInicio: '',
            fechaFinal: '',
            actividades: []
        }
    ])

    // Función para agregar una actividad a una unidad temática específica
    const agregarActividad = (index: number, actividad: string) => {
        const updatedUnidadesTematicas = [...unidadesTematicas]
        updatedUnidadesTematicas[index].actividades.push(actividad)
        setUnidadesTematicas(updatedUnidadesTematicas)
    }

    // Función para modificar el objetivo específico de una unidad temática específica
    const modificarObjetivoEspecifico = (index: number, nuevoObjetivo: string) => {
        const updatedUnidadesTematicas = [...unidadesTematicas]
        updatedUnidadesTematicas[index].objetivoEspecifico = nuevoObjetivo
        setUnidadesTematicas(updatedUnidadesTematicas)
    }

    // Función para modificar la fecha de inicio y fecha final de una unidad temática específica
    const modificarFechas = (index: number, nuevaFechaInicio: string, nuevaFechaFinal: string) => {
        const updatedUnidadesTematicas = [...unidadesTematicas]

        // Obtener el día de la semana para las nuevas fechas seleccionadas
        const fechaInicio = new Date(nuevaFechaInicio + ' 00:00:00')
        const fechaFinal = new Date(nuevaFechaFinal + ' 00:00:00')
        const diaInicio = fechaInicio.getDay()
        const diaFinal = fechaFinal.getDay()

        // Verificar si los días seleccionados están en diasPracticas
        let diaInicioEsPermitido = false
        let diaFinalEsPermitido = false

        if (nuevaFechaInicio !== "" && !nuevaFechaInicio.includes("/")) {
            diaInicioEsPermitido = diasPracticas.some(dia => dia.diaID === diaInicio)
            if (!diaInicioEsPermitido) {
                toast.error("Solo se pueden seleccionar los días de la semana que han sido establecidos como días de prácticas previamente.")
                return
            }
        }

        if (nuevaFechaFinal !== "" && !nuevaFechaFinal.includes("/")) {
            diaFinalEsPermitido = diasPracticas.some(dia => dia.diaID === diaFinal)
            if (!diaFinalEsPermitido) {
                toast.error("Solo se pueden seleccionar los días de la semana que han sido establecidos como días de prácticas previamente.")
                return
            }
        }

        updatedUnidadesTematicas[index].fechaInicio = nuevaFechaInicio
        updatedUnidadesTematicas[index].fechaFinal = nuevaFechaFinal
        setUnidadesTematicas(updatedUnidadesTematicas)
    }
    // Función para eliminar una actividad de una unidad temática específica
    const eliminarActividad = (index: number, actividadIndex: number) => {
        const updatedUnidadesTematicas = [...unidadesTematicas]
        updatedUnidadesTematicas[index].actividades.splice(actividadIndex, 1)
        setUnidadesTematicas(updatedUnidadesTematicas)
    }

    // Función para editar una actividad de una unidad temática específica
    const editarActividad = (index: number, actividadIndex: number, nuevaActividad: string) => {
        const updatedUnidadesTematicas = [...unidadesTematicas]
        updatedUnidadesTematicas[index].actividades[actividadIndex] = nuevaActividad
        setUnidadesTematicas(updatedUnidadesTematicas)
    }

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleToggle = (posicion: number) => {
        setOpenIndex(openIndex === posicion ? null : posicion)
    }


    const handleRegistrarDatosEmpresa = () => {

        if (objetivoGeneral === '') {
            toast.error("Por favor, ingresa el Objetivo General.")
            return
        }

        // UNIDAD TEMÁTICA 1
        if (unidadesTematicas[0].objetivoEspecifico === '') {
            toast.error("Por favor, ingresa el Objetivo Específico de la Unidad temática 1.")
            return
        }

        /*if (unidadesTematicas[0].fechaInicio === '') {
            toast.error("Por favor, ingresa la fecha de Inicio de la Unidad temática 1.")
            return
        }*/

        if (unidadesTematicas[0].fechaFinal === '') {
            toast.error("Por favor, ingresa la fecha Final de la Unidad temática 1.")
            return
        }

        if (unidadesTematicas[0].actividades.length === 0) {
            toast.error("Por favor, registre actividades de la Unidad temática 1.")
            return
        }

        // UNIDAD TEMÁTICA 2
        if (unidadesTematicas[1].objetivoEspecifico === '') {
            toast.error("Por favor, ingresa el Objetivo Específico de la Unidad temática 2.")
            return
        }

        if (unidadesTematicas[1].fechaInicio === '') {
            toast.error("Por favor, ingresa la fecha de Inicio de la Unidad temática 2.")
            return
        }

        if (unidadesTematicas[1].fechaFinal === '') {
            toast.error("Por favor, ingresa la fecha Final de la Unidad temática 2.")
            return
        }

        if (unidadesTematicas[1].actividades.length === 0) {
            toast.error("Por favor, registre actividades de la Unidad temática 2.")
            return
        }

        // UNIDAD TEMÁTICA 3
        if (unidadesTematicas[2].objetivoEspecifico === '') {
            toast.error("Por favor, ingresa el Objetivo Específico de la Unidad temática 3.")
            return
        }

        if (unidadesTematicas[2].fechaInicio === '') {
            toast.error("Por favor, ingresa la fecha de Inicio de la Unidad temática 3.")
            return
        }

        if (unidadesTematicas[2].fechaFinal === '') {
            toast.error("Por favor, ingresa la fecha Final de la Unidad temática 3.")
            return
        }

        if (unidadesTematicas[2].actividades.length === 0) {
            toast.error("Por favor, registre actividades de la Unidad temática 3.")
            return
        }

        // UNIDAD TEMÁTICA 4
        if (unidadesTematicas[3].objetivoEspecifico === '') {
            toast.error("Por favor, ingresa el Objetivo Específico de la Unidad temática 4.")
            return
        }

        if (unidadesTematicas[3].fechaInicio === '') {
            toast.error("Por favor, ingresa la fecha de Inicio de la Unidad temática 4.")
            return
        }

        /*if (unidadesTematicas[3].fechaFinal === '') {
            toast.error("Por favor, ingresa la fecha Final de la Unidad temática 4.")
            return
        }*/

        if (unidadesTematicas[3].actividades.length === 0) {
            toast.error("Por favor, registre actividades de la Unidad temática 4.")
            return
        }

        const params: RegistroPlanActividades = {
            periodo: periodo,
            objetivoGeneral: objetivoGeneral,
            unidadTematica1: {
                objetivoEspecifico: unidadesTematicas[0].objetivoEspecifico,
                fechaInicio: revertirFormatoFechaForm(unidadesTematicas[0].fechaInicio),
                fechaFinal: unidadesTematicas[0].fechaFinal,
                actividades: unidadesTematicas[0].actividades
            },
            unidadTematica2: {
                objetivoEspecifico: unidadesTematicas[1].objetivoEspecifico,
                fechaInicio: unidadesTematicas[1].fechaInicio,
                fechaFinal: unidadesTematicas[1].fechaFinal,
                actividades: unidadesTematicas[1].actividades
            },
            unidadTematica3: {
                objetivoEspecifico: unidadesTematicas[2].objetivoEspecifico,
                fechaInicio: unidadesTematicas[2].fechaInicio,
                fechaFinal: unidadesTematicas[2].fechaFinal,
                actividades: unidadesTematicas[2].actividades
            },
            unidadTematica4: {
                objetivoEspecifico: unidadesTematicas[3].objetivoEspecifico,
                fechaInicio: unidadesTematicas[3].fechaInicio,
                fechaFinal: revertirFormatoFechaForm(unidadesTematicas[3].fechaFinal),
                actividades: unidadesTematicas[3].actividades
            },
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                console.log(params)
                sweet.openInformation("Mensaje", "Procesando información...")
                const response = await EditarPlanActividades<RespValue>(params, abortController.current)

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "El plan de actividades ha sido registrado satisfactoriamente.", () => {
                            change()
                            init() // Actualizar la lista de Cartas
                            hide() // Cerrar modal
                        })
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return
                    sweet.openWarning("Error", "Por favor, comuníquese con la Oficina de Informática.", () => { })
                    console.log(response.getMessage())
                }
                
            }
        })
    }

    return (

        <Modal onShow={show}>
            <Modal.Header closeButton onHide={hide}> </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3">
                    <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex text-upla-100'>
                            <i className="bi bi-card-checklist ml-2 text-2xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>EDITAR - PLAN DE ACTIVIDADES</span>
                        </div>
                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4 flex flex-col gap-4'>
                        <ObjetivoGeneralComp posicion={0} onToggle={handleToggle} openIndex={openIndex} objetivoGeneral={objetivoGeneral} handleChange={handleObjetivoGeneralChange} />

                        <div className="flex flex-col gap-2">
                            {unidadesTematicas.map((unidad, index) => (
                                <UnidadTematicaComp
                                    key={index}
                                    posicion={unidad.numero}
                                    total={unidadesTematicas.length}
                                    onToggle={handleToggle}
                                    openIndex={openIndex}
                                    minFecha={index > 0 ? unidadesTematicas[index - 1].fechaFinal : ''}
                                    maxFecha={index < unidadesTematicas.length - 1 ? unidadesTematicas[index + 1].fechaInicio : ''}
                                    //funciones
                                    diasPracticas={diasPracticas}
                                    unidadTematica={unidadesTematicas[index]}
                                    modificarObjetivo={modificarObjetivoEspecifico}
                                    modificarFechas={modificarFechas}
                                    agregarActividad={agregarActividad}
                                    eliminarActividad={eliminarActividad}
                                    editarActividad={editarActividad}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full lg:gap-3 flex flex-col sm:flex-row gap-y-4 justify-between">
                    <span className="flex gap-x-4 items-center text-yellow-800 border-[1px] border-dashed border-yellow-800 bg-yellow-100 rounded p-2 px-4 text-xs text-justify">
                        <i className="bi bi-exclamation-diamond-fill text-lg text-yellow-500 animate-pulse" />
                        <span>Asegúrese de que todos los datos sean completados de manera precisa</span>
                    </span>
                    <div className="grid grid-cols-1 w-full sm:w-64 gap-3">

                        <button
                            onClick={handleRegistrarDatosEmpresa}
                            className={`text-white bg-gray-400 hover:bg-green-400 hover:border-green-400 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10`}
                        >
                            Registrar
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>

    )
}

export default ModalEditarPlan