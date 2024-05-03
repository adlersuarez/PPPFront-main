import ContainerVIstas from "@/component/Container";
import FormatoCard from "@/component/pages/cards/FormatoCard";

interface Document {
    tipo: string
    nombre: string
    resumen: string
    urlDownload: string
}

const Formato = () => {

    const documents: Document[] = [
        {
            tipo: 'Modelo',
            nombre: "Carta de Aceptación",
            resumen: "Documento formal que confirma tu aceptación en una institución formalmente reconocida",
            urlDownload: '/Formatos/FCAC/Modelo Carta Aceptacion.docx',
        },
        {
            tipo: 'Estructura',
            nombre: "Informe Final",
            resumen: "Documento detallado de la experiencia del estudiante durante su periodo de prácticas en una organización",
            urlDownload: '/Formatos/FCAC/Estructura CF - PP1.pdf',
        },
    ]

    return (
        <ContainerVIstas titulo='FORMATOS' retornar>
            <div className="flex flex-col gap-4">
                <p className="leading-normal text-sm sm:text-lg dark:text-white dark:opacity-60 text-justify">
                    Descargue formatos validados por la UPLA y su facultad, Estos documentos pueden ser usados si la organización no cuenta con alguno.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

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