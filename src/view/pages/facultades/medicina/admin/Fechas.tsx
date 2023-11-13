import { useState } from "react";

interface PeriodRotation {
    id: number;
    startDate: string;
    endDate: string;
    tutor: string;
}

const Fechas = () => {

    const periods = ['2023-I', '2023-II']; // Lista de periodos académicos
    const sections = ['A', 'B', 'C', 'D']; // Lista de secciones

    const [periodRotations, setPeriodRotations] = useState<PeriodRotation[]>([
        {
            id: 1,
            startDate: '2023-01-01',
            endDate: '2023-06-30',
            tutor: 'Tutor 1',
        },
        {
            id: 2,
            startDate: '2023-07-01',
            endDate: '2023-12-31',
            tutor: 'Tutor 2',
        },
    ]);

    // Otros estados para capturar la entrada del usuario
    const [newStartDate, setNewStartDate] = useState('');
    const [newEndDate, setNewEndDate] = useState('');
    const [newTutor, setNewTutor] = useState('');

    const handleCreateRotation = () => {
        // Crear una nueva rotación y agregarla a la lista
        const newRotation: PeriodRotation = {
            id: periodRotations.length + 1,
            startDate: newStartDate,
            endDate: newEndDate,
            tutor: newTutor,
        };

        setPeriodRotations([...periodRotations, newRotation]);

        // Limpiar los campos de entrada después de la creación
        setNewStartDate('');
        setNewEndDate('');
        setNewTutor('');
    };

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <h1 className="text-blue-800 mb-4 font-bold text-2xl">Asignar Fecha</h1>
                    <div className="w-full max-w-screen-xl">
                        <div className="container">
                            <h1 className="text-2xl font-bold mb-4">Selecciona un período y una sección</h1>
                            <div className="flex space-x-4">
                                <div className="">
                                    <label htmlFor="period" className="block text-gray-700 text-sm font-bold mb-2">Periodo:</label>
                                    <select
                                        id="period"
                                        name="period"
                                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        {periods.map((period) => (
                                            <option key={period} value={period}>
                                                {period}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="">
                                    <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">Sección:</label>
                                    <select
                                        id="section"
                                        name="section"
                                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        {sections.map((section) => (
                                            <option key={section} value={section}>
                                                {section}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Agregar Nueva Rotación</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold">Fecha de Inicio:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    className="p-2 border border-gray-400 rounded w-full"
                                    value={newStartDate}
                                    onChange={(e) => setNewStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold">Fecha Final:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    className="p-2 border border-gray-400 rounded w-full"
                                    value={newEndDate}
                                    onChange={(e) => setNewEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                className="bg-blue-500 text-white p-2 rounded "
                                onClick={handleCreateRotation}
                            >
                                Agregar Rotación
                            </button>
                        </div>
                    </div>

                    {/* Lista de rotaciones existentes */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Rotaciones Actuales</h2>
                        <ul>
                            {
                                periodRotations.map((rotation) => (
                                    <li key={rotation.id}>
                                        {`ID: ${rotation.id}, Fecha de Inicio: ${rotation.startDate}, Fecha Final: ${rotation.endDate}`}
                                    </li>
                                ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )

}


export default Fechas;