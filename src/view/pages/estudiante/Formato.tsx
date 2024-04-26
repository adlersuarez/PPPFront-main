import ContainerVIstas from "@/component/Container";
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
        <ContainerVIstas titulo='FORMATOS' retornar>
            <div className="flex flex-col gap-4">
                <p className="leading-normal text-sm sm:text-lg dark:text-white dark:opacity-60 text-justify">
                    Descargue formatos validados por la UPLA y su facultad, Estos documentos pueden ser usados si la organización no cuenta con alguno.
                </p>
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
        </ContainerVIstas>

    )
}

export default Formato