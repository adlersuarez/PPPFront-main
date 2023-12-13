import Asignatura from '@/model/interfaces/asignatura/asignatura';
const VistaHorarioEstudiante = () => {
    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <div className="bg-blue-400 w-1/2 mx-auto text-center rounded-md border-black-light border-2 ">
                            <h1>Asignaturas</h1>
                            <div>
                                <h2>Nivel 1</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Estado</th>
                                            <th>Codigo</th>
                                            <th>Asignatura</th>
                                            <th>Credito</th>
                                            <th>Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
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