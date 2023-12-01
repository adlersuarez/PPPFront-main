
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const MatriculaInterna = () => {

    const navigate = useNavigate()

    const [div1Visible, setDiv1Visible] = useState(true);
    const [div2Visible, setDiv2Visible] = useState(false);


    const toggleDiv1 = () => {
        setDiv1Visible(true);
        setDiv2Visible(false);
    };

    const toggleDiv2 = () => {
        setDiv2Visible(true);
        setDiv1Visible(false);
    };

    return (
        <>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="p-1 bg-Solid">
                            <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Registrar Matricula</h2>

                            <div className="w-full">

                                <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                                    <div
                                        className="border-b-2 border-gray-200 p-2">
                                        <div className="text-sm font-bold">
                                            TENER EN CUENTA
                                        </div>
                                    </div>
                                    <div className="m-2">

                                        <div className="px-4">

                                            <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Fechas límite y plazos: </span> Asegúrate de conocer las fechas límite para realizar los pagos de matrícula y pensiones. Cumplir con estos plazos es fundamental.
                                                </li>
                                                <li className="pl-4">
                                                    <span className="font-semibold text-gray-900 dark:text-white">Formas de pago:</span> Verifica qué métodos de pago acepta la institución. Asegúrate de tener la información necesaria para cada método de pago.
                                                </li>
                                                <li className="pl-4">

                                                    <span className="font-semibold text-gray-900 dark:text-white">Requisitos de matrícula:</span>  Conoce los requisitos específicos para matricularse en cursos, ya sean restricciones de cupo, requisitos de nivel académico, prerrequisitos, entre otros.

                                                </li>
                                            </ol>

                                        </div>

                                    </div>
                                </div>

                                <br />


                                <div className="flex shadow-lg rounded-xl w-full mx-auto">
                                    { /* MATRICULA */}
                                    <div className={`rounded-s-lg transition-all duration-500 ${div1Visible ? 'w-3/4 bg-gray-100' : 'w-1/4 bg-white'}`}>
                                        <div className="flex justify-center items-center">
                                            <button className={`text-white rounded-b-lg px-2 py-1 ${div1Visible ? 'cursor-pointer bg-blue-900' : 'cursor-default bg-blue-800'}`} onClick={toggleDiv1}>
                                                <p className="font-bold text-xs mx-1 my-1"><i className="bi bi-gear-fill text-xs text-white"></i> MATRICULA </p>
                                            </button>
                                        </div>
                                        <hr className="mt-2" />
                                        <div className="p-4">
                                            {
                                                !div2Visible &&
                                                <>
                                                    <h6 className="text-base font-bold mb-4">MATRICULA POR NIVELES</h6>
                                                    <div className="overflow-x-auto">
                                                        <table className="min-w-full divide-y divide-gray-200">
                                                            <thead>
                                                                <tr>
                                                                    <th className="px-2 py-1 text-left font-medium uppercase">
                                                                        Estado
                                                                    </th>
                                                                    <th className="px-2 py-1 text-left font-medium uppercase">
                                                                        Nivel
                                                                    </th>
                                                                    <th className="px-2 py-1 text-left font-medium uppercase">
                                                                        Detalle
                                                                    </th>
                                                                    <th className="px-2 py-1 text-left font-medium uppercase">
                                                                        Acciones
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white divide-y divide-gray-200">
                                                                <tr>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">Ingles 1</td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                                            title="Ver"
                                                                        >
                                                                            <i className="bi bi-list"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-green-500 text-white font-bold py-1 px-2 rounded cursor-not-allowed text-sm">
                                                                            Aprovado
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">Ingles 2</td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                                            title="Ver"
                                                                        >
                                                                            <i className="bi bi-list"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-green-500 text-white font-bold py-1 px-2 rounded cursor-not-allowed text-sm">
                                                                            Aprovado
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">Ingles 3</td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                                            title="Ver"
                                                                        >
                                                                            <i className="bi bi-list"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-green-500 text-white font-bold py-1 px-2 rounded cursor-not-allowed text-sm">
                                                                            Aprovado
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <i className="bi bi-unlock-fill text-yellow-400 text-2xl" />
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">Ingles 4</td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                                            title="Ver"
                                                                        >
                                                                            <i className="bi bi-list"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-yellow-500 text-white font-bold py-1 px-2 rounded text-sm">
                                                                            Matricula
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <i className="bi bi-lock-fill text-red-500 text-2xl" />
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">Ingles 5</td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded text-sm"
                                                                            title="Ver"
                                                                        >
                                                                            <i className="bi bi-list"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td className="px-2 py-1 whitespace-nowrap">
                                                                        <button className="bg-red-500 text-white font-bold py-1 px-2 rounded cursor-not-allowed text-sm">
                                                                            Bloqueado
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </div>

                                                </>

                                            }
                                        </div>
                                    </div>
                                    { /* RECIBOS Y PAGOS */}
                                    <div className={`rounded-e-lg transition-all duration-500 ${div2Visible ? 'w-3/4 bg-gray-100' : 'w-1/4 bg-white'}`}>
                                        <div className="flex justify-center items-center">
                                            <button className={`text-white rounded-b-lg px-2 py-1 ${div2Visible ? 'cursor-pointer bg-blue-900' : 'cursor-default bg-blue-800'}`} onClick={toggleDiv2}>
                                                <p className="font-bold text-xs mx-1 my-1"><i className="bi bi-receipt-cutoff text-xs text-white"></i> HISTORIAL DE PAGOS </p>
                                            </button>
                                        </div>
                                        <hr className="mt-2" />
                                        <div className="p-4">
                                            {
                                                !div1Visible &&
                                                <>
                                                    MUY PRONTO...
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}
export default MatriculaInterna