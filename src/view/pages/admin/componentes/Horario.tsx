import DuracionDetallePracticas from '@/model/interfaces/horario/duracionPracticas';
import React, { useEffect, useRef, useState } from 'react';
import { EstudianteNoCompletado } from './EstudianteNoCompletado';
import { formatoFecha_Date_fechaSlash } from '@/helper/herramienta.helper';
import { ListarDetalleDuracion, ListarDetalleExcluido } from '@/network/rest/practicas.network';
import Listas from '@/model/interfaces/Listas.model.interface';
import DuracionPracticas from '@/model/interfaces/practicas/duracionPracticas';
import Response from '@/model/class/response.model.class';
import ExcluidoPracticas from '@/model/interfaces/practicas/excluidoPracticas';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import RevisionDuracion from '../../docente/PasosRevision.tsx/componente/RevisionDuracion';
import RevisionExcluido from '../../docente/PasosRevision.tsx/componente/RevisionExcluido';

interface Horario {
    horario: DuracionDetallePracticas | null
}

export const HorarioAdmin: React.FC<Horario> = ({ horario }) => {

    if (horario?.duracionId == 0) {
        return (
            <EstudianteNoCompletado valor={4} />
        )
    }

    const abortController = useRef(new AbortController())

    const [listaDiasPracticas, setListaDiasPracticas] = useState<DuracionPracticas[]>([])
    const [listaDiasExcluido, setListaDiasExcluido] = useState<ExcluidoPracticas[]>([])

    const LoadDuracion = async (DuracionId: number) => {
        const response = await ListarDetalleDuracion<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as DuracionPracticas[]
            setListaDiasPracticas(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadExcluido = async (DuracionId: number) => {
        const response = await ListarDetalleExcluido<Listas>(DuracionId, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ExcluidoPracticas[]
            setListaDiasExcluido(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadDuracion(horario?.duracionId ?? 0)
        LoadExcluido(horario?.duracionId ?? 0)
    }, [horario])

    const [verDuracion, setVerDuracion] = useState<boolean>(false)
    const [verExcluido, setVerExcluido] = useState<boolean>(false)

    const handleShowDuracion = () => setVerDuracion(true)
    const handleCloseDuracion = () => setVerDuracion(false)

    const handleShowExcluido = () => setVerExcluido(true)
    const handleCloseExcluido = () => setVerExcluido(false)

    return (
        <div className='flex flex-col bg-white border border-upla-100 rounded'>
            <RevisionDuracion show={verDuracion} hide={handleCloseDuracion} datos={listaDiasPracticas} tipo={horario?.tipoDias ?? ''} />
            <RevisionExcluido show={verExcluido} hide={handleCloseExcluido} datos={listaDiasExcluido} />

            <div className='flex flex-col p-2 px-3 gap-2'>
                <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                    <i className="bi bi-calendar-week mr-2" />HORARIO</div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Fecha inicio :</div>
                    <span className='text-upla-100 font-semibold'>{formatoFecha_Date_fechaSlash(horario?.fechaInicio??'')}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Fecha final :</div>
                    <span className='text-upla-100 font-semibold'>{formatoFecha_Date_fechaSlash(horario?.fechaFinal??'')}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Tipo :</div>
                    <span className='text-upla-100 font-semibold'>{horario?.tipoDias}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Horario :</div>
                    <span className='text-upla-100 font-semibold'>
                        {
                            listaDiasPracticas.length !== 0 &&
                            <button
                                onClick={handleShowDuracion}
                                className="bg-gray-400 font-normal text-white hover:scale-105 text-sm hover:bg-upla-100 px-2 rounded py-1">
                                <i className="bi bi-eye mr-2" /> Mostrar horario
                            </button>
                        }
                    </span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Cant. horas semanales :</div>
                    <span className='text-upla-100 font-semibold'>{horario?.cantHorasSemanales}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='shrink-0 text-gray-500 font-medium'>Cant. días de prácticas :</div>
                    <span className='text-upla-100 font-semibold'>{horario?.cantDias}</span>
                </div>
                <hr className='my-2' />

                {
                    listaDiasExcluido.length !== 0 &&
                    <>
                        <div className='text-upla-100 font-semibold border-b-[2px] border-b-upla-100'>
                            <i className="bi bi-calendar2-x mr-2" />DÍAS EXCLUIDOS</div>
                        <button title="Días excluidos"
                            onClick={handleShowExcluido}
                            className="bg-gray-400 text-white text-sm hover:bg-red-400 px-2 rounded py-1">
                            <i className="bi bi-calendar2-x mr-2" /> Mostrar detalle
                        </button>
                    </>
                }

            </div>
        </div>
    )
}
