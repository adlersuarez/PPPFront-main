import { useState } from "react";
import NotaCinco from "./notas/NotaCinco";
import NotaCuatro from "./notas/NotaCuatro";
import NotaDos from "./notas/NotaDos";
import NotaSeis from "./notas/NotaSeis";
import NotaTres from "./notas/NotaTres";
import NotaUno from "./notas/NotaUno";
import { isNumeric } from "@/helper/herramienta.helper";

type Props = {
    index: number
    item: any
}

const TrRegistroNotas = (props: Props) => {

    const { item } = props
    let { index } = props

    // const regNota1 = item.detalle.filter(
    //     (item) => .tipCaliId === 1
    // );  

    //const [nota1, setNota1] = useState<string>(regNota1[0].nota)

    const [validNota1, setValidNota1] = useState<boolean>(true)

    // const handleChangeNota1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const inputValue = event.target.value;

    //     setNota1(inputValue)

    //     if (inputValue.trim() == '') {

    //         item(false); // Si está vacío, se establece como inválido
    //         return
    //     }

    //     if (isNumeric(inputValue)) {
    //         if (parseFloat(inputValue) >= 0 && parseFloat(inputValue) <= 20) {
    //             setValidNota1(true); // Si es numérico y está dentro del rango, se establece como válido
    //         } else {
    //             setValidNota1(false); // Si es numérico pero está fuera del rango, se establece como inválido
    //         }
    //     }
    // };

    return (
        <>
            <tr key={index} className="text-sm">
                <td className="border p-2">{++index}</td>
                <td className="border p-2">{item.estudianteId}</td>
                <td className="border p-2">{`${item.estPaterno} ${item.estMaterno} ${item.estNombres}`}</td>
                <td className="border p-2">
                    {/* <div className="relative">
                        <input
                            type="text"
                            maxLength={5}
                            className={`font-mont border ${valid1 ? "border-gray-300" : "bg-red-300"} text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                            ref={refNota1}
                            value={nota}
                            onChange={(e) => handleInputDetalle(e, obj.detMatriculaId, 1)}

                            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)}
                        // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNextInput(event)}
                        />
                        <i className={`bi bi-circle-fill text-xs absolute top-1 right-2 ${'no' == 'no' ? 'text-white' : 'text-green-400'} `}></i>
                    </div> */}
                </td>

                {/* <td className="border p-2">
                    <NotaDos nota2 = {item.nota2} condNota2 = {item.condNota2}/>
                </td>
                <td className="border p-2">
                    <NotaTres nota3 = {item.nota3} condNota3 = {item.condNota3}/>
                </td>
                <td className="border p-2">
                    <NotaCuatro nota4 = {item.nota4} condNota4 = {item.condNota4}/>
                </td>
                <td className="border p-2">
                    <NotaCinco nota5 = {item.nota6} condNota5 = {item.condNota5}/>
                </td>
                <td className="border p-2">
                    <NotaSeis nota6 = {item.nota6} condNota6 = {item.condNota6}/>
                </td> */}
            </tr>
        </>
    )
}

export default TrRegistroNotas