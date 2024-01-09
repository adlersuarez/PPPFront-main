
// import { keyNumberFloat, handleNumericInput } from "@/helper/herramienta.helper";
import { useRef, useState } from "react"

const NotaUno = () => {

    const [nota1, setNota1] = useState<number>(0)

    const refNota1 = useRef<HTMLInputElement>(null)

    const selectAllText = () => {
        if (refNota1.current) {
            refNota1.current.select();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseFloat(event.target.value);

        if (inputValue > 20) {
            inputValue = 20;
        } else if (inputValue < 0) {
            inputValue = 0;
        }

        if (!isNaN(inputValue)) {
            // Limitar a dos decimales y eliminar ceros a la derecha
            const roundedValue = parseFloat(inputValue.toFixed(2)); // Limitar a dos decimales
            const trimmedValue = parseFloat(roundedValue.toString()); // Convertir a cadena y luego a número para eliminar ceros a la derecha
            setNota1(trimmedValue);
        } else {
            setNota1(0);
        }
    };

    return (
        <>
            <input
                type="number"
                step="0.01"
                maxLength={5}
                className="font-mont border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center"
                ref={refNota1}
                value={nota1}
                onChange={handleChange}
                onClick={selectAllText}
            // onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleNumericInput(event)} 
            />
        </>
    )

}

export default NotaUno