import { useNavigate } from 'react-router-dom';
import ContainerVIstas from "@/component/Container";
import { useEffect, useRef, useState } from "react";
import SeccionesDocente from "@/model/interfaces/docente/secciones";
import Listas from "@/model/interfaces/Listas.model.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { ListarSeccionDocente } from '@/network/rest/practicas.network';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Response from '@/model/class/response.model.class';
import { LoaderSvg } from '@/component/Svg.component';
import { convertirANumerosRomanos } from '@/helper/herramienta.helper';

const Secciones = () => {
    const navigate = useNavigate()
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const abortController = useRef(new AbortController())

    const onEventDetalle = (seccion: SeccionesDocente) => {
        navigate(`./docente`, {
            state: {
                seccion: seccion,
            },
        })
    }

    const [loading, setLoading] = useState<boolean>(true)
    const [secciones, setSecciones] = useState<SeccionesDocente[]>([])

    const LoadSecciones = async () => {
        setLoading(true)
        setSecciones([])
        const response = await ListarSeccionDocente<Listas>(codigo, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as SeccionesDocente[]
            setSecciones(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(false)
    }

    useEffect(() => {
        LoadSecciones()
    }, [])

    return (
        <ContainerVIstas titulo='SECCIONES' retornar>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0 overflow-y-auto">
                    <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                        <thead className="align-bottom">
                            <tr>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Facultad</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Carrera</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sede</th>

                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Periodo</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Semestre</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Asignatura</th>

                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Sección</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Lista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                loading ? (
                                    <tr className="text-center bg-white border-b">
                                        <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                            <div className="flex items-center justify-center">
                                                <LoaderSvg /> <span className='ml-2'>Cargando datos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    secciones.length == 0 ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={8} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                        </tr>
                                        :
                                        (
                                            secciones.map((item, index) => {

                                                return (
                                                    <tr key={index} className="bg-white border-b">
                                                        <td className="text-sm p-2 text-center">
                                                            {item.fac_Facultad}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.car_Carrera}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.sed_Sede}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.mtr_Anio + ' - ' + convertirANumerosRomanos(item.mtr_Periodo)}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {convertirANumerosRomanos(item.nta_Nivel)}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.asi_Asignatura}
                                                        </td>
                                                        <td className="text-sm p-2 text-center">
                                                            {item.nta_Seccion}
                                                        </td>
                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                            <button
                                                                title="Ver historial"
                                                                className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                                onClick={() => onEventDetalle(item)}
                                                            >
                                                                <i className="bi bi-list-ul text-sm" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        )
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </ContainerVIstas>
    )
}

export default Secciones