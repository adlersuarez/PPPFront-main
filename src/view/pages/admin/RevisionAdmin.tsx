import ContainerVIstas from "@/component/Container";
import { useNavigate } from "react-router-dom";

const RevisionAdmin = () => {
    const navigate = useNavigate()

    const onEventDetalle = (carrera: string) => {
        navigate(`./docente`, {
            state: {
                carrera: carrera,
            },
        })
    }

    return (
        <ContainerVIstas titulo='REVISIÓN COORDINADOR' retornar>
            <div className="flex flex-wrap -mx-3 h-full">
                <div className="flex flex-col gap-6 w-full max-w-full px-3 flex-0 overflow-y-auto h-full">
                    <div className='text-3xl font-bold text-upla-100'>
                        FACULTAD DE CIENCIAS ADMINISTRATIVAS Y CONTABLES
                    </div>
                    <div className='grid sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                        <div onClick={() => onEventDetalle('AS')} role='button'
                            className='flex bg-upla-100 rounded-md text-white h-40 text-3xl font-medium px-12 hover:scale-105'>
                            <span className='m-auto text-center'>Administración y Sistemas</span>
                        </div>
                        <div onClick={() => onEventDetalle('CF')} role='button'
                            className='flex bg-upla-100 rounded-md text-white h-40 text-3xl font-medium px-12 hover:scale-105'>
                            <span className='m-auto text-center'>Contabilidad y Finanzas</span>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </ContainerVIstas>
    )
}

export default RevisionAdmin