import React, { useState, useEffect, useRef, Suspense } from 'react';
import Modal from "../../modal/ModalComponente";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import '../../../../assets/index.css'

import es from 'date-fns/locale/es';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

import useSweerAlert from "../../../../component/hooks/useSweetAlert"
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';
import RegistroDuracionPractica, { DetalleDuracion, DetalleExcluido } from '@/model/interfaces/datosEnviados/registroDuracionPractica';
import { calcularCantDiasEstandar, calcularCantDiasFlexible, convertirTiempoDecimalAHorasYMonutos } from '@/helper/herramienta.helper';
import DiaFlexibleHorario from './componente/DiaFlexibleHorario';
import { InsertarDuracionPracticas } from '@/network/rest/practicas.network';
import RespValue from '@/model/interfaces/RespValue.model.interface';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';

import { SuspenseModal } from '@/component/suspense/SuspenseModal';

const MostrarHorarioCruce = React.lazy(() => import('./componente/MostrarHorarioCruce'));

interface ExcludedDay {
    id: number
    date: Date
    reason: string
}

interface TimeRange {
    start: string
    end: string
}

const duracion = 380
const maxDiario = 6
const maxSemanal = 30

type Props = {
    show: boolean
    hide: () => void
    init: () => void

    change: () => void
}

const ModalDatosDuracion: React.FC<Props> = (props: Props) => {

    const sweet = useSweerAlert()
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const [startDate, setStartDate] = useState<Date | null>(null)
    const [selectedDays, setSelectedDays] = useState<string[]>([])
    const [manualStartDate, setManualStartDate] = useState<string>('')
    const [manualEndDate, setManualEndDate] = useState<string>('')
    const [excludedDays, setExcludedDays] = useState<ExcludedDay[]>([])
    const [newExcludedDate, setNewExcludedDate] = useState<string>('')
    const [newExcludedReason, setNewExcludedReason] = useState<string>('')

    const [dayCount, setDayCount] = useState<number>(0)

    const abortController = useRef(new AbortController())
    //console.log(dayCount)

    const handleDayCheckboxChange = (day: string) => {
        // Verificar si el día ya está seleccionado
        const isSelected = selectedDays.includes(day);
        // Actualizar los días seleccionados
        const updatedDays = isSelected
            ? selectedDays.filter((selectedDay) => selectedDay !== day)
            : [...selectedDays, day]
        setSelectedDays(updatedDays)

        // Actualizar los rangos de tiempo para el día
        if (tipoHorarioSeleccionado === 'Flexible') {
            if (isSelected) {
                // Si el día ya estaba seleccionado, eliminar su entrada en dayTimeRanges
                const { [day]: deletedDay, ...restDays } = dayTimeRanges
                setDayTimeRanges(restDays)
            } else {
                // Si el día no estaba seleccionado, agregar una nueva entrada vacía para él
                setDayTimeRanges(() => ({
                    ...dayTimeRanges,
                    [day]: [{ start: '', end: '' }],
                }))
            }
        }
    }

    const renderDayCheckboxes = () => {
        const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
        return daysOfWeek.map((day) => (
            <label htmlFor={day} key={day} className={`flex gap-3 hover:bg-blue-100 rounded-md p-1`} role='button'>
                <input
                    type="checkbox"
                    id={day}
                    className='my-auto text-upla-100 rounded focus:ring-0 border-gray-400'
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayCheckboxChange(day)}
                />
                <span className={`my-auto ${selectedDays.includes(day) ? 'font-semibold text-gray-500' : 'text-gray-400'} `} >
                    {day}
                </span>
            </label>
        ))
    }

    const handleDateChange = (date: Date | null) => {
        setManualStartDate(date ? date.toISOString().split('T')[0] : '')
        setStartDate(date)
    }

    const handleManualStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManualStartDate(event.target.value)
        const selectedDate = new Date(event.target.value + 'T00:00:00')
        const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60 * 1000)
        setStartDate(adjustedDate)
    }

    const handleNewExcludedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewExcludedDate(event.target.value)
    }

    const handleNewExcludedReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewExcludedReason(event.target.value)
    }

    const addExcludedDate = () => {
        if (newExcludedDate && newExcludedReason) {
            const selectedDate = new Date(newExcludedDate);
            const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60 * 1000);

            // Añadir un día al día excluido para evitar problemas con zonas horarias
            adjustedDate.setDate(adjustedDate.getDate() + 1);

            // Verificar si la fecha ya existe en la lista actual de días excluidos
            const isDateAlreadyExcluded = excludedDays.some(day => {
                const dayDate = new Date(day.date);
                return dayDate.toDateString() === adjustedDate.toDateString();
            });

            // Si la fecha ya está en la lista, no se añade
            if (isDateAlreadyExcluded) {
                toast.error('La fecha ah excluir ya está registrada.');
                return;
            }

            // Obtener el máximo id en la lista actual de días excluidos
            const maxId = Math.max(...excludedDays.map(day => day.id), 0);
            const newId = maxId + 1;

            // Agregar el nuevo día excluido con el nuevo id
            setExcludedDays([...excludedDays, { id: newId, date: adjustedDate, reason: newExcludedReason }]);
            setNewExcludedDate('');
            setNewExcludedReason('');
        }
    }

    const removeExcludedDateById = (idToRemove: number) => {
        const updatedExcludedDays = excludedDays.filter(day => day.id !== idToRemove)
        setExcludedDays(updatedExcludedDays)
    }

    const renderExcludedDaysTable = () => {
        return (
            <div className='flex flex-col  w-full'>

                <div className='flex flex-col w-full rounded-t-md  border-upla-100 border overflow-hidden text-xs font-bold'>
                    {/* Cabecera */}
                    <div className="w-full flex uppercase bg-upla-100 text-white border-gray-200 py-1.5">
                        <div className="w-20 text-center">Fecha</div>
                        <div className="flex-grow text-left">Motivo</div>
                        <div className="w-10 text-center">/</div>
                    </div>
                    <div className='flex flex-col max-h-24 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100'>
                        {/* Filas de datos */}
                        {excludedDays.map((excludedDay, index) => (
                            <div key={index} className="flex bg-white border-b border-gray-200 py-2 text-xs font-normal">
                                <div className="w-20 text-center flex-shrink-0">{excludedDay.date.toLocaleDateString('es-ES')}</div>
                                <div className="flex-grow text-left">{excludedDay.reason}</div>
                                <div className="w-10 flex flex-shrink-0">
                                    <button onClick={() => removeExcludedDateById(excludedDay.id)} title='Quitar' className='mx-auto bg-gray-400 flex w-6 h-6 rounded text-white hover:bg-red-500 hover:scale-105'>
                                        <i className="bi bi-trash3 text-xs m-auto" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const renderHighlightedDays = () => {
        const highlightedDays: Date[] = [];

        if (startDate && dayCount !== 0 && selectedDays.length !== 0) {
            const current = new Date(startDate);

            while (highlightedDays.length < dayCount) {
                const dayOfWeek = current.toLocaleDateString('es-ES', { weekday: 'long' });
                const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

                if (selectedDays.includes(capitalizedDay) && !excludedDays.find((excludedDay) => excludedDay.date.toDateString() === current.toDateString())) {
                    highlightedDays.push(new Date(current));
                }
                current.setDate(current.getDate() + 1);
            }
        }

        useEffect(() => {
            if (highlightedDays.length > 0) {
                const lastHighlightedDay = highlightedDays[highlightedDays.length - 1];
                setManualEndDate(lastHighlightedDay.toLocaleDateString('en-CA'));
            }
        }, [highlightedDays]);

        return highlightedDays;
    }

    ///////HORAS
    const [timeRanges, setTimeRanges] = useState<TimeRange[]>([{ start: '', end: '' }])
    const [totalHours, setTotalHours] = useState<number>(0)
    const [descripTotal, setDescripTotal] = useState<string>('')
    const [descripSemanal, setDescripSemanal] = useState<string>('')
    const [cantHoraSemanal, setCantHoraSemanal] = useState<number>(0)

    const [dayTimeRanges, setDayTimeRanges] = useState<{ [day: string]: TimeRange[] }>({})
    const [totalHoursDay, setTotalHoursDay] = useState<{ [day: string]: number }>({})
    const [descripTotalDay, setDescripTotalDay] = useState<{ [day: string]: string }>({})

    const [tipoHorarioSeleccionado, setTipoHorarioSeleccionado] = useState<string>('Estandar')

    //console.log(totalHoursDay)

    const handleSeleccionTipoHorario = (tipoHorario: string) => {
        if (tipoHorario !== tipoHorarioSeleccionado) {
            setTimeRanges([{ start: '', end: '' }])
            setTotalHours(0)
            setDescripTotal('')
            setDescripSemanal('')
            setCantHoraSemanal(0)

            setDayTimeRanges({})
            setTotalHoursDay({})
            setDescripTotalDay({})
            setDayCount(0)
            setManualEndDate('')
            setExpandedDay(null)

            if (tipoHorario == 'Flexible') {

                /*const startBase: string = timeRanges[0].start
                const endBase: string = timeRanges[0].end

                const updatedRanges: { [day: string]: TimeRange[] } = {}
                selectedDays.forEach((day) => {
                    updatedRanges[day] = [{ start: startBase, end: endBase }]
                })*/

                const updatedRanges: { [day: string]: TimeRange[] } = {}
                selectedDays.forEach((day) => {
                    updatedRanges[day] = timeRanges.map(({ start, end }) => ({ start, end }));
                })

                setDayTimeRanges(updatedRanges)
            }
        }

        setTipoHorarioSeleccionado(tipoHorario)
    }

    const handleInputChange = (index: number, key: keyof TimeRange, value: string) => {
        const newTimeRanges = [...timeRanges]
        newTimeRanges[index][key] = value
        setTimeRanges(newTimeRanges)
    }

    const addTimeRange = () => {
        setTimeRanges([...timeRanges, { start: '', end: '' }]);
    }

    const deleteTimeRange = (index: number) => {
        const newTimeRanges = [...timeRanges]
        newTimeRanges.splice(index, 1)
        setTimeRanges(newTimeRanges)
    }

    const handleInputChangeForDay = (day: string, index: number, key: keyof TimeRange, value: string) => {
        const newTimeRanges = { ...dayTimeRanges };
        newTimeRanges[day][index][key] = value;
        setDayTimeRanges(newTimeRanges)
    }

    const addTimeRangeForDay = (day: string) => {
        const existingTimeRanges = dayTimeRanges[day] || [] // Provide a default value of an empty array
        const newTimeRanges = [...existingTimeRanges, { start: '', end: '' }]
        setDayTimeRanges({ ...dayTimeRanges, [day]: newTimeRanges })
    }

    const deleteTimeRangeForDay = (day: string, index: number) => {
        const existingTimeRanges = dayTimeRanges[day] || [] // Provide a default value of an empty array
        const newTimeRanges = [...existingTimeRanges]
        newTimeRanges.splice(index, 1)
        setDayTimeRanges({ ...dayTimeRanges, [day]: newTimeRanges })
    }

    useEffect(() => {
        const calculateTotals = () => {
            let total = 0;
            timeRanges.forEach((range) => {
                if (range.start && range.end) {
                    const startDate = new Date(`2022-01-01T${range.start}`);
                    const endDate = new Date(`2022-01-01T${range.end}`);

                    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                        const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
                        total += hours;
                    }
                }
            });
            setTotalHours(total);
            const totalHoursInt = Math.floor(total);
            const minutes = Math.round((total % 1) * 60);

            const totalHoursSemanalInt = Math.floor(total * selectedDays.length);
            const minutesSemanal = Math.round((total * selectedDays.length % 1) * 60);

            if (totalHoursInt === 0) {
                setDescripTotal(`${minutes} min`);
            } else if (minutes === 0) {
                setDescripTotal(`${totalHoursInt} h`);
            } else {
                setDescripTotal(`${totalHoursInt} h ${minutes} min`);
            }

            if (totalHoursSemanalInt === 0) {
                setDescripSemanal(`${minutesSemanal} min`);
            } else if (minutesSemanal === 0) {
                setDescripSemanal(`${totalHoursSemanalInt} h`);
            } else {
                setDescripSemanal(`${totalHoursSemanalInt} h ${minutesSemanal} min`);
            }

            setCantHoraSemanal(Number((totalHoursSemanalInt + minutesSemanal / 60).toFixed(2)))

            if (total >= 0.5) {
                setDayCount(calcularCantDiasEstandar(duracion, total))
            }
        }
        if (tipoHorarioSeleccionado === 'Estandar') {
            calculateTotals()
        }
    }, [timeRanges, selectedDays])

    useEffect(() => {
        const calculateDayTotals = () => {
            const dayTotals: { [day: string]: number } = {};
            const dayDescriptions: { [day: string]: string } = {};
            const dayTotalDescriptions: { [day: string]: string } = {};

            Object.keys(dayTimeRanges).forEach(day => {
                let total = 0;

                dayTimeRanges[day].forEach((range) => {
                    if (range.start && range.end) {
                        const startDate = new Date(`2022-01-01T${range.start}`);
                        const endDate = new Date(`2022-01-01T${range.end}`);

                        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
                            const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
                            total += hours;
                        }
                    }
                })

                dayTotals[day] = total

                const totalHoursInt = Math.floor(total);
                const minutes = Math.round((total % 1) * 60);

                if (totalHoursInt === 0) {
                    dayDescriptions[day] = `${minutes} min`;
                } else if (minutes === 0) {
                    dayDescriptions[day] = `${totalHoursInt} h`;
                } else {
                    dayDescriptions[day] = `${totalHoursInt} h ${minutes} min`;
                }

                //dayTotalDescriptions[day] = dayDescriptions[day];
                dayTotalDescriptions[day] = convertirTiempoDecimalAHorasYMonutos(total)

            })

            const cantHorasDecimal = Object.values(dayTotals).reduce((total, current) => total + current, 0)

            setCantHoraSemanal(Number(cantHorasDecimal.toFixed(2)))
            setDescripSemanal(convertirTiempoDecimalAHorasYMonutos(cantHorasDecimal))

            setTotalHoursDay(dayTotals)
            setTotalHoursDay(Object.entries(dayTotals).reduce((day, [key, value]) => {
                day[key] = Number(value.toFixed(2))
                return day
            }, {} as { [key: string]: number }))

            setDescripTotalDay(Object.entries(dayTotals).reduce((day, [key]) => {
                day[key] = dayTotalDescriptions[key]
                return day
            }, {} as { [key: string]: string }))


            if (cantHorasDecimal >= 0.5) {
                setDayCount(calcularCantDiasFlexible(duracion, dayTotals))
            }
        }
        if (tipoHorarioSeleccionado === 'Flexible') {
            calculateDayTotals()
        }
    }, [dayTimeRanges, selectedDays])

    const handleAddButtonClick = () => {
        //alert('agregado')
        addTimeRange()
    }

    const handleDeleteButtonClick = (index: number) => {
        deleteTimeRange(index)
    }

    const [viewInfo, setViewInfo] = useState<boolean>(true);

    const renderResumen = () => {
        const diasOrdenados = selectedDays.sort((a, b) => {
            const orden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
            return orden.indexOf(a) - orden.indexOf(b)
        })

        const diasString = diasOrdenados.join(', ')

        return (
            <div className='flex flex-col gap-2 w-full bg-white rounded-md p-2'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 gap-x-6 text-gray-600 text-sm'>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-check text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Inicio :</span>
                        {manualStartDate && format(new Date(`${manualStartDate}T00:00:00`), 'd MMMM yyyy', { locale: es })}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-check text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Fin :</span>
                        {manualEndDate && format(new Date(`${manualEndDate}T00:00:00`), 'd MMMM yyyy', { locale: es })}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-week text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Días :</span> {diasString}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-hash text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Cantidad :</span> {dayCount > 0 && dayCount + ' días'}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-clock text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Horas diarias :</span>
                        {tipoHorarioSeleccionado === 'Estandar' && (
                            totalHours > 0 && descripTotal
                        )}
                        <div className='flex flex-col'>
                            {tipoHorarioSeleccionado === 'Flexible' && (
                                descripSemanal != '0 min' && (
                                    Object.entries(descripTotalDay)
                                        .filter(([_, value]) => value !== '0 min')
                                        .map(([key, value]) => ({ dia: key, descripcion: value })).map((dia, k) => (
                                            <div key={k} className='flex'>
                                                <span className='w-20 shrink-0'>{dia.dia}</span>
                                                <span className='font-medium'>{dia.descripcion}</span>
                                            </div>
                                        ))
                                )
                            )}
                        </div>

                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-clock text-upla-100' />
                        <span className='text-upla-100 font-medium shrink-0'>Horas semanales :</span>
                        <span className='font-bold'>
                            {tipoHorarioSeleccionado === 'Estandar' && (
                                totalHours > 0 && descripSemanal
                            )}
                            {tipoHorarioSeleccionado === 'Flexible' && (
                                descripSemanal != '0 min' && descripSemanal
                            )}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const convertirAFormatoDeseado = (selectedDays: string[], tipo: string): DetalleDuracion[] => {
        const resultado: DetalleDuracion[] = [];
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

        if (tipo === "Estandar") {

            for (let i = 0; i < selectedDays.length; i++) {
                const dia = selectedDays[i];
                const diaId = diasSemana.indexOf(dia); // Obtenemos el índice del día en la semana

                for (let j = 0; j < timeRanges.length; j++) {
                    const { start, end } = timeRanges[j];

                    resultado.push({
                        diaId: (diaId === 6 ? 0 : diaId + 1), // Ajuste para que el domingo sea el día 0
                        horaInicio: start,
                        horaFin: end,
                    });
                }
            }

        }

        if (tipo === "Flexible") {
            for (let i = 0; i < 7; i++) {
                const day = diasSemana[i]
                const diaId = (i + 1) % 7

                if (dayTimeRanges[day]) {
                    const timeRanges = dayTimeRanges[day];
                    for (const { start, end } of timeRanges) {
                        resultado.push({
                            diaId,
                            horaInicio: start,
                            horaFin: end
                        })
                    }
                }
            }
        }

        return resultado
    }

    const convertirAFormatoString = (excludedDays: ExcludedDay[]): DetalleExcluido[] => {
        return excludedDays.map(excludedDay => {
            const fechaExcluida = excludedDay.date.toISOString().split('T')[0] // Obtener fecha en formato yyyy-mm-dd
            return {
                fechaExcluida,
                motivo: excludedDay.reason,
            }
        })
    }

    const handleRegistrarDatosEmpresa = () => {

        if (manualStartDate === '') {
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
        }
        if (existeCruce === true) {
            toast.error("No se puede registrar cruce de horarios")
            return
        }

        const params: RegistroDuracionPractica = {
            periodo: periodo,
            fechaInicio: manualStartDate, // formato aaaa-mm-dd
            fechaFinal: manualEndDate, // formato aaaa-mm-dd
            cantDias: dayCount, //integer
            cantHorasSemanales: cantHoraSemanal, // 2 decimales
            tipoDias: tipoHorarioSeleccionado, // añadir select para eso
            jsonDetalleDias: convertirAFormatoDeseado(selectedDays, tipoHorarioSeleccionado),
            jsonDiasExcluidos: convertirAFormatoString(excludedDays)
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                sweet.openInformation("Mensaje", "Procesando información...")
                const response = await InsertarDuracionPracticas<RespValue>(params, abortController.current)

                if (response instanceof Response) {
                    if (response.data.value == "procesado") {
                        sweet.openSuccess("¡Operación completada con éxito!", "Los datos del Área de trabajo han sido registrados satisfactoriamente.", () => {
                            props.change()
                            props.init() // Actualizar la lista de Cartas
                            props.hide() // Cerrar modal
                        })
                    }
                }

                if (response instanceof RestError) {
                    if (response.getType() === Types.CANCELED) return
                    if (response.getStatus() == 401) return
                    if (response.getStatus() == 403) return

                    sweet.openWarning("Error", "Por favor, comuníquese con la Oficina de Informática.", () => { })
                }

            }
        })
    }

    /// PARA PERIODOS DE HORARIO DE TIPO FLEXIBLE
    const [expandedDay, setExpandedDay] = useState<string | null>(null)

    const toggleExpand = (day: string) => {
        if (expandedDay === day) {
            setExpandedDay(null) // Si el día ya está expandido, lo cerramos
        } else {
            setExpandedDay(day) // Si no, lo expandimos
        }
    }

    // PARA MOSTRAR OCULTAR DIAS A EXCLUIR Y RESUMEN
    const [excludedDaysVisible, setExcludedDaysVisible] = useState(false)
    const [resumenVisible, setResumenVisible] = useState(false)

    const toggleExcludedDays = () => {
        setExcludedDaysVisible(!excludedDaysVisible)
        setResumenVisible(false) // Oculta el otro elemento si está abierto
    }
    const toggleResumen = () => {
        setResumenVisible(!resumenVisible)
        setExcludedDaysVisible(false) // Oculta el otro elemento si está abierto
    }

    ///Mostrar Horario y cruces
    const [verCruces, setVerCruces] = useState<boolean>(false)
    const handleShowCruces = () => setVerCruces(true)
    const handleCloseCruces = () => setVerCruces(false)

    const [existeCruce, setExisteCruce] = useState<boolean>(false)
    const changeExisteCruce = (newValor: boolean) => setExisteCruce(newValor)

    return (

        <Modal onShow={props.show}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>

                <Suspense fallback={<SuspenseModal />}>
                    <MostrarHorarioCruce
                        show={verCruces}
                        hide={handleCloseCruces}
                        horarioElegido={convertirAFormatoDeseado(selectedDays, tipoHorarioSeleccionado)}
                        changeExisteCruce={changeExisteCruce}
                    />
                </Suspense>

                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex text-upla-100'>
                            <i className="bi bi-calendar2-check ml-2 text-2xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>DURACIÓN Y HORARIO</span>
                        </div>
                        <button onClick={() => setViewInfo(!viewInfo)}
                            className='flex text-blue-400 my-auto text-xl mr-2'>
                            <i className="bi bi-info-circle-fill" />
                        </button>
                    </div>
                    <div className={`${viewInfo ? 'hidden' : 'grid'} grid-cols-1 sm:grid-cols-2 bg-gray-100 rounded-lg gap-x-8 gap-y-3 p-3 justify-between`}>
                        <div className={`bg-white p-1 px-2 rounded-lg border`}>
                            <p className='m-auto text-center text-sm sm:text-base flex justify-between'> Duración de prácticas:
                                <span className='font-semibold text-red-500'> {duracion} horas</span>
                            </p>
                        </div>
                        <div className={`bg-white p-1 px-2 rounded-lg border`}>
                            <p className='m-auto text-center text-sm sm:text-base flex justify-between'> Jornada máxima:
                                <br className='flex sm:hidden' />
                                <span className='font-semibold text-red-500'> {maxDiario} h diaro  <span className='font-normal text-black'>o</span> {maxSemanal} h semanal</span>
                            </p>
                        </div>
                        <div className='flex gap-4'>
                            <label htmlFor="dayInput" className='my-auto whitespace-nowrap text-upla-100 font-medium'>Cantidad de días:</label>
                            <input
                                type="number"
                                id="dayInput"
                                value={dayCount}
                                className='w-24 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                //onChange={(e) => setDayCount(parseInt(e.target.value))}
                                //min={dayCount} Especificar mínimo aqui
                                readOnly
                            />
                        </div>
                        <div className='hidden' />
                    </div>
                    <div className='bg-gray-100 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className="flex flex-col gap-3">
                            <h2 className='font-bold text-upla-100'>
                                <i className="bi bi-1-square mr-2" />INICIO DE PRÁCTICAS
                            </h2>
                            <div className="flex gap-11 mx-auto">
                                <label htmlFor="manualStartDate" className='my-auto text-upla-100 font-semibold'>Fecha:</label>
                                <input
                                    type="date"
                                    id="manualStartDate"
                                    value={manualStartDate}
                                    className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                    onChange={handleManualStartDateChange}
                                />
                            </div>
                            <div className='flex mx-auto sm:h-72'>
                                <DatePicker
                                    //selected={startDate}
                                    onChange={(date) => handleDateChange(date)}
                                    //selectsStart
                                    //startDate={startDate}
                                    //endDate={endDate}
                                    inline
                                    highlightDates={renderHighlightedDays()}
                                    locale={es}
                                    //startDay={0}
                                    calendarStartDay={0} // Domingo
                                //disabledKeyboardNavigation
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-bold text-upla-100'>
                                    <i className="bi bi-2-square mr-2" /> JORNADA SEMANAL
                                </h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 text-sm px-8 sm:px-2">
                                    {renderDayCheckboxes()}
                                </div>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between'>
                                    <h2 className='font-bold text-upla-100'>
                                        <i className="bi bi-3-square mr-2" /> HORARIO
                                    </h2>
                                    <button className='bg-green-400 text-white hover:bg-upla-100 hover:scale-105 text-xs px-2 rounded-md'
                                        onClick={handleShowCruces}
                                    >
                                        {existeCruce && <i className="animate-pulse bi bi-exclamation-triangle mr-2" />}
                                        Visualizar horario
                                    </button>
                                </div>

                                <div className='flex gap-8'>
                                    <span className='my-auto text-upla-100 font-semibold'>Tipo:</span>
                                    <div className='w-full grid grid-cols-2 text-sm'>
                                        <button
                                            className={`flex gap-6 py-1.5 px-4 border 
                                    ${tipoHorarioSeleccionado === 'Estandar' ? 'border-upla-100 bg-upla-100 text-white font-medium' : 'border-gray-300 bg-white text-gray-700'}`}
                                            onClick={() => handleSeleccionTipoHorario('Estandar')}
                                        >
                                            <div className={`${tipoHorarioSeleccionado === 'Estandar' ? 'animate-ping bg-white' : ''} my-auto rounded-full w-2 h-2`} /> Estándar
                                        </button>
                                        <button
                                            className={`flex gap-6 py-1.5 px-4 border
                                    ${tipoHorarioSeleccionado === 'Flexible' ? 'border-upla-100 bg-upla-100 text-white font-medium' : 'border-gray-300 bg-white text-gray-700'}`}
                                            onClick={() => handleSeleccionTipoHorario('Flexible')}
                                        >
                                            <div className={`${tipoHorarioSeleccionado === 'Flexible' ? 'animate-ping bg-white' : ''} my-auto rounded-full w-2 h-2`} /> Flexible
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    { // Estandar es misma hora cada dia
                                        tipoHorarioSeleccionado === 'Estandar' &&
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex justify-between'>
                                                <h1 className='my-auto text-upla-100 font-semibold'>Periodos:</h1>
                                                <button onClick={handleAddButtonClick} title='Agregar periodo'
                                                    className='text-sm flex gap-2 bg-gray-500 hover:bg-green-400 text-white p-1 px-2 rounded-md hover:scale-105'>
                                                    <i className="bi bi-plus-circle" />
                                                    <span>Agregar</span>
                                                </button>

                                            </div>
                                            <div className='flex flex-col gap-2 px-2 py-3 rounded-md bg-white'>
                                                {
                                                    timeRanges.map((range, index) => (
                                                        <div key={index} className='flex flex-row gap-2 justify-between'>
                                                            <div className='text-gray-500 flex gap-2 font-semibold w-20' title={'Periodo ' + (index + 1)}>
                                                                <span className='my-auto'>
                                                                    <i className="bi bi-hash text-upla-100 mr-1" />
                                                                    P {index + 1}
                                                                </span>
                                                            </div>
                                                            <div className='flex flex-row items-center'>
                                                                <div className='flex-1'>
                                                                    <input
                                                                        type="time"
                                                                        value={range.start}
                                                                        className='h-8 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                                                        onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                                                                    //min={index > 0 ? timeRanges[index - 1].end : ''}
                                                                    />
                                                                </div>
                                                                <span className='mx-1 sm:mx-2'>-</span>
                                                                <div className='flex-1'>
                                                                    <input
                                                                        type="time"
                                                                        value={range.end}
                                                                        className='h-8 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                                                        onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                                                                    //min={'17:35'}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className='my-auto text-lg w-10 flex'>
                                                                {index === 0 ?
                                                                    <i className="bi bi-list m-auto text-upla-100 text-xl" />
                                                                    :
                                                                    <button onClick={() => handleDeleteButtonClick(index)} title='Borrar periodo'
                                                                        className='m-auto bg-gray-400 flex w-6 h-6 rounded text-white hover:bg-red-500 hover:scale-105'>
                                                                        <i className="bi bi-trash3 text-xs m-auto" />
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                {
                                                    totalHours > 0 && (
                                                        <div className={`flex m-auto gap-2 p-0.5 px-3 rounded-lg text-sm border bg-white
                                                        ${totalHours > maxDiario ? 'border-red-400 ' : 'border-green-400 '}`}
                                                        >
                                                            <i className={`bi ${totalHours > maxDiario ? 'bi-exclamation-triangle text-red-500' : 'bi-check-circle text-green-400'} text-lg`} />
                                                            <span className="my-auto font-medium">
                                                                {'Total diario'}
                                                                <span className={`ml-3 font-semibold ${totalHours > maxDiario ? 'text-red-500' : 'text-green-400'}`}>{descripTotal}</span>
                                                            </span>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (cantHoraSemanal > maxSemanal && totalHours <= maxDiario) &&
                                                    <div title='La jornada máxima es de 30 horas a la semana'
                                                        className='flex m-auto gap-2 p-0.5 px-3 rounded-lg text-sm border bg-white border-red-400'>
                                                        <i className="bi bi-exclamation-triangle text-lg text-red-500" />
                                                        <span className='my-auto font-medium'>
                                                            {'Total semanal '}
                                                            <span className={`ml-3 font-semibold text-red-500`}>{descripSemanal}</span>
                                                        </span>
                                                    </div>
                                                }


                                            </div>
                                        </div>
                                    }
                                    {
                                        tipoHorarioSeleccionado === 'Flexible' &&
                                        (
                                            selectedDays.length !== 0 ?
                                                <div className='flex flex-col gap-2 px-2 py-2 rounded-md bg-white'>
                                                    {
                                                        selectedDays.map((day) => (
                                                            <DiaFlexibleHorario
                                                                key={day}
                                                                day={day}
                                                                descripTotalDay={descripTotalDay}
                                                                cantTotalDay={totalHoursDay}
                                                                maxDiario={maxDiario}
                                                                dayTimeRanges={dayTimeRanges}
                                                                addTimeRangeForDay={addTimeRangeForDay}
                                                                handleInputChangeForDay={handleInputChangeForDay}
                                                                deleteTimeRangeForDay={deleteTimeRangeForDay}
                                                                isExpanded={expandedDay === day} // Pasamos un booleano que indica si el día está expandido o no
                                                                toggleExpand={toggleExpand} // Pasamos la función para expandir o contraer el día
                                                            />
                                                        ))
                                                    }

                                                    {
                                                        cantHoraSemanal > maxSemanal &&
                                                        <div title='La jornada máxima es de 30 horas a la semana'
                                                            className='flex m-auto gap-2 p-0.5 px-3 rounded-lg text-sm border bg-white border-red-400'>
                                                            <i className="bi bi-exclamation-triangle text-lg text-red-500" />
                                                            <span className='my-auto font-medium'>
                                                                {'Total semanal '}
                                                                <span className={`ml-3 font-semibold text-red-500`}>{descripSemanal}</span>
                                                            </span>
                                                        </div>
                                                    }

                                                </div>
                                                :
                                                <div className='text-sm bg-gray-400 text-white p-2 py-4 text-center'>
                                                    Debe seleccionar los días de la jornada semanal
                                                </div>
                                        )
                                    }
                                    <div className='flex mt-2'>
                                        {
                                            existeCruce &&
                                            <div title='La jornada máxima es de 30 horas a la semana'
                                                className='flex m-auto gap-2 p-0.5 px-3 rounded-lg text-sm border bg-white border-red-400'>
                                                <i className="animate-pulse bi bi-exclamation-triangle text-lg text-red-500" />
                                                <span className='my-auto font-base'>
                                                    <span className={`font-semibold text-red-500`}>Existe cruce de horarios</span>
                                                </span>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 bg-gray-100 w-full rounded-lg p-3'>
                        <div onClick={toggleExcludedDays} role='button'
                            className='flex justify-between w-full'>
                            <h1 className='font-bold text-upla-100' ><i className="bi bi-calendar-x mr-2" />FECHAS A EXCLUIR</h1>
                            <div className='flex gap-8'>
                                <div className='hidden sm:flex'>
                                    {(excludedDays.length > 0 && !excludedDaysVisible) && (
                                        <p>
                                            {excludedDays.length === 1
                                                ? '1 seleccionado'
                                                : `${excludedDays.length} seleccionados`}
                                        </p>
                                    )}

                                </div>
                                <div className={` transition-all duration-500 transform ${excludedDaysVisible ? 'rotate-180' : ''}`}>
                                    <i className="bi bi-chevron-down" />
                                </div>
                            </div>
                        </div>
                        {excludedDaysVisible && (
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-4'>
                                <div className='flex flex-col gap-2 sm:pr-4 sm:pl-2'>
                                    <div className="flex justify-between w-full">
                                        <label htmlFor="newExcludedDate" className='my-auto text-upla-100 font-semibold'>Fecha:</label>
                                        <div className='flex gap-4'>
                                            <input
                                                type="date"
                                                id="newExcludedDate"
                                                className='border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                                value={newExcludedDate}
                                                onChange={handleNewExcludedDateChange}
                                            />
                                            <div className='flex'>
                                                <button onClick={addExcludedDate} title={'Agregar dia a excluir '}
                                                    className='text-sm flex gap-2 bg-gray-500 hover:bg-green-400 text-white p-1 px-2 rounded-md hover:scale-105'>
                                                    <i className="my-auto bi bi-plus-circle" />
                                                    <span className='my-auto'>Agregar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="newExcludedReason" className='text-upla-100 font-semibold'>Motivo:</label>
                                        <textarea
                                            id="newExcludedReason"
                                            className='w-full h-20 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm resize-none'
                                            value={newExcludedReason}
                                            onChange={handleNewExcludedReasonChange}
                                            placeholder='Ej. Por feriado...'
                                        />
                                    </div>

                                </div>
                                <div className='flex sm:border-l border-gray-400 border-dashed sm:pl-4 sm:pr-2'>
                                    {
                                        excludedDays.length !== 0 ?
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className='flex justify-between'>
                                                    <span className='uppercase text-upla-100 font-bold text-sm'>Lista de días excluidos

                                                    </span>
                                                    {excludedDays.length > 0 && (
                                                        <span className='text-sm mr-1'>
                                                            {excludedDays.length === 1
                                                                ? '1 seleccionado'
                                                                : `${excludedDays.length} seleccionados`}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className='flex w-full'>
                                                    {renderExcludedDaysTable()}
                                                </div>

                                            </div>
                                            :
                                            <div className='bg-gray-300 p-2 m-auto text-center flex flex-col sm:flex-row text-gray-500 rounded-lg'>
                                                <div className='hidden sm:flex text-3xl m-auto px-2'>
                                                    <i className="bi bi-arrow-left-square-fill" />
                                                </div>
                                                <div className='flex sm:hidden text-2xl m-auto '>
                                                    <i className="bi bi-arrow-up-square-fill" />
                                                </div>
                                                <div className='text-sm px-4 py-2'>
                                                    Puede añadir días donde no realizará sus prácticas correspondientes por algún motivo
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        )}

                    </div>
                    <div className={`flex flex-col bg-gray-100 w-full rounded-lg p-3 ${resumenVisible && 'gap-4'}`}>
                        <div onClick={toggleResumen} role='button'
                            className='flex justify-between w-full'>
                            <h1 className='font-bold text-upla-100'><i className="bi bi-card-list mr-2" />RESUMEN</h1>
                            <div className='flex'>
                                <div className={` transition-all duration-500 transform ${resumenVisible ? 'rotate-180' : ''}`}>
                                    <i className="bi bi-chevron-down" />
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            {resumenVisible && (
                                renderResumen()
                            )}
                        </div>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full flex justify-end lg:gap-3">
                    <div className="lg:col-span-7/12 mb-3 lg:mb-0 hidden">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleRegistrarDatosEmpresa}
                            className="text-white bg-gray-400 hover:bg-green-400 hover:border-green-400 focus:outline-none rounded-lg border border-gray-400 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalDatosDuracion;