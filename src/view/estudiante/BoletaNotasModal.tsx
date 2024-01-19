import { useRef, useState } from "react";

import RestError from "@/model/class/resterror.model.class";
import Response from "@/model/class/response.model.class";
import { Types } from "@/model/enum/types.model.enum";

import CustomModal from "@/component/Modal.component"
import { ReporteMatriculadosXHorarioAsigId } from "@/network/rest/idiomas.network";
import Listas from "@/model/interfaces/Listas.model.interface";

import { jsPDF } from 'jspdf'
import autoTable, { UserOptions } from 'jspdf-autotable'
import * as XLSX from 'xlsx';
//import XlsxTemplate from 'xlsx-template';
import { getCurrentDateFormatted, getCurrentTime24hFormat } from "@/helper/herramienta.helper";
import { images } from "@/helper/index.helper";


type Props = {
    show: boolean;
    hide: () => void;
    // item: any
    // idHorarioAsignatura: number
    // sigla: string
};

const BoletasNotasModal = (props: Props) => {

    const [listaMatriculados, setListaMatriculados] = useState<any[]>([])

    const abortController = useRef(new AbortController());

    return (

        <CustomModal
            isOpen={
                props.show
            }
            onOpen={() => {
            }}
            onHidden={() => {

            }}
            onClose={
                props.hide
            }
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">

                    <div className="flex justify-between w-11/12">
                        <h6 className="py-1 font-bold text-lg"> Mis Notas</h6>
                    </div>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}
                    >
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2 mt-3">
                    <div>
                        <div className="flex">

                            <div className="relative flex flex-wrap">
                                <button
                                    title="Registro Auxiliar"
                                    className="ml-1 flex items-center rounded border-md border-red-500 bg-red-500 text-white p-2 hover:bg-red-700 focus:ring-2 focus:ring-red-400 active:ring-red-400"
                                >
                                    <i className="bi bi-file-earmark-pdf-fill mr-1"></i> Registro Auxiliar
                                </button>
                            </div>


                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-2 mt-3">
                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                        <div className="m-2">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                {/* <div className="text-sm">
                                    <p>Periodo: <span className="text-blue-700 font-bold">{props.item.anio} - {props.item.mes}</span></p>
                                    <p>Modalidad: <span className="text-blue-700 font-bold ">{props.item.modalidad}</span></p>
                                    <p>Tipo Estudio: <span className="text-blue-700 font-bold ">{props.item.tipoEstudio}</span></p>
                                    <p>Turno: <span className="text-blue-700 font-bold">{props.item.turno}</span></p>
                                    <p>Capacidad: <span className="text-blue-700 font-bold">{props.item.capacidad}</span></p>
                                </div> */}
                                {/* <div className="text-sm">
                                    <p>Aula: <span className="text-blue-700 font-bold">{props.item.aula}</span></p>
                                    <p>Sección: <span className="text-blue-700 font-bold">{props.item.seccion}</span></p>
                                    <p>Asignatura: <span className="text-blue-700 font-bold">{props.item.asignatura}</span></p>
                                    <p>Instructor: <span className="text-blue-700 font-bold">{props.item.docenteDni ? '' : props.item.docenteDni} / {props.item.docente ? '' : props.item.docente}</span></p>
                                    <p>Cantidad: <span className="text-blue-700 font-bold">{props.item.cantidad}</span></p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-auto rounded-md my-3 overflow-y-auto h-80">
                    <table className="w-full text-gray-700 uppercase border table-auto" id="tabla-reporte">
                        <thead className="bg-upla-100 text-white">
                            <tr>
                                <th className="py-1 px-6">#</th>
                                <th className="py-1 px-6">Codigo</th>
                                <th className="py-1 px-6">Estudiante</th>
                                {/* <th className="py-1 px-6">Fac / Carr</th>  */}
                                <th className="py-1 px-6">Sede</th>
                            </tr>
                        </thead>
                        <tbody>
                            {



                                listaMatriculados.length == 0 ?
                                    (
                                        <tr className="text-center bg-white border-b">
                                            <td colSpan={6} className="text-sm p-2  border-b border-solid">No se encontraron registros</td>
                                        </tr>
                                    ) : (
                                        listaMatriculados.map((obj, index) => (

                                            <tr key={index} className="text-sm">
                                                <td className="border p-2">{++index}</td>
                                                <td className="text-center border p-2">{obj.estudianteId}</td>
                                                <td className="border p-2">{`${obj.estPaterno} ${obj.estMaterno} ${obj.estNombres}`}</td>
                                                {/* <td className="border p-2">{obj.facultad} / {obj.carrera} </td> */}
                                                <td className="border p-2">{obj.sede}</td>
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

export default BoletasNotasModal
