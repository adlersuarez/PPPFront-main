import { useState, useRef } from "react";

interface PropsReglamento {
    encabezado: string;
    urlImg: string;
    urlDoc: string;
    titulo: string;
    texto: string;
    contenido: Contenido[];
}

interface Articulo {
    id: number;
    text: string;
    tipo_lista?: string; //dot, numerico, alfabetico
    lista?: ListaElement[];
}

interface ListaElement {
    elemento: string;
}

interface ContentData {
    title?: string;
    articulos: Articulo[];
}

interface Contenido {
    nombre: string;
    tipo: string; //numerico , // (PRIMERO, SEGUNDO, etc)
    content: ContentData[];
}

interface RightContentProps {
    data: ContentData[];
    titulo: string;
    tipo: string;
}

interface PdfPreviewProps {
    pdfUrl: string;
}

interface ListaDetalleProps {
    tipo: string;
    datos: ListaElement[];
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ pdfUrl }) => {
    return <iframe
        title="PDF Preview"
        src={pdfUrl}
        width="100%"
        height="500px"
        className=" border-2"
    />;
};

const ListaDetalle: React.FC<ListaDetalleProps> = ({ tipo, datos }) => {

    let indice_aux = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',]

    const renderLista = () => {
        switch (tipo) {
            case 'dot':
                return (
                    <div className="flex flex-col">
                        {
                            datos.map((dat, index) => (
                                <div className="flex items-start" key={index}>
                                    <span className="flex flex-col mt-[-3px] sm:mt-[-2px]">
                                        <i className="bi bi-dot justify-start" />
                                    </span>
                                    <div className="flex flex-col">
                                        <p className="text-xs sm:text-sm text-gray-700 my-auto">
                                            {dat.elemento}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                );
            case 'alfabetico':
                return (
                    <div className="flex flex-col ml-1 sm:ml-2">
                        {
                            datos.map((dat, index) => (
                                <div className="flex items-start gap-2 text-xs sm:text-sm" key={index}>
                                    <span className="flex flex-col">
                                        {indice_aux[index] + ')'}
                                    </span>
                                    <div className="flex flex-col">
                                        <p className=" text-gray-700 my-auto">
                                            {dat.elemento}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                );
            // Puedes agregar más casos
            default:
                return null;
        }
    };

    return <>{renderLista()}</>;
}

const RightContent: React.FC<RightContentProps> = ({ data, titulo, tipo }) => {

    let indice_aux = ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO',]

    return (
        <div className="flex flex-col gap-2 sm:gap-4">
            <h2 className="text-lg sm:text-xl font-bold underline text-center">
                {titulo}
            </h2>
            <div className="flex flex-col gap-6">
                {
                    data.map((capitulos, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <h2 className="sm:text-lg font-bold text-center">{capitulos.title}
                            </h2>
                            <div className="flex flex-col gap-1 sm:gap-3">
                                {
                                    capitulos.articulos.map((articulo, index) => (
                                        <div key={index} className="flex gap-2">
                                            <span className="sm:text-lg text-sm font-bold w-3/12 sm:w-1/5">
                                                {
                                                    tipo === 'literal' ?
                                                        `${indice_aux[index]}`
                                                        :
                                                        `Art. ${articulo.id}°`
                                                }
                                            </span>
                                            <div className="w-9/12 sm:w-4/5 flex flex-col gap-1 sm:gap:2">
                                                <p className="text-xs sm:text-base text-gray-700 ">
                                                    {articulo.text}
                                                </p>
                                                {
                                                    (articulo.tipo_lista && articulo.lista) &&
                                                    <ListaDetalle
                                                        tipo={articulo.tipo_lista}
                                                        datos={articulo.lista}
                                                    />
                                                }
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                            {i < data.length - 1 && <hr className="mt-5" />}
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

const ComponenteReglamento: React.FC<PropsReglamento> = ({ encabezado, urlImg, urlDoc, titulo, texto, contenido }) => {

    const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>(0);
    const [rightContentData, setRightContentData] = useState<ContentData[] | null>(null);

    const rightContentRef = useRef<HTMLDivElement>(null);

    const [previewPdf, setPreviewPdf] = useState<boolean>(false);

    const handleButtonClick = (index: number, data: ContentData[]) => {

        setSelectedButtonIndex(index);
        setRightContentData(data);
        setPreviewPdf(false);

        if (rightContentRef.current) {
            rightContentRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 p-4 flex flex-col border border-gray-300 gap-2 sm:py-8 sm:px-10">
                <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="flex items-end">
                                <p className="text-gray-500 text-sm">
                                    {encabezado}
                                </p>
                            </div>
                            <a href={urlDoc}
                                download
                                className="text-sm flex gap-2 w-28 bg-red-500 text-white px-2 rounded justify-between hover:bg-red-700 hover:scale-105 hover:font-semibold">
                                <i className="bi bi-file-pdf-fill text-lg my-auto"/>
                                <span className="my-auto">
                                    Descargar
                                </span>
                            </a>
                        </div>
                    </div>

                    <hr />

                    <div className="flex flex-row gap-2 w-full justify-between">
                        <div className="flex flex-col justify-between gap-2 max-w-lg">
                            <h2 className="text-center sm:text-left text-lg sm:text-2xl font-bold text-gray-500">
                                {titulo}
                            </h2>
                            <div className="p-2 bg-gray-200">
                                <p className="text-gray-700 text-xs font-semibold sm:text-center sm:text-base">
                                    {texto}
                                </p>
                            </div>
                        </div>

                        <button title="Vista Previa" className="relative hidden sm:flex " onClick={() => setPreviewPdf(!previewPdf)}>
                            <div className="w-28 h-40 shrink-0">
                                <img
                                    src={urlImg}
                                    alt="Imagen"
                                    className="transition-transform transform-gpu object-center"
                                />
                            </div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-black hover:bg-opacity-20 w-full h-full flex transition-opacity">
                                <i className="bi bi-eye text-gray-200 text-3xl m-auto" />
                            </div>
                        </button>

                    </div>

                </div>
                <hr />
                <div className="grid sm:grid-cols-2 gap-2">
                    {
                        contenido.map((cont, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(index, cont.content)}
                                className={`font-bold py-2 px-4 text-xs rounded ${selectedButtonIndex === index
                                    ? 'bg-blue-700 text-white'
                                    : 'bg-gray-400 hover:bg-black text-white'
                                    }`}
                            >
                                {cont.nombre}
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="w-full sm:w-1/2 p-4 sm:py-8 sm:px-10 flex flex-col items-center justify-start border border-gray-300 gap-4">
                {
                    rightContentData &&
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleButtonClick(selectedButtonIndex - 1, contenido[selectedButtonIndex - 1].content)}
                            disabled={selectedButtonIndex === 0}
                            className={`${selectedButtonIndex === 0 ? 'bg-gray-400' : 'bg-gray-500 hover:bg-blue-700'} text-white py-1 px-2 rounded-sm`}
                        >
                            {
                                selectedButtonIndex === 0 ?
                                    <i className="bi bi-ban" />
                                    :
                                    <i className="bi bi-arrow-left" />
                            }

                        </button>
                        <button
                            onClick={() => handleButtonClick(selectedButtonIndex + 1, contenido[selectedButtonIndex + 1].content)}
                            disabled={selectedButtonIndex === contenido.length - 1}
                            className={`${selectedButtonIndex === contenido.length - 1 ? 'bg-gray-400' : 'bg-gray-500 hover:bg-blue-700'} text-white py-1 px-2 rounded-sm`}
                        >
                            {
                                selectedButtonIndex === contenido.length - 1 ?
                                    <i className="bi bi-ban" />
                                    :
                                    <i className="bi bi-arrow-right" />
                            }
                        </button>
                    </div>
                }
                <div ref={rightContentRef} className="w-full flex flex-col gap-4">

                    <div className="bg-gray-400 p-2 rounded-md">
                        <p className="text-center text-white font-semibold ">
                            {titulo}
                        </p>
                    </div>
                    {
                        previewPdf ?
                            <PdfPreview pdfUrl={urlDoc} />
                            :
                            rightContentData ? (
                                <RightContent
                                    data={rightContentData}
                                    titulo={contenido[selectedButtonIndex].nombre}
                                    tipo={contenido[selectedButtonIndex].tipo}
                                />
                            ) : (
                                <div className="bg-red-400 p-4 rounded-md">
                                    <p className="text-center text-white font-semibold">Seleccione un botón para ver el contenido correspondiente</p>
                                </div>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default ComponenteReglamento;