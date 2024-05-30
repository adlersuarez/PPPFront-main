import AreaTrabajoPracticas from '@/model/interfaces/empresa/areaTrabajoPracticas';
import React from 'react';
import { EstudianteNoCompletado } from './EstudianteNoCompletado';

interface AreaPracticas {
    datosArea: AreaTrabajoPracticas | null
}

export const AreaPracticasAdmin: React.FC<AreaPracticas> = ({ datosArea }) => {

    if (datosArea?.empresaId == 0) {
        return (
            <EstudianteNoCompletado valor={3} />
        )
    }

    return (
        <div className='flex flex-col bg-white border border-upla-100 rounded'>
         
            <div className='flex flex-col p-2 px-3 gap-2'>
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-geo-alt-fill mr-2" />ÁREA DE PRÁCTICAS</div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Área :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosArea?.descripcionAreaPracticas}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Dirección :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosArea?.direccionAreaPracticas}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Ubicación :</div>
                    <span className='text-upla-100 font-semibold'>
                        {datosArea?.depProvDist}
                    </span>
                </div>
                <hr className='my-2' />
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-person-fill mr-2" />JEFE INMEDIATO</div>
                <div className='flex gap-4'>
                    <span className='w-full text-upla-100 font-bold text-center'>
                        {datosArea?.jefeInmediato}
                    </span>
                </div>
                <div className=' gap-4 hidden'>
                    <div className='shrink-0 text-gray-500 font-medium'>DNI :</div>
                    <span className='text-upla-100 font-semibold'>{''}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Cargo :</div>
                    <span className='text-upla-100 font-semibold'>{datosArea?.jefeCargo}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Grado :</div>
                    <span className='text-upla-100 font-semibold'>{datosArea?.jefeGrado}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Celular :</div>
                    <span className='text-upla-100 font-semibold'>{datosArea?.jefeCelular}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Correo :</div>
                    <span className='text-upla-100 font-semibold'>{datosArea?.jefeEmail}</span>
                </div>
            </div>
        </div>
    )
}
