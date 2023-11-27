import React, { useState, useEffect } from 'react';
import Modal from "../modal/ModalComponente";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'tailwindcss/tailwind.css';
import '../../../assets/index.css'

import es from 'date-fns/locale/es';
import { format } from 'date-fns';

interface ExcludedDay {
    date: Date;
    reason: string;
}

interface TimeRange {
    start: string;
    end: string;
}

const duracion = 380;
const maxDiario = 6;
const maxSemanal = 30;

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosDuracion: React.FC<Props> = (props: Props) => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [manualStartDate, setManualStartDate] = useState<string>('');
    const [manualEndDate, setManualEndDate] = useState<string>('');
    const [excludedDays, setExcludedDays] = useState<ExcludedDay[]>([]);
    const [newExcludedDate, setNewExcludedDate] = useState<string>('');
    const [newExcludedReason, setNewExcludedReason] = useState<string>('');

    const [dayCount, setDayCount] = useState<number>(0);

    console.log(dayCount)

    const handleDayCheckboxChange = (day: string) => {
        const updatedDays = selectedDays.includes(day)
            ? selectedDays.filter((selectedDay) => selectedDay !== day)
            : [...selectedDays, day];
        setSelectedDays(updatedDays);
    };

    const renderDayCheckboxes = () => {
        const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        return daysOfWeek.map((day) => (
            <div key={day} className="flex gap-2">
                <input
                    type="checkbox"
                    id={day}
                    className='my-auto'
                    checked={selectedDays.includes(day)}
                    onChange={() => handleDayCheckboxChange(day)}
                />
                <label
                    className='my-auto'
                    htmlFor={day}>
                    {day}
                </label>
            </div>
        ));
    };



    const handleDateChange = (date: Date | null) => {
        setManualStartDate(date ? date.toISOString().split('T')[0] : '')
        setStartDate(date);
    };

    const handleManualStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setManualStartDate(event.target.value);
        const selectedDate = new Date(event.target.value + 'T00:00:00');
        const adjustedDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60 * 1000);
        setStartDate(adjustedDate);
    };

    const handleNewExcludedDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewExcludedDate(event.target.value);
    };

    const handleNewExcludedReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewExcludedReason(event.target.value);
    };

    const addExcludedDate = () => {
        if (newExcludedDate && newExcludedReason) {
            const selectedDate = new Date(newExcludedDate);
            const adjustedDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60 * 1000);

            // Añadir un día al día excluido para evitar problemas con zonas horarias
            adjustedDate.setDate(adjustedDate.getDate() + 1);

            setExcludedDays([...excludedDays, { date: adjustedDate, reason: newExcludedReason }]);
            setNewExcludedDate('');
            setNewExcludedReason('');
        }
    };

    const renderExcludedDaysTable = () => {
        return (
            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                <thead>
                    <tr>
                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fecha</th>
                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Motivo</th>
                    </tr>
                </thead>
                <tbody>
                    {excludedDays.map((excludedDay, index) => (
                        <tr key={index} className='bg-white border-b'>
                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                {index + 1}
                            </td>
                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                {excludedDay.date.toLocaleDateString('es-ES')}
                            </td>
                            <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                {excludedDay.reason}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

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
    };

    ///////HORAS
    const [timeRanges, setTimeRanges] = useState<TimeRange[]>([{ start: '', end: '' }]);
    const [totalHours, setTotalHours] = useState<number>(0);
    const [descripTotal, setDescripTotal] = useState<string>('');
    const [descripSemanal, setDescripSemanal] = useState<string>('');

    //console.log(timeRanges)

    const handleInputChange = (index: number, key: keyof TimeRange, value: string) => {
        const newTimeRanges = [...timeRanges];
        newTimeRanges[index][key] = value;
        setTimeRanges(newTimeRanges);
    };

    const addTimeRange = () => {
        setTimeRanges([...timeRanges, { start: '', end: '' }]);
    };

    const deleteTimeRange = (index: number) => {
        const newTimeRanges = [...timeRanges];
        newTimeRanges.splice(index, 1);
        setTimeRanges(newTimeRanges);
    };

    useEffect(() => {
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

        if (total !== 0) {
            setDayCount(Math.floor(duracion / total))
        }


    }, [timeRanges]);

    const handleAddButtonClick = () => {
        alert('agregado')
        addTimeRange();
    };

    const handleDeleteButtonClick = (index: number) => {
        deleteTimeRange(index);
    };

    const [viewInfo, setViewInfo] = useState<boolean>(true);

    const renderResumen = () => {
        const diasOrdenados = selectedDays.sort((a, b) => {
            const orden = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
            return orden.indexOf(a) - orden.indexOf(b);
        });

        const diasString = diasOrdenados.join(', ');

        return (
            <div className='flex flex-col gap-2'>
                <h2 className='text-xl text-gray-500 font-bold'>RESUMEN</h2>
                <hr className='border border-gray-300' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600'>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-check' />
                        <strong>Inicio:</strong>
                        {manualStartDate && format(new Date(`${manualStartDate}T00:00:00`), 'd MMMM yyyy', { locale: es })}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-check' />
                        <strong>Fin:</strong>
                        {manualEndDate && format(new Date(`${manualEndDate}T00:00:00`), 'd MMMM yyyy', { locale: es })}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-calendar-week' />
                        <strong>Días:</strong> {diasString}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-hash' />
                        <strong>Cantidad:</strong> {dayCount>0 && dayCount + ' días'}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-clock' />
                        <strong>Horas (diarias):</strong> {totalHours > 0 && descripTotal}
                    </div>
                    <div className='flex gap-4'>
                        <i className='bi bi-clock' />
                        <strong>Horas (semanales):</strong> {totalHours > 0 && descripSemanal}
                    </div>
                </div>
            </div>
        );
    };

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>DURACIÓN Y HORARIO</span>
                        </div>
                        <button onClick={() => setViewInfo(!viewInfo)}
                            className='flex text-blue-400 my-auto text-xl mr-2'>
                            <i className="bi bi-info-circle-fill" />
                        </button>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className={`bg-white p-1 px-2 rounded-lg ${viewInfo ? 'hidden' : 'flex'}`}>
                            <p className='m-auto text-base sm:text-lg'> Duración de prácticas:
                                <span className='font-bold'> {duracion} horas</span>
                            </p>
                        </div>
                        <div className={`bg-white p-1 px-2 rounded-lg ${viewInfo ? 'hidden' : 'flex'}`}>
                            <p className='m-auto text-center'> Jornada máxima:
                                <br className='flex sm:hidden' />
                                <span className='font-bold'> {maxDiario} h diaro o {maxSemanal} h semanal</span>
                            </p>
                        </div>
                        <div className='gap-4 hidden'>
                            <label htmlFor="dayInput" className='my-auto'>N° días:</label>
                            <input
                                type="number"
                                id="dayInput"
                                value={dayCount}
                                className='w-16 text-center'
                                onChange={(e) => setDayCount(parseInt(e.target.value))}
                            />
                        </div>
                        <div className='hidden'/>

                        <div className="flex flex-col gap-4">
                            <h1 className='font-semibold'>SELECCIONE FECHA DE INICIO</h1>
                            <div className="flex gap-2 mx-auto">
                                <label htmlFor="manualStartDate" className='my-auto'>Inicio</label>
                                <input
                                    type="date"
                                    id="manualStartDate"
                                    value={manualStartDate}
                                    onChange={handleManualStartDateChange}
                                />
                            </div>
                            <div className='flex mx-auto'>
                                <DatePicker
                                    //selected={startDate}
                                    onChange={(date) => handleDateChange(date)}
                                    //selectsStart
                                    startDate={startDate}
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

                        <div className="flex flex-col gap-2">
                            <h1 className='font-semibold'>SELECCIONE DÍAS DE PRÁCTICAS</h1>

                            <div className="grid grid-cols-3">
                                {renderDayCheckboxes()}
                            </div>

                            <hr className='my-1' />

                            <div className='flex justify-between'>
                                <h1 className='font-semibold my-auto'>SELECCIONE HORARIO</h1>
                                <button onClick={handleAddButtonClick} className='flex gap-2 bg-gray-500 hover:bg-blue-700 text-white p-1 px-2 rounded-md'>
                                    <i className="bi bi-plus-circle" />
                                    <span>Agregar</span>
                                </button>
                            </div>

                            <div className='flex flex-col'>

                                <div className='flex flex-col gap-2'>
                                    {
                                        timeRanges.map((range, index) => (
                                            <div key={index} className='flex flex-row gap-2 justify-between '>
                                                <div className='text-gray-500 flex gap-2 font-semibold w-20'>
                                                    <i className="bi bi-clock hidden sm:flex my-auto mt-2" />
                                                    <span className='my-auto'>N° {index + 1}</span>
                                                </div>
                                                <div className='flex flex-row my-auto'>
                                                    <div className=''>
                                                        <input
                                                            type="time"
                                                            value={range.start}
                                                            className='h-8'
                                                            onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                                                            min={index > 0 ? timeRanges[index - 1].end : ''}
                                                        />
                                                    </div>
                                                    <span className='my-auto mx-1 sm:mx-3'>-</span>
                                                    <div className=''>

                                                        <input
                                                            type="time"
                                                            value={range.end}
                                                            className='h-8'
                                                            onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='my-auto text-lg w-10 flex'>
                                                    {
                                                        index === 0 ?
                                                            <i className="bi bi-list m-auto" />
                                                            :
                                                            <button onClick={() => handleDeleteButtonClick(index)}
                                                                className='m-auto'>

                                                                <i className="bi bi-trash3 " />

                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='mt-4 flex flex-col gap-2'>
                                    {
                                        totalHours > 0 &&
                                        (
                                            totalHours > maxDiario ?
                                                <div title='La jornada máxima es de 6 horas diarias'
                                                    className='flex m-auto gap-2 bg-red-400 text-white p-1 px-2 rounded-lg'>
                                                    <i className="bi bi-exclamation-triangle text-lg" />
                                                    <span className='my-auto'>
                                                        {'Total diario: '}
                                                        <strong> {descripTotal}</strong>
                                                    </span>
                                                </div>
                                                :
                                                <div className='flex m-auto gap-2 bg-green-400 text-white p-1 px-2 rounded-lg'>
                                                    <i className="bi bi-check-circle text-lg" />
                                                    <span className='my-auto'>
                                                        {'Total diario: '}
                                                        <strong>{descripTotal}</strong>
                                                    </span>
                                                </div>
                                        )
                                    }
                                    {
                                        ((totalHours * selectedDays.length) > maxSemanal && totalHours <= maxDiario) &&
                                        <div title='La jornada máxima es de 30 horas a la semana'
                                            className='flex m-auto gap-2 bg-red-400 text-white p-1 px-2 rounded-lg'>
                                            <i className="bi bi-exclamation-triangle text-lg" />
                                            <span className='my-auto'>
                                                {'Total semanal: '}
                                                <strong> {descripSemanal}</strong>
                                            </span>
                                        </div>

                                    }
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <h1 className='font-semibold'>SELECCIONE FECHAS A EXCLUIR</h1>
                            <div className="flex">
                                <label htmlFor="newExcludedDate" className='my-auto w-1/4'>Fecha:</label>
                                <input
                                    type="date"
                                    id="newExcludedDate"
                                    className='w-3/4'
                                    value={newExcludedDate}
                                    onChange={handleNewExcludedDateChange}
                                />
                            </div>
                            <div className="flex">
                                <label htmlFor="newExcludedReason" className='my-auto w-1/4'>Motivo:</label>
                                <input
                                    type="text"
                                    id="newExcludedReason"
                                    className='w-3/4'
                                    value={newExcludedReason}
                                    onChange={handleNewExcludedReasonChange}
                                />
                            </div>

                            <button onClick={addExcludedDate} className="bg-gray-500 hover:bg-blue-700 text-white p-1 px-2 rounded-lg mt-1">Agregar</button>
                        </div>
                        <div className='flex'>
                            {
                                excludedDays.length !== 0 ?
                                    <div className="flex flex-col gap-2 w-full ">
                                        <p className='uppercase'>Lista de días excluidos:</p>
                                        <div className='flex w-full overflow-x-scroll'>
                                            {renderExcludedDaysTable()}
                                        </div>

                                    </div>
                                    :
                                    <div className='bg-gray-300 p-2 m-auto text-center text-gray-500 font-bold rounded-lg text-xs sm:text-sm'>
                                        Puede añadir días donde no realizará sus prácticas correspondientes por algún motivo
                                    </div>
                            }
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3'>
                        {renderResumen()}
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                    <div className="lg:col-span-7/12 mb-3 lg:mb-0">
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
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:mt-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalDatosDuracion;