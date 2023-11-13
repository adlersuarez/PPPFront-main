import { NavLink } from "react-router-dom";
import Modal from "../modal/ModalComponente";

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosEstudiante: React.FC<Props> = (props: Props) => {

    const datos = {
        codigo: '76634282',
        facultad: 'Facultad de Ingeniería',
        carrera_profesional: 'Ingeniería de Sistemas y Computación',
        especialidad: '',
        modalidad_ingreso: 'Postulante Regular',
        sede: 'HUANCAYO',
    }

    return (
        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>
                    <div className='bg-gray-200 w-full rounded-lg flex p-2 justify-between'>
                        <div className='flex'>
                            <i className="bi bi-1-circle-fill text-[#00B3DB] ml-2 text-3xl" />
                            <span className='ml-4 font-bold text-xl my-auto'>DATOS ESTUDIANTE</span>
                        </div>
                        <div className='hidden sm:flex mr-4'>
                            <NavLink
                                to={''}
                                className="hover:underline m-auto text-[#007CBC]"
                            >
                                <span className='font-semibold'>¿Puedo cambiar mis datos?</span>
                                <i className={`bi bi-info-circle-fill ml-2 text-lg`} />
                            </NavLink>
                        </div>
                    </div>
                    <div className='bg-gray-200 w-full rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="codigo" className='font-bold mb-1'>Código</label>
                            <input
                                type="text"
                                id="codigo"
                                name="codigo"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.codigo}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="facultad" className='font-bold mb-1'>Facultad</label>
                            <input
                                type="text"
                                id="facultad"
                                name="facultad"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.facultad}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="carreraProfesional" className='font-bold mb-1'>Carrera Profesional</label>
                            <input
                                type="text"
                                id="carreraProfesional"
                                name="carreraProfesional"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.carrera_profesional}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="especialidad" className='font-bold mb-1'>Especialidad</label>
                            <input
                                type="text"
                                id="especialidad"
                                name="especialidad"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.especialidad}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="modalidadIngreso" className='font-bold mb-1'>Modalidad Ingreso</label>
                            <input
                                type="text"
                                id="modalidadIngreso"
                                name="modalidadIngreso"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.modalidad_ingreso}
                                readOnly
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="sede" className='font-bold mb-1'>Sede</label>
                            <input
                                type="text"
                                id="sede"
                                name="sede"
                                className='px-3 rounded bg-gray-300 font-semibold'
                                defaultValue={datos.sede}
                                readOnly
                            />
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

export default ModalDatosEstudiante;