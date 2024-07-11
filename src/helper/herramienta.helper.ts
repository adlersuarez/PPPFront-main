import MenuItem from '@/model/interfaces/menu/menu'
import CryptoJS from 'crypto-js'
import { menusCoordinador, menusDocente, menusEstudiante } from './menu.helper'
import HorarioEstudiante from '@/model/interfaces/horario/horarioEstudiante'
import HorarioEspecifico from '@/model/interfaces/horario/horarioEspecifico'
import { DetalleDuracion } from '@/model/interfaces/datosEnviados/registroDuracionPractica'
import HorarioItem from '@/model/interfaces/horario/horarioItem'
import DuracionPracticas from '@/model/interfaces/practicas/duracionPracticas'
import MostrarDuracionFlexible from '@/model/interfaces/practicas/mostrarDuracionFlexible'
import MostrarDuracionEstandar, { ListaDias, ListaHorarioDias } from '@/model/interfaces/practicas/mostrarDuracionRegular'
import MostrarDocumentoUrl from '@/model/interfaces/documento/mostrarDocumento'
import FilePreview from '@/model/interfaces/documento/filePreview'
import DocumentoAdmin from '@/model/interfaces/documento/mostrarDocumentoAdmin'
import CartaPresentacionDatos from '@/model/interfaces/cartaPresentacion/cartaPresentacion'

export function formatTime(value: string) {
  var hourEnd = value.indexOf(":")
  var H = +value.substr(0, hourEnd)
  var h = H % 12 || 12
  var ampm = H < 12 || H === 24 ? "AM" : "PM"
  return h + value.substr(hourEnd, 3) + ":" + value.substr(6, 2) + " " + ampm
}

export function convertirANumerosRomanos(numero: number | string): string {
  // Si el argumento es un string, lo convertimos a un número
  if (typeof numero === 'string') {
    numero = parseInt(numero);
  }

  // Verificamos si el número está dentro del rango permitido (1-20)
  if (isNaN(numero) || numero < 1 || numero > 20) {
    return "--"; // Devuelve un mensaje si el número está fuera del rango permitido
  }

  const numerosRomanos = [
    { valor: 10, simbolo: 'X' },
    { valor: 9, simbolo: 'IX' },
    { valor: 5, simbolo: 'V' },
    { valor: 4, simbolo: 'IV' },
    { valor: 1, simbolo: 'I' }
  ];

  let resultado = '';
  for (let i = 0; i < numerosRomanos.length; i++) {
    while (numero >= numerosRomanos[i].valor) {
      resultado += numerosRomanos[i].simbolo;
      numero -= numerosRomanos[i].valor;
    }
  }

  return resultado;
}

export function corregirDNI(numero: number | string): string {
  let input: string = numero.toString()
  // Agregar ceros a la izquierda si la longitud es menor que 8
  while (input.length < 8) {
    input = "0" + input
  }
  // Limitar la longitud a 8 caracteres
  return input.slice(0, 8)
}

export function obtenerUltimaPalabra(frase: string): string {
  // Dividir la frase en palabras usando el espacio como delimitador
  const palabras = frase.split(' ')
  // Tomar la última palabra del array de palabras
  const ultimaPalabra = palabras[palabras.length - 1]
  return ultimaPalabra
}

export function formatearPalabrasPrimeraMayus(frase: string): string {
  // Conjunciones y palabras especiales en minúsculas
  const conjunciones = ['y', 'e', 'en', 'de', 'la'];

  // Función para capitalizar la primera letra de una palabra
  const capitalizarPalabra = (palabra: string): string => {
    // Verifica si la palabra está en la lista de conjunciones
    if (conjunciones.includes(palabra.toLowerCase())) {
      return palabra.toLowerCase()// Devuelve la palabra en minúsculas sin modificar
    }
    // Capitaliza la primera letra y convierte el resto en minúsculas
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
  }

  // Divide la frase en palabras y las corrige una por una
  const palabrasCorregidas = frase.split(' ').map(capitalizarPalabra)

  // Une las palabras corregidas en una nueva frase
  const fraseCorregida = palabrasCorregidas.join(' ')

  return fraseCorregida
}

export function obtenerSedeFechaHoy(sede: string): string {
  const fechaHoy = new Date() // Obtener la fecha de hoy
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'] // Nombres de los meses

  const dia = fechaHoy.getDate() // Obtener el día del mes
  const mes = meses[fechaHoy.getMonth()]// Obtener el nombre del mes
  const año = fechaHoy.getFullYear()// Obtener el año

  // Construir la cadena de fecha
  const fechaFormateada = `${dia} de ${mes} del ${año}`

  // Función para capitalizar la primera letra de una palabra
  const capitalizarPalabra = (palabra: string): string => {
    // Verifica si la palabra es "de", que debe mantenerse en minúsculas
    if (palabra.toLowerCase() === "de") {
      return palabra.toLowerCase()
    }
    // Capitaliza la primera letra y convierte el resto en minúsculas
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
  }

  // Capitalizar la primera letra de cada palabra de la sede, excepto "de"
  const palabrasSede = sede.split(' ').map((palabra, index) => index === 0 ? capitalizarPalabra(palabra) : palabra)

  // Formatear la sede
  const sedeFormateada = palabrasSede.join(' ')

  // Retornar el texto con la sede y la fecha formateada
  return `${sedeFormateada}, ${fechaFormateada}`
}

export function corregirNombreAdministrativo(frase: string): string {
  const palabrasAEliminar = ['phd', 'magister', 'profesor', 'doctor'];
  let palabras = frase.trim().split(/\s+/); // Dividir la frase en palabras y eliminar espacios en blanco al inicio y al final

  // Verificar si la primera palabra coincide con alguna de las palabras a eliminar
  if (palabrasAEliminar.includes(palabras[0].toLowerCase())) {
    palabras = palabras.slice(1); // Eliminar la primera palabra si coincide con alguna de las palabras a eliminar
  }

  // Eliminar espacios en blanco repetidos y unir las palabras nuevamente en una frase
  const fraseSinEspaciosRepetidos = palabras.join(' ');

  return fraseSinEspaciosRepetidos;
}

export function formatoFecha_Date_String(fecha: string): string {
  const fechaObjeto = new Date(fecha);
  const año = fechaObjeto.getFullYear();
  const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaObjeto.getDate()).padStart(2, '0');
  return `${año}-${mes}-${dia}`;
}

export function formatoFecha_Date_fechaSlash(fecha: string): string {
  const fechaObjeto = new Date(fecha);
  const año = fechaObjeto.getFullYear();
  const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0');
  const dia = String(fechaObjeto.getDate()).padStart(2, '0');
  return `${dia}/${mes}/${año}`;
}

export function formatoFechaOperacion(fechaPago: string): string {
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const date = new Date(fechaPago);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let formattedDate = `${day} de ${month} de ${year}`;

  if (hours !== 0 || minutes !== 0 || seconds !== 0) {
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // convierte el formato 24h a 12h
    const formattedMinutes = minutes.toString().padStart(2, '0');

    formattedDate += ` ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return formattedDate;
};

export function formatoFecha_Date_completo(fecha: string): string {
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const fechaObjeto = new Date(fecha);
  const dia = String(fechaObjeto.getDate()).padStart(2, '0');
  const mes = meses[fechaObjeto.getMonth()];
  const año = fechaObjeto.getFullYear();

  let hora = fechaObjeto.getHours();
  const minutos = String(fechaObjeto.getMinutes()).padStart(2, '0');
  const periodo = hora >= 12 ? 'pm' : 'am';

  if (hora > 12) {
    hora -= 12;
  } else if (hora === 0) {
    hora = 12;
  }

  return `${dia} de ${mes} del ${año}, ${hora}:${minutos} ${periodo}`;
}

// Función para convertir de "aaaa-mm-dd" a "dd/mm/aaaa"
export function convertirFormatoFechaInput(fecha: string) {
  if (fecha === '') return ''
  const partes = fecha.split("-")
  return `${partes[2]}/${partes[1]}/${partes[0]}`
}

// Función para revertir de "dd/mm/aaaa" a "aaaa-mm-dd"
export function revertirFormatoFechaForm(fecha: string) {
  if (fecha === '') return ''
  const partes = fecha.split("/")
  return `${partes[2]}-${partes[1]}-${partes[0]}`
}

//E
export function convertirTiempoDecimalAHorasYMonutos(decimalHoras: number): string {
  const totalHoursInt = Math.floor(decimalHoras);
  const minutes = Math.round((decimalHoras % 1) * 60);

  if (totalHoursInt === 0) {
    return `${minutes} min`;
  } else if (minutes === 0) {
    return `${totalHoursInt} h`;
  } else {
    return `${totalHoursInt} h ${minutes} min`;
  }
}

export function calcularCantDiasFlexible(cantHoras: number, horasXdia: { [day: string]: number }): number {
  const keys = Object.keys(horasXdia);

  // Verificar si el objeto está vacío
  if (keys.length === 0) return 0;

  let avance = 0
  let cantDias = 0;
  let diasAcumulado = 0;

  while (diasAcumulado < cantHoras) {
    const key = keys[avance % keys.length]; // Obtener la clave actual
    diasAcumulado += horasXdia[key];
    // Sumar el valor al contador2
    if (horasXdia[key] > 0) {
      cantDias++; // Aumentar el contador1
    }
    avance++
  }

  return cantDias;
}

export function calcularCantDiasEstandar(cantHoras: number, horasXdia: number): number {
  let cantDias = Math.ceil(cantHoras / horasXdia)
  return cantDias;
}

export function convertirFechaPago_aaaa_mm_dd(fecha: string): string {
  // Crear un objeto Date a partir de la cadena de fecha
  const dateObj = new Date(fecha);

  // Obtener los componentes de la fecha
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11
  const day = ("0" + dateObj.getDate()).slice(-2);

  // Formatear la fecha en el formato "aaaa-mm-dd"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

// Función para realizar hash utilizando SHA-256
export function hashStringSHA256(input: string) {
  const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex)
  return hash
}

// Función para comparar un valor con un hash
export function compararHashSHA256(valor: string, hash: string) {
  return hashStringSHA256(valor) === hash
}

export const ArmarMenu = async (tipoUsuario: string, isAdmin: boolean) => {

  let menus: MenuItem[] = []

  if (compararHashSHA256(import.meta.env.VITE_USER_TYPO_ES, tipoUsuario)) {
    menus = menusEstudiante
  }

  if (compararHashSHA256(import.meta.env.VITE_USER_TYPO_AD, tipoUsuario)) {

    menus = menusDocente
    if (isAdmin) {
      menus = menus.concat(menusCoordinador)
    }
  }

  return menus
}

export function obtenerHorarioDesdeJSON(jsonData: HorarioEstudiante[]): HorarioEspecifico[] {
  const diasSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
  const horario: HorarioEspecifico[] = []

  jsonData.forEach((item) => {
    diasSemana.forEach((dia, index) => {
      let horarioDia: string | null = null

      switch (dia) {
        case 'domingo':
          horarioDia = item.domingo
          break
        case 'lunes':
          horarioDia = item.lunes
          break
        case 'martes':
          horarioDia = item.martes
          break
        case 'miercoles':
          horarioDia = item.miercoles
          break
        case 'jueves':
          horarioDia = item.jueves
          break
        case 'viernes':
          horarioDia = item.viernes
          break
        case 'sabado':
          horarioDia = item.sabado
          break
        default:
          break
      }

      if (typeof horarioDia === 'string') {

        const elementos = horarioDia.split('_')
        // Obtener nombre de la asignatura
        const asignatura = elementos[2]
        // Obtener asigId
        const asigId = elementos[1]
        // Obtener horaInicio y horaFin
        const horaInicio = elementos[8]
        const horaFin = elementos[9]

        const horaIniFin = horarioDia.match(/_(\d{2}:\d{2})_(\d{2}:\d{2})_/)

        if (horaIniFin) {
          horario.push({
            idDia: index,
            dia: dia,
            horaini: horaInicio,
            horafin: horaFin,
            idAsig: asigId,
            nombreAsig: asignatura
          })
        }
      }
    })
  })

  return horario
}

//// combinar listas
export function combinarHorarios(horariosEstaticos: HorarioEspecifico[], detallesDuracion: DetalleDuracion[]): HorarioItem[] {
  const horarios: HorarioItem[] = []

  // Agregar horarios estáticos
  horariosEstaticos.forEach((horarioEstatico) => {
    horarios.push({
      detHorarioId: 1,
      asiId: horarioEstatico.idAsig,
      asignatura: horarioEstatico.nombreAsig,
      diaId: horarioEstatico.idDia,
      dia: horarioEstatico.dia,
      horaIni: horarioEstatico.horaini,
      horaFin: horarioEstatico.horafin,
      color: '#EF9A9A'
    })
  })

  // Agregar horarios dinámicos
  detallesDuracion.forEach((detalle) => {
    if (detalle.horaInicio !== '' && detalle.horaFin !== '') {
      horarios.push({
        detHorarioId: 2,
        asiId: "---", // Valor no relevante en la lista dinámica
        asignatura: "Horario Prácticas Seleccionadas",
        diaId: detalle.diaId,
        dia: obtenerDiaSemana(detalle.diaId), // Función para obtener el nombre del día a partir del díaId
        horaIni: detalle.horaInicio,
        horaFin: detalle.horaFin,
        color: '#81C784'
      })
    }
  })

  return horarios
}

//// combinar listas
export function combinarHorariosDetalle(horariosEstaticos: HorarioEspecifico[], detallesDuracion: DetalleDuracion[]): HorarioItem[] {
  const horarios: HorarioItem[] = []

  // Agregar horarios estáticos
  horariosEstaticos.forEach((horarioEstatico) => {
    horarios.push({
      detHorarioId: 1,
      asiId: horarioEstatico.idAsig,
      asignatura: horarioEstatico.nombreAsig,
      diaId: horarioEstatico.idDia,
      dia: horarioEstatico.dia,
      horaIni: horarioEstatico.horaini,
      horaFin: horarioEstatico.horafin,
      color: '#EF9A9A'
    })
  })

  // Agregar horarios dinámicos
  detallesDuracion.forEach((detalle) => {
    if (detalle.horaInicio !== '' && detalle.horaFin !== '') {
      horarios.push({
        detHorarioId: 2,
        asiId: "---", // Valor no relevante en la lista dinámica
        asignatura: "Horario Prácticas PreProfesionales",
        diaId: detalle.diaId,
        dia: obtenerDiaSemana(detalle.diaId), // Función para obtener el nombre del día a partir del díaId
        horaIni: detalle.horaInicio,
        horaFin: detalle.horaFin,
        color: '#81C784'
      })
    }
  })

  return horarios
}

function obtenerDiaSemana(diaId: number): string {
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  return diasSemana[diaId]
}

// Función para determinar si hay cruces de horarios en una lista dada
export function hayCruces(horarios: HorarioItem[]): boolean {
  for (let i = 0; i < horarios.length; i++) {
    for (let j = i + 1; j < horarios.length; j++) {
      // Verificar si hay cruce entre los horarios
      if (horarios[i].diaId === horarios[j].diaId &&
        hayCruceHorario(horarios[i].horaIni, horarios[i].horaFin, horarios[j].horaIni, horarios[j].horaFin)) {
        return true // Hay un cruce, devolver true
      }
    }
  }
  return false; // No hay cruces, devolver false
}

// Función para verificar si hay cruce entre dos horarios
function hayCruceHorario(horaIni1: string, horaFin1: string, horaIni2: string, horaFin2: string): boolean {
  return horaIni1 < horaFin2 && horaFin1 > horaIni2
}

export function convertirHora24to12(hora24: string) {
  // Dividir la hora en horas y minutos
  var partes = hora24.split(':')
  var horas = parseInt(partes[0])
  var minutos = parseInt(partes[1])

  // Determinar si es am o pm
  var periodo = horas >= 12 ? 'pm' : 'am'

  // Convertir horas a formato de 12 horas
  horas = horas % 12
  horas = horas ? horas : 12 // Hacer que las 0 horas sean 12 AM

  // Formatear la hora en formato de 12 horas con am/pm
  var hora12 = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0') + ' ' + periodo

  return hora12
}

export function convertirDuracionAMostrarFlexible(duraciones: DuracionPracticas[]): MostrarDuracionFlexible[] {
  // Objeto para almacenar los elementos agrupados por día
  const duracionesAgrupadas: { [diaId: number]: MostrarDuracionFlexible } = {};

  // Iterar sobre cada DuracionPracticas y agrupar por día
  duraciones.forEach(duracion => {
    if (!duracionesAgrupadas[duracion.diaId]) {
      // Si el día no existe en el objeto agrupado, crear uno nuevo
      duracionesAgrupadas[duracion.diaId] = {
        diaId: duracion.diaId,
        diaNombre: duracion.diaNombre,
        detalleDia: []
      };
    }

    // Agregar el horario al detalleDia correspondiente
    duracionesAgrupadas[duracion.diaId].detalleDia.push({
      detalleDiaId: duracion.detalleDiaId,
      horaInicio: duracion.horaInicio,
      horaFin: duracion.horaFin
    });
  });

  // Convertir el objeto agrupado a un array
  const duracionesMostradas: MostrarDuracionFlexible[] = Object.values(duracionesAgrupadas);

  return duracionesMostradas;
}

// Función para convertir la lista de DuracionPracticas a MostrarDuracionRegular
export function convertirDuracionAMostrarRegular(duraciones: DuracionPracticas[]): MostrarDuracionEstandar {
  const listaDias: ListaDias[] = [];
  const listaHorarioDia: ListaHorarioDias[] = [];

  // Iterar sobre la lista de duraciones
  for (let i = 0; i < duraciones.length; i++) {
    const duracion = duraciones[i];

    // Si es el primer día en la lista
    if (i === 0) {
      listaHorarioDia.push({
        horaInicio: duracion.horaInicio,
        horaFin: duracion.horaFin
      });
    }

    // Si el día no está en la lista de días, agregarlo
    const existeDia = listaDias.some(dia => dia.diaId === duracion.diaId);
    if (!existeDia) {
      listaDias.push({
        diaId: duracion.diaId,
        diaNombre: duracion.diaNombre
      });
    }
  }

  return {
    listaDias: listaDias,
    listaHorarioDia: listaHorarioDia
  }
}

export const obtenerNombreArchivo = (url: string) => {
  const partesURL = url.split('/')
  return partesURL[partesURL.length - 1]
}

export const obtenerTipoArchivo = (nombreArchivo: string): string => {
  const extension = nombreArchivo.split('.').pop()?.toLowerCase() // Obtener la extensión del archivo
  if (extension) {
    switch (extension) {
      case 'pdf':
        return 'pdf'
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'imagen'
      case 'doc':
      case 'docx':
        return 'doc'
      // Agrega más casos para otras extensiones si es necesario
      default:
        return 'Desconocido'
    }
  } else {
    return 'Desconocido' // Si no se puede determinar la extensión
  }
}

export const obtenerArchivosVistaPrevia = (docUrlMostrado?: MostrarDocumentoUrl | null): FilePreview[] => {
  const archivosVistaPrevia: FilePreview[] = docUrlMostrado ? [
    {
      nombre: docUrlMostrado.urlDoc,
      url: import.meta.env.VITE_STORAGE_DOCUMENT + '/' + docUrlMostrado.urlCifrado,
    },
  ] : []

  return archivosVistaPrevia
}

export const obtenerArchivosVistaPreviaAdmin = (docAdmin?: DocumentoAdmin | null): FilePreview[] => {
  const archivosVistaPrevia: FilePreview[] = docAdmin ? [
    {
      nombre: docAdmin.documentoUrl,
      url: import.meta.env.VITE_STORAGE_DOCUMENT + '/' + docAdmin.documentoCifrado,
    },
  ] : [];

  return archivosVistaPrevia;
}

export const obtenerDescripcion = (tipoDoc: string): string => {
  switch (tipoDoc) {
    case 'IF':
      return 'Informe Final';
    case 'CE':
      return 'Constancia de Empresa';
    case 'CP':
      return 'Convenio de Prácticas';
    case 'CA':
      return 'Carta de Aceptación';
    case 'AV':
      return 'Asistencia Visada';
    case 'UT1':
      return 'Unidad Temática 1';
    case 'UT2':
      return 'Unidad Temática 2';
    case 'UT3':
      return 'Unidad Temática 3';
    case 'UT4':
      return 'Unidad Temática 4';
    default:
      return '';
  }
}

export const obtenerNombreInforme = (codigo: number) => {

  switch (codigo) {
    case 113286:
      return 'AS - PP1'
    case 113296:
      return 'AS - PP2'
    case 123276:
      return 'CF - PP1'
    case 123284:
      return 'CF - PP2'
    case 123297:
      return 'CF - PP3'
    default:
      return ''
  }
}

export const obtenerHorasTotales = (codigo: number) => {
  switch (codigo) {
    case 113286:
      return 240;
    case 113296:
      return 240;
    case 123276:
      return 180;
    case 123284:
      return 240;
    case 123297:
      return 320;
    default:
      return 0;
  }
}

export function convertirHorarioDetalle(detallePracticas: DuracionPracticas[]): DetalleDuracion[] {
  return detallePracticas.map((detalle: DuracionPracticas) => ({
    diaId: detalle.diaId,
    horaInicio: detalle.horaInicio,
    horaFin: detalle.horaFin
  }))
}

export function raizDoc() {
  const raiz = import.meta.env.VITE_STORAGE_DOC_REQUERIDO
  return raiz
}

export function validadoCarta(datos: CartaPresentacionDatos[]): boolean {
  return !datos.some(item => item.cartaEstado === 2);
};

export function obtenerDiferencia(cadena1: string, cadena2: string): string {
  // Remover espacios en blanco y separar la cadena por la coma
  const [parte1, parte2] = cadena1.split(',').map(s => s.trim());
  
  if (parte1 === cadena2) {
    return parte2 || ''; // Retorna la segunda parte si existe, sino retorna una cadena vacía
  }
  return '';
}
