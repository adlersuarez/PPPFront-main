export function formatTime(value: string) {
    var hourEnd = value.indexOf(":");
    var H = +value.substring(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? "AM" : "PM";
    return h + value.substring(hourEnd, hourEnd + 3) + ":" + value.substring(6, 8) + " " + ampm;
}

export function formatDateTimeToFecha(fechaOriginal: string) {
    const fecha = new Date(fechaOriginal);
    const formatoFecha = new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(fecha);

    return formatoFecha
}

export function keyNumberInteger(event: React.KeyboardEvent<HTMLInputElement>): void {
    const key: string = event.key;
    const c: string = key.length === 1 ? key : '';
    if ((c < "0" || c > "9") && c !== "\b") {
        event.preventDefault();
    }
}

export function keyNumberFloat(event: React.KeyboardEvent<HTMLInputElement>): void {
    const c: string = event.key;
    const input: HTMLInputElement = event.target as HTMLInputElement;

    if ((c < "0" || c > "9") && c !== "\b" && c !== ".") {
        event.preventDefault();
    }
    if (c === "." && input.value.includes(".")) {
        event.preventDefault();
    }
}


export const diaSelect = [
    { "id": 1, "dia": 'Lunes' },
    { "id": 2, "dia": 'Martes' },
    { "id": 3, "dia": 'Miercoles' },
    { "id": 4, "dia": 'Jueves' },
    { "id": 5, "dia": 'Viernes' },
    { "id": 6, "dia": 'Sabado' },
    { "id": 7, "dia": 'Domingo' }
]

export const horaSelect = [
    {
        "id": 1,
        "hora": "6:00"
    },
    {
        "id": 2,
        "hora": "6:15"
    },
    {
        "id": 3,
        "hora": "6:30"
    },
    {
        "id": 4,
        "hora": "6:45"
    },
    {
        "id": 5,
        "hora": "7:00"
    },
    {
        "id": 6,
        "hora": "7:15"
    },
    {
        "id": 7,
        "hora": "7:30"
    },
    {
        "id": 8,
        "hora": "7:45"
    },
    {
        "id": 9,
        "hora": "8:00"
    },
    {
        "id": 10,
        "hora": "8:15"
    },
    {
        "id": 11,
        "hora": "8:30"
    },
    {
        "id": 12,
        "hora": "8:45"
    },
    {
        "id": 13,
        "hora": "9:00"
    },
    {
        "id": 14,
        "hora": "9:15"
    },
    {
        "id": 15,
        "hora": "9:30"
    },
    {
        "id": 16,
        "hora": "9:45"
    },
    {
        "id": 17,
        "hora": "10:00"
    },
    {
        "id": 18,
        "hora": "10:15"
    },
    {
        "id": 19,
        "hora": "10:30"
    },
    {
        "id": 20,
        "hora": "10:45"
    },
    {
        "id": 21,
        "hora": "11:00"
    },
    {
        "id": 22,
        "hora": "11:15"
    },
    {
        "id": 23,
        "hora": "11:30"
    },
    {
        "id": 24,
        "hora": "11:45"
    },
    {
        "id": 25,
        "hora": "12:00"
    },
    {
        "id": 26,
        "hora": "12:15"
    },
    {
        "id": 27,
        "hora": "12:30"
    },
    {
        "id": 28,
        "hora": "12:45"
    },
    {
        "id": 29,
        "hora": "13:00"
    },
    {
        "id": 30,
        "hora": "13:15"
    },
    {
        "id": 31,
        "hora": "13:30"
    },
    {
        "id": 32,
        "hora": "13:45"
    },
    {
        "id": 33,
        "hora": "14:00"
    },
    {
        "id": 34,
        "hora": "14:15"
    },
    {
        "id": 35,
        "hora": "14:30"
    },
    {
        "id": 36,
        "hora": "14:45"
    },
    {
        "id": 37,
        "hora": "15:00"
    },
    {
        "id": 38,
        "hora": "15:15"
    },
    {
        "id": 39,
        "hora": "15:30"
    },
    {
        "id": 40,
        "hora": "15:45"
    },
    {
        "id": 41,
        "hora": "16:00"
    },
    {
        "id": 42,
        "hora": "16:15"
    },
    {
        "id": 43,
        "hora": "16:30"
    },
    {
        "id": 44,
        "hora": "16:45"
    },
    {
        "id": 45,
        "hora": "17:00"
    },
    {
        "id": 46,
        "hora": "17:15"
    },
    {
        "id": 47,
        "hora": "17:30"
    },
    {
        "id": 48,
        "hora": "17:45"
    },
    {
        "id": 49,
        "hora": "18:00"
    },
    {
        "id": 50,
        "hora": "18:15"
    },
    {
        "id": 51,
        "hora": "18:30"
    },
    {
        "id": 52,
        "hora": "18:45"
    },
    {
        "id": 53,
        "hora": "19:00"
    },
    {
        "id": 54,
        "hora": "19:15"
    },
    {
        "id": 55,
        "hora": "19:30"
    },
    {
        "id": 56,
        "hora": "19:45"
    },
    {
        "id": 57,
        "hora": "20:00"
    },
    {
        "id": 58,
        "hora": "20:15"
    },
    {
        "id": 59,
        "hora": "20:30"
    },
    {
        "id": 60,
        "hora": "20:45"
    },
    {
        "id": 61,
        "hora": "21:00"
    },
    {
        "id": 62,
        "hora": "21:15"
    },
    {
        "id": 63,
        "hora": "21:30"
    },
    {
        "id": 64,
        "hora": "21:45"
    },
    {
        "id": 65,
        "hora": "22:00"
    }
]

export const colorSelect = [
    { "id": 1, "nombreColor": 'Rojo', "codColor": '#EF9A9A' },
    { "id": 2, "nombreColor": 'Verde', "codColor": '#81C784' },
    { "id": 3, "nombreColor": 'Azul', "codColor": '#64B5F6' },
    { "id": 4, "nombreColor": 'Amarillo', "codColor": '#FFF59D' },
    { "id": 5, "nombreColor": 'Naranja', "codColor": '#FFCC80' },
    { "id": 6, "nombreColor": 'Morado', "codColor": '#BA68C8' },
    { "id": 7, "nombreColor": 'Rosa', "codColor": '#F48FB1' },
    { "id": 8, "nombreColor": 'Cyan', "codColor": '#4DD0E1' },
    { "id": 9, "nombreColor": 'Gris', "codColor": '#B0BEC5' },
    { "id": 10, "nombreColor": 'Negro', "codColor": '#757575' },
    { "id": 11, "nombreColor": 'Marrón', "codColor": '#8D6E63' }
];

export const seccionSelect = [
    { "id": 1, "nombreSeccion": "A" },
    { "id": 2, "nombreSeccion": "B" },
    { "id": 3, "nombreSeccion": "C" },
    { "id": 4, "nombreSeccion": "D" },
    { "id": 5, "nombreSeccion": "E" },
    { "id": 6, "nombreSeccion": "F" },
    { "id": 7, "nombreSeccion": "G" },
    { "id": 8, "nombreSeccion": "H" },
    { "id": 9, "nombreSeccion": "I" },
    { "id": 10, "nombreSeccion": "J" },
    { "id": 11, "nombreSeccion": "K" },
    { "id": 12, "nombreSeccion": "L" },
    { "id": 13, "nombreSeccion": "M" },
    { "id": 14, "nombreSeccion": "N" },
    { "id": 15, "nombreSeccion": "O" },
    { "id": 16, "nombreSeccion": "P" },
    { "id": 17, "nombreSeccion": "Q" },
    { "id": 18, "nombreSeccion": "R" },
    { "id": 19, "nombreSeccion": "S" },
    { "id": 20, "nombreSeccion": "T" },
    { "id": 21, "nombreSeccion": "U" },
    { "id": 22, "nombreSeccion": "V" },
    { "id": 23, "nombreSeccion": "W" },
    { "id": 24, "nombreSeccion": "X" },
    { "id": 25, "nombreSeccion": "Y" },
    { "id": 26, "nombreSeccion": "Z" }
];