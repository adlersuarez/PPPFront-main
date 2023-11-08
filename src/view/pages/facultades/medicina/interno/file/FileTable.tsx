
interface File {
    id: string;
    rotacion: string;
    semana: string;
    date: string;
    name: string;
    // Agrega otros campos necesarios según tu modelo de datos
}

interface FileTableProps {
    files: File[]; // Especifica el tipo de la variable files
}

const FileTable = ({ files }: FileTableProps) => {
    return (
        <table className="w-full text-gray-700 uppercase bg-upla-100 border table-auto" id="miTabla">
            <thead className="align-bottom">
                <tr>
                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">#</th>
                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Rotación</th>
                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Semana</th>
                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Fecha upload</th>
                    <th className="px-6 py-2 font-bold text-center uppercase align-middle text-white text-xs">Archivo</th>
                </tr>
            </thead>
            <tbody>
                {files.map((file, index) => (
                    <tr key={index} className="bg-white border-b">
                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                            {file.id}
                        </td>
                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                            {file.rotacion}
                        </td>
                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                            {file.semana}
                        </td>
                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                            {file.date}
                        </td>
                        <td className="text-sm p-2 text-center align-middle border-b border-solid">
                            <button className="bg-blue-500 text-white p-2 rounded">Previsualizar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FileTable;