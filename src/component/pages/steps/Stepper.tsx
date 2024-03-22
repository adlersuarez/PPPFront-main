import React, { useEffect, useState, useRef } from "react";
import StepModelNew from "./Componente/StepModelNew";

type Step = {
    id: number;
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
};

type StepperProps = {
    seleccionStep: (step: number) => void;
    steps: string[];
    currentStep: number;
    estadoModel: boolean[];
};

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, estadoModel, seleccionStep }) => {

    const [newStep, setNewStep] = useState<Step[]>([]);
    const stepRef = useRef<Step[]>([]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
        const newSteps = [...steps];

        let count = 0;

        while (count < newSteps.length) {
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;
            } else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            } else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }
        return newSteps;
    };

    useEffect(() => {
        const stepsStatePrueba: Step[] = [];

        for (let i = 0; i < steps.length; i++) {
            stepsStatePrueba.push({
                id: i + 1,
                description: steps[i],
                completed: false,
                highlighted: i === 0,
                selected: i === 0,
            });
        }

        stepRef.current = stepsStatePrueba;

        const current = updateStep(currentStep - 1, stepRef.current);

        setNewStep(current);
    }, [steps, currentStep]);


    //
    const displaySteps = newStep.map((step, index) => {
        return (
            windowWidth < 1200 ?
                (
                    step.highlighted &&
                    <div
                        key={step.id} className="mx-auto uppercase">
                        <StepModelNew
                            index={index}
                            step={step}
                            estado={estadoModel} />
                    </div>
                )
                :
                <button
                    onClick={() => seleccionStep(step.id)}
                    key={step.id} className={step.id > 1 ? "w-full uppercase" : "uppercase"}>
                    <StepModelNew
                        index={index}
                        step={step}
                        estado={estadoModel} />
                </button>
        )
    })

    return (
        <div className="mx-auto p-8 flex justify-between items-center w-11/12 ">
            {displaySteps}
        </div>
    );
};

export default Stepper;