import { useLocation, useNavigate } from 'react-router-dom';
import ContainerVIstas from "@/component/Container";
import SeccionesDocente from "@/model/interfaces/docente/secciones";
import { useEffect, useRef, useState } from "react";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import Listas from "@/model/interfaces/Listas.model.interface";
import { ListarSeccionAlumnos } from "@/network/rest/practicas.network";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore.store";
import ListaSeccion from "@/model/interfaces/docente/listaSeccion";
import { LoaderSvg } from "@/component/Svg.component";
import { convertirANumerosRomanos } from "@/helper/herramienta.helper";

const Revision = () => {
    const navigate = useNavigate()
    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)
    const periodo = useSelector((state: RootState) => state.infoPersonal.periodoId)

    const abortController = useRef(new AbortController())

    const location = useLocation()
    const seccion: SeccionesDocente = location.state.seccion

    const datos: Record<string, string> = {
        facultad: seccion.fac_Facultad,
        carrera: seccion.car_Carrera,
        sede: seccion.sed_Sede,
        periodo: seccion.mtr_Anio + ' - ' + convertirANumerosRomanos(seccion.mtr_Periodo),
        semestre: convertirANumerosRomanos(seccion.nta_Nivel),
        curso: seccion.asi_Asignatura,
        seccion: seccion.nta_Seccion,

        plan: seccion.pEs_Id,
    }

    const [loading, setLoading] = useState<boolean>(false)

    const onEventDetalle = (
        codigo: string,
        nombres: string
    ) => {
        navigate(`../estudiante-detalle`, {
            state: {
                codigo: codigo,
                nombres: nombres,
                facultad: datos.facultad,
                carrera: datos.carrera,
                sede: datos.sede,
                periodo: datos.periodo,
                semestre: datos.semestre,
                curso: datos.curso,
                seccion: datos.seccion,
                plan: datos.plan,
            },
        })
    }

    const [alumnosSeccion, setAlumnosSeccion] = useState<ListaSeccion[]>([])

    const LoadSecciones = async () => {
        setLoading(false)
        setAlumnosSeccion([])
        const response = await ListarSeccionAlumnos<Listas>(seccion.car_Id, seccion.asi_Id, codigo, seccion.sed_Id, periodo, abortController.current)

        if (response instanceof Response) {
            const data = response.data.resultado as ListaSeccion[]
            setAlumnosSeccion(data)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
        setLoading(true)
    }

    useEffect(() => {
        LoadSecciones()
    }, [])

    const [showDetalles, setShowDetalles] = useState<boolean>(false)

    return (
        <ContainerVIstas titulo='REVISIÓN DOCENTE' retornar>

            <div onClick={() => setShowDetalles(!showDetalles)} className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                <div className="flex justify-between border-b-2 border-gray-200 py-2 px-4 text-blue-500 text-lg sm:text-2xl">
                    <div className=" font-bold ">
                        {datos.curso} - {datos.seccion}
                    </div>
                    <i className={`bi bi-caret-down-fill transform my-auto ${showDetalles ? 'rotate-180' : ''}`} />
                </div>
                <div className={`${!showDetalles ? 'hidden' : 'flex'} p-4`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-lg sm:text-lg w-full">
                        <p className="font-bold text-gray-500">Facultad: <span className="ml-2 font-normal text-blue-500">{datos.facultad}</span></p>
                        <p className="font-bold text-gray-500">Carrera: <span className="ml-2 font-normal text-blue-500">{datos.carrera}</span></p>
                        <p className="font-bold text-gray-500">Sede: <span className="ml-2 font-normal text-blue-500">{datos.sede}</span></p>
                        <p className="font-bold text-gray-500">Periodo: <span className="ml-2 font-normal text-blue-500">{datos.periodo}</span></p>
                        <p className="font-bold text-gray-500">Semestre: <span className="ml-2 font-normal text-blue-500">{datos.semestre}</span></p>
                        <p className="font-bold text-gray-500">Plan: <span className="ml-2 font-normal text-blue-500">{datos.plan}</span></p>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-4">
                <div className="w-full max-w-full px-3 flex-0">

                    <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
                        <thead className="align-bottom">
                            <tr>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Código</th>
                                <th className="px-6 py-2 font-bold text-left uppercase align-middle text-white text-xs">Estudiante</th>
                                <th className="px-6 py-2 font-bold text-left uppercase align-middle text-white text-xs">Empresa</th>
                                <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !loading ? (
                                    <tr className="text-center bg-white border-b">
                                        <td colSpan={5} className="text-sm p-2 border-b border-solid">
                                            <div className="flex items-center justify-center gap-4">
                                                <LoaderSvg /> <span>Cargando datos...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    alumnosSeccion.length == 0 ?
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={5} className="text-sm p-2  border-b border-solid">No hay datos para mostrar.</td>
                                        </tr>
                                        :
                                        (alumnosSeccion.map((item, index) => {
                                            return (
                                                <tr key={index} className="bg-white border-b">
                                                    <td className="text-sm p-2 text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-sm p-2 text-center font-medium text-gray-500">
                                                        {item.est_Id}
                                                    </td>
                                                    <td className="text-sm px-6 p-2 text-left">
                                                        {item.apellidoPaterno + " " + item.apellidoMaterno + " " + item.nombres}
                                                    </td>
                                                    <td className="text-sm px-6 p-2 text-left">
                                                        {item.empresaNombre ?
                                                            <span className="flex">
                                                                <i className="mr-2 text-lg text-green-400 bi bi-check-circle-fill" />
                                                                <p className="my-auto">{item.empresaNombre}</p>
                                                            </span>
                                                            :
                                                            <span className="text-xs bg-gray-200 p-1 px-2 rounded-md"> -- No registrado --</span>
                                                        }
                                                    </td>
                                                    <td className="text-sm p-2 text-center">
                                                        <button
                                                            title="Ver historial"
                                                            className="focus:outline-none text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-md text-sm px-4 py-2"
                                                            onClick={() =>
                                                                onEventDetalle(item.est_Id,
                                                                    item.nombres + " " + item.apellidoPaterno + " " + item.apellidoMaterno)
                                                            }
                                                        >
                                                            <i className="bi bi-list-ul text-sm"></i>
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

export default Revision