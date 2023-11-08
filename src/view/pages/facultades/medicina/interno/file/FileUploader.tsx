import { ChangeEvent, useState } from 'react';

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleFileUpload = () => {
        console.log(selectedFile)
        // Aquí debes enviar el archivo al servidor para el almacenamiento.
        // Puedes utilizar una solicitud POST para enviar el archivo.
        // Asegúrate de manejar la respuesta del servidor para guardar la información en la tabla.
    };

    return (
        <div className="my-4">
            <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
            />
            <button
                onClick={handleFileUpload}
                className="bg-blue-500 text-white p-2 rounded">
                Subir PDF
            </button>
        </div>
    );
};

export default FileUploader;