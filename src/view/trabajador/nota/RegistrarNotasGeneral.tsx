import { useRef, useEffect, useState } from "react";
import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import { ListarPreRegistroNotas } from "@/network/rest/idiomas.network";

import RegistroEstudiante from "./component/RegistroEstudiante";


type Props = {
    handleCloseModuloDetalle: () => void;
    item: any
    idHorarioAsignatura: number
};

const RegistrarNotasGeneral = (props: Props) => {

    const abortController = useRef(new AbortController());

    //const sweet = useSweerAlert();
    const [matriculadoSalon, setMatriculadoSalon] = useState<any[]>([])


    useEffect(() => {

        EstudiantesMatriculados()
    }, [])


    const EstudiantesMatriculados = async () => {
        setMatriculadoSalon([])


        const response = await ListarPreRegistroNotas<Listas>(props.item.horarioAsigId, abortController.current)
        if (response instanceof Response) {
            //console.log(response.data.resultado)

            setMatriculadoSalon(response.data.resultado as any[])
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    return (
        <>
            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Regristro de Notas</h2>

                <div className="w-full">

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2 mt-3">
                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                            <div className="m-2">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <div className="text-sm">
                                        <p>Periodo: <span className="text-blue-700 font-bold">{props.item.anio} - {props.item.mes}</span></p>
                                        <p>Modalidad: <span className="text-blue-700 font-bold ">{props.item.modalidad}</span></p>
                                        <p>Tipo Estudio: <span className="text-blue-700 font-bold ">{props.item.tipoEstudio}</span></p>
                                        <p>Turno: <span className="text-blue-700 font-bold">{props.item.turno}</span></p>
                                        <p>Capacidad: <span className="text-blue-700 font-bold">{props.item.capacidad}</span></p>
                                    </div>
                                    <div className="text-sm">
                                        <p>Aula: <span className="text-blue-700 font-bold">{props.item.aula}</span></p>
                                        <p>Sección: <span className="text-blue-700 font-bold">{props.item.seccion}</span></p>
                                        <p>Asignatura: <span className="text-blue-700 font-bold">{props.item.asignatura}</span></p>
                                        <p>Instructor: <span className="text-blue-700 font-bold">{props.item.docenteDni ? '' : props.item.docenteDni} / {props.item.docente ? '' : props.item.docente}</span></p>
                                        <p>Cantidad: <span className="text-blue-700 font-bold">{props.item.cantidad}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-auto rounded-md my-3 overflow-y-auto">
                        <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                            <thead className="bg-upla-100 text-white">
                                <tr>
                                    <th className="py-1 px-6">#</th>
                                    <th className="py-1 px-6">Codigo</th>
                                    <th className="py-1 px-6">Estudiante</th>
                                    <th className="py-1 px-6">N. Reading</th>
                                    <th className="py-1 px-6">N. Writing</th>
                                    <th className="py-1 px-6">N. Speaking</th>
                                    <th className="py-1 px-6">N. O-line practice</th>
                                    <th className="py-1 px-6">N. ME</th>
                                    <th className="py-1 px-6">N. FE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {



                                    matriculadoSalon.length == 0 ?
                                        (
                                            <tr className="text-center bg-white border-b">
                                                <td colSpan={9} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                            </tr>
                                        ) : (
                                            matriculadoSalon.map((obj, index) => (
                                                <RegistroEstudiante key={index} index={index} item={obj} />
                                            ))
                                        )

                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    )

}

export default RegistrarNotasGeneral