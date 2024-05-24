import DatosEmpresa from '@/model/interfaces/empresa/empresa';
import React from 'react';


type Props = {
    datos: DatosEmpresa
}

export const VerificacionDatos: React.FC<Props> = ({ datos }) => {

    const empresaDatos = {
        ruc: datos.ruc,
        nombre: datos.nombre_empresa,
        estado: datos.estado_empresa,
        condicion: datos.condicion_domicilio,
        direcion: datos.direccion_empresa,
        ubicacion: datos.dpd_empresa,
        tipoEmpresa: datos.tipo_empresa_id
    }

    const representanteDatos = {
        dni: datos.dni_jefe,
        nombre: datos.nombre_jefe + ' ' + datos.apellidoP_jefe + ' ' + datos.apellidoM_jefe,
        grado: datos.grado_instruccion,
        cargo: datos.cargo_jefe,
        celular: datos.celular_jefe,
        email: datos.email_jefe
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                <div className='flex text-upla-100'>
                    <i className="bi bi-patch-check-fill ml-2 text-2xl" />
                    <span className='ml-4 font-bold sm:text-xl my-auto'>VERIFICACIÓN DE DATOS</span>
                </div>
            </div>
            <div className='bg-gray-100 w-full rounded-lg p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                    <div className='sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>EMPRESA</div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                        <span className="text-upla-100 font-bold">{empresaDatos.nombre}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>RUC :</div>
                        <span className="text-upla-100 font-bold">{empresaDatos.ruc}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Estado :</div>
                        <span className="text-white font-bold bg-green-400 text-sm p-0.5 px-2 rounded">{empresaDatos.estado}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Condición :</div>
                        <span className="text-white font-bold bg-green-400 text-sm p-0.5 px-2 rounded">{empresaDatos.condicion}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Dirección :</div>
                        <span className="text-upla-100 font-bold">{empresaDatos.direcion}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Ubicación :</div>
                        <span className="text-upla-100 font-bold">{empresaDatos.ubicacion}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Tipo :</div>
                        <span className="text-upla-100 font-bold">{empresaDatos.tipoEmpresa == '1' ? 'Pública' : 'Privada'}</span>
                    </div>
                </div>
            </div>

            <div className='bg-gray-100 w-full rounded-lg p-4'>
                <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 gap-2 sm:gap-y-3'>
                    <div className='sm:col-span-2 font-semibold text-gray-500 border-b-2 border-b-gray-300 text-lg pb-1'>REPRESENTANTE</div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Nombre :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.nombre}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>DNI :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.dni}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Grado :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.grado}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Cargo :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.cargo}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Correo :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.email}</span>
                    </div>
                    <div className='w-full flex gap-3'>
                        <div className='whitespace-nowrap w-20 shrink-0'>Celular :</div>
                        <span className="text-upla-100 font-bold">{representanteDatos.celular}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}