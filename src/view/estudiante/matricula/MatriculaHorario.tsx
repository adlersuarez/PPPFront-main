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
                                <th className="border">
                                    Hora
                                </th>
                                <th className="border">
                                    Lunes
                                </th>
                                <th className="border">
                                    Martes
                                </th>
                                <th className="border">
                                    Miercoles
                                </th>
                                <th className="border">
                                    Jueves
                                </th>
                                <th className="border">
                                    Viernes
                                </th>
                                <th className="border">
                                    Sabado
                                </th>
                                <th className="border">
                                    Domingo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-24">
                                <td className="border">
                                    08:00
                                </td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border">
                                    09:30
                                </td>
                                <td className="border">
                                    <div className="w-full h-full p-0 m-0 row-span-2 bg-blue-300">
                                        abcs
                                    </div>
                                </td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border">
                                    11:00
                                </td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border">
                                    12:30
                                </td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                            </tr>
                            <tr className="h-24">
                                <td className="border">
                                    02:00
                                </td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                                <td className="border"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default MatriculaHorario