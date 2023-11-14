import { useState } from 'react';
import Stepper from '@/component/pages/steps/Stepper';
import StepperControl from '@/component/pages/steps/StepperControl';
import { StepperContext } from '@/component/pages/steps/Context/StepperContexts';

import TemplateStep1 from '@/component/pages/steps/StepsTemplate/TemplateStep1';
import TemplateStep2 from '@/component/pages/steps/StepsTemplate/TemplateStep2';
import TemplateStep3 from '@/component/pages/steps/StepsTemplate/TemplateStep3';
import TemplateStep4 from '@/component/pages/steps/StepsTemplate/TemplateStep4';
import TemplateStep5 from '@/component/pages/steps/StepsTemplate/TemplateStep5';
import TemplateStep6 from '@/component/pages/steps/StepsTemplate/TemplateStep6';
import TemplateStep7 from '@/component/pages/steps/StepsTemplate/TemplateStep7';

const Proceso = () => {

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [userData, setUserData] = useState<string>('');
    const [finalData, setFinalData] = useState<any[]>([]);

    const paso_proceso = {
        "efectiva": {
            pasos: [
                "Carta de presentación",
                "Carta de aceptación",
                "Ficha de datos de jefe inmediato",
                "Plan de actividades",
                "Ficha de control de actividades",
                "Evaluación de desempeño",
                "Informe final",
            ],
        },
        "convalidacion": {

        }
    }

    const steps = paso_proceso.efectiva.pasos;

    const displayStep = (step: number) => {
        switch (step) {
            case 1:
                return <TemplateStep1 />;
            case 2:
                return <TemplateStep2 />;
            case 3:
                return <TemplateStep3 />;
            case 4:
                return <TemplateStep4 />;
            case 5:
                return <TemplateStep5 />;
            case 6:
                return <TemplateStep6 />;
            case 7:
                return <TemplateStep7 />;
            default:
                return null; //
        }
    };

    const handleClick = (direction: string) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    const paso_1: boolean = true;
    const paso_2: boolean = true;
    const paso_3: boolean = true;
    const paso_4: boolean = true;
    const paso_5: boolean = true;
    const paso_6: boolean = true;
    const paso_7: boolean = true;

    const estado_model: boolean[] = [paso_1, paso_2, paso_3, paso_4, paso_5, paso_6, paso_7];


    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="rounded-lg">
                        <h1 className='text-3xl text-gray-400'>
                            <span>Modalidad: </span>                        
                            <strong>CURRICULAR</strong>
                        </h1>
                        <p className='mt-4 text-xl text-gray-400'>¿Como va mi proceso?</p>
                    </div>

                    <div className=''>
                        <div className="md:w-full mx-auto pb-2 bg-white ">
                            {<div className="w-full horizontal mt-5">
                                <Stepper
                                    steps={steps}
                                    currentStep={currentStep}
                                    estadoModel={estado_model}
                                />

                                <StepperControl
                                    handleClick={handleClick}
                                    currentStep={currentStep}
                                    steps={steps}
                                    estadoModel={estado_model}
                                />

                                <StepperContext.Provider
                                    value={{
                                        userData,
                                        setUserData,
                                        finalData,
                                        setFinalData
                                    }}>
                                    {displayStep(currentStep)}
                                </StepperContext.Provider>

                            </div>}

                        </div>
                    </div>

                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                </div>
            </div>
        </div>
    );
}

export default Proceso;