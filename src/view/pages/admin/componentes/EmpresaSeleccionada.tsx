import React from 'react';
import { EstudianteNoCompletado } from './EstudianteNoCompletado';
import EmpresaElegidaRespuesta from '@/model/interfaces/empresa/empresaElegidaRespuesta';

interface EmpresaSeleccionada {
    datosEmpresa: EmpresaElegidaRespuesta | null
}

export const EmpresaSeleccionadaAdmin: React.FC<EmpresaSeleccionada> = ({ datosEmpresa }) => {

    if (datosEmpresa?.empresaId == 0) {
        return (
            <EstudianteNoCompletado valor={2} />
        )
    }

    return (
        <div className='flex flex-col bg-white border border-upla-100 rounded'>

            <div className='flex flex-col p-2 px-3 gap-2'>
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-building-fill mr-2" />EMPRESA</div>
                <div className='flex gap-4'>
                    <span className='w-full text-upla-100 font-bold text-center'>
                        {datosEmpresa?.empresaNombre}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>RUC :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.empresaRuc}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Dirección :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.direccion}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Ubicación :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.depProvDist}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Convenio :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.tipoConvenioId === 1 && 'No remunerado'}
                    </span>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.tipoConvenioId === 2 && 'Remunerado'}
                    </span>
                </div>
                <hr className='my-2' />
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-person-fill mr-2" />REPRESENTANTE</div>
                <div className='flex gap-4'>
                    <span className='w-full text-upla-100 font-bold text-center'>
                        {datosEmpresa?.representante}
                    </span>
                </div>
                <div className='gap-4 hidden'>
                    <div className='shrink-0 text-gray-500 font-medium'>DNI :</div>
                    <span className='text-upla-100 font-semibold'>
                        {' -- dni --'}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Cargo :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.repCargo}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Grado :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosEmpresa?.repGrado}
                    </span>
                </div>
            </div>
        </div>
    )
}
