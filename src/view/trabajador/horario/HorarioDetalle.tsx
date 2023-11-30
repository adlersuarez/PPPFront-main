import Horario from "./component/Horario";
import { useEffect, useState } from "react";
import ModalHorarioDetAgregar from "./modal/HorarioDetAgregar";
import ModalHorarioDetEditar from "./modal/HorarioDetEditar";
import Sweet from '../../../model/interfaces/Sweet.mode.interface'

import Response from "../../../model/class/response.model.class";
import RestError from "../../../model/class/resterror.model.class";
import { Types } from "../../../model/enum/types.model.enum";

import Listas from "../../../model/interfaces/Listas.model.interface";
import { ListarHorarioDetalleId } from "../../../network/rest/idiomas.network";

import ListHorarioDetId from "../../../model/interfaces/horario/listHorarioDetId";

type Props = {
    idHorario: number
    idIdioma: number,
    nombreIdioma: string,
    nombreSede: string,
    nombreModalidad: string,
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioDetalle = (props: Props) => {

    const [listaHorarioDetalleId, setListaHorarioDetalleId] = useState<ListHorarioDetId[]>([])

    const [dataHorario, setDataHorario] = useState<object[]>([]);
    const [color, setColor] = useState<object[]>([]);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalEditar, setIsOpenModalEditar] = useState(false);

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
        }
        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return;
            console.log(response.getMessage())
        }
    }

    useEffect(() => {
        dataRenderHorario()
        dataRenderHorarioColor()
    }, [listaHorarioDetalleId])


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
                        asignaturaId: item.asiId,
                        asignatura: item.asignatura,
                        startDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(startHour), parseInt(startMin)),
                        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + item.dia - currentDate.getDay(), parseInt(endHour), parseInt(endMin)),
                        horaIni: item.horaIni,
                        horaFin: item.horaFin,
                        color: item.color,
                        docente: item.docente,
                        seccion: item.seccion,
                        turno: item.turno,
                        tipoEstudio: item.tipoEstudio,
                        // aula: item.aula,
                        observacion: item.observacion,
                        dia: item.dia,
                        recurrenceRule: 'FREQ=WEEKLY',
                        // disponible: item.disponible,
                        modHora: item.fechaModifica,
                        // modalidad: item.modalidad,
                        // ocupado: item.ocupado,
                        capacidad: item.capacidad,
                        docenteId: item.docenteId,

                        //codCursal: item.codCursal,
                        visibleeee: item.estado,

                        roomId: item.color
                    };

                })

            );

        }

    }

    const dataRenderHorarioColor = async () => {
        if (listaHorarioDetalleId.length > 0) {

            setColor(
                listaHorarioDetalleId.map((item) => {
                    return {
                        id: item.color,
                        color: item.color,
                        // text: ""
                    }
                })

            )

        }
    }

    // Modal Editar
    const handleOpenModalHorarioDetProcesoEditar = () => {
        setIsOpenModalEditar(true)
    }

    const handleCloseModalHorarioDetProcesoEditar = () => {
        setIsOpenModalEditar(false)
    }


    return (
        <>
            <ModalHorarioDetAgregar
                isOpenModal={isOpenModal}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                sweet={props.sweet}
                abortControl={props.abortControl}
                handleCloseModalHorarioAgregra={handleCloseModalHorarioAgregra} />
                

            <ModalHorarioDetEditar
                isOpenModal={isOpenModalEditar}
                idHorario={props.idHorario}
                idIdioma={props.idIdioma}
                sweet={props.sweet}
                abortControl={props.abortControl}
                handleCloseModalHorarioDetProcesoEditar={handleCloseModalHorarioDetProcesoEditar} />

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Configuracion de Horario</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={handleOpenModalHorarioAgregra}
                            >
                                <i className="bi bi-plus-circle mr-1"></i> AGREGAR ASIGNATURA
                            </button>

                            {/* <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                            >
                                <i className="bi bi-printer-fill mr-1"></i> IMPRIMIR
                            </button> */}
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={dataRenderHorario}
                            >
                                <i className="bi bi-eye-fill mr-1"></i> Ver Horarios
                            </button>

                        </div>
                        <div className="text-center ">
                            <span className="text-sm">{props.nombreIdioma} - {props.nombreSede} - {props.nombreModalidad}</span>
                        </div>
                        {/* <span className=" bg-blue-500 text-center">{props.nombreIdioma} - {props.nombreSede} - {props.nombreModalidad}</span> */}
                    </div>

                    <Horario data={dataHorario} color={color}  handleOpenModalHorarioDetProcesoEditar={handleOpenModalHorarioDetProcesoEditar}/>
                </div>
            </div>


        </>
    )
}
export default HorarioDetalle