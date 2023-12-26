import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

interface ExcelDataItem {
    [key: string]: any;
}

type ExcelData = ExcelDataItem[];

const ReporteNotas = () => {

    const navigate = useNavigate()

    const [excelData, setExcelData] = useState<ExcelData | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json<ExcelDataItem>(sheet, {
                    header: 1,
                    defval: '',
                    raw: false,
                });

                setExcelData(jsonData);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 flex-0">
                    <div className="flex flex-col visible w-full h-auto min-w-0 p-4 break-words bg-white opacity-100 border rounded-md bg-clip-border">

                        <h2 className="text-2xl font-bold mb-6"><span onClick={() => navigate(-1)} title="Atrás" role="button"><i className="bi bi-arrow-left-circle-fill text-blue-500"></i></span> Lista Asignada al Docente</h2>

                        <div className="w-full rounded-lg border-2 border-gray-300 border-t-4 mb-6">
                            <div
                                className="border-b-2 border-gray-200 p-2 flex justify-between">
                                <div className="text-sm font-bold">
                                    TENER EN CUENTA
                                </div>
                            </div>
                            <div className="m-2">

                                <div className="px-4">

                                    <ol className="w-full text-gray-500 list-decimal dark:text-gray-400 text-sm">
                                        <li className="pl-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">Formato de Notas: </span> Usar el formato designado, lo puede descargar <strong className='font-bold text-blue-800'>AQUI</strong>.
                                        </li>
                                        <li className="pl-4">
                                            <span className="font-semibold text-gray-900 dark:text-white">No hay actulizacion de notas:</span> Toda actulización o corrección de notas sera mediente solicitud u oficio.
                                        </li>
                                        
                                    </ol>

                                </div>

                            </div>
                        </div>
                        <div>
                            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                            {excelData && (
                                <div>
                                    <h2>Excel Data:</h2>
                                    <table className="table-auto min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr className='text-center text-lg font-medium text-gray-500 uppercase tracking-wider'>
                                                {(excelData[0]).map((item: any, key: any) => {
                                                    return (
                                                        <th key={key} className='px-6 py-3'>{item}</th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {excelData.slice(1).map((row: any, keyRow: any) => (
                                                <tr key={keyRow} className='whitespace-nowrap text-sm text-gray-900 text-center'>
                                                    {row.map((item: any, keyCol: any) => {
                                                        return (
                                                            <td key={keyCol} className='px-6 py-4'>{item}</td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default ReporteNotas