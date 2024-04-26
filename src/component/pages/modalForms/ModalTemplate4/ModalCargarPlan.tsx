import { ChangeEvent, useEffect, useRef, useState } from "react"
import Modal from "../../modal/ModalComponente"

import ObjetivoGeneral from "./componente/ObjetivoGeneral"
import UnidadTematica from "./componente/UnidadTematica"
import { convertirFormatoFechaInput, formatoFecha_Date_String, revertirFormatoFechaForm } from "@/helper/herramienta.helper"
import RegistroPlanActividades from "@/model/interfaces/datosEnviados/registroPlanActividades"
import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { InsertarPlanActividades, ObtenerDiasLaboralesPracticante, ObtenerFechasDuracionPracticas } from "@/network/rest/practicas.network"
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
}

const ModalCargarPlan: React.FC<Props> = ({ show, hide }) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    //------- Obtenerlo de la BBDD -------//
    //const fechaInicial = "2024-04-02"
    //const fechaFinal = "2024-07-02"

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
        const response = await ObtenerFechasDuracionPracticas<FechaPracticas>(codigo, periodo, abortController.current)
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
        const response = await ObtenerDiasLaboralesPracticante<Listas>(codigo, periodo, abortController.current)
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

        /*if (manualStartDate === '') {
            toast.error("Por favor, ingresa la Fecha de Inicio de prácticas.")
            return
        }
        if (cantHoraSemanal > 30) {
            toast.error("Las horas semanales no pueden exceder las 30 horas.")
            return
        }
        if (selectedDays.length === 0) {
            toast.error("Por favor, selecciona al menos un día de la semana.")
            return
        }
        if (timeRanges.length === 0) {
            toast.error("Por favor, agrega al menos un horario de prácticas.")
            return
        }*/

        const params: RegistroPlanActividades = {
            estudianteId: codigo,
            usuario: codigo,
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

                sweet.openInformation("Mensaje", "Procesando información...")
                const response = await InsertarPlanActividades<RespValue>(params, abortController.current)

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "El plan de actividades ha sido registrado satisfactoriamente.", () => {
                            //init() // Actualizar la lista de Cartas
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
                            <span className='ml-4 font-bold sm:text-xl my-auto'>PLAN DE ACTIVIDADES</span>
                        </div>
                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-4 flex flex-col gap-4'>
                        <ObjetivoGeneral posicion={0} onToggle={handleToggle} openIndex={openIndex} objetivoGeneral={objetivoGeneral} handleChange={handleObjetivoGeneralChange} />

                        <div className="flex flex-col gap-2">
                            {unidadesTematicas.map((unidad, index) => (
                                <UnidadTematica
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
                <div className="w-full lg:gap-3 flex justify-end">
                    <div className="mb-3 lg:mb-0 hidden">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
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

export default ModalCargarPlan