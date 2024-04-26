import React from 'react';

interface TimeRange {
    start: string
    end: string
}

interface Props {
    day: string
    maxDiario: number
    descripTotalDay: { [key: string]: string }
    cantTotalDay: { [key: string]: number }
    dayTimeRanges: { [key: string]: TimeRange[] }
    addTimeRangeForDay: (day: string) => void
    handleInputChangeForDay: (day: string, index: number, key: keyof TimeRange, value: string) => void
    deleteTimeRangeForDay: (day: string, index: number) => void
    isExpanded: boolean
    toggleExpand: (day: string) => void
}

const DiaFlexibleHorario: React.FC<Props> = ({
    day,
    descripTotalDay,
    cantTotalDay,
    maxDiario,
    dayTimeRanges,
    addTimeRangeForDay,
    handleInputChangeForDay,
    deleteTimeRangeForDay,
    isExpanded,
    toggleExpand,
}) => {

    return (
        <div key={day} className='flex flex-col'>
            <div className={`flex justify-between items-center h-10 bg-gray-200 border p-1 px-2 text-sm ${isExpanded ? 'border-gray-400 bg-gray-400 text-white' : 'text-gray-500'}`} onClick={() => toggleExpand(day)} role='button'>
                <h1 className="font-semibold uppercase">{`${day}`}</h1>
                <div className='flex gap-4'>
                    {
                        cantTotalDay[day] > 0 && (
                            <div className={`flex m-auto gap-2 px-3 rounded-lg text-xs border bg-white
                            ${cantTotalDay[day] > maxDiario ? 'border-red-400 ' : 'border-green-400 '}`}
                            >
                                <i className={`bi ${cantTotalDay[day] > maxDiario ? 'bi-exclamation-triangle text-red-500' : 'bi-check-circle text-green-400'} text-lg`} />
                                <span className="my-auto font-medium text-gray-500">
                                    {'Total'}
                                    <span className={`ml-3 font-semibold ${cantTotalDay[day] > maxDiario ? 'text-red-500' : 'text-green-400'}`}>{descripTotalDay[day]}</span>
                                </span>
                            </div>
                        )
                    }
                    <div className={`m-auto transition-all duration-500 transform ${isExpanded ? 'rotate-180' : ''}`}>
                        <i className="bi bi-chevron-down" />
                    </div>
                </div>


            </div>
            {isExpanded && (
                <div className={`flex flex-col gap-3 p-2 ${isExpanded && 'bg-gray-50'}`}>
                    <div className={`flex justify-between`}>
                        <div className='font-semibold'>
                            <span className='text-upla-100'>Periodo</span>
                        </div>
                        <button onClick={() => addTimeRangeForDay(day)} title={'Agregar periodo para ' + day}
                            className='text-sm flex gap-2 bg-gray-500 hover:bg-green-400 text-white p-1 px-2 rounded-md hover:scale-105'>
                            <i className="bi bi-plus-circle" />
                            <span>Agregar</span>
                        </button>
                    </div>
                    <div className='flex flex-col gap-2'>
                        {dayTimeRanges[day]?.map((range, index) => (
                            <div key={index} className="flex flex-row gap-2 justify-between ">
                                <div className="text-gray-500 flex gap-2 font-semibold w-20" title={`${day} - Periodo ${index + 1}`}>
                                    <span className="my-auto">
                                        <i className="bi bi-hash text-upla-100 mr-1" />
                                        P {index + 1}
                                    </span>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">
                                        <input
                                            type="time"
                                            value={range.start}
                                            className="h-8 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm"
                                            onChange={(e) => handleInputChangeForDay(day, index, 'start', e.target.value)}
                                        />
                                    </div>
                                    <span className="mx-1 sm:mx-1.5">-</span>
                                    <div className="flex-1">
                                        <input
                                            type="time"
                                            value={range.end}
                                            className="h-8 border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm"
                                            onChange={(e) => handleInputChangeForDay(day, index, 'end', e.target.value)}
                                            min={index > 0 ? dayTimeRanges[day][index].start : ''}
                                        />
                                    </div>
                                </div>
                                <div className="my-auto text-lg w-10 flex">
                                    {index === 0 ? (
                                        <i className="bi bi-list m-auto text-upla-100 text-xl" />
                                    ) : (
                                        <button onClick={() => deleteTimeRangeForDay(day, index)} title='Borrar periodo'
                                            className='m-auto bg-gray-400 flex w-6 h-6 rounded text-white hover:bg-red-500 hover:scale-105'>
                                            <i className="bi bi-trash3 text-xs m-auto" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div >
    )
}

export default DiaFlexibleHorario
