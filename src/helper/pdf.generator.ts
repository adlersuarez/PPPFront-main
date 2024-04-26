import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import DatosCartaAceptacion from '@/model/interfaces/cartaPresentacion/datosCartaAceptacion';

export const generatePDF = async (data: DatosCartaAceptacion) => {

    // Cargar la plantilla PDF
    const plantilla = await fetch('/plantillas/plantilla-carta-presentacion.pdf').then((res) => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(plantilla)

    // Registrar Fonkit para el uso de Fuentes no establecidas
    pdfDoc.registerFontkit(fontkit)

    // Obtener la fuente Cambria normal - cursiva - bold
    //const cambriaFontBytes = await fetch('/fuentes/cambria.ttf').then((res) => res.arrayBuffer())
    const cambriaFontBytesCursiva = await fetch('/fuentes/cambriai.ttf').then((res) => res.arrayBuffer())
    const cambriaFontBytesBoldCursiva = await fetch('/fuentes/cambriaz.ttf').then((res) => res.arrayBuffer())
    // Incrustar la fuente "Cambria" en el documento
    //const cambriaNormal = await pdfDoc.embedFont(cambriaFontBytes);
    const cambriaCursiva = await pdfDoc.embedFont(cambriaFontBytesCursiva);
    const cambriaBold = await pdfDoc.embedFont(cambriaFontBytesBoldCursiva);

    // Obtener la primera página de la plantilla
    const page = pdfDoc.getPages()[0];

    // Calculos para centrar y mostrar el nombre del año
    const textNombreAnio = data.nombreAnio
    const fuenteAnio = 12
    const textAnchoAnio = cambriaCursiva.widthOfTextAtSize(textNombreAnio, fuenteAnio)
    const textAnio_X = (page.getWidth() - textAnchoAnio) / 2
    const textAnio_Y = page.getHeight() - 85

    // Agregar el texto del nombre del año al documento
    page.drawText(textNombreAnio, {
        x: textAnio_X,
        y: textAnio_Y,
        size: fuenteAnio,
        font: cambriaCursiva,
    })

    // Calculos y alinear a la derecha la ciudad y el año
    const textLugarFecha = data.ciudadFecha
    const fuenteLugarFecha = 12
    const textWidthRight = cambriaCursiva.widthOfTextAtSize(textLugarFecha, fuenteLugarFecha)
    const textLugarFecha_XRight = page.getWidth() - textWidthRight - 50 // Ajustar el espacio a la derecha según sea necesario
    const textLugarfecha_YRight = page.getHeight() - 115

    // Agregar el texto justificado a la derecha al documento
    page.drawText(textLugarFecha, {
        x: textLugarFecha_XRight,
        y: textLugarfecha_YRight,
        size: fuenteLugarFecha,
        font: cambriaCursiva,
    })


    // Establecer el texto para la izquierda
    const textFormal = 'Sr(a).'
    const fuenteFormal = 12
    const textFormal_XLeft = 50 // Margen similar al texto justificado a la derecha
    const textFormal_YLeft = page.getHeight() - 155

    // Agregar el texto justificado a la izquierda al documento
    page.drawText(textFormal, {
        x: textFormal_XLeft,
        y: textFormal_YLeft, // Misma posición Y que el texto justificado a la derecha
        size: fuenteFormal,
        font: cambriaBold,
    })

    // Establecer el texto para el nombre del referente
    const nombreReferente = data.nombreReferente
    const fuenteNombreReferente = 12
    const nombreReferente_XLeft = 50
    const nombreReferente_YLeft = textFormal_YLeft - 15 // Ajustar la posición vertical

    // Agregar el nombre del referente justificado a la izquierda al documento
    page.drawText(nombreReferente, {
        x: nombreReferente_XLeft,
        y: nombreReferente_YLeft,
        size: fuenteNombreReferente,
        font: cambriaBold,
    })


    // Establecer el texto para la empresa del referente
    const empresaReferente = data.empresaReferente
    const fuenteEmpresaReferente = 12
    const empresaReferente_XLeft = 50
    const empresaReferente_YLeft = nombreReferente_YLeft - 15 // Ajustar la posición vertical

    // Agregar la empresa del referente justificada a la izquierda al documento
    page.drawText(empresaReferente, {
        x: empresaReferente_XLeft,
        y: empresaReferente_YLeft,
        size: fuenteEmpresaReferente,
        font: cambriaBold,
    })


    // Establecer el texto para el cargo del referente
    const cargoReferente = data.cargoReferente
    const fuenteCargoReferente = 12
    const cargoReferente_XLeft = 50
    const cargoReferente_YLeft = empresaReferente_YLeft - 15 // Ajustar la posición vertical

    // Agregar el cargo del referente justificado a la izquierda al documento
    page.drawText(cargoReferente, {
        x: cargoReferente_XLeft,
        y: cargoReferente_YLeft,
        size: fuenteCargoReferente,
        font: cambriaBold,
    })


    // Establecer el texto para ASUNTO
    const asunto = 'ASUNTO         :'
    const fuenteAsunto = 10
    const asunto_XLeft = 50
    const asunto_YLeft = cargoReferente_YLeft - 30 // Ajustar la posición vertical

    // Agregar el texto ASUNTO justificado a la izquierda al documento
    page.drawText(asunto, {
        x: asunto_XLeft,
        y: asunto_YLeft,
        size: fuenteAsunto,
        font: cambriaBold,
    })

    // Establecer el texto para "SOLICITO PRÁCTICAS PRE PROFESIONALES III – CURRICULARES"
    const textoSolicitoDerecha = 'SOLICITO ' + data.curso
    const fuenteTextoSolicitoDerecha = 10
    const textWidthSolicitoRight = cambriaBold.widthOfTextAtSize(textoSolicitoDerecha, fuenteTextoSolicitoDerecha)
    const textoSolicitoDerecha_XRight = page.getWidth() - textWidthSolicitoRight - 50 // Margen similar al texto justificado a la derecha
    const textoSolicitoDerecha_YRight = asunto_YLeft // Ajustar la posición vertical

    // Agregar el texto "SOLICITO PRÁCTICAS PRE PROFESIONALES III – CURRICULARES" justificado a la derecha al documento
    page.drawText(textoSolicitoDerecha, {
        x: textoSolicitoDerecha_XRight,
        y: textoSolicitoDerecha_YRight,
        size: fuenteTextoSolicitoDerecha,
        font: cambriaBold,
    })


    //Calculo de la Linea debajo de la solicitud
    const linea_XEnd = page.getWidth() - 50

    // Obtener la posición Y de la línea
    const linea_Y = textoSolicitoDerecha_YRight - 10 // Ajusta la posición

    page.drawLine({
        start: { x: textoSolicitoDerecha_XRight - 50, y: linea_Y },
        end: { x: linea_XEnd, y: linea_Y },
        thickness: 1, // Grosor de la línea
    })

    //////////////////////////////
    // Texto completo
    /*const textoCompleto = `Es grato dirigirme a usted para saludarlo muy cordialmente y a la vez presentar al Sr(a). RUTH STEFANY ESLAVA GASPAR, estudiante del IX Ciclo Académico de la Carrera Profesional de CONTABILIDAD Y FINANZAS, Facultad de Ciencias Administrativas y Contables de la Universidad Peruana los Andes, quien está en condiciones de desarrollar Practicas Pre Profesionales III – Curriculares en su empresa, a fin de completar la formación recibida.`;

    // Definir las partes del texto que se deben resaltar en negrita
    const partesEnNegrita = ['RUTH STEFANY ESLAVA GASPAR', 'IX', 'CONTABILIDAD Y FINANZAS', 'Practicas Pre Profesionales III – Curriculares'];

    // Obtener el ancho y alto de la página
    const { width, height } = page.getSize();

    // Definir los márgenes
    const marginLeft = 50;
    const marginRight = 50;

    // Definir el ancho disponible para el texto
    const availableWidth = width - marginLeft - marginRight;

    // Definir el tamaño de letra y el espaciado entre líneas
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;

    // Dibujar las líneas en el PDF
    let y = height - 500; // Posición vertical inicial
    let textoRestante = textoCompleto;

    while (textoRestante) {
        let x = marginLeft; // Posición horizontal inicial

        // Buscar la primera parte en negrita en el texto restante
        let parteEnNegritaEncontrada = null;
        for (const parteEnNegrita of partesEnNegrita) {
            if (textoRestante.includes(parteEnNegrita)) {
                parteEnNegritaEncontrada = parteEnNegrita;
                break;
            }
        }

        if (parteEnNegritaEncontrada) {
            // Calcular el ancho del texto normal antes de la parte en negrita
            const textoNormal = textoRestante.substring(0, textoRestante.indexOf(parteEnNegritaEncontrada));
            const anchoTextoNormal = cambriaCursiva.widthOfTextAtSize(textoNormal, fontSize);

            // Calcular el ancho de la parte en negrita
            const anchoParteNegrita = cambriaBold.widthOfTextAtSize(parteEnNegritaEncontrada, fontSize);

            // Verificar si la parte en negrita cabe en la línea actual
            if (x + anchoTextoNormal + anchoParteNegrita <= width - marginRight) {
                // Dibujar el texto normal antes de la parte en negrita
                page.drawText(textoNormal, { x, y, size: fontSize, font: cambriaCursiva });
                x += anchoTextoNormal;

                // Dibujar la parte en negrita
                page.drawText(parteEnNegritaEncontrada, { x, y, size: fontSize, font: cambriaBold });
                x += anchoParteNegrita;

                // Actualizar el texto restante
                textoRestante = textoRestante.substring(textoRestante.indexOf(parteEnNegritaEncontrada) + parteEnNegritaEncontrada.length);
            } else {
                // La parte en negrita no cabe en la línea actual, pasar a la siguiente línea
                y -= lineHeight;
                textoRestante = textoRestante.substring(textoRestante.indexOf(parteEnNegritaEncontrada));
            }
        } else {
            // No hay parte en negrita, dibujar el texto restante
            page.drawText(textoRestante, { x, y, size: fontSize, font: cambriaCursiva });

            // Actualizar la posición vertical para la siguiente línea
            y -= lineHeight;
            textoRestante = '';
        }
    }*/

    const text = `En tal sentido, agradeceré se sirva brindarle las facilidades necesarias, para el cumplimiento de sus objetivos de formación profesional, los mismos que redundarán en beneficio del mencionado estudiante y seguramente de su empresa.`;

    // Obtener el ancho y alto de la página
    const { width, height } = page.getSize();

    // Definir los márgenes
    const marginLeft = 50;
    const marginRight = 50;

    // Definir la sangría
    const indent = 80;

    // Definir el tamaño de letra y el espaciado entre líneas
    const fontSize = 12;
    const lineHeight = 20;

    // Dividir el texto en palabras
    const words = text.split(' ');

    // Inicializar la posición horizontal y vertical
    let x = marginLeft + indent;
    let y = height - 600;

    // Variable para almacenar el texto de la línea actual
    let currentLine = '';

    // Dibujar cada palabra con sangría
    for (const word of words) {
        const wordWidth = cambriaCursiva.widthOfTextAtSize(word, fontSize);

        // Verificar si agregar la palabra excederá el ancho disponible
        if (x + wordWidth > width - marginRight) {
            // Agregar la línea actual al documento
            page.drawText(currentLine.trim(), {
                x: marginLeft + indent,
                y,
                font: cambriaCursiva,
                size: fontSize,
            });

            // Actualizar la posición vertical para la siguiente línea
            y -= lineHeight;

            // Reiniciar la posición horizontal y el texto de la línea actual
            x = marginLeft + indent;
            currentLine = '';
        }

        // Agregar la palabra a la línea actual
        currentLine += (currentLine ? ' ' : '') + word;

        // Actualizar la posición horizontal para la siguiente palabra
        x += wordWidth + cambriaCursiva.widthOfTextAtSize(' ', fontSize);
    }

    // Dibujar la última línea restante, si hay alguna
    if (currentLine.trim()) {
        page.drawText(currentLine.trim(), {
            x: marginLeft + indent,
            y,
            font: cambriaCursiva,
            size: fontSize,
        });
    }



    //////////////////////////////////////////////////////////////////AGREGAR GUIAS ////////////////////////////
    // Establecer el tamaño de la página
    const pageWidth = page.getWidth();
    const pageHeight = page.getHeight();

    // Definir el color de las guías
    const guideColor = rgb(0.8, 0.8, 0.8); // Color gris claro

    // Definir la fuente para los números
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Dibujar las guías verticales y agregar números
    for (let x = 0; x <= pageWidth; x += 10) {
        if (x % 50 === 0) continue; // Saltar cada 50 unidades
        page.drawLine({
            start: { x, y: 0 },
            end: { x, y: pageHeight },
            color: guideColor,
            thickness: 0.5, // Grosor de la línea
        });

        // Agregar números en las intersecciones de las guías verticales
        const numText = (x / 10).toString();
        const numWidth = font.widthOfTextAtSize(numText, 8); // Tamaño de la fuente para los números
        const numX = x - numWidth / 2; // Centrar el número en la guía
        const numY = pageHeight - 10; // Distancia desde la parte inferior de la página
        page.drawText(numText, {
            x: numX,
            y: numY,
            size: 8, // Tamaño de la fuente para los números
            font: font,
            color: rgb(0, 0, 0), // Color negro
        });
    }

    // Dibujar las guías horizontales y agregar números
    for (let y = 0; y <= pageHeight; y += 10) {
        if (y % 50 === 0) continue; // Saltar cada 50 unidades
        page.drawLine({
            start: { x: 0, y },
            end: { x: pageWidth, y },
            color: guideColor,
            thickness: 0.5, // Grosor de la línea
        });

        // Agregar números en las intersecciones de las guías horizontales
        const numText = (y / 10).toString();
        // const numWidth = font.widthOfTextAtSize(numText, 8); // Tamaño de la fuente para los números
        const numX = 10; // Distancia desde el borde izquierdo de la página
        const numY = pageHeight - y - 4; // Alineación vertical centrada
        page.drawText(numText, {
            x: numX,
            y: numY,
            size: 8, // Tamaño de la fuente para los números
            font: font,
            color: rgb(0, 0, 0), // Color negro
        });
    }
    //////////////////////////////AGREGAR GUIAS FIN

    // Guardar los cambios
    const pdfBytes = await pdfDoc.save();

    // Descargar el PDF generado
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'carta-presentacion.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
