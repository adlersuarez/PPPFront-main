import Volver from "@/component/Volver";
import FormatoCard from "@/component/pages/cards/FormatoCard";


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
            resumen: "Documento que detalla las responsabilidades y metas que un estudiante realizará durante su tiempo de prácticas",
            archivo: 'plan-actividades.docx',
        },
        {
            nombre: "Ficha de Control",
            resumen: "Documento utilizado para realizar un seguimiento y evaluación del desempeño del estudiante durante su periodo de prácticas",
            archivo: 'ficha-control.docx',
        },
        {
            nombre: "Informe Final",
            resumen: "Documento detallado de la experiencia del estudiante durante su periodo de prácticas en una organización",
            archivo: 'informe-final.docx',
        },
    ];

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border gap-4">

                    <div className="flex flex-col gap-2">
                    <div className='font-bold text-2xl text-gray-400 flex gap-2'>
                            <Volver />
                            FORMATOS
                        </div>

                        <p className="leading-normal text-sm dark:text-white dark:opacity-60 text-justify">
                            Descargue formatos validados por la UPLA y su facultad, Estos documentos pueden ser usados si la organización no cuenta con alguno.
                            </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {
                            documents.map((document, index) => (
                                <FormatoCard
                                    key={index}
                                    {...document}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formato;