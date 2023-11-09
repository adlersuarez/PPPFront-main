import { useState } from "react";

interface Articulo {
    id: number;
    text: string;
}

interface ContentData {
    title: string;
    articulos: Articulo[];
}

interface ButtonData {
    text: string;
    content: ContentData;
}

interface RightContentProps {
    data: ContentData;
}

const RightContent: React.FC<RightContentProps> = ({ data }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 underline text-center">{data.title}</h2>
            {
                data.articulos.map((articulo, index) => (
                    <div key={index} className="mb-4 flex">
                        <h3 className="text-lg font-bold w-1/5">Art. {articulo.id}°</h3>
                        <p className="text-gray-700 w-4/5">{articulo.text}</p>
                    </div>
                ))}
        </div>
    );
};

const Reglamento = () => {

    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
    const [rightContentData, setRightContentData] = useState<ContentData | null>(null);

    const handleButtonClick = (index: number, data: ContentData) => {
        setSelectedButtonIndex(index);
        setRightContentData(data);
    };

    const buttonData: ButtonData[] = [
        {
            text: "DE LOS FINES, OBJETIVOS",
            content: {
                title: "DE LOS FINES Y OBJETIVOS",
                articulos: [
                    {
                        id: 1,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 2,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DE LA ORGANIZACIÓN ACADÉMICA",
            content: {
                title: "DE LA ORGANIZACIÓN ACADÉMICA",
                articulos: [
                    {
                        id: 3,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 4,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 5,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DE LA NATURALEZA Y PROCEDIMIENTOS",
            content: {
                title: "DE LA NATURALEZA Y PROCEDIMIENTOS",
                articulos: [
                    {
                        id: 6,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 7,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 8,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 9,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 10,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DE LOS PROCEDIMIENTOS DE LA PPP",
            content: {
                title: "DE LOS PROCEDIMIENTOS DE LA PPP",
                articulos: [
                    {
                        id: 11,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 12,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 13,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 14,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 15,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 16,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DEL RÉGIMEN ACADÉMICO",
            content: {
                title: "DEL RÉGIMEN ACADÉMICO",
                articulos: [
                    {
                        id: 17,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 18,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 19,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DE LAS DISPOSICIONES COMPLEMENTARIAS",
            content: {
                title: "DE LAS DISPOSICIONES COMPLEMENTARIAS",
                articulos: [
                    {
                        id: 20,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 21,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 22,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 23,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        {
            text: "DE LAS DISPOSICIONES FINALES",
            content: {
                title: "DE LAS DISPOSICIONES FINALES",
                articulos: [
                    {
                        id: 24,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    },
                    {
                        id: 25,
                        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s'
                    }
                ]
            },
        },
        // Agrega más datos según sea necesario
    ];

    return (
        <>

            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="flex-auto mb-3">
                            <h1 className='font-bold text-2xl text-gray-400'>MARCO LEGAL</h1>
                            <p className="leading-normal text-sm dark:text-white dark:opacity-60">Las prácticas preprofesionales se encuentran respaldadas por un marco legal que busca regular y promover la formación práctica de los estudiantes en el ámbito laboral. La normativa peruana reconoce la importancia de estas prácticas como un componente esencial en la preparación de futuros profesionales.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-1">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Primera Parte */}
                                <div className="w-full sm:w-1/2 p-4 flex flex-col border border-gray-300 gap-4">
                                    <div className="w-full flex gap-2">
                                        <div className="flex flex-col w-2/3 gap-2">
                                            <h2 className="text-xl font-bold">REGLAMENTO GENERAL DE PRÁCTICAS PRE PROFESIONALES</h2>
                                            <p className="text-gray-700 text-sm">APROBADO MEDIANTE RESOLUCIÓN Nº 1786-2019-CU-VRAC</p>
                                            <p className="text-gray-700 text-xs">HUANCAYO-PERÚ 2019</p>

                                        </div>
                                        <div className="flex-col w-1/3 flex items-end">
                                            <img src="/Reglamentos/ImagenReglamento.png" alt="Imagen" className="w-20 mb-4" />
                                            <a href="/Reglamentos/Reglamento-General-de-PPP.pdf" download className="text-sm flex gap-2">
                                                <i className="bi bi-file-pdf-fill text-red-500 text-xl m-auto"></i>
                                                <span className="m-auto">Descargar
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {buttonData.map((button, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleButtonClick(index, button.content)}
                                                className={`font-bold py-2 px-4 rounded ${selectedButtonIndex === index
                                                    ? 'bg-blue-700 text-white'
                                                    : 'bg-gray-500 hover:bg-blue-700 text-white'
                                                    }`}
                                            >
                                                {button.text}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {/* Segunda Parte */}
                                <div className="w-full sm:w-1/2 p-4 flex flex-col items-center justify-start border border-gray-300 gap-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleButtonClick(selectedButtonIndex - 1, buttonData[selectedButtonIndex - 1].content)}
                                            disabled={selectedButtonIndex === 0}
                                            className="bg-gray-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm"
                                        >
                                            <i className="bi bi-arrow-left" />
                                        </button>
                                        <button
                                            onClick={() => handleButtonClick(selectedButtonIndex + 1, buttonData[selectedButtonIndex + 1].content)}
                                            disabled={selectedButtonIndex === buttonData.length - 1}
                                            className="bg-gray-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm"
                                        >
                                            <i className="bi bi-arrow-right" />
                                        </button>
                                    </div>

                                    {rightContentData ? (
                                        <RightContent data={rightContentData} />
                                    ) : (
                                        <div className="bg-red-400 p-4 rounded-md">
                                            <p className="text-center text-white font-semibold">Seleccione un botón para ver el contenido correspondiente</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Reglamento;