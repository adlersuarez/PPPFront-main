import Asignatura from '@/model/interfaces/asignatura/asignatura';
const VistaHorarioEstudiante = () => {
    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="w-full md:w-1/2 mx-auto text-center rounded-md border-black-light border-2 p-4">
                            <h1 className="text-2xl font-bold mb-4">Asignaturas</h1>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Nivel 1</h2>
                                <table className="w-full border-collapse border">
                                    <thead className="bg-upla-100 text-white">
                                        <tr>
                                            <th className="py-2">Estado</th>
                                            <th className="py-2">Código</th>
                                            <th className="py-2">Asignatura</th>
                                            <th className="py-2">Crédito</th>
                                            <th className="py-2">Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border py-2">Aprobado</td>
                                            <td className="border py-2">I001</td>
                                            <td className="border py-2">Inglés 1</td>
                                            <td className="border py-2">4.0</td>
                                            <td className="border py-2">
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded">Seleccionar</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default VistaHorarioEstudiante