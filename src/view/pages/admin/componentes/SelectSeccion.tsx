import SeccionesDocente from '@/model/interfaces/docente/secciones';
import React, { useState, useRef, useEffect } from 'react';

interface DropdownComponentProps {
    handleListClick: (carId: string, asiId: string, sedeId: string, seccion: string) => void
    listaResultado: SeccionesDocente[]
    buscar: boolean
}

export const SelectSeccion: React.FC<DropdownComponentProps> = ({ handleListClick, listaResultado, buscar }) => {
    const [desplegar, setDesplegar] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [buscando, setBuscando] = useState<boolean>(false)

    useEffect(() => {
        setBuscando(buscar)
    }, [buscar])

    const openSelect = () => {
        setDesplegar(!desplegar)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDesplegar(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const [mostrado, setMostardo] = useState<SeccionesDocente | null>(null)

    const llenarDatos = (carId: string, asiId: string, sedeId: string, seccion: string) => {
        handleListClick(carId, asiId, sedeId, seccion)

        const encontrado = listaResultado.find((item) => item.car_Id == carId && item.asi_Id == asiId && item.sed_Id == sedeId && item.nta_Seccion == seccion)
        setMostardo(encontrado ?? null)
        setDesplegar(false)
    }

    // Si solo hay uno lo SELECCIONA
    useEffect(() => {
        if (listaResultado.length == 1) {
            llenarDatos(
                listaResultado[0].car_Id,
                listaResultado[0].asi_Id,
                listaResultado[0].sed_Id,
                listaResultado[0].nta_Seccion
            )
        }
    }, [listaResultado])

    return (
        <div className="relative flex flex-wrap mt-1 w-full" ref={dropdownRef}>
            <div onClick={openSelect} role="button"
                className='sm:h-9 flex sm:px-3 p-3 sm:py-0 flex-grow border rounded-md border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs z-10'>
                {
                    buscando ?
                        listaResultado.length !== 0 ?
                            mostrado == null ?
                                <span className="my-auto text-gray-500 font-medium">Seleccionar la sección específica</span>
                                :
                                <div className='flex sm:flex-row flex-col my-auto gap-2'>
                                    <span className="font-medium">{mostrado.car_Carrera}</span> <span className='hidden sm:block'>-</span>
                                    <span className="font-semibold">{mostrado.asi_Asignatura}</span> <span className='hidden sm:block'>-</span>
                                    <div>
                                        <span className="font-bold"><span className='font-normal mr-2'>Sección</span>{mostrado.nta_Seccion}</span>
                                        <span className="font-medium bg-upla-100 text-white rounded px-1.5 py-0.5 text-[9px] ml-2">{mostrado.sed_Sede}</span>
                                    </div>

                                </div>

                            :
                            <span className="my-auto text-gray-500 font-medium">
                                <i className="bi bi-dash-circle-fill mr-2 text-red-400" />
                                Ningun resultado encontrado
                            </span>
                        :
                        <span className="my-auto text-gray-500 font-medium">Ingrese el código y presione buscar</span>

                }


            </div>
            {
                (listaResultado.length > 1) &&
                <span className="absolute right-1 top-1/2 transform -translate-y-1/2 flex items-center px-2.5">
                    <i className="bi bi-chevron-down" />
                </span>
            }

            {desplegar && (
                <ul className="absolute right-0 sm:top-9 top-24 mt-1 border border-gray-300 rounded-md shadow-md overflow-y-auto z-10">
                    {listaResultado.map((item, index) => (
                        <li
                            key={index} className="flex flex-col sm:flex-row gap-2 bg-blue-50 hover:bg-blue-200 justify-between border-b border-gray-300 py-1 px-2 text-xs cursor-pointer"
                            onClick={() => llenarDatos(item.car_Id, item.asi_Id, item.sed_Id, item.nta_Seccion)}
                        >
                            <span className="font-semibold">
                                <span className='font-normal mr-2 sm:hidden'>Sede</span>{item.sed_Sede}</span>
                            <span className='hidden sm:block'>-</span>
                            <span className="font-medium">
                                <span className='font-normal mr-2 sm:hidden'>Carrera</span>{item.car_Carrera}</span>
                            <span className='hidden sm:block'>-</span>
                            <span className="font-semibold">
                                <span className='font-normal mr-2 sm:hidden'>Curso</span>{item.asi_Asignatura}</span>
                            <span className='hidden sm:block'>-</span>
                            <span className="font-bold">
                                <span className='font-normal mr-2'>Sección</span>{item.nta_Seccion}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
