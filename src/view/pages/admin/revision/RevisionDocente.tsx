import ContainerVIstas from "@/component/Container";
import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import { useLocation } from 'react-use';
import { LoaderSvg } from '@/component/Svg.component';
import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Listas from '@/model/interfaces/Listas.model.interface';
import { ListarDocentesCarreraAdmin } from "@/network/rest/practicas.network";
import ListaDocente from "@/model/interfaces/docente/listaDocente";
import { useNavigate } from "react-router-dom";

const RevisionDocente = () => {

    const navigate = useNavigate()
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)
    const abortController = useRef(new AbortController())

    const location = useLocation()
    const carrera: string = location.state.usr.carrera

    const [loading, setLoading] = useState<boolean>(false)
    const [listaDocentes, setListaDocentes] = useState<ListaDocente[]>([])

    const onEventDetalle = (idDocente: string, nombreDocente: string) => {
        navigate(`../docente-detalle`, {
            state: {
                idDocente: idDocente,
                nombreDocente: nombreDocente,
                idAsig: carrera
            },
        })
    }

    const LoadDocentes = async () => {
        setLoading(false)
        setListaDocentes([])
        const response = await ListarDocentesCarreraAdmin<Listas>(periodo, carrera, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ListaDocente[]
            setListaDocentes(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(true)
    }

    useEffect(() => {
        LoadDocentes()
    }, [])

    return (
        <ContainerVIstas titulo='REVISIÓN DOCENTE' retornar>
            <div className="flex flex-wrap -mx-3">
                <div className="flex flex-col gap-4 w-full max-w-full px-3 flex-0 overflow-y-auto">
                    <div className="text-upla-100 font-bold text-2xl">
                        {carrera === 'AS' && 'ADMINISTRACIÓN Y SISTEMAS'}
                        {carrera === 'CF' && 'CONTABILIDAD Y FINANZAS'}
                    </div>

                    <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                        <thead className="align-bottom">
                            <tr>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Código</th>
                                <th className="px-2 py-2 font-bold text-left uppercase align-middle text-white text-xs">Docente</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Secciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                !loading ? (
                                    <tr className="text-center bg-white border-b">
                                        <td colSpan={8} className="text-sm p-2 border-b border-solid">
                                            <div className="flex items-center justify-center">
                                                <LoaderSvg /> <span>Cargando datos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    listaDocentes.length == 0 ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={6} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                        </tr>
                                        :
                                        (
                                            listaDocentes.map((item, index) => {

                                                return (
                                                    <tr key={index} className="bg-white border-b hover:bg-blue-50">
                                                        <td className="text-sm p-2 text-center text-gray-400 font-semibold">
                                                            {item.per_Id}
                                                        </td>
                                                        <td className="text-sm p-2 text-left">
                                                            {item.perNombre}
                                                        </td>

                                                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                                                            <button
                                                                title="Ver historial"
                                                                className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                                onClick={() => onEventDetalle(item.per_Id, item.perNombre)}
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

export default RevisionDocente