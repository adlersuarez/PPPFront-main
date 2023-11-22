import React from "react";

interface Paso1Props {
    pdfUrl?: string;
    fecha?: string;
    fechaEntrega?: string;
}

const Paso2: React.FC<{ elementos: Paso1Props }> = ({ elementos }) => {

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-2-square-fill`} />
                <h1 className="font-bold">CARTA DE ACEPTACIÓN</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">

                {
                    elementos.pdfUrl ?
                        <React.Fragment>
                            <div className="flex flex-col gap-4 justify-between">
                                <div className="flex flex-col gap-4 sm:gap-8">
                                    <div className={`flex flex-col bg-white p-4 rounded border gap-4`} >
                                        <div className='flex flex-col'>
                                            <div className="flex text-gray-400 gap-4">
                                                <p className="w-28">Fecha entrega:</p>
                                                <span className="font-bold">
                                                    {elementos.fechaEntrega}
                                                </span>
                                            </div>
                                            <div className="flex text-gray-400 gap-4">
                                                <p className="w-28">Fecha carga:</p>
                                                <span className="font-bold">
                                                    {elementos.fecha}
                                                </span>
                                            </div>
                                        </div>
                                        <a href={elementos.pdfUrl}
                                            download
                                            className="text-sm flex gap-2 w-full bg-gray-500 text-white p-2 rounded-sm justify-center sm:text-lg font-bold text-center">
                                            <span className="my-auto">
                                                Descargar
                                            </span>
                                        </a>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col gap-1 text-gray-500">
                                        <h2 className="text-lg font-semibold uppercase ">Requisitos a considerar</h2>
                                        <ul className="list-disc list-inside ml-2">
                                            <li>Escaneado a colores</li>
                                            <li>Debidamente firmada y sellada por la empresa</li>
                                        </ul>
                                    </div>
                                </div>

                                <button
                                    //onClick={validarPdf}
                                    className="w-auto mx-auto bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center text-center gap-2 mt-4 sm:mt-0"
                                >
                                    <i className="bi bi-check text-2xl" />
                                    <span>Validar</span>
                                </button>

                            </div>
                            <div className="w-full col-span-2 hidden sm:flex">
                                <iframe
                                    title="PDF Viewer"
                                    src={elementos.pdfUrl}
                                    width="100%"
                                    height="400px"
                                    className="border-2"
                                />
                            </div>
                        </React.Fragment>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha cargado su Carta de Aceptación</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default Paso2;