import Importante from "@/model/interfaces/pasos/importante"

interface RequirementListProps {
    importante: Importante[]
}

const ImportanteListaEstudiante: React.FC<RequirementListProps> = ({ importante }) => {

    return (
        <div className="flex flex-col gap-4 sm:gap-8 w-full">
            <div className="flex flex-col text-red-600 border border-red-400 rounded overflow-hidden">
                <div className="bg-red-400 p-1 px-3">
                    <h2 className="text-white font-semibold uppercase text-lg">
                        <i className="bi bi-exclamation-triangle mr-2" /> Importante
                    </h2>
                </div>

                <div className="flex flex-col gap-1.5 bg-white p-3 text-base">
                    {
                        importante.map((imp) => (
                            <div key={imp.idImportante} className="flex">
                                <div className="shrink-0 w-6">
                                    <i className="bi bi-dot" />
                                </div>
                                {imp.importante}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ImportanteListaEstudiante