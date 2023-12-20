import CustomModal from "@/component/Modal.component";
import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model.enum";
import Listas from "@/model/interfaces/Listas.model.interface";
import HorarioDisponible from "@/model/interfaces/horario/horarioDisponible";
import CiclosInfo from "@/model/interfaces/matricula/ciclosInfo";
import { ListarHorarioDisponibleEst } from "@/network/rest/idiomas.network";
import { RootState } from "@/store/configureStore.store";
import { useState } from "react";
import { useSelector } from "react-redux";
import useSweerAlert from "../../../../component/hooks/useSweetAlert"

type Props = {

    show: boolean;
    cicloMatriculable: CiclosInfo[]
    asigId: string
    hide: () => void;

};

const ListasHorario = (props: Props) => {

    // console.log(props.asigId)
    const sweet = useSweerAlert();

    const [expandirTD, setExpandirTD] = useState<number | null>(null);

    const handleExpandirTD = (horarioId: number) => {
        setExpandirTD((prev) => (prev === horarioId ? null : horarioId));
    };

    const [listarHorarioDisponible, setListarHorarioDisponible] = useState<any[]>([]);

    const codigo = useSelector((state: RootState) => state.autenticacion.codigo)


    const loadInit = async () => {

        setListarHorarioDisponible([])

        const response = await ListarHorarioDisponibleEst<Listas>(codigo, props.asigId)

        if (response instanceof Response) {
            setListarHorarioDisponible(response.data.resultado)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    const listaHorarios: Omit<HorarioDisponible, 'dia'>[] = [];
    const horarioIdsSet = new Set<number>();

    listarHorarioDisponible.forEach((elemento) => {
        const { horarioId, dia, ...restoElemento } = elemento;

        if (!horarioIdsSet.has(horarioId)) {
            horarioIdsSet.add(horarioId);
            listaHorarios.push({ horarioId, ...restoElemento });
        }
    });

    const FiltrarPorId = (listaElementos: HorarioDisponible[], horarioId: number | null): HorarioDisponible[] => {
        return listaElementos.filter(elemento => elemento.horarioId === horarioId);
    };

    const listaHorariosFiltrada = FiltrarPorId(listarHorarioDisponible, expandirTD);

    const diasNombres: { [key: string]: string } = {
        '1': 'Lunes',
        '2': 'Martes',
        '3': 'Miércoles',
        '4': 'Jueves',
        '5': 'Viernes',
        '6': 'Sábado',
        '7': 'Domingo',
    };

    const matriculaHorarioElegido = (idiomaId:number, modalidadId:number,sedeId:string, asiId: string, horarioId: number, tipoEstudioId: number, periodoId: string, seccionId: number) => {

        const paramsMatricula = {
            "periodoId": periodoId,
            "estudianteId": codigo,
            "idiomaId": idiomaId,
            "modalidadId":modalidadId,
            "sedeId":sedeId,
            "matriculaRegistro": new Date().toISOString(),
            "usuarioRegistro": codigo,
            "matriculaEstado": 1,
            "estadoOperacion": 1,
            "opeMat": localStorage.getItem("codMat"),
            "matRangoId": 1,
        }

        const paramsPension = {
            "matriculaId": 4,
            "asiId": asiId,
            "horarioId": horarioId,
            "convalidacion": 0,
            "promedio": 0,
            "asistencia": 0,
            "estado": 1,
            "fechRegistro": new Date().toISOString(),
            "observacion": '',
            "estadoOperacion": 1,
            "opePen": localStorage.getItem("codPen"),
            "condicion": 'N',
            "tipoEstudioId": tipoEstudioId,
            "periodoId": periodoId,
            "seccionId": seccionId,
        }

        sweet.openDialog("Mensaje", "¿Esta seguro de continuar", async (value) => {
            if (value) {

                console.log(paramsMatricula)
                console.log(paramsPension)
                /*

                sweet.openInformation("Mensaje", "Procesando información...")

                const response = await InsertarActualizarHorario<RespValue>("CREAR", params, props.abortControl);

                if (response instanceof Response) {

                    if (response.data.value == "procesado") {
                        sweet.openSuccess("Mensaje", response.data.value as string, () => { props.handleCloseModal() });
                    }

                }


                if (response instanceof RestError) {

                    if (response.getType() === Types.CANCELED) return;

                    if (response.getStatus() == 401) {
                        // dispatch(logout());
                        return;
                    }

                    if (response.getStatus() == 403) {
                        return;
                    }

                    sweet.openWarning("Mensaje", response.getMessage(), () => { props.handleCloseModal() });
                }
            */}
        })

    }


    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {
                loadInit()
            }}
            onHidden={() => {

            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">
                    <h6 className="py-1 font-bold text-lg"> Lista de Horarios</h6>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                {/* <div className="w-full px-4 pb-2 pt-4">
                </div> */}

                <div className="relative overflow-auto rounded-md my-6">
                    <table className="w-full text-gray-700 uppercase border table-auto">
                        <thead className="bg-upla-100 text-white">
                            <tr>
                                <th className="py-2 px-6">NIVEL</th>
                                <th className="py-2 px-6">Tipo</th>
                                <th className="py-2 px-6">Modalidad</th>
                                <th className="py-2 px-6">Horarios</th>
                                <th className="py-2 px-6">Aula</th>
                                <th className="py-2 px-6">Sección</th>
                                <th className="py-2 px-6">Cant / Cap</th>
                                <th className="py-2 px-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaHorarios.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={8} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                        </tr>


                                    ) : (
                                        listaHorarios.map((horario) => (
                                            <tr key={horario.horarioId} className="text-center text-sm">
                                                <td className="border p-2">{horario.asignatura}</td>
                                                <td className="border p-2">{horario.tipoEstudio}</td>
                                                <td className="border p-2">{horario.modalidad}</td>
                                                <td className={`border p-2 flex-col flex gap-2 ${expandirTD === horario.horarioId ? 'expandido' : ''}`}>
                                                    <button className="bg-gray-200 px-2 p-1 rounded-lg" onClick={() => handleExpandirTD(horario.horarioId)}>
                                                        <i className={`bi ${expandirTD === horario.horarioId ? 'bi-dash' : 'bi-plus'}`} />
                                                        {expandirTD === horario.horarioId ? ' Ocultar' : ' Mostrar'}
                                                    </button>
                                                    {
                                                        expandirTD === horario.horarioId && (
                                                            <div className="flex flex-col gap-2">
                                                                <div className="text-xs flex flex-col gap-1">
                                                                    {
                                                                        listaHorariosFiltrada.map((detalle) => (
                                                                            <p key={detalle.detHorarioId}>
                                                                                {diasNombres[detalle.dia] || 'Día no válido'}
                                                                            </p>
                                                                        ))
                                                                    }
                                                                </div>
                                                                <div className="text-sm bg-green-200 py-1 font-semibold">
                                                                    {horario.horaIni.slice(0, -3) + " - " + horario.horaFin.slice(0, -3)}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </td>

                                                <td className="border p-2">{horario.aula}</td>
                                                <td className="border p-2">{horario.nombreSeccion}</td>
                                                <td className="border p-2">{horario.cantidad + '/' + horario.capacidad}</td>
                                                <td className="border p-2">
                                                    <button className="bg-gray-400 hover:bg-blue-500 p-1 px-2 text-white rounded-lg"
                                                        onClick={() => matriculaHorarioElegido(horario.idiomaId,horario.modalidadId,horario.sedeId,horario.asiId, horario.horarioId, horario.tipEstudioId, horario.periodoId, horario.seccionId)}>
                                                        Matricular
                                                    </button>
                                                </td>
                                            </tr>
                                        ))

                                    )


                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </CustomModal>
    )
}

export default ListasHorario;