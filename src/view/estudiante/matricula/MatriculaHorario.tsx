import { NavLink, RouteComponentProps } from "react-router-dom";

const MatriculaHorario = (props: RouteComponentProps<{}>) => {

    return (
        <>
            <div className="flex flex-col -mx-3 text-center">
                <h2>
                    1 Nivel - Horario Matutino
                </h2>
                <div className="">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="font-bold text-lg">
                                <th className="border p-2">
                                    Hora
                                </th>
                                <th className="border p-2">
                                    Lunes
                                </th>
                                <th className="border p-2">
                                    Martes
                                </th>
                                <th className="border p-2">
                                    Miercoles
                                </th>
                                <th className="border p-2">
                                    Jueves
                                </th>
                                <th className="border p-2">
                                    Viernes
                                </th>
                                <th className="border p-2">
                                    Sabado
                                </th>
                                <th className="border p-2">
                                    Domingo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-24">
                                <td className="border p-2">
                                    08:00
                                </td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border p-2">
                                    09:30
                                </td>
                                <td className="border p-2">
                                    <div className="bg-green-300 w-full">
                                        abcs
                                    </div>
                                </td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border p-2">
                                    11:00
                                </td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border p-2">
                                    12:30
                                </td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border p-2">
                                    02:00
                                </td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                                <td className="border p-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default MatriculaHorario