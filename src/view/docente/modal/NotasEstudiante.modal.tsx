import CustomModal from "@/component/Modal.component"

type Props = {
    show: boolean;
    hide: () => void;
}

const ModalNotasEstudiante = (props: Props) => {
    return (
        <CustomModal
            isOpen={props.show}
            onOpen={() => {

            }}
            onHidden={() => {

            }}
            onClose={props.hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl bg-clip-border p-3">

                <div className="flex justify-between">
                    <h6 className="py-1 font-bold text-lg">Notas: </h6>
                    <button
                        className="focus:outline-none text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300  rounded-md px-2"
                        onClick={props.hide}>
                        <i className="bi bi-x-circle text-lg"></i>
                    </button>
                </div>
                {/* <div className="w-full px-4 pb-2 pt-4">

                    

                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mb-4">

                    <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mt-3">
                        <div className="m-2">

                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-1-circle"></i> Nota Practica (20%):</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota A</th>
                                            <th className="py-2 px-6">Nota B</th>
                                            <th className="py-2 px-6">Nota C</th>
                                            <th className="py-2 px-6">Nota D</th>
                                            <th className="py-2 px-6">Nota Practica</th>
                                            <th className="py-2 px-6">20%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={6}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-2-circle"></i> Nota examen de medio ciclo (40%):</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota de medio ciclo</th>
                                            <th className="py-2 px-6">40%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={6}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-3-circle"></i> Nota examen de examen final (40%)</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota de examen final</th>
                                            <th className="py-2 px-6">40%</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={6}
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h5 className="py-1 font-semibold"><i className="bi bi-arrow-right-circle"></i> Promedio del ciclo</h5>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2 px-6">Nota Practica (20%)</th>
                                            <th className="py-2 px-6">Nota examen de medio ciclo (40%)</th>
                                            <th className="py-2 px-6">Nota examen final (40%)</th>
                                            <th className="py-2 px-6">Nota promedio final (100%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={3}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={6}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>
                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={6}
                                                    disabled
                                                    className="w-full text-center"
                                                />
                                            </td>

                                            <td className="border py-2">
                                                <input
                                                    type="number"
                                                    value={15}
                                                    disabled
                                                    className={`w-full text-center ${15>10.5?'bg-green-400':'bg-red-400'}`}
                                                />
                                            </td>
                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </CustomModal>
    )
}
export default ModalNotasEstudiante