import { NavLink, RouteComponentProps } from "react-router-dom";
import { useState } from 'react';

const MatriculaInterna = (props: RouteComponentProps<{}>) => {

    if (props) { }
    const [div1Visible, setDiv1Visible] = useState(false);
    const [div2Visible, setDiv2Visible] = useState(true);

    const toggleDiv1 = () => {
        setDiv1Visible(false);
        setDiv2Visible(true);
    };

    const toggleDiv2 = () => {
        setDiv2Visible(false);
        setDiv1Visible(true);
    };

    // const [isExpanded, setIsExpanded] = useState(false);

    // const handleToggleWidth = () => {
    //     setIsExpanded(!isExpanded);
    // }

    return (
        <>
            <div className="flex shadow-lg rounded-xl w-5/6 mx-auto">
                {
                    /*
                        RECIBOS Y PAGOS
                    */
                }
                <div className={`rounded-s-lg transition-all duration-500 ${div1Visible ? 'w-1/4 bg-gray-100' : 'w-3/4 bg-white'}`}>
                    <div className="flex justify-center items-center">
                        <button className={`text-white rounded-b-lg px-4 ${div1Visible ? 'cursor-pointer bg-blue-900' : 'cursor-default bg-blue-800'}`} onClick={toggleDiv1}>
                            <h2 className="text-2xl font-bold mb-1"> MATRICULA </h2>
                            <i className="bi bi-receipt-cutoff text-lg text-white"></i> <span className="text-white text-base font-normal">Centro de Idiomas</span>
                        </button>

                    </div>
                    <div className="p-4">
                        <div className='flex justify-around'>
                            <div className='flex'>
                                <h3 className='font-bold m-auto pr-2'>IDIOMA: </h3>
                                <select
                                    id="select-idioma"
                                    defaultValue={'0'}
                                    onChange={() => {
                                        // SetIdioma(e.target.value);
                                    }}
                                >
                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                    {
                                        // idiomas.map(idioma => {
                                        //     return (
                                        //         <option key={idioma.id} value={idioma.id}>{idioma.idioma_nombre}</option>
                                        //     )
                                        // })
                                        <>
                                            <option value="">Ingles</option>
                                            <option value="">Japones</option>
                                            <option value="">Japones</option>
                                            <option value="">Italiano</option>
                                        </>
                                    }
                                </select>
                            </div>
                            <div className='flex'>
                                <h3 className='font-bold m-auto pr-2'>TIPO:</h3>
                                <select
                                    id="select-tipo"
                                    defaultValue={'0'}
                                    onChange={() => {
                                        // SetTipo(e.target.value);
                                    }}
                                >
                                    <option className='text-gray-400 bold' value='0' disabled>Seleccione</option>
                                    {
                                        // tipos.map(tipo => {
                                        //     return (
                                        //         <option key={tipo.id} value={tipo.id}>{tipo.tipo_nombre}</option>
                                        //     )
                                        // })
                                        <>
                                            <option value="">Regular</option>
                                            <option value="">Acelerado</option>
                                        </>
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    /*
                        MATRICULA
                    */
                }
                <div className={`rounded-e-lg transition-all duration-500 ${div2Visible ? 'w-1/4 bg-gray-100' : 'w-3/4 bg-white'}`}>
                    <div className="flex justify-center items-center">
                        <button className={`text-white rounded-b-lg px-4 ${div2Visible ? 'cursor-pointer bg-blue-900' : 'cursor-default bg-blue-800'}`} onClick={toggleDiv2}>
                            <h2 className="text-2xl font-bold mb-1"> HORARIO </h2>
                            <i className="bi bi-receipt-cutoff text-lg text-white"></i> <span className="text-white text-base font-normal">Centro de Idiomas</span>
                        </button>

                    </div>
                    <div className="p-4">
                        {
                            !div2Visible &&
                            <>
                                <h1 className="text-2xl font-bold mb-4">MATRICULA POR NIVELES</h1>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-lg font-medium uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-left text-lg font-medium uppercase tracking-wider">
                                                Código
                                            </th>
                                            <th className="px-6 py-3 text-left text-lg font-medium uppercase tracking-wider">
                                                Asignatura
                                            </th>
                                            <th className="px-6 py-3 text-left text-lg font-medium uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - I</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 1</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Aprovado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - II</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 2</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Aprovado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-check-circle-fill text-green-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - III</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 3</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Aprovado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-unlock-fill text-yellow-400 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - IV</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 4</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                                                    <NavLink
                                                        to={'/inicio/horario'}>
                                                        Matricula
                                                    </NavLink>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-lock-fill text-red-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - V</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 5</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Bloqueado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-lock-fill text-red-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - VI</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 6</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Bloqueado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-lock-fill text-red-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - VII</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 7</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Bloqueado
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <i className="bi bi-lock-fill text-red-500 text-2xl" />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">332154 - VIII</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Inglés 8</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="bg-red-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed">
                                                    Bloqueado
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </>

                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default MatriculaInterna