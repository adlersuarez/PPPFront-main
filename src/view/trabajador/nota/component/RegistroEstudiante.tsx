import NotaCinco from "./notas/NotaCinco";
import NotaCuatro from "./notas/NotaCuatro";
import NotaDos from "./notas/NotaDos";
import NotaSeis from "./notas/NotaSeis";
import NotaTres from "./notas/NotaTres";
import NotaUno from "./notas/NotaUno";

type Props = {
    index: number
    item: any
}

const RegistroEstudiante = (props: Props) => {

    const {item} = props
    let {index} = props

    console.log(item)

    return (
        <>
            <tr key={index} className="text-sm">
                <td className="border p-2">{++index}</td>
                <td className="border p-2">{item.estudianteId}</td>
                <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                {/* <td className="border p-2">
                    <NotaUno nota1 = {item.nota1}/>
                </td>
                <td className="border p-2">
                    <NotaDos nota2 = {item.nota2}/>
                </td>
                <td className="border p-2">
                    <NotaTres nota3 = {item.nota3}/>
                </td>
                <td className="border p-2">
                    <NotaCuatro nota4 = {item.nota4}/>
                </td>
                <td className="border p-2">
                    <NotaCinco nota5 = {item.nota6}/>
                </td>
                <td className="border p-2">
                    <NotaSeis nota6 = {item.nota6}/>
                </td> */}
            </tr>
        </>
    )
}

export default RegistroEstudiante