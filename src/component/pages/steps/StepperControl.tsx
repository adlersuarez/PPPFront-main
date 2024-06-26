import React from "react";
import StepControl from "./Componente/StepControl";

type StepperControlProps = {
    handleClick: (direction: string) => void
    currentStep: number
    steps: any[]
    estadoModel: boolean[]
}

const StepperControl: React.FC<StepperControlProps> = (props) => {
    return (
        <div className="flex justify-around mt-12 sm:mt-16">
            <StepControl {...props} />
        </div>
    )
}

export default StepperControl