import MatriculaPago from '@/model/interfaces/pago/matriculaPago';
import PensionPago from '@/model/interfaces/pago/pensionPago';
import React from 'react';
import { IconType } from 'react-icons';
// import { BiCalendar, BiDollarCircle, BiCheck } from 'react-icons/bi';

interface StepButtonProps {
    paso: number;
    pasoActual: number;
    cambiarPaso: (paso: number) => void;
    icono: IconType;
    texto?: string;
    load: boolean;
    loadMatricula: boolean
    loadPension: boolean
    dataMatricula: MatriculaPago[]
    dataPension: PensionPago[]

    validezMatricula: string
}

const StepButton: React.FC<StepButtonProps> = ({ paso, pasoActual, cambiarPaso, icono: Icono, texto, load, loadMatricula, loadPension, dataMatricula, dataPension, validezMatricula  }) => {
    return (
        <button
            className={`w-16 h-16 rounded-full focus:outline-none flex items-center justify-center ml-4 ${
                pasoActual === paso ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            onClick={() => {
                if(load && paso == 2) return
                if(loadMatricula && paso == 2) return
                if(loadPension && paso == 2) return

                if(dataMatricula == undefined) return
                if(dataMatricula[0].operacion == "inpago") return

                if(dataPension == undefined) return
                if(dataPension[0].operacion == 'utilizado' || dataPension[0].operacion == "inpago") return

                if(validezMatricula == "2" ) return

                cambiarPaso(paso)
            }}
        >
            {pasoActual === paso ? (
                <Icono className="text-5xl" />
            ) : (
                <span className="text-xl">{paso}</span>
            )}

            {texto && <p className="text-sm">{texto}</p>}
        </button>
    );
};

export default StepButton;
