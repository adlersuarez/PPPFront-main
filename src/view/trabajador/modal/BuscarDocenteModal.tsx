import { useState } from 'react';
import { NavLink } from "react-router-dom";
import Modal from "../../../component/pages/modal/ModalComponente";

type Props = {
    show: boolean;
    hide: () => void;
}

const ModalBuscarDocente = (props: Props) => {
    return(
        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}>
                <h2 className="font-bold">BUSCAR DOCENTE</h2>
            </Modal.Header>
            <Modal.Body>
                <div className='flex flex-col gap-3'>

                    
                    abcs
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
export default ModalBuscarDocente