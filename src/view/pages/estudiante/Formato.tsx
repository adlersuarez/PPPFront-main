

interface Document {
    nombre: string;
    resumen: string;
    archivo: string;
}

const Formato = () => {

    const documents: Document[] = [
        {
            nombre: "Carta de Aceptación",
            resumen: "Documento formal que confirma tu aceptación en una institución formalmente reconocida",
            archivo: 'carta-aceptacion.docx',
        },
        {
            nombre: "Plan de Actividades",
            resumen: "Breve resumen del contenido del segundo documento.",
            archivo: 'plan-actividades.docx',
        },
        {
            nombre: "Ficha de Control",
            resumen: "Breve resumen del contenido del tercer documento.",
            archivo: 'ficha-control.docx',
        },
        {
            nombre: "Informe Final",
            resumen: "Breve resumen del contenido del cuarto documento.",
            archivo: 'informe-final.docx',
        },
    ];

    const downloadFile = async (url: string, nombre: string): Promise<void> => {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = nombre;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="flex flex-col mb-4 gap-2">
                        <h1 className='font-bold text-2xl text-gray-400'>FORMATOS</h1>
                        <p className="leading-normal text-sm dark:text-white dark:opacity-60">Descargue formatos validados por la UPLA y su facultad, Estos documentos pueden ser usados si la organización no cuenta con formatos establecidos</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


                        {documents.map((document, index) => (
                            <div key={index} className="bg-gray-100 dark:bg-gray-950 rounded-md p-4 shadow flex flex-col gap-2">
                                <h2 className="text-2xl font-bold text-gray-500">{document.nombre}</h2>
                                <p className="text-lg text-gray-600">{document.resumen}</p>
                                <button
                                    onClick={() => downloadFile(`/Formatos/${document.archivo}`, document.archivo)}
                                    //onClick={handleDownload}
                                    className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 flex items-center"
                                >
                                    <i className="bi bi-file-word-fill text-white text-3xl mr-2"></i> Descargar {document.nombre}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formato;