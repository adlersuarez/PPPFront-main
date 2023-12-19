import React, { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelDataItem {
    [key: string]: any;
}

type ExcelData = ExcelDataItem[];

const ReporteNotas = () => {

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
            <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                {excelData && (
                    <div>
                        <h2>Excel Data:</h2>
                        <table  className="table-auto min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className='text-center text-lg font-medium text-gray-500 uppercase tracking-wider'>
                                    {(excelData[0]).map((item: any , key :any) => {
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
        </>
    )

}
export default ReporteNotas