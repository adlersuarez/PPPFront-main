import Response from '@/model/class/response.model.class';
import RestError from '@/model/class/resterror.model.class';
import { Types } from '@/model/enum/types.model';
import Listas from '@/model/interfaces/Listas.model.interface';
import ReporteSunedu from '@/model/interfaces/reportes/reporteSunedu';
import { ReporteSuneduGenerar } from '@/network/rest/reportes.network';

import * as XLSX from 'xlsx';


export const generateExcel = async (car_Id: string, asi_Id: string, per_Id: string, sed_Id: string, seccion: string, periodo: number) => {

    const response = await ReporteSuneduGenerar<Listas>(car_Id, asi_Id, per_Id, sed_Id, seccion, Number(periodo))

    if (response instanceof Response) {
        const data = response.data.resultado as ReporteSunedu[]

        const templatePath = '/plantillas/plantilla-reporte-sunedu.xlsx' // Reemplaza con la ruta de tu plantilla
        const outputFileName = 'ReporteSunedu.xlsx' // Nombre del archivo de salida

        if (data.length == 0) {
            console.log("No tienen ningun registro")
            return
        }

        try {
            // Cargar la plantilla desde la carpeta public
            const response = await fetch(templatePath)
            const arrayBuffer = await response.arrayBuffer()

            // Convertir el arrayBuffer a un libro de trabajo de SheetJS
            const workbook = XLSX.read(arrayBuffer, { type: 'array' })

            // Obtener la primera hoja del libro de trabajo
            const sheet = workbook.Sheets[workbook.SheetNames[0]]

            // Definir el encabezado en la fila 1
            const header = Object.keys(data[0]) // Obtener las claves de la interfaz ReporteSunedu

            // Agregar los datos a partir de la fila 4
            data.forEach((item, index) => {
                const rowData = header.map((key) => item[key as keyof ReporteSunedu]); // Obtener los valores de cada propiedad en el orden de las claves
                XLSX.utils.sheet_add_aoa(sheet, [rowData], { origin: { r: index + 4, c: 0 } }); // Agregar datos empezando en la fila 4
            })

            // Convertir el libro de trabajo modificado a un archivo binario
            const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

            // Crear un blob y desencadenar la descarga
            const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = outputFileName
            a.click()
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error)
        }
    }

    if (response instanceof RestError) {
        if (response.getType() === Types.CANCELED) return
        console.log(response.getMessage())
    }

}