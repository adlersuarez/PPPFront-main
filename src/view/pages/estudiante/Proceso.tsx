import React, { useState, useEffect, Suspense, useRef } from 'react';
import Stepper from '@/component/pages/steps/Stepper';
import StepperControl from '@/component/pages/steps/StepperControl';
import { StepperContext } from '@/component/pages/steps/Context/StepperContexts';
import ContainerVIstas from '@/component/Container';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';
import LoadingSuspense from '@/component/pages/steps/StepsTemplate/Suspense/LoadingSuspense';
import { ObtenerEstadoPracticasEstudiante } from '@/network/rest/practicas.network';
import EstadoPracticas from '@/model/interfaces/practicas/estadoPracticas';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import { compararHashSHA256 } from '@/helper/herramienta.helper';

const Proceso = () => {

    const asignatura = useSelector((state: RootState) => state.infoEstudiante.asignatura)
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)

    const abortController = useRef(new AbortController())

    const [currentStep, setCurrentStep] = useState<number>(1)
    const [userData, setUserData] = useState<string>('')
    const [finalData, setFinalData] = useState<any[]>([])

    const paso_proceso = {
        "efectiva": {
            pasos: [
                "Carta de presentación",
                "Carta de aceptación",
                "Área de trabajo y horario",
                "Plan de actividades",
                "Control de actividades",
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
            const LazyComponent = React.lazy(() => import(`../../../component/pages/steps/StepsTemplate/TemplateStep${step}.tsx`));
            setStepComponent(
                <LazyComponent estado InitEstado={InitEstado} />
            )
        } catch (error) {
            console.error('Error al cargar el componente:', error);
            setStepComponent(null);
        }
    }

    const handleClick = (direction: string) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;

        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    const seleccionStep = (step: number) => {
        setCurrentStep(step)
    }

    const LoadEstadoPracticas = async () => {
        setEstado_model([])
        const response = await ObtenerEstadoPracticasEstudiante<EstadoPracticas>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoPracticas
            //setEmpresaDatos(data)
            setEstado_model(Object.values(data))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    /*const paso_1: boolean = true
    const paso_2: boolean = true
    const paso_3: boolean = true
    const paso_4: boolean = true
    const paso_5: boolean = true
    const paso_6: boolean = true*/

    const [estado_model, setEstado_model] = useState<boolean[]>([])

    //const estado_model: boolean[] = [paso_1, paso_2, paso_3, paso_4, paso_5, paso_6]
    //console.log(estado_model2)
    const InitEstado = () => {
        LoadEstadoPracticas()
    }

    //
    useEffect(() => {
        displayStep(currentStep)
    }, [currentStep])

    useEffect(() => {
        LoadEstadoPracticas()
    }, [])


    /// ADMIN O NO PERTENECE
    const tipoUsuario = useSelector((state: RootState) => state.autenticacion.tipoUsuario)
    const asigId = useSelector((state: RootState) => state.infoEstudiante.asi_Id)

    //Docente - Admin
    if (compararHashSHA256(import.meta.env.VITE_USER_TYPO_AD, tipoUsuario) || asigId == 0) {
        return (
            <div className='flex h-[600px] p-8'>
                <div className='flex bg-gray-100 w-full h-full border-[1.5px] border-upla-100 rounded border-dashed'>
                    <span className='m-auto text-upla-100 font-semibold text-2xl'>
                        NO DISPONIBLE
                    </span>
                </div>
            </div>
        )
    }

    return (
        <ContainerVIstas titulo='Volver' retornar>

            <div className='flex gap-6 whitespace-nowrap text-2xl sm:text-3xl text-upla-100 w-full text-center rounded font-bold justify-between'>
                <span className='hidden xl:flex uppercase tracking-wide'>{asignatura}{/* PRÁCTICAS PREPROFESIONALES III */}</span>
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

                        <Suspense fallback={<LoadingSuspense />}>
                            {stepComponent}
                        </Suspense>

                    </StepperContext.Provider>
                </div>
            </div>
        </ContainerVIstas>
    )
}

export default Proceso;