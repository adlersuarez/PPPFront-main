import React, { ChangeEvent, Suspense, useRef, useState } from "react";
import ContainerVIstas from "@/component/Container";
import { ListarSeccionDocente } from "@/network/rest/practicas.network";
import Listas from "@/model/interfaces/Listas.model.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import SeccionesDocente from "@/model/interfaces/docente/secciones";
import toast from "react-hot-toast";

const SelectSeccion = React.lazy(() => import('../componentes/SelectSeccion'))
const EspecificoEstudiante = React.lazy(() => import('./componentes/EspecificoEstudiante'))
const EspecificoDocente = React.lazy(() => import('./componentes/EspecificoDocente'))


const ReporteEspecifico: React.FC = () => {

    const abortController = useRef(new AbortController())
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const [codigoBusqueda, setCodigoBusqueda] = useState<string>("")

    const [tipoUsuario, setTipoUsuario] = useState<string>('Docente')
    const [placeHolderUser, setPlaceHolderUser] = useState<string>('Ingrese DNI del docente')

    const changeDocente = () => {
        if (tipoUsuario === 'Docente') return
        setBuscar(false)
        setCodigoBusqueda("")
        setPlaceHolderUser('Ingrese DNI del docente')
        setTipoUsuario('Docente')
        setSecciones([])
    }

    const changeEstudiante = () => {
        if (tipoUsuario === 'Estudiante') return
        setBuscar(false)
        setCodigoBusqueda("")
        setPlaceHolderUser('Ingrese código estudiante')
        setTipoUsuario('Estudiante')
        setSecciones([])
    }

    const onChangeCodigo = (event: ChangeEvent<HTMLInputElement>) => {
        setBuscar(false)
        setCodigoBusqueda(event.target.value);
    }

    const [secciones, setSecciones] = useState<SeccionesDocente[]>([])
    const [buscar, setBuscar] = useState<boolean>(false)

    const LoadBuscar = async () => {
        setBuscar(false)
        if (codigoBusqueda.trim() === '') {
            toast.error('Necesita escribir un código')
            return
        }

        if (codigoBusqueda.trim().length !== 8 && tipoUsuario === 'Docente') {
            toast.error('El DNI del docente debe contener exactamente ocho (8) números.')
            return
        }

        if (codigoBusqueda.trim().length !== 7 && tipoUsuario === 'Estudiante') {
            toast.error('El código del estudiante debe contener exactamente siete (7) caracteres.')
            return
        }

        if (tipoUsuario === 'Docente') {
            LoadSeccionesDocente()
        }
        setBuscar(true)
    }

    const LoadSeccionesDocente = async () => {

        setBuscar(false)
        setSecciones([])
        const response = await ListarSeccionDocente<Listas>(codigoBusqueda, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data.resultado as SeccionesDocente[]
            setSecciones(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setBuscar(true)
    }


    ////
    const [carId, setCarId] = useState<string>("")
    const [asiId, setAsiId] = useState<string>("")
    const [sedeId, setSedeId] = useState<string>("")
    const [seccion, setSeccion] = useState<string>("")


    const handleListClick = (carId: string, asiId: string, sedeId: string, seccion: string) => {
        setCarId(carId)
        setAsiId(asiId)
        setSedeId(sedeId)
        setSeccion(seccion)
        setBuscar(true)
    }

    return (
        <ContainerVIstas titulo='REPORTE ESPECÍFICO' retornar>
            <div className="flex flex-col p-2 gap-4">
                <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-8 ">
                    <div className="flex justify-center">
                        <button onClick={changeDocente}
                            className={`flex ${tipoUsuario === 'Docente' ? 'bg-upla-100 text-white font-semibold' : 'text-upla-100 font-medium'} border border-upla-100 px-4 py-1 w-36 shrink-0 gap-3`}>
                            <div className="w-3 h-3 bg-white rounded-full my-auto animate-pulse" />
                            <span className="my-auto">Docente</span>
                        </button>
                        <button onClick={changeEstudiante}
                            className={`flex ${tipoUsuario === 'Estudiante' ? 'bg-upla-100 text-white font-semibold' : 'text-upla-100 font-medium'} border border-upla-100 px-4 py-1 w-36 shrink-0 gap-3`}>
                            <div className="w-3 h-3 bg-white rounded-full my-auto animate-pulse" />
                            <span className="my-auto">Estudiante</span>
                        </button>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-x-8 gap-y-4 w-full">
                        <div className='flex flex-col gap-1 shrink-0'>
                            <div className='grid grid-cols-3 gap-2'>
                                <input
                                    type="text"
                                    id="codigoUsuario"
                                    name="codigoUsuario"
                                    className='col-span-2 w-full border rounded-md px-4 border-gray-400 focus-visible:ring-blue-200 transition-colors duration-300 ease-in-out focus:ring-0 text-sm'
                                    placeholder={placeHolderUser}
                                    value={codigoBusqueda}
                                    maxLength={11}
                                    onChange={onChangeCodigo}

                                />
                                <button className='w-full flex gap-2 bg-gray-400 hover:bg-upla-100 hover:scale-105 text-white py-2 px-4 rounded'
                                    onClick={LoadBuscar}>
                                    <div className='animate-none'><i className="bi bi-search" /></div>
                                    Buscar
                                </button>
                            </div>

                        </div>
                        {
                            tipoUsuario === 'Docente' &&
                            <Suspense fallback={<div>Cargando...</div>}>
                                <SelectSeccion
                                    handleListClick={handleListClick}
                                    listaResultado={secciones}
                                    buscar={buscar}
                                />
                            </Suspense>

                        }

                    </div>
                </div>
                {
                    tipoUsuario === 'Estudiante' &&
                    <Suspense fallback={<div>Cargando...</div>}>
                        <EspecificoEstudiante
                            codEstudiante={codigoBusqueda}

                            buscar={buscar}
                        />
                    </Suspense>


                }


                {
                    tipoUsuario === 'Docente' &&
                    <Suspense fallback={<div>Cargando...</div>}>
                        <EspecificoDocente
                            codDocente={codigoBusqueda}
                            carId={carId}
                            asiId={asiId}
                            sedeId={sedeId}
                            periodo={periodo}
                            seccion={seccion}

                            secciones={secciones}
                            buscar={buscar}
                        />
                    </Suspense>

                }

            </div>
        </ContainerVIstas>
    )
}

export default ReporteEspecifico;