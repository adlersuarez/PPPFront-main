import { useState, useEffect, Suspense } from 'react';
import Stepper from '@/component/pages/steps/Stepper';
import StepperControl from '@/component/pages/steps/StepperControl';
import { StepperContext } from '@/component/pages/steps/Context/StepperContexts';
import ContainerVIstas from '@/component/Container';

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

    const seleccionStep = (step: number) => {
        setCurrentStep(step);
    }

    const paso_1: boolean = true;
    const paso_2: boolean = true;
    const paso_3: boolean = true;
    const paso_4: boolean = true;
    const paso_5: boolean = true;
    const paso_6: boolean = true;
    const paso_7: boolean = false;

    const estado_model: boolean[] = [paso_1, paso_2, paso_3, paso_4, paso_5, paso_6, paso_7];

    //
    useEffect(() => {
        displayStep(currentStep)
    }, [currentStep])

    return (
        <ContainerVIstas titulo='Volver' retornar>

            <div className='flex gap-6 whitespace-nowrap text-2xl sm:text-3xl text-upla-100 w-full text-center rounded font-bold justify-between'>
                <span className='hidden xl:flex uppercase tracking-wide'>Prácticas Preprofesionales</span>
                <span title='Prácticas Preprofesionales uppercase' className='flex xl:hidden'>Prácticas PP</span>
                <div className='flex bg-upla-100 text-white text-lg px-2 py-0.5 rounded-lg'>
                    <span className='m-auto font-normal flex whitespace-nowrap gap-2'>
                        <span className='hidden sm:flex'>Modalidad</span>
                        <strong>CURRICULAR</strong>
                    </span>
                </div>
            </div>

            <hr className='my-4' />
            <div className=''>
                <p className='text-xl text-gray-400'>¿Como va mi proceso?</p>
            </div>
            <div className="md:w-full mx-auto bg-white sm:mt-4">
                <div className="w-full">
                    <Stepper
                        steps={steps}
                        currentStep={currentStep}
                        estadoModel={estado_model}
                        seleccionStep={seleccionStep}
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
                </div>
            </div>
        </ContainerVIstas>
    )
}

export default Proceso;