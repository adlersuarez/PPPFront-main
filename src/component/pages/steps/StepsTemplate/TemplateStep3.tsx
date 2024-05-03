import { useEffect, useRef, useState } from 'react';
import ContenedorSteps from './Contenedor/ContenedorSteps';
import ListaElementos from './Contenedor/ListaElementos';
import EstadoTemplate from './Contenedor/EstadoTemplate';
import ModalDatosDuracion from '../../modalForms/ModalTemplate3/ModalDatosDuracion';
import ModalEmpresaPracticas from '../../modalForms/ModalTemplate3/ModalEmpresaPracticas';
import { EstadoRequisito } from './Contenedor/EstadoRequisito';
import { EstadoAreaTrabajo, EstadoDuracionPracticas } from '@/network/rest/practicas.network';
import EstadoValor from '@/model/interfaces/estado/EstadoValor';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore.store';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Response from '@/model/class/response.model.class';
import MostrarDuracionHorario from '../../modalForms/ModalTemplate3/MostrarDuracionHorario';
import MostrarAreaPracticas from '../../modalForms/ModalTemplate3/MostrarAreaPracticas';

const TemplateStep3 = () => {

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoEstudiante.periodoId)
    const abortController = useRef(new AbortController())

    /// Formularios
    const [showArea, setShowArea] = useState<boolean>(false)
    const [showHorario, setShowHorario] = useState<boolean>(false)

    const handleCloseArea = () => setShowArea(false)
    const handleShowArea = () => setShowArea(true)

    const handleCloseHorario = () => setShowHorario(false)
    const handleShowHorario = () => setShowHorario(true)
    // Mostrar Datos
    const [showAreaDatos, setShowAreaDatos] = useState<boolean>(false)
    const [showHorarioDatos, setShowHorarioDatos] = useState<boolean>(false)

    const handleCloseAreaDatos = () => setShowAreaDatos(false)
    const handleShowAreaDatos = () => setShowAreaDatos(true)

    const handleCloseHorarioDatos = () => setShowHorarioDatos(false)
    const handleShowHorarioDatos = () => setShowHorarioDatos(true)


    const Requisitos = [
        {
            descripcion: 'Fecha de inicio y finalización de practicas',
            estado: 1,
        },
        {
            descripcion: 'Datos del centro laboral',
            estado: 2,
        },
        {
            descripcion: 'Datos del área de trabajo',
            estado: 3,
        },
        {
            descripcion: 'Datos del jefe inmediato',
        },
    ]

    const Procedimientos = [
        {
            descripcion: 'Rellenar ficha'
        },
    ]

    const [estadoAreaTrabajo, setEstadoAreaTrabajo] = useState<number | null>(null)

    const LoadEstadoAreaTrabajo = async () => {
        // setGrado([])
        const response = await EstadoAreaTrabajo<EstadoValor>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoValor
            setEstadoAreaTrabajo(Number(data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const [estadoDuracion, setEstadoDuracion] = useState<number | null>(null)

    const LoadEstadoDuracion = async () => {
        // setGrado([])
        const response = await EstadoDuracionPracticas<EstadoValor>(codigo, periodo, abortController.current)
        if (response instanceof Response) {
            const data = response.data as EstadoValor
            setEstadoDuracion(Number(data.value))
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const Init = () => {
        LoadEstadoAreaTrabajo()
        LoadEstadoDuracion()
    }

    useEffect(() => {
        Init()
    }, [])

    return (
        <div className="mt-4 rounded shadow-lg border p-4 w-full">

            <ModalEmpresaPracticas show={showArea} hide={handleCloseArea} init={Init} />
            <ModalDatosDuracion show={showHorario} hide={handleCloseHorario} init={Init} />

            <MostrarDuracionHorario show={showHorarioDatos} hide={handleCloseHorarioDatos} />
            <MostrarAreaPracticas show={showAreaDatos} hide={handleCloseAreaDatos} />

            <ContenedorSteps
                numero={3}
                titulo='FICHA DE JEFE INMEDIATO'
            >
                <ContenedorSteps.Informacion>
                    <div className='flex flex-col justify-between'>
                        <ListaElementos
                            titulo='Requisitos'
                            elementos={Requisitos}
                        />
                        <hr className="my-2" />
                        <ListaElementos
                            titulo='Procedimiento'
                            elementos={Procedimientos}
                        />
                    </div>
                </ContenedorSteps.Informacion>
                <ContenedorSteps.Proceso>
                    <div className='flex flex-col'>

                        <EstadoTemplate
                            paso={3}
                        />

                        <hr className="my-2" />

                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Requisito</th>
                                        <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={estadoAreaTrabajo === 0 ? 1 : 2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Datos del área de trabajo
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                {
                                                    estadoAreaTrabajo === 0 &&
                                                    <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowArea}>Iniciar</button>
                                                }
                                                {
                                                    estadoAreaTrabajo === 1 &&
                                                    <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowAreaDatos}>Ver</button>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className='bg-white border-b'>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <EstadoRequisito valor={estadoDuracion === 0 ? 1 : 2} />
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            Duración y Horario
                                        </td>
                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                            <div className='flex gap-2 justify-center'>
                                                {
                                                    estadoDuracion === 0 &&
                                                    <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowHorario}>Iniciar</button>
                                                }
                                                {
                                                    estadoDuracion === 1 &&
                                                    <button className="bg-gray-400 hover:bg-blue-600 text-white px-4 py-1 rounded" onClick={handleShowHorarioDatos}>Ver</button>
                                                }

                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        {/*<hr className="my-2" />

                        <div className="flex flex-col p-2 gap-2">
                            <div className='bg-green-200 rounded-lg text-center'>
                                <span className="px-4 text-green-600 font-semibold">Datos completos, puede continuar con el procedimiento</span>
                            </div>
                            <div className='bg-red-200 rounded-lg text-center'>
                                <span className="px-4 text-red-600 font-semibold">Datos incompletos, por favor rellene todos los formularios</span>
                            </div>

                        </div>*/}

                    </div>
                </ContenedorSteps.Proceso>
            </ContenedorSteps>

        </div>
    );
};

export default TemplateStep3;