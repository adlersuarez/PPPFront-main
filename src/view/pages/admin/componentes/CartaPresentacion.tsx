import CartaPresentacionDatos from '@/model/interfaces/cartaPresentacion/cartaPresentacion';
import React from 'react';
import { EstadoCartaAdmin } from './EstadoCarta';
import { formatoFecha_Date_completo, formatoFecha_Date_fechaSlash } from '@/helper/herramienta.helper';

interface CartaPresentacion {
    cartaDatos: CartaPresentacionDatos
}

export const CartaPresentacionAdmin: React.FC<CartaPresentacion> = ({ cartaDatos }) => {
    return (
        <div className='flex flex-col bg-white border border-upla-100 rounded'>
            <div className='bg-upla-100 flex justify-between text-white p-2'>
                <EstadoCartaAdmin valor={cartaDatos.cartaEstado} />

                <div title={"Fecha registro:  " + formatoFecha_Date_completo(cartaDatos.cartaFechaRegistro)}
                    className='flex px-2 bg-white text-upla-100 font-medium text-sm rounded'>
                    <span className='m-auto'>
                        {formatoFecha_Date_fechaSlash(cartaDatos.cartaFechaRegistro)}
                    </span>
                </div>
            </div>
            <div className='flex flex-col p-2 px-3 gap-2'>
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-building-fill mr-2" />EMPRESA
                </div>
                <div className='flex gap-4'>
                    <span className='w-full text-upla-100 font-bold text-center'>
                        {cartaDatos.empresaNombre}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>RUC :</div>
                    <span className='text-upla-100 font-semibold'>
                        {cartaDatos.empresaRuc}
                    </span>
                </div>
                <hr className='my-2' />
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-person-fill mr-2" />REPRESENTANTE
                </div>
                <div className='flex gap-4'>
                    <span className='w-full text-upla-100 font-bold text-center'>
                        {cartaDatos.repNombreCompleto}
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>DNI :</div>
                    <span className='text-upla-100 font-semibold'>
                        {cartaDatos.repDni}
                    </span>
                </div>
            </div>
        </div>
    )
}
