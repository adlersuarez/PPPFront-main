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

    console.log(excelData)
    
    return (
        <>
            <div>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                {excelData && (
                    <div>
                        <h2>Excel Data:</h2>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((header) => (
                                        <th key={header}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((row: any, index: any) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, colIndex) => (
                                            <td key={colIndex}>{value}</td>
                                        ))}
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