import NotaDos from "./notas/NotaDos";
import NotaUno from "./notas/NotaUno";

type Props = {
    index: number
    item: any
}

const RegistroEstudiante = (props: Props) => {

    const {item} = props
    let {index} = props

    return (
        <>
            <tr key={index} className="text-sm">
                <td className="border p-2">{++index}</td>
                <td className="border p-2">{item.estudianteId}</td>
                <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                <td className="border p-2">
                    <NotaUno/>
                </td>
                <td className="border p-2">
                    <NotaDos/>
                </td>
            </tr>
        </>
    )
}

export default RegistroEstudiante