import { useEffect, useState } from "react";
import FileUploader from "./file/FileUploader";
import FileTable from "./file/FileTable";

interface File {
    id: string;
    rotacion: string;
    semana: string;
    date: string;
    name: string;
    // Agrega otros campos necesarios según tu modelo de datos
}

const CargarInformes = () => {

    const [files, setFiles] = useState<File[]>([
        {
            id: '1',
            rotacion: 'Rotación 1',
            semana: 'Semana 1',
            date: '2023-11-01',
            name: 'Archivo1.pdf',
        },
        {
            id: '2',
            rotacion: 'Rotación 1',
            semana: 'Semana 2',
            date: '2023-11-08',
            name: 'Archivo2.pdf',
        },
        {
            id: '3',
            rotacion: 'Rotación 1',
            semana: 'Semana 3',
            date: '2023-11-15',
            name: 'Archivo1.pdf',
        },
        {
            id: '4',
            rotacion: 'Rotación 1',
            semana: 'Semana 4',
            date: '2023-11-22',
            name: 'Archivo2.pdf',
        },
        {
            id: '5',
            rotacion: 'Rotación 2',
            semana: 'Semana 1',
            date: '2023-11-29',
            name: 'Archivo1.pdf',
        },
        {
            id: '6',
            rotacion: 'Rotación 2',
            semana: 'Semana 2',
            date: '2023-12-06',
            name: 'Archivo2.pdf',
        },
        {
            id: '7',
            rotacion: 'Rotación 2',
            semana: 'Semana 3',
            date: '2023-12-13',
            name: 'Archivo2.pdf',
        },
        // Agrega más elementos de prueba según sea necesario
    ]);

    useEffect(() => {
        // Lógica para cargar los archivos del servidor.
    }, []);

    return (
        <div className="flex flex-wrap -mx-3">
            <div className="w-full max-w-full px-3 flex-0">
                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                    <h1 className="text-blue-800 mb-4 font-bold text-2xl">Cargar Informes</h1>
                    <div className="w-full max-w-screen-xl mx-auto">
                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4">
                            <div className="border-b-2 border-gray-200 p-4">
                                <div className="text-lg font-bold text-blue-500">
                                    {'datos.estudiante'} - {'datos.codigo'}
                                </div>
                            </div>
                            <div className="p-4 text-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                                    <p className="font-bold">Facultad:
                                        <span className="font-normal text-blue-500">{'datos.facultad'}</span>
                                    </p>
                                    <p className="font-bold ">Escuela Profesional:
                                        <span className="font-normal text-blue-500">{'datos.escuela'}</span>
                                    </p>
                                    <p className="font-bold">Nivel-sección:
                                        <span className="font-normal text-blue-500">{'datos.curso'}</span>
                                    </p>
                                    <p className="font-bold ">Plan:
                                        <span className="font-normal text-blue-500">{'datos.plan'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border mt-3">
                    <h1 className="text-2xl font-bold text-blue-800">Informes semanales</h1>
                    <FileUploader />
                    <FileTable files={files} />
                </div>
            </div>
        </div>
    )

}


export default CargarInformes;