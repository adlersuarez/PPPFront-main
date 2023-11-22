import { NavLink, useLocation } from "react-router-dom";
import Horario from "../Horario";
import { useState } from "react";
import ModalHorarioDetProceso from "./modal/HorarioDetProceso";
import Sweet from '../../../model/interfaces/Sweet.mode.interface'

type Props = {
    idIdioma: number,
    nombreIdioma: string,
    nombreSede: string,
    nombreModalidad: string,
    sweet: Sweet,

    abortControl: AbortController,
    handleCloseModuloDetalle: () => void
}

const HorarioDetalle = (props: Props) => {

    const [data, SetData] = useState<object[]>([]);
    const [color, SetColor] = useState<object[]>([]);

    const [showModficarAsignatura, setShowModficarAsignatura] = useState<boolean>(false);
    const handleShowModficarAsignatura = () => setShowModficarAsignatura(true);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleOpenModalHorarioDetProceso = ()  => {
        setIsOpenModal(true)
    }

    const handleCloseModalHorarioDetProceso = ()  => {
        setIsOpenModal(false)
    }


    return (
        <>
            <ModalHorarioDetProceso
                isOpenModal={isOpenModal}
                idIdioma={props.idIdioma}
                sweet={props.sweet}
                abortControl={props.abortControl}
                handleCloseModalHorarioDetProceso={handleCloseModalHorarioDetProceso} />

            <div className="p-1 bg-Solid">
                <h2 className="text-2xl font-bold mb-6"><span onClick={props.handleCloseModuloDetalle} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Configuracion de Horario</h2>

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-1 mb-2">

                        <div className="relative flex flex-wrap justify-between ">
                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-green-500 bg-green-500 text-white hover:bg-green-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                                onClick={handleOpenModalHorarioDetProceso}
                            >
                                <i className="bi bi-plus-circle mr-1"></i> AGREGAR ASIGNATURA
                            </button>

                            <button
                                className="ml-1 flex items-center rounded border-md p-2 text-xs border-blue-500 bg-blue-500 text-white hover:bg-blue-700 focus:ring-2 focus:ring-gray-400 active:ring-gray-400"
                            >
                                <i className="bi bi-printer-fill mr-1"></i> IMPRIMIR
                            </button>

                        </div>
                        <div className="text-center ">
                            <span className="text-sm">{props.nombreIdioma} - {props.nombreSede} - {props.nombreModalidad}</span>
                        </div>
                        {/* <span className=" bg-blue-500 text-center">{props.nombreIdioma} - {props.nombreSede} - {props.nombreModalidad}</span> */}
                    </div>

                    <Horario data={data} color={color} handleShow={handleShowModficarAsignatura} />
                </div>
            </div>


        </>
    )
}
export default HorarioDetalle