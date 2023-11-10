import { NavLink, RouteComponentProps } from "react-router-dom";
import 'devextreme/dist/css/dx.light.css';

import { Scheduler, View } from 'devextreme-react/scheduler';

const MatriculaHorario = (props: RouteComponentProps<{}>) => {

    var appointment = [{
        text: "Meet with a customer",
        startDate: new Date("2021-05-21T15:00:00.000Z"),
        endDate: new Date("2021-05-21T16:00:00.000Z")
    }];

    return (
        <>
            {/* <div className="flex flex-col -mx-3 text-center">
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
            </div> */}
            <Scheduler
                defaultCurrentView="week"
                dataSource={appointment}>
                <View
                    type="week"
                    startDayHour={8}
                    endDayHour={15}
                />

            </Scheduler>
        </>
    )
}
export default MatriculaHorario