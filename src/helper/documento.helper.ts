import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import CartaPresentacionDatos from "@/model/interfaces/cartaPresentacion/cartaPresentacion";
import DatosCartaAceptacion from "@/model/interfaces/cartaPresentacion/datosCartaAceptacion";
import { ConvertirWordToPdf, ObtenerConvenioPracticasWord } from "@/network/rest/documentos.network";
import axios from "axios";
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import toast from "react-hot-toast";
import { convertirANumerosRomanos, corregirNombreAdministrativo, formatearPalabrasPrimeraMayus, obtenerSedeFechaHoy, obtenerUltimaPalabra } from "./herramienta.helper";

export const handleCrearSolicitud = async (data: DatosCartaAceptacion): Promise<void> => {
    // Cargar la plantilla
    const response = await fetch('/plantillas/plantilla-carta-presentacion.docx');

    const contenidoPlantilla = await response.arrayBuffer();
    const zip = new PizZip(contenidoPlantilla);
    const doc = new Docxtemplater()
    doc.loadZip(zip)

    // Procesar la plantilla con los datos
    const datos = {
        nombreAnio: data.nombreAnio,
        ciudadFecha: data.ciudadFecha,
        nombreReferente: data.nombreReferente,
        empresaReferente: data.empresaReferente,
        cargoReferente: data.cargoReferente,
        cursoSolicitud: data.curso.toUpperCase(),
        curso: data.curso,
        nombreEstudiante: data.nombreEstudiante,
        nivelEstudiante: data.nivelEstudiante,
        carrera: data.carrera,
        facultad: data.facultad,
        nombreAdministrativo: data.nombreAdministrativo,
        cargoAdministrativo: data.cargoAdministrativo,
        //urlFirma: data.urlFirma,
    }

    doc.render(datos)

    // Generar el documento final
    const buffer = doc.getZip().generate({ type: 'blob' })

    // Crear un objeto URL para el blob generado
    const blobURL = URL.createObjectURL(buffer)

    // Crear un enlace de descarga y simular un clic en él para iniciar la descarga del archivo
    const link = document.createElement('a')
    link.href = blobURL
    link.download = 'documentoSalida.docx'
    document.body.appendChild(link)
    link.click()

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(blobURL)
}

export const handleConvertToPdf = async (selectedFile: File) => {
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
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' })

        const pdfUrl = window.URL.createObjectURL(pdfBlob)
        const a = document.createElement('a')
        a.href = pdfUrl
        a.download = 'output.pdf'
        a.click()

    } catch (error) {
        console.error('Error al convertir el archivo a PDF:', error)
    }
}

export const handleCrearSolicitudYConvertirAPdf = async (data: CartaPresentacionDatos): Promise<void> => {
    //const abortController = useRef(new AbortController())

    // Cargar la plantilla de carta de presentación
    const cartaPresentacionResponse = await fetch('/plantillas/plantilla-carta-presentacion.docx')
    const cartaPresentacionContenido = await cartaPresentacionResponse.arrayBuffer()
    const cartaPresentacionZip = new PizZip(cartaPresentacionContenido)
    const cartaPresentacionDoc = new Docxtemplater()
    cartaPresentacionDoc.loadZip(cartaPresentacionZip)

    const nombreCursoCompleto = 'Prácticas Pre Profesionales ' + obtenerUltimaPalabra(data.estCurso) + ' - Curriculares'
    // Procesar la plantilla de carta de presentación con los datos
    const cartaPresentacionDatos = {
        nombreAnio: data.anioNombre,
        ciudadFecha: obtenerSedeFechaHoy('Huancayo'),// Huancayo, 
        nombreReferente: data.repNombreCompleto,
        empresaReferente: data.empresaNombre,
        cargoReferente: data.repCargoNombre.toUpperCase(),
        cursoSolicitud: nombreCursoCompleto.toUpperCase(),
        curso: nombreCursoCompleto,
        nombreEstudiante: data.estNombreCompleto,
        nivelEstudiante: convertirANumerosRomanos(data.estNivel),
        carrera: data.estCarrera,
        facultad: formatearPalabrasPrimeraMayus(data.estFacultad),
        nombreAdministrativo: 'DR. ' + corregirNombreAdministrativo(data.admNombreCompleto),
        cargoAdministrativo: data.admCargo,
    }

    cartaPresentacionDoc.render(cartaPresentacionDatos)

    // Generar el documento de carta de presentación final
    const cartaPresentacionBuffer = cartaPresentacionDoc.getZip().generate({ type: 'blob' });

    try {
        // Convertir el documento de carta de presentación a PDF utilizando el API
        const formData = new FormData()
        formData.append('file', cartaPresentacionBuffer, 'carta_presentacion.docx')

        const response = await ConvertirWordToPdf<Blob>(formData)

        if (response instanceof Response) {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
            const pdfUrl = window.URL.createObjectURL(pdfBlob)
            const a = document.createElement('a')
            a.href = pdfUrl
            a.download = 'CARTA-PRESENTACION.pdf'
            a.click()

            toast.success("¡El documento se ha generado con éxito!")
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }

    } catch (error) {
        console.error('Error al convertir la carta de presentación a PDF:', error)
    }
}


export const handleCrearConvenio = async (data: DatosCartaAceptacion): Promise<void> => {
    // Cargar la plantilla
    const response = await fetch('/plantillas/plantilla-carta-presentacion.docx');

    const contenidoPlantilla = await response.arrayBuffer();
    const zip = new PizZip(contenidoPlantilla);
    const doc = new Docxtemplater()
    doc.loadZip(zip)

    // Procesar la plantilla con los datos
    const datos = {
        nombreAnio: data.nombreAnio,
        ciudadFecha: data.ciudadFecha,
        nombreReferente: data.nombreReferente,
        empresaReferente: data.empresaReferente,
        cargoReferente: data.cargoReferente,
        cursoSolicitud: data.curso.toUpperCase(),
        curso: data.curso,
        nombreEstudiante: data.nombreEstudiante,
        nivelEstudiante: data.nivelEstudiante,
        carrera: data.carrera,
        facultad: data.facultad,
        nombreAdministrativo: data.nombreAdministrativo,
        cargoAdministrativo: data.cargoAdministrativo,
        //urlFirma: data.urlFirma,
    }

    doc.render(datos)

    // Generar el documento final
    const buffer = doc.getZip().generate({ type: 'blob' })

    // Crear un objeto URL para el blob generado
    const blobURL = URL.createObjectURL(buffer)

    // Crear un enlace de descarga y simular un clic en él para iniciar la descarga del archivo
    const link = document.createElement('a')
    link.href = blobURL
    link.download = 'documentoSalida.docx'
    document.body.appendChild(link)
    link.click()

    // Limpiar el objeto URL creado
    URL.revokeObjectURL(blobURL)
}


export const handleCrearConvenioPracticas = async (periodo: number): Promise<void> => {
    try {
        // Obtener los datos del convenio de prácticas
        const response = await ObtenerConvenioPracticasWord<Blob>(periodo)
        //  console.log(response)

        if (response instanceof Response) {
            const wordBlob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            const wordUrl = window.URL.createObjectURL(wordBlob);
            const a = document.createElement('a');
            a.href = wordUrl;
            a.download = 'Convenio-practicas.docx';
            a.click();

            toast.success("¡El documento se ha generado con éxito!");
        }

        if (response instanceof RestError) {
            if (response.getType() === Types.CANCELED) return
            console.log(response.getMessage())
        }
    } catch (error) {
        console.error('Error al crear el convenio de prácticas:', error)
    }
}