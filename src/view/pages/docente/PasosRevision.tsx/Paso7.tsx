import React, { useState } from 'react';

interface Paso7Props {
    informeFinal: Documentos;
    constancia: Documentos;
}

interface Documentos {
    pdfUrl?: string;
    fecha?: string;
    fechaEntrega?: string;
}


const Paso7: React.FC<{ elementos: Paso7Props }> = ({ elementos }) => {

    console.log(elementos)

    const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(0);

    const handleClickBoton = (index: number) => {
        setIndiceSeleccionado(index);
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-7-square-fill`} />
                <h1 className="font-bold">INFORME FINAL</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">
                {
                    elementos.informeFinal.pdfUrl ?
                        <React.Fragment>
                            <div className="flex flex-col gap-4 justify-between">
                                <div className={`flex flex-col bg-white p-4 rounded border gap-4 ${indiceSeleccionado === 0 && 'sm:border-4 sm:border-blue-500'}`} >
                                    <div className='flex flex-col'>
                                        <div className="uppercase font-bold text-gray-400 text-lg">
                                            INFORME FINAL
                                        </div>
                                        <div className="flex text-gray-400 gap-4">
                                            <p className="w-28">Fecha entrega:</p>
                                            <span className="font-bold">
                                                {elementos.informeFinal.fechaEntrega}
                                            </span>
                                        </div>
                                        <div className="flex text-gray-400 gap-4">
                                            <p className="w-28">Fecha carga:</p>
                                            <span className="font-bold">
                                                {elementos.informeFinal.fecha}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleClickBoton(0)}
                                        className={`p-2 w-full text-white rounded hidden sm:flex justify-center ${indiceSeleccionado === 0 ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'}`}
                                    >
                                        Ver Informe
                                    </button>
                                    <a href={elementos.informeFinal.pdfUrl}
                                        download
                                        className="text-sm flex gap-2 w-full bg-gray-500 text-white p-2 rounded-sm justify-center sm:text-lg font-bold text-center sm:hidden">
                                        <span className="my-auto">
                                            Descargar
                                        </span>
                                    </a>
                                </div>

                                <div className={`flex flex-col bg-white p-4 rounded border gap-4 ${indiceSeleccionado === 1 && 'sm:border-4 sm:border-blue-500'}`} >
                                    <div className='flex flex-col'>
                                        <div className="uppercase font-bold text-gray-400 text-lg">
                                            CONSTANCIA DE PRÁCTICAS
                                        </div>
                                        <div className="flex text-gray-400 gap-4">
                                            <p className="w-28">Fecha entrega:</p>
                                            <span className="font-bold">
                                                {elementos.constancia.fechaEntrega}
                                            </span>
                                        </div>
                                        <div className="flex text-gray-400 gap-4">
                                            <p className="w-28">Fecha carga:</p>
                                            <span className="font-bold">
                                                {elementos.constancia.fecha}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleClickBoton(1)}
                                        className={`p-2 w-full text-white rounded hidden sm:flex justify-center ${indiceSeleccionado === 1 ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'}`}
                                    >
                                        Ver Constancia
                                    </button>
                                    <a href={elementos.constancia.pdfUrl}
                                        download
                                        className="text-sm flex gap-2 w-full bg-gray-500 text-white p-2 rounded-sm justify-center sm:text-lg font-bold text-center sm:hidden">
                                        <span className="my-auto">
                                            Descargar
                                        </span>
                                    </a>
                                </div>

                                <div className="flex flex-col gap-1 text-gray-500">
                                    <h2 className="text-lg font-semibold uppercase ">Requisitos a considerar</h2>
                                    <ul className="list-disc list-inside ml-2">
                                        <li>Escaneado a colores</li>
                                        <li>Debidamente firmada y sellada por la empresa</li>
                                    </ul>
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
                                    src={indiceSeleccionado === 0 ? elementos.informeFinal.pdfUrl : elementos.constancia.pdfUrl}
                                    width="100%"
                                    height="400px"
                                    className="border-2"
                                />
                            </div>
                        </React.Fragment>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha cargado su Informe Final</p>
                        </div>
                }

            </div>
        </div>
    );
};

export default Paso7;