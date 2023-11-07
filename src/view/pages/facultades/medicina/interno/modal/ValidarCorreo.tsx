import React, { useState } from 'react';
import Modal from "../../../../../../component/pages/modal/ModalComponente";

type DatosType = {
    dni: string;
    email: string;
    telefono: string;
};

type Props = {
    datos: DatosType | undefined;
    show: boolean;
    hide: () => void;
};

const ValidarCorreo: React.FC<Props> = (props: Props) => {

    const datos = {
        dni: props.datos?.dni,
        email: props.datos?.email,
        telefono: props.datos?.telefono,
    };

    const [verificationCode, setVerificationCode] = useState<string[]>(Array(6).fill(''));
    const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState<boolean>(false);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);

    const generateRandomNumbers = () => {
        const numbers = [...Array(9)].map((_, index) => index + 1);
        numbers.sort(() => Math.random() - 0.5);
        setRandomNumbers(numbers);
    };
    // Manejar la selección del código de verificación
    // Manejar la selección del código de verificación
    const handleCodeSelection = (number: number, index: number) => {
        setVerificationCode((prevCode) => {
            const newCode = [...prevCode];
            newCode[index] = number.toString();
            return newCode;
        });
    };

    const handleBackspace = () => {
        setVerificationCode((prevCode) => {
            const newCode = [...prevCode];
            const lastNonEmptyIndex = newCode.map((digit, index) => (digit ? index : -1)).filter((index) => index !== -1).pop();
            if (lastNonEmptyIndex !== undefined) {
                newCode[lastNonEmptyIndex] = '';
            }
            return newCode;
        });
    };

    const handleResendCode = () => {
        // Agregar lógica para reenviar el código de verificación aquí
        setIsCodeSent(true);
    };

    const handleConfirmCode = () => {
        // Agregar lógica para verificar el código de verificación aquí
        setIsCodeConfirmed(true);
    };

    // Llamar a la función para generar números aleatorios cuando se monta el componente
    React.useEffect(() => {
        generateRandomNumbers();
    }, []);

    return (

        <Modal onShow={props.show} onHide={props.hide}>
            <Modal.Header closeButton onHide={props.hide}> </Modal.Header>
            <Modal.Body>
                <div className="container mx-auto flex flex-col items-center gap-6">
                    <div className="flex justify-start w-full gap-4 bg-gray-500 p-2 rounded-lg">
                        <div className="flex gap-2 text-3xl font-bold text-white">
                            <i className="bi bi-check-lg" />
                            <span>CONFIRMACIÓN CORREO ELECTRÓNICO</span>
                        </div>
                    </div>
                    <div className='flex gap-8'>
                        <div className='w-1/2 h-full'>
                            <div className="flex flex-col items-center justify-between gap-10 px-4">
                                <div className="flex text-xl gap-4 text-gray-500">
                                    <i className="bi bi-envelope-at-fill text-5xl my-auto" />
                                    <p className='font-medium'>Por favor, ingresa el código de verificación enviado a:</p>

                                </div>
                                <div className="flex gap-4 text-blue-800">

                                    <span className='my-auto text-2xl font-medium'>{datos.email}</span>
                                </div>

                                <button
                                    onClick={handleResendCode}
                                    className="text-blue-600 px-4 py-2 rounded-lg font-medium flex text-lg gap-2 transition duration-300 hover:bg-blue-600 hover:text-white"
                                >
                                    <span className='my-auto'> REENVIAR CÓDIGO </span>
                                    <i className="bi bi-send my-auto" />
                                </button>

                            </div>

                        </div>
                        <div className='w-1/2 flex flex-col gap-4'>
                            <div className='border-2 border-blue-500 rounded-lg p-2'>
                                <div className="grid grid-cols-6 gap-1">
                                    {verificationCode.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            value={digit}
                                            onChange={() => { }}
                                            readOnly
                                            className="p-2 text-center border border-gray-400 rounded-md text-3xl font-semibold text-blue-500"
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='flex gap-2 m-auto'>
                                    <div className="grid grid-cols-3 gap-2 w-40 bg-blue-500 rounded-lg">
                                        {randomNumbers.map((number) => (
                                            <button
                                                key={number}
                                                onClick={() => handleCodeSelection(number, verificationCode.indexOf(''))}
                                                className="text-white p-2 w-12 h-12 rounded-md  hover:bg-white hover:text-blue-500 hover:text-2xl hover:font-bold flex"
                                            >
                                                <span className='m-auto'>
                                                    {number}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <button onClick={handleBackspace} className="border-2 border-blue-500 bg-blue-500 text-white w-12 h-12 rounded-md hover:bg-white hover:text-blue-500 hover:font-bold text-2xl hover:text-4xl flex">
                                        <span className=' m-auto'>
                                            <i className="bi bi-x" />
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>



                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className='w-full flex justify-between'>
                    <div>

                    </div>
                    <div className='flex gap-3 justify-end'>

                        <button
                            onClick={props.hide}
                            //onClick={handleConfirmCode}
                            //disabled={!verificationCode}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal.Footer>

        </Modal>

    )
}

export default ValidarCorreo;