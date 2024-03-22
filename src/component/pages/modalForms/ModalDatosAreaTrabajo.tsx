import { useState } from 'react';
import Modal from "../modal/ModalComponente";

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosAreaTrabajo: React.FC<Props> = (props: Props) => {

    const datos = {
        nombre_empresa: 'EMPRESA DE PRUEBA',
        fecha_inicio: '',
        fecha_finalizacion: '',
        area_trabajo: '',
        direccion_trabajo: '',
    }

    const [diasSeleccionados, setDiasSeleccionados] = useState<string[]>([]);

    const dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const handleDiaSeleccionado = (dia: string) => {
        if (diasSeleccionados.includes(dia)) {
            setDiasSeleccionados(diasSeleccionados.filter((d) => d !== dia));
        } else {
            setDiasSeleccionados([...diasSeleccionados, dia]);
        }
    };

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold sm:text-xl my-auto'>DATOS DEL ÁREA DE TRABAJO</span>
                        </div>

                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="nombreEmpresa" className='font-bold mb-1'>Nombre Empresa</label>
                            <input
                                type="text"
                                id="nombreEmpresa"
                                name="nombreEmpresa"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.nombre_empresa}
                                readOnly
                            />
                        </div>
                        <div className='flex gap-3 w-full'>
                            <div className='flex flex-col flex-1 w-1/3'>
                                <label htmlFor="fechaInicio" className='font-bold mb-1'>Inicio prácticas</label>
                                <input
                                    type="date"
                                    id="fechaInicio"
                                    name="fechaInicio"
                                    className='px-3 rounded font-semibold w-auto'
                                    defaultValue={datos.fecha_inicio}
                                />
                            </div>
                            <div className='flex flex-col flex-1 w-1/3'>
                                <label htmlFor="fechaFin" className='font-bold mb-1'>Finalización</label>
                                <input
                                    type="date"
                                    id="fechaFin"
                                    name="fechaFin"
                                    className='px-3 rounded font-semibold w-auto'
                                    defaultValue={datos.fecha_finalizacion}
                                />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="areaTrabajo" className='font-bold mb-1'>Área donde se realizan las prácticas</label>
                            <input
                                type="text"
                                id="areaTrabajo"
                                name="areaTrabajo"
                                className='px-3 rounded font-semibold'
                                defaultValue={datos.area_trabajo}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="direccionTrabajo" className='font-bold mb-1'>Dirección - Referencia(*)</label>
                            <input
                                type="text"
                                id="direccionTrabajo"
                                name="direccionTrabajo"
                                className='px-3 rounded  font-semibold'
                                defaultValue={datos.direccion_trabajo}
                            />
                        </div>
                        <div className='hidden flex-col'>
                            <label className='font-bold mb-1'>Días de realización de prácticas</label>
                            <div className="grid grid-cols-2 gap-x-4">
                                {
                                    dias.map((dia) => (
                                        <label key={dia} className="inline-flex items-center p-1 bg-gray-200 rounded-lg">
                                            <input
                                                type="checkbox"
                                                value={dia}
                                                checked={diasSeleccionados.includes(dia)}
                                                onChange={() => handleDiaSeleccionado(dia)}
                                                className="form-checkbox h-5 w-5 text-blue-600"
                                            />
                                            <span className="ml-2">{dia}</span>
                                        </label>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='hidden flex flex-col'>
                            <label className='font-bold mb-1'>Horario</label>
                            <div className="grid grid-cols gap-2">
                                <div className="flex w-full justify-between items-center">
                                    <div className='flex items-center'>
                                        <i className="bi bi-dot my-auto text-2xl mr-2" />
                                        <label htmlFor="horaInicio1" className='font-semibold text-sm'>
                                            Mañana
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                            type="time"
                                            id="horaInicio1"
                                            name="horaInicio1"
                                            className="border rounded p-1 mr-2 text-sm focus:outline-none"
                                        />
                                        <span className='mx-2 text-sm font-semibold'>-</span>
                                        <input
                                            type="time"
                                            id="horaFin1"
                                            name="horaFin1"
                                            className="border rounded p-1 ml-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full justify-between items-center">
                                    <div className='flex items-center'>
                                        <i className="bi bi-dot my-auto text-2xl mr-2" />
                                        <label htmlFor="horaInicio2" className='font-semibold text-sm'>
                                            Tarde
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                            type="time"
                                            id="horaInicio2"
                                            name="horaInicio2"
                                            className="border rounded p-1 mr-2 text-sm focus:outline-none"
                                        />
                                        <span className='mx-2 text-sm font-semibold'>-</span>
                                        <input
                                            type="time"
                                            id="horaFin2"
                                            name="horaFin2"
                                            className="border rounded p-1 ml-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex w-full justify-between items-center">
                                    <div className='flex items-center'>
                                        <i className="bi bi-dot my-auto text-2xl mr-2" />
                                        <label htmlFor="horaInicio3" className='font-semibold text-sm'>
                                            Noche
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <input
                                            type="time"
                                            id="horaInicio3"
                                            name="horaInicio3"
                                            className="border rounded p-1 mr-2 text-sm focus:outline-none"
                                        />
                                        <span className='mx-2 text-sm font-semibold'>-</span>
                                        <input
                                            type="time"
                                            id="horaFin3"
                                            name="horaFin3"
                                            className="border rounded p-1 ml-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="w-full grid lg:grid-cols-2 lg:gap-3">
                    <div className="lg:col-span-7/12 mb-3 lg:mb-0">
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:mt-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>

    )
}

export default ModalDatosAreaTrabajo;