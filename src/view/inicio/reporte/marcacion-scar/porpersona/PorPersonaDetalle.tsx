import { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, useLocation } from "react-router-dom";
import { images } from "../../../../../helper/index.helper";


const PorPersonaDetalle = (props: RouteComponentProps<{}>) => {

    const dispatch = useDispatch();

    const codigo = useLocation<{ codigo: string }>();

    const [loadingConsulta, setLoadingConsulta] = useState<boolean>(true);


    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className=" relative flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    {loadingConsulta && <div className="">
                        <div className=""></div>
                        <div className="">
                            <img src={images.logo}
                                className="w-[10.5rem] mr-0 my-3"
                                alt="Flowbite Logo" />

                            <div style={{ "borderTopColor": "transparent" }}
                                className="w-16 h-16 border-4 border-upla-100 border-solid rounded-full animate-spin">
                            </div>
                            <h1 className='m-3 text-center'>Cargando información...</h1>
                        </div>
                    </div>}


                    <div className="flex items-start justify-between flex-col lg:flex-row">
                        <div>
                            <h5 className="mb-0 font-bold text-lg">Ingresos realizados</h5>
                            <p className="">Se va listar todos su ingresos y salida.</p>
                        </div>

                        <div className="my-3 flex items-center justify-start gap-x-3 gap-y-4 flex-col sm:flex-row">
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => props.history.goBack()}>
                                <span className="mr-2">Regresar</span>
                                <i className="bi bi-arrow-left-circle"></i>
                            </button>
                            <button
                                type="button"
                                aria-controls="address"
                                next-form-btn=""
                                className="focus:outline-none  bg-white border hover:bg-gray-500 hover:text-white focus:ring-4 focus:ring-gray-300 rounded-md text-sm px-4 py-2"
                                onClick={() => {

                                }}>
                                <span className="mr-2">Recargar</span>
                                <i className="bi bi-arrow-clockwise"></i>
                            </button>
                            <button
                                type="button"
                                aria-controls="recargar"
                                next-form-btn=""
                                className="focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-red-300  rounded-md text-sm px-4 py-2"
                                onClick={() => { }}
                            >
                                <span className="mr-2">Generar Pdf</span>
                                <i className="bi bi-file-pdf-fill"></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex-auto gap-y-4">

                        <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Código/Dni:</strong> &nbsp; N° -
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Información:</strong> &nbsp;
                            </li>
                            <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal border-0 rounded-t-lg text-sm text-inherit">
                                <strong className="text-slate-700 dark:text-white">Tipo:</strong> &nbsp;
                            </li>
                        </ul>
                    </div>

                    <div className="relative overflow-auto rounded-md my-6">
                        <table className="w-full text-gray-700 bg-upla-100 border">
                            <thead className="align-bottom">
                                <tr>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[5%]">#</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[20%]">Ingreso - Fecha y Hora</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[30%]">Ingreso - Puerta</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[20%]">Salida - Fecha y Hora</th>
                                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs w-[30%]">Salida - Puerta</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between flex-col md:flex-row gap-y-4">
                        <div>
                            <span className="text-sm font-normal text-gray-900 ">Mostrando <span className="font-semibold text-gray-900"></span> de <span className="font-semibold text-gray-900"> </span>filas </span>
                        </div>
                        <nav className="bg-white rounded-md">
                            <ul className="flex">

                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PorPersonaDetalle;