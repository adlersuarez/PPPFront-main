import { useEffect, useRef, useState } from 'react'
import EstadoCarta from './estados/EstadoCarta'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/configureStore.store'
import { ObtenerDatosCartaAlumnoEspecifico } from '@/network/rest/practicas.network'
import Listas from '@/model/interfaces/Listas.model.interface'
import ListaCartaEmpresaDocente from '@/model/interfaces/docente/listaCarta'
import Response from '@/model/class/response.model.class'
import RestError from '@/model/class/resterror.model.class'
import { Types } from '@/model/enum/types.model'
import { formatoFecha_Date_completo, formatoFecha_Date_fechaSlash } from '@/helper/herramienta.helper'
import MensajePasoNoCargado from './componente/MensajePasoNoCargado'

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

    const LoadCartas = async () => {

        setCartasPresDocente([])
        const response = await ObtenerDatosCartaAlumnoEspecifico<Listas>(datos.estudianteId, codigo, periodo, abortController.current)

        console.log(response)

        if (response instanceof Response) {
            const data = response.data.resultado as ListaCartaEmpresaDocente[]
            setCartasPresDocente(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
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
                <i className={`bi bi-1-square-fill mr-2`} />
                <h1 className="font-bold">CARTA DE PRESENTACIÓN</h1>
            </div>
            <div className='flex flex-col'>
                {
                    cartasPresDocente.length !== 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 sm:gap-x-12 p-3 sm:p-6 bg-gray-100 rounded-md w-full">
                            <div className="flex flex-col gap-4">
                                {
                                    cartasPresDocente.map((dat, index) => (
                                        <div key={index} className={`flex flex-col w-full bg-white p-4 rounded border gap-4 ${intentSeleccionado?.cartaId === dat.cartaId && 'border-[3px] border-upla-100'}`}>
                                            <div className='flex justify-between'>
                                                <div title={"Fecha registro:  " + formatoFecha_Date_completo(dat.fechaRegistro)}
                                                    className="cursor-default font-semibold text-gray-500">{formatoFecha_Date_fechaSlash(dat.fechaRegistro)}</div>
                                                <EstadoCarta estado={dat.estadoCarta} />
                                            </div>
                                            <button
                                                onClick={() => handleClickBoton(dat)}
                                                className={`p-2 w-full text-sm text-white ${intentSeleccionado?.cartaId === dat.cartaId ? 'bg-upla-100 font-semibold' : 'bg-gray-400 hover:bg-gray-300 hover:scale-105 font-medium'} rounded`}
                                            >
                                                Ver datos de empresa
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>

                            {
                                intentSeleccionado &&
                                <div className='col-span-2 gap-8 sm:gap-10 grid grid-cols-1 sm:grid-cols-2'>
                                    <div className="flex flex-col border-[3px] border-gray-400 bg-white">
                                        <div className="bg-gray-400 text-white p-2 text-center">
                                            <h2 className="font-bold text-lg sm:text-xl">DATOS EMPRESA</h2>
                                        </div>
                                        <div className="flex flex-col gap-4 p-4 text-sm">
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-semibold uppercase">Nombre</div>
                                                <div className="w-2/3">{intentSeleccionado.empresaNombre}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-semibold uppercase">RUC</div>
                                                <div className="w-2/3">{intentSeleccionado.empresaRuc}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-semibold uppercase">Dirección</div>
                                                <div className="w-2/3">{intentSeleccionado.direccion}</div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-semibold uppercase">Dep. Prov. Dist.</div>
                                                <div className="w-2/3">{intentSeleccionado.depProvDist}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col border-[3px] border-gray-400 bg-white">
                                        <div className="bg-gray-400 text-white p-2 text-center">
                                            <h2 className="font-bold text-lg sm:text-xl">REPRESENTANTE</h2>
                                        </div>
                                        <div className="flex flex-col gap-4 p-4 text-sm">
                                            <div className="flex gap-2">
                                                <div className="w-1/3 font-semibold uppercase">NOMBRE</div>
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
                        :
                        <MensajePasoNoCargado step={1} />
                }
            </div>
        </div>
    )
}

export default Paso1