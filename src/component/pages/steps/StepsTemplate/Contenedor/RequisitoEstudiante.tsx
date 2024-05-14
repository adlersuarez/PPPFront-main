import Requisitos from "@/model/interfaces/pasos/requisitos"

interface RequirementListProps {
    requisitos: Requisitos[]
}

const RequisitosListaEstudiante: React.FC<RequirementListProps> = ({ requisitos }) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-8 w-full">
            <div className="flex flex-col text-gray-500 border border-gray-400 rounded overflow-hidden">
                <div className="bg-gray-400 p-1 px-3">
                    <h2 className="text-white font-semibold uppercase text-lg">
                        <i className="bi bi-card-checklist mr-2" /> Requisitos a considerar
                    </h2>
                </div>

                <div className="flex flex-col gap-1.5 bg-white p-3 text-base">
                    {
                        requisitos.map((requirement,index) => (
                            <div key={index} className="flex">
                                <div className="shrink-0 w-6">
                                    <i className="bi bi-dot" />
                                </div>
                                {requirement.requisito}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RequisitosListaEstudiante