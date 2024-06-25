// Importa pdfmake y sus tipos
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getBase64ImageFromUrl = async (imageUrl: string) => {
  const res = await fetch(imageUrl)
  const blob = await res.blob()
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Función para generar el PDF
export const generarCartaPdfMake = async () => {
  const firma = await getBase64ImageFromUrl('./images/Firma_decano_CCAACC-3.png');
  const fondo = await getBase64ImageFromUrl('./images/Fondo.jpg');

  const docDefinition: any = {

    background: {
      image: fondo,  // Imagen de fondo
      width: 595, // Ancho de la imagen (tamaño de página A4)
      height: 842 // Alto de la imagen (tamaño de página A4)
    },
    content: [
      {
        text: '“Año del bicentenario, de la consolidación de nuestra independencia, y de la conmemoración de las heroicas batallas de Junín y Ayacucho”',
        alignment: 'center',
        italics: true,
        margin: [10, 25, 10, 15] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'Huancayo, 21 de junio del 2024',
        alignment: 'right',
        italics: true,
        margin: [5, 0, 5, 35] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'Sr(a).',
        alignment: 'left',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 2] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'JOHN SUAREZ ORIHUELA',
        alignment: 'left',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 2] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'UNIVERSIDAD PERUANA LOS ANDES ',
        alignment: 'left',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 2] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'RECEPCIONISTA',
        alignment: 'left',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 10] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'ASUNTO :',
        alignment: 'left',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 10] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: 'SOLICITO SOLICITO PRÁCTICA PRE PROFESIONAL III - CURRICULARES',
        alignment: 'right',
        bold: true,
        italics: true,
        margin: [5, 0, 5, 0] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        canvas: [
          { type: 'line', x1: 0, y1: 8, x2: 400, y2: 8, lineWidth: 1.5, lineColor: 'black' } // Líneas del ancho del A4 (595.28 pts) menos márgenes
        ],
        alignment: 'right',
        margin: [1, 0, 1, 15]
      },
      {
        text: [
          '\t', '\t\t\t\t\t\t\t\t',
          'Es grato dirigirme a usted para saludarlo muy cordialmente y a la vez presentar al',
          { text: 'Sr(a). RUBEN RAUL MALLQUI ADRIANO', bold: true },
          ', estudiante del IX Ciclo Académico de la Carrera Profesional de ',
          { text: 'CONTABILIDAD Y FINANZAS', bold: true },
          ', Facultad de CIENCIAS ADMINISTRATIVAS Y CONTABLES de la Universidad Peruana los Andes, quien está en condiciones de desarrollar',
          { text: 'Prácticas Pre Profesionales III - Curriculares', bold: true },
          ' en su empresa, a fin de completar la formación recibida.'
        ],
        lineHeight: 1.4,
        alignment: 'justify',
        italics: true,
        margin: [5, 0, 5, 20] // Márgenes: [izquierda, arriba, derecha, abajo],

      },
      {
        text: [
          '\t', '\t\t\t\t\t\t\t\t',
          'En tal sentido, agradeceré se sirva brindarle las facilidades necesarias, para el cumplimiento de sus objetivos de formación profesional, los mismos que redundarán en beneficio del mencionado estudiante y seguramente de su empresa.'
        ],
        lineHeight: 1.4,
        alignment: 'justify',
        italics: true,
        margin: [5, 0, 5, 20] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: [
          '\t', '\t\t\t\t\t\t\t\t',
          'Agradeciendo anticipadamente su atención, es propicia la ocasión para reiterarle las muestras de mi especial consideración.'
        ],
        lineHeight: 1.4,
        alignment: 'justify',
        italics: true,
        margin: [5, 0, 5, 25] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        text: [
          'Atentamente,'
        ],
        alignment: 'center',
        italics: true,
        margin: [5, 0, 5, 60] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
      {
        image: firma,
        width: 200,
        alignment: 'right',
        margin: [5, 0, 5, 0] // Márgenes: [izquierda, arriba, derecha, abajo]
      },
    ]
  };

  //const pdfName = 'Carta-presentacion.pdf';
  // Generar y abrir el PDF en una nueva ventana
  pdfMake.createPdf(docDefinition).open();
  //pdfMake.createPdf(docDefinition).download(pdfName);
}