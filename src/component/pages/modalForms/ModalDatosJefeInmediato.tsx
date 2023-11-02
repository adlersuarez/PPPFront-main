import Modal from "../modal/ModalComponente";

type Props = {
    show: boolean;
    hide: () => void;
};

const ModalDatosJefeInmediato: React.FC<Props> = (props: Props) => {

    return (
        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <div className='w-full flex justify-between'>
                    <div className=' flex w-7/12'>
                        <span className="flex font-medium text-red-800 bg-red-200 rounded p-1 text-xs text-center">Asumo la plena responsabilidad de la exactitud de los datos consignados, acogiéndome a la Ley 27444 del Procedimiento Administrativo General.</span>
                    </div>
                    <div className='flex gap-3 w-5/12 justify-end'>
                        <button
                            onClick={props.hide}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={props.hide}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDatosJefeInmediato;