import React, { useEffect, useRef, useState } from 'react'
import EstadoCarta from './estados/EstadoCarta'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/configureStore.store'
import { ObtenerDatosCartaAlumnoEspecifico } from '@/network/rest/practicas.network'
import Listas from '@/model/interfaces/Listas.model.interface'
import ListaCartaEmpresaDocente from '@/model/interfaces/docente/listaCarta'
import Response from '@/model/class/response.model.class'
import RestError from '@/model/class/resterror.model.class'
import { Types } from '@/model/enum/types.model'
import { formatoFecha_Date_fechaSlash } from '@/helper/herramienta.helper'

interface DatosProps {
    estudianteId: string
}

const Paso1 = (datos: DatosProps) => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())


    const [cartasPresDocente, setCartasPresDocente] = useState<ListaCartaEmpresaDocente[]>([])

    const primerIntento = cartasPresDocente.find(elemento => elemento.estadoCarta === 2) || cartasPresDocente.find(elemento => elemento.estadoCarta === 1)
    const [intentSeleccionado, setIntentoSeleccionado] = useState<ListaCartaEmpresaDocente | null>(primerIntento ?? null)

    const handleClickBoton = (intento: ListaCartaEmpresaDocente) => {
        setIntentoSeleccionado(intento)
    }

    const [loading,setLoading] = useState<boolean>(false)

    const LoadCartas = async () => {
        setLoading(false)
        setCartasPresDocente([])
        const response = await ObtenerDatosCartaAlumnoEspecifico<Listas>(datos.estudianteId, codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ListaCartaEmpresaDocente[]
            setCartasPresDocente(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(true)
    }

    useEffect(() => {
        LoadCartas()
    }, [])

    useEffect(() => {
        setIntentoSeleccionado(primerIntento ?? null)
    }, [primerIntento])

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex text-gray-400 gap-2 text-lg sm:text-2xl">
                <i className={`bi bi-1-square-fill`} />
                <h1 className="font-bold">CARTA DE PRESENTACIÓN</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 sm:gap-16">
                {
                    cartasPresDocente.length !== 0 ?
                        <div className="flex flex-col gap-4">
                            {
                                cartasPresDocente.map((dat, index) => (
                                    <div key={index} className={`flex flex-col bg-white p-4 rounded border gap-4 ${intentSeleccionado?.cartaId === dat.cartaId && 'border-4 border-blue-500'}`}>
                                        <div className='flex justify-between'>
                                            <div className="font-bold text-gray-400">{formatoFecha_Date_fechaSlash(dat.fechaRegistro)}</div>
                                            <EstadoCarta estado={dat.estadoCarta} />
                                        </div>
                                        <button
                                            onClick={() => handleClickBoton(dat)}
                                            className={`p-2 w-full text-white ${intentSeleccionado?.cartaId === dat.cartaId ? 'bg-blue-500' : 'bg-gray-400 hover:bg-gray-300'} rounded`}
                                        >
                                            Ver Empresa
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <div className="text-center sm:col-span-3 p-4 sm:p-8 bg-gray-200 rounded shadow-lg">
                            <p className="text-base sm:text-2xl font-bold text-gray-500">El estudiante aún no ha registrado carta de presentación</p>
                        </div>
                }
                {
                    intentSeleccionado &&
                    <div className='col-span-2 gap-8 mt-8 sm:mt-0 sm:gap-16 grid grid-cols-1 sm:grid-cols-2'>
                        <div className="flex flex-col gap-4">
                            <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                                <h2 className="font-bold text-xl sm:text-2xl">DATOS EMPRESA</h2>
                            </div>
                            <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold ">Nombre</div>
                                    <div className="w-2/3">{intentSeleccionado.empresaNombre}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">RUC</div>
                                    <div className="w-2/3">{intentSeleccionado.empresaRuc}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">Dirección</div>
                                    <div className="w-2/3">{intentSeleccionado.direccion}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">Dep. Prov. Dist.</div>
                                    <div className="w-2/3">{intentSeleccionado.depProvDist}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 ">
                            <div className="border-l-4 border-blue-600 bg-gray-100 p-2 text-center">
                                <h2 className="font-bold text-xl sm:text-2xl">REPRESENTANTE</h2>
                            </div>
                            <div className="flex flex-col gap-4 uppercase text-sm sm:text-lg">
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold ">NOMBRE</div>
                                    <div className="w-2/3">{intentSeleccionado.representante}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">DNI</div>
                                    <div className="w-2/3">{intentSeleccionado.repDni}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">GRADO</div>
                                    <div className="w-2/3">{intentSeleccionado.gradoNombre}</div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-1/3 font-bold">CARGO</div>
                                    <div className="w-2/3">{intentSeleccionado.cargoNombre}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Paso1