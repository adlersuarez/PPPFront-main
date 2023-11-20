import { useState, useEffect, Suspense } from 'react';
import Stepper from '@/component/pages/steps/Stepper';
import StepperControl from '@/component/pages/steps/StepperControl';
import { StepperContext } from '@/component/pages/steps/Context/StepperContexts';
import Volver from '@/component/Volver';

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

    const [stepComponent, setStepComponent] = useState<JSX.Element | null>(null);

    //Cambiar de step
    const displayStep = async (step: number) => {
        try {
            const TemplateStepModule = await import(`../../../component/pages/steps/StepsTemplate/TemplateStep${step}.tsx`);
            const TemplateStep = TemplateStepModule.default;
            setStepComponent(<TemplateStep />);
        } catch (error) {
            console.error('Error al cargar el componente:', error);
            setStepComponent(null);
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

    //
    useEffect(() => {
        displayStep(currentStep);
    }, [currentStep]);

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border gap-4">
                    <div className="text-2xl text-gray-400 font-bold flex gap-2">
                        <Volver />
                        Volver
                    </div>

                    <div className="flex flex-col gap-4 ">
                        <div className='text-3xl text-gray-400 gap-2 w-full text-center grid grid-rows-2 sm:flex sm:justify-center sm:gap-3'>
                            <span>Modalidad</span>
                            <strong>CURRICULAR</strong>
                        </div>
                        <p className='text-xl text-gray-400'>¿Como va mi proceso?</p>
                    </div>

                    <div>
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

                                    <Suspense fallback={<div>Loading...</div>}>
                                        {stepComponent}
                                    </Suspense>

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