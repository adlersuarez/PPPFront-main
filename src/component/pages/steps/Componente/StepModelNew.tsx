type Step = {
    id: number
    highlighted: boolean
    completed: boolean
    description: string
}

type StepModelNewProps = {
    index: number
    step: Step
    estado: boolean[]
}

function StepModelNew(props: StepModelNewProps) {
    const { index, step, estado } = props

    const auxiliar = estado.indexOf(false) + 1

    const calculateStepColor = () => {
        if (!step.highlighted) {
            return "bg-white border-gray-300"
        }
        if (!(step.completed && estado[step.id - 1])) { //Proceso
            return "bg-[#e8b962] border-[#e8b962]"
        }
        return "bg-[#22a75a] font-bold border-[#22a75a] text-3xl" //Completo
    };

    const calculateStepIcon = () => {
        if (!step.completed) {
            if (step.id < auxiliar) {
                return <span><i className="bi bi-check-lg" /></span>
            }
            if (step.id === auxiliar) {
                return <span ><i className="bi bi-clock-history" /></span>
            }
            if (step.id > auxiliar) {
                return <strong className='text-lg'>{index + 1}</strong>
            }
        }
        if (!estado[step.id - 1]) {
            return <span className="my-auto"><i className={`bi bi-clock-history ${step.highlighted && 'text-white'}`} /></span>
        }
        return <span><i className={`bi bi-check-lg ${step.highlighted && 'text-white'}`} /></span>
    };

    const calculateStepText = () => {
        if (!step.highlighted) {
            return "text-gray-400 text-xs font-normal"
        }
        if (!(step.completed && estado[step.id - 1])) {  //Proceso
            return "text-[#e8b962]"
        }
        return "text-[#22a75a]";   //Completo
    }

    //
    return (
        <div className="flex items-center">
            <div className="border-y-4 transition duration-500 ease-in-out border-gray-300 sm:flex-auto" />
            <div className="relative flex flex-col items-center">
                <div className={`rounded-full hover:scale-125 transition duration-500 ease-in-out border-4 h-12 w-12 flex items-center justify-center text-gray-300 font-bold text-2xl ${calculateStepColor()}`}>
                    {calculateStepIcon()}
                </div>
                <div className={`hover:scale-110 hover:bg-gray-50 hover:z-40 absolute flex top-0 text-center mt-16 w-56 xl:w-40 text-sm ${calculateStepText()} border-0 sm:border p-1 px-4 rounded bg-white 
                ${step.highlighted && 'z-20'}
                ${!step.highlighted && 'sm:hidden lg:flex'}
                `}>
                    <span className="flex mx-auto font-bold tracking-widest" role="button">
                        {step.description}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StepModelNew;