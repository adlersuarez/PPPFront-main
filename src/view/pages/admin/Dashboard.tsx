import React, { useState } from "react";
import ReporteArea from "../../../component/pages/reporte/ReporteArea";
import ReporteBarrasHorizontal from "../../../component/pages/reporte/ReporteBarrasHorizontal";
import ReporteBarrasVertical from "../../../component/pages/reporte/ReporteBarrasVertical";
import ReporteCircular from "../../../component/pages/reporte/ReporteCircular";

const Admin: React.FC = () => {

    const [selectedFaculty, setSelectedFaculty] = useState<string>('');
    const [selectedSchool, setSelectedSchool] = useState<string>('');

    const faculties = [
        "Ciencias Administrativas y Contables",
        "Ciencias de la Salud",
        "Derecho y Ciencias Políticas",
        "Ingeniería",
        "Medicina",
    ];
    const schools = [
        "Administración y Sistemas",
        "Arquitectura",
        "Contabilidad y Finanzas",
        "Derecho",
        "Educación Inicial",
        "Enfermería",
    ];

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border gap-4">

                    <div className="flex-auto">
                        <h1 className="text-2xl font-bold mb-1">Dashboard - PRÁCTICAS PRE PROFESIONALES</h1>
                        <p className="leading-normal text-sm dark:text-white dark:opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptates assumenda, aperiam placeat, dolore culpa accusantium sed perspiciatis doloremque aspernatur doloribus recusandae, aut magni omnis provident non reprehenderit debitis! Dignissimos.</p>
                    </div>

                    <div className="container mx-auto">
                        <div className="flex items-center space-x-4 gap-8">
                            <div>
                                <p className="text-lg font-semibold">Selecciona una facultad:</p>
                                <div className="relative">
                                    <select
                                        value={selectedFaculty}
                                        onChange={(e) => setSelectedFaculty(e.target.value)}
                                        className="block w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {faculties.map((faculty, index) => (
                                            <option key={index} value={faculty}>
                                                {faculty}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Selecciona una escuela:</p>
                                <div className="relative">
                                    <select
                                        value={selectedSchool}
                                        onChange={(e) => setSelectedSchool(e.target.value)}
                                        className="block w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        {schools.map((school, index) => (
                                            <option key={index} value={school}>
                                                {school}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">
                            <div className="flex items-center">
                                <div className="bg-gradient-to-tl from-blue-600 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center">
                                    <i className="bi bi-pencil-square text-white text-3xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-lime-500 font-semibold">Matriculados</p>
                                    <h5 className="text-lg font-bold dark:text-white">60</h5>
                                    <p className="text-sm text-gray-500">Estudiantes</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">
                            <div className="flex items-center">
                                <div className="bg-gradient-to-tl from-yellow-500 to-pink-200 w-16 h-16 rounded-full flex items-center justify-center">
                                    <i className="bi bi-person-workspace text-white text-3xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-lime-500 font-semibold">Laborando</p>
                                    <h5 className="text-lg font-bold dark:text-white">55</h5>
                                    <p className="text-sm text-gray-500">Estudiantes</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">
                            <div className="flex items-center">
                                <div className="bg-gradient-to-tl from-green-600 to-yellow-200 w-16 h-16 rounded-full flex items-center justify-center">
                                    <i className="bi bi-check2 text-white text-3xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-lime-500 font-semibold">Aprobados</p>
                                    <h5 className="text-lg font-bold dark:text-white">2</h5>
                                    <p className="text-sm text-gray-500">Estudiantes</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">
                            <div className="flex items-center">
                                <div className="bg-gradient-to-tl from-red-700 to-pink-200 w-16 h-16 rounded-full flex items-center justify-center">
                                    <i className="bi bi-exclamation-triangle-fill text-white text-3xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-lime-500 font-semibold">Desaprobados</p>
                                    <h5 className="text-lg font-bold dark:text-white">1</h5>
                                    <p className="text-sm text-gray-500">Estudiantes</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">

                            <ReporteArea />

                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">

                            <ReporteBarrasHorizontal />

                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">

                            <ReporteBarrasVertical />

                        </div>

                        <div className="bg-blue-100 dark:bg-gray-950 rounded-md p-4 shadow">

                            <ReporteCircular />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;