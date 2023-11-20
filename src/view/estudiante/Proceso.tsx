
import Stepper from '@/component/pages/steps/Stepper';
import StepperControl from '@/component/pages/steps/StepperControl';
import { StepperContext } from '@/component/pages/steps/Context/StepperContexts';

import Estudiante from '@/model/interfaces/login/estudiante.login';
// import Trabajador from '@/model/interfaces/trabajador/trabajador.model.interface';
import { useState } from 'react';
import { RouteComponentProps } from "react-router-dom";//
// import TemplateStep1 from '@/component/pages/steps/StepsTemplate/TemplateStep1';

type Informacion = {
    informacion: Estudiante | undefined;
};

const Proceso = (informacion: Informacion, props: RouteComponentProps<{}>) => {
    
    if(informacion&&props){}

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [userData, setUserData] = useState<string>('');
    const [finalData, setFinalData] = useState<any[]>([]);

    //console.log(informacion)

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
                return //<TemplateStep1 {...informacion.informacion} />;
            case 2:
                return //<TemplatePaso2 />;
            case 3:
                return //<TemplatePaso3 />;
            case 4:
                return //<TemplatePaso4 />;
            case 5:
                return //<TemplatePaso5 />;
            case 6:
                return //<TemplatePaso6 />;
            case 7:
                return //<TemplatePaso7 />;
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
    const paso_5: boolean = false;
    const paso_6: boolean = false;
    const paso_7: boolean = false;

    const estado_model: boolean[] = [paso_1, paso_2, paso_3, paso_4, paso_5, paso_6, paso_7];


    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <div className="rounded-lg">
                        <h1 className='text-center text-3xl'>
                            {'Prácticas Pre Profesionales - '}
                            <span className='font-bold'>
                                {'MODALIDAD EFECTIVA'}
                            </span>
                        </h1>
                        <p className='mt-4 text-xl'>¿Como va mi proceso?</p>
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