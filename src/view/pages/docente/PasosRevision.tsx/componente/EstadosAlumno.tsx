import { ProcesoPasosDocente } from '@/helper/requisitos.helper'
import Response from '@/model/class/response.model.class'
import RestError from '@/model/class/resterror.model.class'
import { Types } from '@/model/enum/types.model'
import EstadoPracticasDocente from '@/model/interfaces/practicas/estadoPracticasDocente'
import { ObtenerEstadoPracticasDocente } from '@/network/rest/practicas.network'
import { RootState } from '@/store/configureStore.store'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tooltip } from 'react-tooltip'

interface Props {
    EstudianteId: string
}

const EstadosAlumno: React.FC<Props> = ({ EstudianteId }) => {

    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const abortController = useRef(new AbortController())

    const [estado_model, setEstado_model] = useState<number[]>([])
    const [cargaEstado, setCargaEstado] = useState<boolean>(true)

    const LoadEstadoPracticas = async () => {
        setCargaEstado(true)
        setEstado_model([])
        const response = await ObtenerEstadoPracticasDocente<EstadoPracticasDocente>(EstudianteId, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data as EstadoPracticasDocente
            setEstado_model(Object.values(data))
            setCargaEstado(false)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadEstadoPracticas()
    }, [EstudianteId])

    const EstadoIcono: React.FC<{ estado: number, index: number, estudianteId: string }> = ({ estado, index, estudianteId }) => {
        let icono = ''
        let titulo = ''
        let color = ''
        let nombreStep = ProcesoPasosDocente[index].titulo

        switch (estado) {
            case 1:
                icono = 'bi-dash-circle-fill' // Pendiente
                color = 'gray-400'
                titulo = 'Requerido'
                break
            case 2:
                icono = 'bi-check-circle-fill' // Completado
                color = 'green-400'
                titulo = 'Completado'
                break
            case 3:
                icono = 'bi-exclamation-circle-fill' // Requiere revisión
                color = 'yellow-300'
                titulo = 'Revisión pendiente'
                break
            default:
                icono = 'bi-x-circle-fill' // Estado desconocido
                color = 'red-300'
        }

        return (
            <div data-tooltip-id={`estado-${estudianteId}-paso${index + 1}`}>

                <i className={`bi ${icono} text-${color} hover:scale-110 ${estado === 3 && 'animate-pulse'}`} />
                <Tooltip id={`estado-${estudianteId}-paso${index + 1}`} variant='light' opacity={1} className='border-2 border-upla-100' arrowColor='gray'>
                    <div className='flex flex-col max-w-80 gap-2 max-h-80 overflow-hidden'>
                        <div className='text-left'>
                            <span className={`font-semibold text-xs normal-case text-white p-1 px-2 rounded bg-${color}`}>{titulo}</span>
                        </div>

                        <span className='text-base font-bold text-upla-100'>
                            <i className={`bi bi-${index + 1}-square-fill mr-2`} />{nombreStep}
                        </span>

                    </div>
                </Tooltip>
            </div>
        )
    }

    return (
        <div className='flex gap-1 text-xl'>
            {
                !cargaEstado &&
                estado_model.map((estado, index) => (
                    <EstadoIcono key={index} estado={estado} index={index} estudianteId={EstudianteId} />
                ))
            }
        </div>
    )
}

export default EstadosAlumno