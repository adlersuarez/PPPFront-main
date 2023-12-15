import Horario from "./component/Horario";
import { useEffect, useState } from "react";
import ModalHorarioDetAgregar from "./modal/HorarioDetAgregar";

import Sweet from '../../../model/interfaces/Sweet.mode.interface'

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarHorarioDetalleId } from "../../../network/rest/idiomas.network";

import ListHorarioDetId from "../../../model/interfaces/horario/listHorarioDetId";
import HorarioPag from "@/model/interfaces/horario/horarioPag";

type Props = {
    idHorario: number
    idIdioma: number,
    idTipoEstudio: number,

    itemHorario: HorarioPag | undefined
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioDetalle = (props: Props) => {

    const [listaHorarioDetalleId, setListaHorarioDetalleId] = useState<ListHorarioDetId[]>([])

    const [dataHorario, setDataHorario] = useState<object[]>([]);
    const [color, setColor] = useState<object[]>([]);

    const [isOpenModal, setIsOpenModal] = useState(false);


    const { itemHorario } = props

    useEffect(() => {
        loadInit(props.idHorario)
    }, [])


    const handleOpenModalHorarioAgregra = () => {
        setIsOpenModal(true)
    }

    const handleCloseModalHorarioAgregra = () => {
        setIsOpenModal(false)
    }

    const loadInit = async (horarioId: number) => {

        setListaHorarioDetalleId([])

        const response = await ListarHorarioDetalleId<Listas>(horarioId, props.abortControl)
        if (response instanceof Response) {
            setListaHorarioDetalleId(response.data.resultado as ListHorarioDetId[])
            //console.log(response)
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }

    }

    useEffect(() => {
        dataRenderHorario()
    }, [listaHorarioDetalleId])

    //console.log(listaHorarioDetalleId)

    const dataRenderHorario = async () => {

        if (listaHorarioDetalleId.length > 0) {

            setDataHorario(
                listaHorarioDetalleId.map((item) => {

                    const currentDate = new Date();

                    const startDate = new Date(currentDate);
                    const endDate = new Date(currentDate);

                    const [startHour, startMin] = item.horaIni.split(":");
                    const [endHour, endMin] = item.horaFin.split(":");

                    startDate.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
                    endDate.setHours(parseInt(endHour), parseInt(endMin), 0, 0);

                    return {
                        detHorarioId: item.detHorarioId,
                        horarioId: item.horarioId,
                        turnoId: item.turnoId,
                        turno: item.turno,
                        programaId: item.programaId,
                        programa: item.programa,
                        periodoId: item.periodoId,
                        anio: item.anio,
                        mes: item.mes,
                        tipEstudioId: item.tipEstudioId,
                        tipoEstudio: item.tipoEstudio,
                        seccionId: item.seccionId,
                        seccion: item.nombreSeccion,
                        asignaturaId: item.asiId,
                        asignatura: item.asignatura,


                        nivel: item.nivel,
                        capacidad: item.capacidad,
                        dia: item.dia,

                        horaIni: item.horaIni,
                        horaFin: item.horaFin,

                        horaAcademica: item.horaAcademica,
                        color: item.color,
                        observacion: item.observacion,

                        docenteId: item.docenteId,
                        docente: item.docente,

                        estado: item.estado,

                        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),


                        recurrenceRule: 'FREQ=WEEKLY',

                        //modHora: item.fechaModifica,
                        // disponible: item.disponible,
                        // modalidad: item.modalidad,
                        // ocupado: item.ocupado,
                        // codCursal: item.codCursal,
                        visible: item.estado,

                        roomId: item.color

                    };

                })

            );

            setColor(
                listaHorarioDetalleId.map((item) => {
                    return {
                        id: item.detHorarioId,
                        color: item.color,
                        // text: ""
                    }
                })

            )
        }

    }

    //console.log(itemHorario)
    //console.log(dataHorario)
    //console.log(color)

    return (
        <>
            <ModalHorarioDetAgregar
                isOpenModal={isOpenModal}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                idTipoEstudio={props.idTipoEstudio}

                turnoInicio={itemHorario?.turnoInicio}
                turnoFin={itemHorario?.turnoFin}

                sweet={props.sweet}
                abortControl={props.abortControl}
                loadInit={() => loadInit(props.idHorario)}
                handleCloseModalHorarioAgregra={handleCloseModalHorarioAgregra} />


            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Configuración de Horario</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={handleOpenModalHorarioAgregra}
                            >
                                <i className="bi bi-plus-circle mr-1"></i> AGREGAR ASIGNATURA
                            </button>

                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={() => loadInit(props.idHorario)}
                            >
                                <i className="bi bi-arrow-clockwise mr-1"></i> Recargar
                            </button>

                        </div>
                        <div className="text-center ">
                            <span className="text-lg font-semibold text-gray-500">{itemHorario?.idiomaNombre} - {itemHorario?.sede} - {itemHorario?.modalidad} - ({itemHorario?.anio} - {itemHorario?.mes}) - {itemHorario?.aulaNombre} - {itemHorario?.modalidad} - {itemHorario?.tipoEstudio}</span>
                        </div>
                    </div>

                    <Horario
                        data={dataHorario}
                        color={color}
                        idIdioma={props.idIdioma}
                        idHorario={props.idHorario}
                        idTipoEstudio={props.idTipoEstudio}
                        turnoInicio={itemHorario?.turnoInicio}
                        turnoFin={itemHorario?.turnoFin}
                        loadInit={() => loadInit(props.idHorario)}
                    />
                </div>
            </div>


        </>
    )
}
export default HorarioDetalle

