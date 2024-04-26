import CustomModal from '@/component/Modal.component';
import DatosCartaAceptacion from '@/model/interfaces/cartaPresentacion/datosCartaAceptacion';
import axios from 'axios';
import { useState } from 'react';

type CartaPresentacion = {
    show: boolean
    hide: () => void
    datos: DatosCartaAceptacion
}

export const PFDconvertDocx: React.FC<CartaPresentacion> = ({ show, hide }) => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleConvertToPdf = async () => {
        if (!selectedFile) {
            alert('Por favor selecciona un archivo antes de convertirlo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('https://localhost:7210/Resolucion/Convertir', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'blob'
            });

            // Descargar el PDF generado
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = window.URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = 'output.pdf';
            a.click();
        } catch (error) {
            console.error('Error al convertir el archivo a PDF:', error);
        }
    };


    return (

        <CustomModal
            isOpen={show}
            onOpen={() => { }}
            onHidden={() => { }}
            onClose={hide}
        >
            <div className="relative flex flex-col min-w-0 break-words bg-white border-0 rounded-2xl w-full sm:w-2/3 xl:w-1/2 mx-auto">
                <div className="flex justify-between p-2 pt-3 pl-4 p border-b-2 border-gray-100">
                    <div className="font-bold text-xl text-gray-400">EDITAR PALABRA CLAVE</div>
                    <div className="flex">
                        <button
                            className="flex my-auto w-8 h-8 bg-gray-100 hover:bg-red-400 hover:text-white rounded-full "
                            onClick={hide}>
                            <i className="bi bi-x-lg text m-auto" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 p-5 max-h-[90%] overflow-y-auto ">
                    <input type="file" accept=".docx" onChange={handleFileChange} />
                    <button onClick={handleConvertToPdf}>Convertir a PDF</button>

                </div>

                <div className="flex flex-col sm:flex-row w-full justify-between gap-4 p-5 sm:border-t-2 sm:border-gray-100">
                    <div className="flex text-sm w-full sm:w-auto">
                        <span className="animate-pulse w-full flex gap-2 bg-red-200 text-red-800 my-auto p-1 px-2 rounded">
                            <i className="mt-0.5 bi bi-info-circle" /> Campos con asterisco (*) son obligatorios.
                        </span>
                    </div>
                    <div className="flex w-full sm:w-auto">
                        <button
                            onClick={() => { }}
                            className="flex w-full rounded-md bg-green-400 text-white text-base sm:text-sm hover:bg-green-600">
                            <span className="m-auto p-2 px-4"> Guardar</span>
                        </button>
                    </div>
                </div>
            </div>

        </CustomModal>
    );
};