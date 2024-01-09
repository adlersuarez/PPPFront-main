
import { keyNumberFloat } from "@/helper/herramienta.helper";
import { isNumeric } from "@/helper/herramienta.helper";
import { useRef, useState } from "react"

const NotaDos = () => {

    const [nota2, setNota2] = useState<string>("0")

    const [valid, setValid] = useState<boolean>(false)
 
    const refNota2 = useRef<HTMLInputElement>(null)

    const selectAllText = () => {
        if (refNota2.current) {
            refNota2.current.select();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault(); // Evitar la acción de pegado
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {    
        const inputValue = event.target.value;
        setNota2(inputValue)

        if(isNumeric(inputValue)){
            if(parseFloat(inputValue)<=0 || parseFloat(inputValue)>20){
                console.log("ee")
                setValid(true)
            }else{
                setValid(false)
            }
        }else{
            setValid(false)
        }
    };

    const handleNextInput = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if (event.key === 'Enter') {
            const nextInput = event.target.parentElement.parentElement.nextElementSibling.querySelector('input',);
            nextInput.focus();
          }
        //   if (event.key === 'Enter' && isLastRow) {
        //     const firstInput = event.target.parentElement.parentElement.parentElement.querySelector('input',);
        //     firstInput.focus();
        //   }
    }
    
    return (
        <>
            <input
                type="text"
                maxLength={5}
                className={`font-mont border ${valid?"bg-red-300":""} border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1 text-center`}
                ref={refNota2}
                value={nota2}
                onChange={handleChange}
                onClick={selectAllText}
                onPaste={handlePaste}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => keyNumberFloat(event)} 
                onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>)=>handleNextInput(event)}
            />
        </>
    )

}

export default NotaDos