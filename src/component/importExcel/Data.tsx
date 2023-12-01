import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelDataItem {
    [key: string]: any;
}

type ExcelData = ExcelDataItem[];

const Data = () => {

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
                const jsonData = XLSX.utils.sheet_to_json<ExcelData>(sheet, { header: 1 });

                setExcelData(jsonData);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    console.log(excelData)

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            {excelData && (
                <div>
                    <h2>Excel Data:</h2>
                    <pre>{JSON.stringify(excelData, null, 2)}</pre>

                </div>
            )}
        </div>
    );
};

export default Data