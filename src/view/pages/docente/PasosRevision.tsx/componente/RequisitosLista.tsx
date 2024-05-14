import Requisitos from "@/model/interfaces/pasos/requisitos";
import React from "react";

interface RequirementListProps {
  requisitos: Requisitos[]
}

const RequisitosLista: React.FC<RequirementListProps> = ({ requisitos }) => {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 w-full">
      <div className="flex flex-col text-gray-500 border border-gray-400 rounded overflow-hidden">
        <div className="bg-gray-400 p-1 text-center">
          <h2 className="text-white font-semibold uppercase">Requisitos a considerar</h2>
        </div>

        <div className="flex flex-col gap-1 bg-white p-2 text-sm">
          {
            requisitos.map((requirement) => (
              <div key={requirement.idRequisito} className="flex">
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

export default RequisitosLista