import Response from "@/model/class/response.model.class";
import RestError from "@/model/class/resterror.model.class";
import { Types } from "@/model/enum/types.model";
import CartaPresentacionDatos from "@/model/interfaces/cartaPresentacion/cartaPresentacion";
import DatosCartaAceptacion from "@/model/interfaces/cartaPresentacion/datosCartaAceptacion";
import { ConvertirWordToPdf } from "@/network/rest/documentos.network";
import axios from "axios";
import * as Docxtemplater from 'docxtemplater';
import * as PizZip from 'pizzip';
import toast from "react-hot-toast";
import { convertirANumerosRomanos, corregirNombreAdministrativo, formatearPalabrasPrimeraMayus, obtenerSedeFechaHoy, obtenerUltimaPalabra } from "./herramienta.helper";
import ConvenioPracticas from "@/model/interfaces/convenio/convenioPracticas";
import { ObtenerConvenioPracticas } from "@/network/rest/practicas.network";

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


///// CONVENIO
/*export const handleCrearConvenioPracticas = async (periodo: number): Promise<void> => {
    // Procesar la plantilla con los datos

    const responseDatos = await ObtenerConvenioPracticas<ConvenioPracticas>(periodo)

    if (responseDatos instanceof Response) {
        const data = responseDatos.data as ConvenioPracticas
        // Cargar la plantilla
        let rutaPlantilla = ""

        if (data.tipoConvenio == 1) {
            rutaPlantilla = '/plantillas/convenio-no-remunerado.docx'
        }
        if (data.tipoConvenio == 2) {
            rutaPlantilla = '/plantillas/convenio-remunerado.docx'
        }

        const response = await fetch(rutaPlantilla)
        const contenidoPlantilla = await response.arrayBuffer()

        const zip = new PizZip(contenidoPlantilla)
        const doc = new Docxtemplater()
        doc.loadZip(zip)

        doc.render(data)

        // Generar el documento final
        const buffer = doc.getZip().generate({ type: 'blob' })

        // Crear un objeto URL para el blob generado
        const blobURL = URL.createObjectURL(buffer)

        // Crear un enlace de descarga y simular un clic en él para iniciar la descarga del archivo
        const link = document.createElement('a')
        link.href = blobURL
        link.download = 'Convenio-practicas.docx'
        document.body.appendChild(link)
        link.click()

        // Limpiar el objeto URL creado
        URL.revokeObjectURL(blobURL)

    }
    if (responseDatos instanceof RestError) {
        if (responseDatos.getType() === Types.CANCELED) return;
        console.log(responseDatos.getMessage())
    }

}*/
export const handleCrearConvenioPracticas = async (periodo: number): Promise<void> => {
    try {
        // Obtener los datos del convenio de prácticas
        const responseDatos = await ObtenerConvenioPracticas<ConvenioPracticas>(periodo);

        if (responseDatos instanceof Response) {
            const data = responseDatos.data as ConvenioPracticas;

            // Determinar la ruta de la plantilla
            let rutaPlantilla = '';
            if (data.tipoConvenio === 1) {
                rutaPlantilla = '/plantillas/convenio-no-remunerado.docx';
            } else if (data.tipoConvenio === 2) {
                rutaPlantilla = '/plantillas/convenio-remunerado.docx';
            } else {
                throw new Error('Tipo de convenio no soportado');
            }

            // Cargar la plantilla
            const response = await fetch(rutaPlantilla);
            if (!response.ok) {
                throw new Error('Error al cargar la plantilla');
            }
            const contenidoPlantilla = await response.arrayBuffer();

            // Procesar la plantilla
            const zip = new PizZip(contenidoPlantilla);
            const doc = new Docxtemplater(zip);
            doc.render(data);

            // Generar el documento final
            const buffer = doc.getZip().generate({ type: 'blob' });

            // Crear un objeto URL para el blob generado
            const blobURL = URL.createObjectURL(buffer);

            // Crear un enlace de descarga y simular un clic en él para iniciar la descarga del archivo
            const link = document.createElement('a');
            link.href = blobURL;
            link.download = 'Convenio-practicas.docx';
            document.body.appendChild(link);
            link.click();

            // Limpiar el objeto URL creado
            URL.revokeObjectURL(blobURL);
            document.body.removeChild(link);
        } else if (responseDatos instanceof RestError) {
            if (responseDatos.getType() !== Types.CANCELED) {
                console.error(responseDatos.getMessage());
            }
        } else {
            console.error('Respuesta inesperada del servidor');
        }
    } catch (error) {
        console.error('Error al crear el convenio de prácticas:', error);
    }
};
