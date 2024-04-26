import { convertirFormatoFechaInput, revertirFormatoFechaForm } from '@/helper/herramienta.helper';
import DiasPracticas from '@/model/interfaces/practicas/diasPracticas';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UnidadTema {
  numero: number
  objetivoEspecifico: string
  fechaInicio: string
  fechaFinal: string
  actividades: string[]
}

interface Props {
  posicion: number
  total: number
  onToggle: (posicion: number) => void
  openIndex: number | null

  minFecha: string
  maxFecha: string

  //funciones
  diasPracticas: DiasPracticas[]
  unidadTematica: UnidadTema
  modificarObjetivo: (index: number, nuevoObjetivo: string) => void
  modificarFechas: (index: number, nuevaFechaInicio: string, nuevaFechaFinal: string) => void
  agregarActividad: (index: number, actividad: string) => void
  eliminarActividad: (index: number, indiceActividad: number) => void
  editarActividad: (index: number, indiceActividad: number, actividad: string) => void

}

interface SelectedDay {
  idDia: number
  dia: string
  seleccionado: boolean
}

const initialState: SelectedDay[] = [
  { idDia: 0, dia: 'domingo', seleccionado: false },
  { idDia: 1, dia: 'lunes', seleccionado: false },
  { idDia: 2, dia: 'martes', seleccionado: false },
  { idDia: 3, dia: 'miércoles', seleccionado: false },
  { idDia: 4, dia: 'jueves', seleccionado: false },
  { idDia: 5, dia: 'viernes', seleccionado: false },
  { idDia: 6, dia: 'sábado', seleccionado: false }
]

const UnidadTematica: React.FC<Props> = ({ posicion, total, onToggle, openIndex, unidadTematica,diasPracticas, minFecha, maxFecha, modificarObjetivo, modificarFechas, agregarActividad, eliminarActividad, //editarActividad
}) => {

  const primero = posicion == 1
  const ultimo = posicion == total
  const [completado, setCompletado] = useState<boolean>(false) // si lleno el objetivo especifico, las fechas, y las actividades

  //Dias marcados
  const [diasSeleccionados, setDiasSeleccionados] = useState<SelectedDay[]>(initialState)

  //ACCTIVIDADES
  const [actividad, setActividad] = useState<string>("")

  const limpiarActividad = () => setActividad("")

  const handleClickAgregarActividad = () => {
    agregarActividad(posicion - 1, actividad)
    toast.success("Actividad agregada exitosamente")
    limpiarActividad()
  }

  const handleClickEliminarActividad = (index: number) => {
    eliminarActividad(posicion - 1, index)
    toast("La actividad ha sido removida", { icon: 'ℹ️' })
  }

  useEffect(()=>{
    setDiasSeleccionados((oldDiasSeleccionados) => {
      return oldDiasSeleccionados.map((dia) => {
        const coincide = diasPracticas.some((diaPractica) => diaPractica.diaID === dia.idDia)
        return {
          ...dia,
          seleccionado: coincide
        }
      })
    })
  },[diasPracticas])

  useEffect(() => {
    if (unidadTematica.objetivoEspecifico == '') {
      setCompletado(false)
      return
    }
    if (unidadTematica.fechaInicio == '') {
      setCompletado(false)
      return
    }
    if (unidadTematica.fechaFinal == '') {
      setCompletado(false)
      return
    }
    if (unidadTematica.actividades.length == 0) {
      setCompletado(false)
      return
    }
    setCompletado(true)
  }, [unidadTematica.objetivoEspecifico,unidadTematica.fechaInicio,unidadTematica.fechaFinal,unidadTematica.actividades.length])
  //console.log(posicion, unidadTematica.fechaInicio + '-' + unidadTematica.fechaFinal, 'Min ant: ' + minFecha, 'Max sgte: ' + maxFecha)

  return (
    <div className='flex flex-col border-gray-300'>
      <div className="px-4 py-2 flex flex-row justify-between bg-gray-300 cursor-pointer font-medium text-gray-500" onClick={() => onToggle(posicion)}>
        <div className='flex gap-4'>
          <h2>UNIDAD TEMÁTICA {posicion}</h2>
          {completado &&
            <div className='flex'>
              <span className='bg-green-400 text-white rounded-md px-2 py-1 font-normal text-xs'>
                <i className="bi bi-check-circle mr-2" />
                Completado
              </span>
            </div>
          }
        </div>
        <div className='flex gap-8'>
          {openIndex !== posicion &&
            <div className='flex w-44 text-xs font-normal gap-2'>
              <span className='my-auto'><i className="bi bi-calendar3" /></span>
              <div className='my-auto bg-white w-[70px] h-5 text-center flex rounded'>
                <span className='m-auto'>{primero ? unidadTematica.fechaInicio : convertirFormatoFechaInput(unidadTematica.fechaInicio)}</span>
              </div>
              <span className='my-auto'>-</span>
              <div className='my-auto bg-white w-[70px] h-5 text-center flex rounded'>
                <span className='m-auto'>{ultimo ? unidadTematica.fechaFinal : convertirFormatoFechaInput(unidadTematica.fechaFinal)}</span>
              </div>
            </div>
          }
          <div className={`transition-all duration-500 transform ${openIndex === posicion ? 'rotate-180' : ''}`}>
            <i className="bi bi-chevron-down" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-gray-300">
        <div className={`transition-height duration-500 ${openIndex === posicion ? 'h-[370px]' : 'h-0'}`}>
          <div className="flex flex-col h-[370px]">
            <div className="flex flex-col  h-[370px]">
              <div className='grid grid-cols-1 sm:grid-cols-5 flex-col gap-1'>
                <div className="col-span-3 p-3 sm:border-r border-b sm:border-b-0 sm:border-r-gray-300">
                  <textarea
                    className="w-full h-full border rounded-md px-2 border-gray-400 focus-visible:ring-blue-200
                    transition-colors duration-300 ease-in-out focus:ring-0 text-sm resize-none"
                    placeholder={`Objetivo Específico - Unidad Temática ${posicion}`}
                    name="unidadTematica"
                    id="unidadTematica"
                    value={unidadTematica.objetivoEspecifico}
                    onChange={(e) => modificarObjetivo(posicion - 1, e.target.value)}
                  />
                </div>
                <div className="col-span-2 flex flex-col p-3 gap-3">
                  <div className="text-sm grid grid-cols-2 gap-2">
                    <div className='flex flex-col'>
                      <label htmlFor="fecha_inicio_unidad" className={`text-center ${primero ? 'bg-gray-500' : 'bg-upla-100'} font-medium text-white p-1`}>Inicio</label>
                      <input
                        title={primero ? 'Fecha de inicio de prácticas' : ''}
                        type={primero ? 'text' : "date"}
                        disabled={primero}
                        name="fecha_inicio_unidad"
                        id="fecha_inicio_unidad"
                        value={unidadTematica.fechaInicio}
                        min={minFecha}
                        max={ultimo ? revertirFormatoFechaForm(unidadTematica.fechaFinal) : unidadTematica.fechaFinal}
                        className={`w-full border rounded-b-md border-gray-400 focus-visible:ring-blue-200
                    transition-colors duration-300 ease-in-out focus:ring-0 text-center text-xs ${primero && 'bg-gray-200 font-bold'}`}
                        onChange={(e) => modificarFechas(posicion - 1, e.target.value, unidadTematica.fechaFinal)}
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor="fecha_fin_unidad" className='text-center bg-upla-100 font-medium text-white p-1'>Fin</label>
                      <input
                        title={ultimo ? 'Fecha de finalización de prácticas' : ''}
                        type={ultimo ? 'text' : "date"}
                        disabled={ultimo}
                        name="fecha_fin_unidad"
                        id="fecha_fin_unidad"
                        value={unidadTematica.fechaFinal}
                        min={primero ? revertirFormatoFechaForm(unidadTematica.fechaInicio) : unidadTematica.fechaInicio}
                        max={maxFecha}
                        className={`w-full border rounded-b-md border-gray-400 focus-visible:ring-blue-200
                    transition-colors duration-300 ease-in-out focus:ring-0 text-center text-xs ${ultimo && 'bg-gray-200 font-bold'}`}
                        onChange={(e) => modificarFechas(posicion - 1, unidadTematica.fechaInicio, e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col align-middle h-full gap-2'>
                    <div className='flex justify-between gap-1 px-3'>
                      <span title='Días de prácticas registrados'
                        className='text-xs my-auto'> Dias:</span>
                      <div className="flex justify-center gap-2">
                        {diasSeleccionados.map((select, index) => (
                          <div key={index} title={select.dia} role='button'
                            className={`flex border ${select.seleccionado ? 'bg-upla-100 text-white border-upla-100' : 'bg-gray-100 border-gray-400'}
                                      rounded w-5 h-5 text-xs`}>
                            <span className={`m-auto`}>
                              {select.dia.charAt(0)}
                            </span>
                          </div>

                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className='border-t border-t-gray-300 h-full flex flex-col gap-2 p-3'>
                <div className='flex flex-col gap-1'>
                  <span>Actividad</span>
                  <div className='flex flex-row gap-2'>
                    <textarea
                      className="w-full border rounded-md px-2 border-gray-400 focus-visible:ring-blue-200
                    transition-colors duration-300 ease-in-out focus:ring-0 text-sm h-12 resize-none"
                      placeholder='Ej. Estudio sobre'
                      value={actividad}
                      onChange={(e) => setActividad(e.target.value)}
                    />
                    <div>
                      <button onClick={handleClickAgregarActividad}
                        title='Agregar actividad'
                        className='bg-gray-400 text-white h-10 w-10 rounded-md hover:bg-green-400 hover:scale-105'
                      >
                        <i className="bi bi-plus-circle" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col h-full'>
                  <div className='text-xs bg-upla-100 text-center text-white py-1'>
                    Actividades
                  </div>
                  <div className='border border-gray-400 p-2 flex flex-col gap-2 h-[120px] overflow-y-auto text-xs scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-upla-100'>
                    {
                      unidadTematica.actividades.map((actividad, index) => (
                        <div key={index} className='bg-gray-100 flex justify-between gap-2 p-1 border border-upla-100 rounded'>
                          <div className='flex gap-3 w-full'>
                            <div className='w-6 text-right font-bold'>{index + 1}.</div>
                            <div className='w-full'>{actividad}</div>
                          </div>
                          <button
                            onClick={() => handleClickEliminarActividad(index)}
                            title='Remover Actividad'
                            className='h-5 w-5 bg-gray-600 hover:bg-red-600 hover:scale-105 text-white rounded'>
                            <span className='m-auto'>
                              <i className="bi bi-trash3 text-[10px]" />
                            </span>
                          </button>
                        </div>
                      ))
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnidadTematica
