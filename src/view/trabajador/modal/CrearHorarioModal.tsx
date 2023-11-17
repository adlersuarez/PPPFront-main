import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Modal from "../../../component/pages/modal/ModalComponente";
import ModalBuscarDocente from './BuscarDocenteModal';

type Idioma = {
    id: number;
    lenguaje: string;
}

type Dia = {
    id: number;
    dia: string;
}

type Modalidad = {
    id: number;
    mod: string;
}

type HorarioInicio = {
    id: number;
    hora: string;
}

type HorarioFin = {
    id: number;
    hora: string;
}

type Instructor = {
    id: number;
    instructor: string;
}

type Data = {
    idioma: Idioma[];
    dia: Dia[];
    estado: boolean;
    modalidad: Modalidad[];
    instructores: Instructor[];
    horarioInicio: HorarioInicio[];
    horarioFin: HorarioFin[];
    observacion: string;
}

type Props = {
    data: Data,
    show: boolean;
    hide: () => void;
    showModal: () => void;
};

const ModalCrearHorario = (props: Props) => {

    const [idioma, SetIdioma] = useState<number | string>()
    const [estado, SetEstado] = useState<boolean>(false)
    const [modalidad, SetModalidad] = useState<number | string>()
    const [instructores, SetInstructores] = useState<number | string>()
    const [horarioInicio, SetHorarioInicio] = useState<number | string>()
    const [horarioFin, SetHorarioFin] = useState<number | string>()
    const [instructor, SetInstructor] = useState<number | string>()
    const [observacion, SetObservacion] = useState<string>()

    // console.log(props.data.idioma[0].id)

    return (
        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}>
                <h2 className="font-bold">CREAR UNA CLASE EN EL HORARIO</h2>
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>

                    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border ">
                        <div className="w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3">
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Idioma <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                >
                                    <option value="0">- Seleccione -</option>
                                    {
                                        props.data.idioma.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.lenguaje}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Modalidad <i className="bi bi-asterisk text-xs text-red-500"></i>
                                </label>
                                <select
                                    className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                >
                                    <option value="0">- Seleccione -</option>
                                    {
                                        props.data.modalidad.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.mod}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="">
                            <div className="w-full rounded-lg p-3 gap-x-8 gap-y-3 flex">
                                <div className="flex-1">
                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                        Día <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <select
                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    >
                                        <option value={0}>- Seleccione el Día-</option>
                                        {
                                            props.data.dia.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.dia}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="flex-shrink-0">
                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                        Estado
                                    </label>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            onChange={() => { SetEstado(!estado) }} />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{`${estado ? 'activo' : 'inactivo'}`}</span>
                                    </label>
                                </div>
                            </div>

                            <div className="w-full rounded-lg p-3 grid grid-cols-2 gap-x-8 gap-y-3">
                                <div>
                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                        Horario Inicio <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <select
                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    >
                                        <option value="0">- Seleccione -</option>
                                        {
                                            props.data.horarioInicio.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.hora}
                                                    </option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                        Horario Fin <i className="bi bi-asterisk text-xs text-red-500"></i>
                                    </label>
                                    <select
                                        className="block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                    >
                                        <option value="0">- Seleccione -</option>
                                        {
                                            props.data.horarioFin.map((item, index) => {

                                                return (
                                                    <option key={index} value={item.id}>
                                                        {item.hora}
                                                    </option>
                                                );

                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="w-full rounded-lg p-3 gap-x-8 gap-y-3">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Instructor
                                </label>
                                <div className="flex">
                                    <input
                                        className="flex-1 block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                        disabled
                                    />
                                    <button
                                        className="bg-green-500 py-1.5 px-4 rounded-md flex-shrink-0"
                                        onClick={() => { props.hide(); props.showModal(); }}
                                    >
                                        <i className="bi bi-search text-white"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="w-full rounded-lg p-3 gap-x-8 gap-y-3">
                                <label className="font-mont block mb-1 text-sm font-medium text-gray-900">
                                    Observación
                                </label>
                                <div className="flex">
                                    <textarea
                                        className="flex-1 block bg-white border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full p-1"
                                        id="comentario"
                                        name="comentario"
                                        onChange={() => { }}
                                        cols={4}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-full flex justify-between'>
                    <div className=' flex'>
                        {/* <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span> */}
                    </div>
                    <div className='flex gap-3 w-5/12 justify-end'>
                        <button
                            onClick={props.hide}
                            className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Guardar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                            Cancelar y Salir
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalCrearHorario