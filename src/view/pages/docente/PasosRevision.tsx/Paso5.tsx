import React, { useState } from "react";

interface Paso5Props {
    pdfUrl?: string;
    fecha?: string;
    fechaEntrega?: string;
}

const Paso5: React.FC<{ elementos: Paso5Props[] }> = ({ elementos }) => {

  
    const [indiceSeleccionado, setIndiceSeleccionado] = useState<number>(0);

    const handleClickBoton = (index: number) => {
        setIndiceSeleccionado(index);
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-5-square-fill`} />
                <h1 className="font-bold">FICHA DE CONTROL DE ACTIVIDADES</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16">

                {
                    elementos.length !== 0 ?
                        <React.Fragment>
                            <div className="flex flex-col gap-4 justify-between">
                                {
                                    elementos.map((element, index) => (

                                        <div key={index} className={`flex flex-col bg-white p-4 rounded border gap-4 ${indiceSeleccionado === index && 'sm:border-4 sm:border-blue-500'}`} >
                                            <div className='flex flex-col'>
                                                <div className="uppercase font-bold text-gray-400 text-lg">
                                                    Consolidado {index + 1}
                                                </div>
                                                <div className="flex text-gray-400 gap-4">
                                                    <p className="w-28">Fecha entrega:</p>
                                                    <span className="font-bold">
                                                        {element.fechaEntrega}
                                                    </span>
                                                </div>
                                                <div className="flex text-gray-400 gap-4">
                                                    <p className="w-28">Fecha carga:</p>
                                                    <span className="font-bold">
                                                        {element.fecha}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleClickBoton(index)}
                                                className={`p-2 w-full text-white ${indiceSeleccionado === index ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'} rounded hidden sm:flex justify-center`}
                                            >
                                                Ver Empresa
                                            </button>
                                            <a href={element.pdfUrl}
                                                download
                                                className="text-sm flex gap-2 w-full bg-gray-500 text-white p-2 rounded-sm justify-center sm:text-lg font-bold text-center sm:hidden">
                                                <span className="my-auto">
                                                    Descargar
                                                </span>
                                            </a>
                                        </div>
                                    ))
                                }
                                <hr />
                                <div className="flex flex-col gap-1 text-gray-500">
                                    <h2 className="text-lg font-semibold uppercase ">Requisitos a considerar</h2>
                                    <ul className="list-disc list-inside ml-2">
                                        <li>Escaneado a colores</li>
                                        <li>Debidamente firmada y sellada por la empresa</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full col-span-2 hidden sm:flex">
                                <iframe
                                    title="PDF Viewer"
                                    src={elementos[indiceSeleccionado].pdfUrl}
                                    width="100%"
                                    height="400px"
                                    className="border-2"
                                />
                            </div>
                        </React.Fragment>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha cargado su carta de aceptación</p>
                        </div>
                }
            </div>
        </div>
    );
};

export default Paso5;