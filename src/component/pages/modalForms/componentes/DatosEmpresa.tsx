import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';

import RucEmpresa from '@/model/interfaces/respuesta-api/ruc.empresa.model.interface';
import DniPersona from '@/model/interfaces/respuesta-api/dni.persona.model.interface';

import { ListarCargo, ListarGrado } from '@/network/rest/practicas.network';


import Listas from '@/model/interfaces/Listas.model.interface';
import Grado from '@/model/interfaces/grado/grado';
import { ConsultarDni, ConsultarRuc } from '@/network/rest/apiconsultas.network';
import toast from 'react-hot-toast';
import DatosEmpresa from '@/model/interfaces/empresa/empresa';
import { TipoGrado } from '@/model/interfaces/grado/tipoGrado';
import Cargo from '@/model/interfaces/cargo/cargo';
import { TipoCargo } from '@/model/interfaces/cargo/tipoCargo';


type Props = {
    datos: DatosEmpresa
    modificar: (datos: DatosEmpresa) => void
}

export const FormularioEmpresa: React.FC<Props> = ({ datos, modificar }) => {

    const [ruc, setRuc] = useState<string>(datos.ruc)
    const [dni, setDni] = useState<string>(datos.dni_jefe)
    const [grado, setGrado] = useState<Grado[]>([])
    const [cargo, setCargo] = useState<Cargo[]>([])

    const [cargaRuc, setCargaRuc] = useState<boolean>(true)
    const [cargaDni, setCargaDni] = useState<boolean>(true)

    const abortController = useRef(new AbortController())


    // Consulta de PRUEBA para datos del RUC
    const consultarRUC = async () => {

        if (ruc.trim() == '') {
            toast.error("Ingrese un número de RUC")
        }

        if (ruc.trim().length !== 11 && ruc.trim() !== '') {
            toast.error("El RUC consta de 11 caracteres")
        }

        setCargaRuc(false)
        const response = await ConsultarRuc<RucEmpresa>(ruc);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {

                modificar({
                    ...datos,
                    ruc: respuesta.ruc,
                    nombre_empresa: respuesta.nombre_o_razon_social,
                    direccion_empresa: respuesta.direccion,
                    dpd_empresa: respuesta.dpd,
                    estado_empresa: respuesta.estado,
                    condicion_domicilio: respuesta.condicion,
                    ubigeo_empresa: respuesta.ubigeo[2]
                })
            }

            if (!response.data.success) {
                modificar({
                    ...datos,
                    ruc: '-',
                    nombre_empresa: '-- No encontrado --',
                    direccion_empresa: '-',
                    dpd_empresa: '-',
                    estado_empresa: '-',
                    condicion_domicilio: '-',
                    ubigeo_empresa: '-'
                })
            }
        }
        setCargaRuc(true)
    }

    // Consulta de PRUEBA para datos del DNI
    const consultarDNI = async () => {

        if (dni.trim() == '') {
            toast.error("Ingrese un número de DNI")
        }

        if (dni.trim().length !== 8 && dni.trim() !== '') {
            toast.error("El DNI consta de 8 caracteres")
        }
        setCargaDni(false)
        const response = await ConsultarDni<DniPersona>(dni);
        if (response instanceof Response) {
            let respuesta = response.data.data
            if (respuesta) {
                modificar({
                    ...datos,
                    dni_jefe: dni,
                    nombre_jefe: respuesta.nombres,
                    apellidoP_jefe: respuesta.apellido_paterno,
                    apellidoM_jefe: respuesta.apellido_materno
                })
            }
            if (!response.data.success) {
                modificar({
                    ...datos,
                    dni_jefe: '-',
                    nombre_jefe: '-- No encontrado --',
                    apellidoP_jefe: '-',
                    apellidoM_jefe: '-',
                })
            }
        }
        setCargaDni(true)
    }

    //Grado
    const handleChangeGrado = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        const gradoEncontrado = grado.find(grad => grad.gradoId === Number(selectedValue))

        modificar({
            ...datos,
            id_grado_instruccion: selectedValue,
            grado_instruccion: gradoEncontrado?.gradoNombre ?? '-'
        })
    }

    //Cargo
    const handleChangeCargo = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value
        const cargoEncontrado = cargo.find(car => car.cargoId === Number(selectedValue))

        modificar({
            ...datos,
            id_cargo_jefe: selectedValue,
            cargo_jefe: cargoEncontrado?.cargoNombre ?? '-'
        })
    }

    const LoadGrado = async () => {
        setGrado([])
        const response = await ListarGrado<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Grado[]
            setGrado(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const LoadCargo = async () => {
        setCargo([])
        const response = await ListarCargo<Listas>(abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as Cargo[]
            setCargo(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        LoadGrado()
        LoadCargo()
    }, [])

    useEffect(() => {
    }, [datos])

    const agruparPorTipoGrado = (grados: Grado[]): TipoGrado[] => {
        const tiposGradoMap: { [key: string]: TipoGrado } = {}
        // Iterar sobre cada elemento del array grado
        grados.forEach((item) => {
            // Verificar si ya existe una entrada para el tipo de grado
            if (!tiposGradoMap[item.tipoGrado]) {
                // Si no existe, crear una nueva entrada para el tipo de grado
                tiposGradoMap[item.tipoGrado] = {
                    tipoGradoId: item.tipoGradoId,
                    tipoGrado: item.tipoGrado,
                    grados: [],
                }
            }
            // Agregar el grado al arreglo correspondiente al tipo de grado
            tiposGradoMap[item.tipoGrado].grados.push(item)
        })
        // Convertir el mapa de tipos de grado en un array
        const tiposGradoArray = Object.values(tiposGradoMap)
        return tiposGradoArray
    }

    const agruparPorTipoCargo = (cargos: Cargo[]): TipoCargo[] => {
        // Mapa para almacenar los tipos de cargo y sus respectivos cargos
        const tiposCargoMap: { [key: string]: TipoCargo } = {};

        // Iterar sobre cada cargo
        cargos.forEach((cargo) => {
            // Verificar si ya existe una entrada para el tipo de cargo
            if (!tiposCargoMap[cargo.tipoCargo]) {
                // Si no existe, crear una nueva entrada para el tipo de cargo
                tiposCargoMap[cargo.tipoCargo] = {
                    tipoCargoId: cargo.tipoCargoId,
                    tipoCargo: cargo.tipoCargo,
                    cargos: [],
                };
            }
            // Agregar el cargo al arreglo correspondiente al tipo de cargo
            tiposCargoMap[cargo.tipoCargo].cargos.push(cargo);
        });

        // Convertir el mapa de tipos de cargo en un array y devolverlo
        return Object.values(tiposCargoMap);
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='bg-gray-100 w-full rounded-lg flex p-2 justify-between'>
                <div className='flex text-upla-100'>
                    <i className="bi bi-1-circle-fill ml-2 text-2xl" />
                    <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL CENTRO LABORAL</span>
                </div>
            </div>
            <div className='bg-gray-100 w-full rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="ruc" className='font-bold text-gray-500'>RUC <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                    <div className='grid grid-cols-3 gap-2'>
                        <input
                            type="text"
                            id="ruc"
                            name="ruc"
                            className='col-span-2 w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                            placeholder="Ingrese N° de RUC"
                            value={ruc}
                            maxLength={11}
                            onChange={(e) => setRuc(e.target.value)}

                        />
                        <button className='w-full flex gap-2 bg-gray-400 hover:bg-upla-100 hover:scale-105 text-white py-2 px-4 rounded' onClick={consultarRUC}>
                            {cargaRuc ?
                                <div className='animate-none'><i className="bi bi-search" /></div>
                                :
                                <div className='animate-spin'><i className="bi bi-hourglass" /></div>
                            }
                            Buscar
                        </button>
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="nombreEmpresa" className='font-bold text-gray-500'>Nombre de la Empresa</label>
                    <input
                        type="text"
                        id="nombreEmpresa"
                        name="nombreEmpresa"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                        value={datos.nombre_empresa}
                        readOnly
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="estadoEmpresa" className='font-bold text-gray-500'>Estado</label>
                    <div className='relative'>
                        <input
                            type="text"
                            id="estadoEmpresa"
                            name="estadoEmpresa"
                            className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                            value={datos.estado_empresa}
                            readOnly
                        />
                        {
                            datos.estado_empresa === 'ACTIVO' &&
                            <div
                                title='Válido'
                                className='bg-green-400 flex w-6 h-6 rounded-full absolute top-1/2 transform -translate-y-1/2 right-2'>
                                <i className="bi bi-check-lg text-white text-lg m-auto -mt-0.5" />
                            </div>
                        }
                        {
                            (datos.estado_empresa !== 'ACTIVO' && datos.estado_empresa !== '' && datos.estado_empresa !== '-') &&
                            <div
                                title='No Válido'
                                className='bg-gray-500 flex w-6 h-6 rounded-full absolute top-1/2 transform -translate-y-1/2 right-2'>
                                <i className="bi bi-dash-lg text-white text-sm m-auto" />
                            </div>
                        }

                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="condicionDomicilio" className='font-bold text-gray-500'>Condición Domicilio</label>
                    <div className='relative'>
                        <input
                            type="text"
                            id="condicionDomicilio"
                            name="condicionDomicilio"
                            className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                            value={datos.condicion_domicilio}
                            readOnly
                        />
                        {
                            datos.condicion_domicilio === 'HABIDO' &&
                            <div
                                title='Válido'
                                className='bg-green-400 flex w-6 h-6 rounded-full absolute top-1/2 transform -translate-y-1/2 right-2'>
                                <i className="bi bi-check-lg text-white text-lg m-auto -mt-0.5" />
                            </div>
                        }
                        {
                            (datos.condicion_domicilio !== 'HABIDO' && datos.condicion_domicilio !== '' && datos.condicion_domicilio !== '-') &&
                            <div
                                title='No Válido'
                                className='bg-gray-500 flex w-6 h-6 rounded-full absolute top-1/2 transform -translate-y-1/2 right-2'>
                                <i className="bi bi-dash-lg text-white text-sm m-auto" />
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="direccionEmpresa" className='font-bold text-gray-500'>Dirección</label>
                    <input
                        type="text"
                        id="direccionEmpresa"
                        name="direccionEmpresa"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                        value={datos.direccion_empresa}
                        readOnly
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="ubicacionDireccion" className='font-bold text-gray-500'>Departamento / Provincia / Distrito</label>
                    <input
                        type="text"
                        id="ubicacionDireccion"
                        name="ubicacionDireccion"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                        value={datos.dpd_empresa}
                        readOnly
                    />
                </div>
            </div>
            <div className='bg-gray-100 text-upla-100 w-full rounded-lg flex p-2 mt-3'>
                <i className="bi bi-2-circle-fill ml-2 text-2xl" />
                <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL REPRESENTANTE</span>
            </div>
            <div className='bg-gray-100 w-full rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="dniJefe" className='font-bold text-gray-500'>DNI <i className="text-red-500 bi bi-asterisk text-xs" /></label>
                    <div className='grid grid-cols-3 gap-2'>
                        <input
                            type="text"
                            id="dniJefe"
                            name="dniJefe"
                            placeholder="Ingrese DNI"
                            value={dni}
                            maxLength={8}
                            className='col-span-2 w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                            onChange={(e) => setDni(e.target.value)}

                        />
                        <button className='w-full flex gap-2 bg-gray-400 hover:bg-upla-100 hover:scale-105 text-white py-2 px-4 rounded' onClick={consultarDNI}>
                            {cargaDni ?
                                <div className='animate-none'><i className="bi bi-search" /></div>
                                :
                                <div className='animate-spin'><i className="bi bi-hourglass" /></div>
                            }
                            Buscar
                        </button>
                    </div>

                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="nombreJefe" className='font-bold text-gray-500'>Nombre</label>
                    <input
                        type="text"
                        id="nombreJefe"
                        name="nombreJefe"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm bg-gray-300'
                        value={datos.nombre_jefe + ' ' + datos.apellidoP_jefe + ' ' + datos.apellidoM_jefe}
                        readOnly
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="gradoInstruccion" className='font-bold text-gray-500'>Grado de instrucción</label>
                    <select
                        id="gradoInstruccion"
                        name="gradoInstruccion"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm'
                        defaultValue={datos.id_grado_instruccion}
                        onChange={handleChangeGrado}
                    >
                        <option value="0">Selecciona una opción</option>
                        {agruparPorTipoGrado(grado).map(tipo => (
                            <optgroup key={tipo.tipoGradoId} label={'Carrera ' + tipo.tipoGrado}>
                                {tipo.grados.map(gr => (
                                    <option key={gr.gradoId} value={gr.gradoId}>{gr.gradoNombre}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="cargoJefe" className='font-bold text-gray-500'>Cargo que desempeña</label>
                    <select
                        id="cargoJefe"
                        name="cargoJefe"
                        className='w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-xs sm:text-sm'
                        defaultValue={datos.id_grado_instruccion}
                        onChange={handleChangeCargo}
                    >
                        <option value="0">Selecciona una opción</option>
                        {agruparPorTipoCargo(cargo).map(tipo => (
                            <optgroup key={tipo.tipoCargoId} label={tipo.tipoCargo}>
                                {tipo.cargos.map(car => (
                                    <option key={car.cargoId} value={car.cargoId}>{car.cargoNombre}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}