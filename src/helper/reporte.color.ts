import ColorHelp from "@/model/interfaces/reportes/colorBg";
import RankEmpresa from "@/model/interfaces/reportes/rankEmpresa";
import TipoDia from "@/model/interfaces/reportes/tipoDia";
import TipoEmpresa from "@/model/interfaces/reportes/tipoEmpresa";
import TipoGradoJefe from "@/model/interfaces/reportes/tipoGradoJefe";

export const bgColorReportes: ColorHelp[] = [
    {
        idNumerico: 1,
        idColor: "Rojo",
        backgroundRGBA: 'rgba(255, 99, 132, 0.5)',
        borderRGBA: 'rgba(255, 99, 132)',
        bgHEX: '#FF6384'
    },
    {
        idNumerico: 2,
        idColor: "Azul",
        backgroundRGBA: 'rgba(54, 162, 235, 0.5)',
        borderRGBA: 'rgba(54, 162, 235)',
        bgHEX: '#36A2EB'
    },
    {
        idNumerico: 3,
        idColor: "Amarillo",
        backgroundRGBA: 'rgba(255, 205, 86, 0.5)',
        borderRGBA: 'rgba(255, 205, 86)',
        bgHEX: '#FFCE56'
    },
    {
        idNumerico: 4,
        idColor: "Verde agua",
        backgroundRGBA: 'rgba(75, 192, 192, 0.5)',
        borderRGBA: 'rgba(75, 192, 192)',
        bgHEX: '#4BC0C0'
    },
    {
        idNumerico: 5,
        idColor: "Violeta",
        backgroundRGBA: 'rgba(153, 102, 255, 0.5)',
        borderRGBA: 'rgba(153, 102, 255)',
        bgHEX: '#9966FF'
    },
    {
        idNumerico: 6,
        idColor: "Naranja",
        backgroundRGBA: 'rgba(255, 159, 64, 0.5)',
        borderRGBA: 'rgba(255, 159, 64)',
        bgHEX: '#FFA500'
    },
    {
        idNumerico: 7,
        idColor: "Gris",
        backgroundRGBA: 'rgba(128, 128, 128, 0.5)',
        borderRGBA: 'rgba(128, 128, 128)',
        bgHEX: '#808080'
    },
    {
        idNumerico: 8,
        idColor: "Turquesa",
        backgroundRGBA: 'rgba(0, 206, 209, 0.5)',
        borderRGBA: 'rgba(0, 206, 209)',
        bgHEX: '#00CED1'
    },
    {
        idNumerico: 9,
        idColor: "Magenta",
        backgroundRGBA: 'rgba(255, 0, 255, 0.5)',
        borderRGBA: 'rgba(255, 0, 255)',
        bgHEX: '#FF00FF'
    },
    {
        idNumerico: 10,
        idColor: "Negro",
        backgroundRGBA: 'rgba(0, 0, 0, 0.5)',
        borderRGBA: 'rgba(0, 0, 0)',
        bgHEX: '#000000'
    }
]

//Convertir formato completoa a solo RGBA
export function convertirBgColortoArrayRGBA(bgColors: ColorHelp[]): string[] {
    return bgColors.map(color => color.backgroundRGBA)
}

// ------------------ TIPO EMPRESA ---------------
export function getCantidadesTipoEmpresa(empresas: TipoEmpresa[]): number[] {
    return empresas.map(empresa => empresa.cantidad)
}
export function getLabelsTipoEmpresa(empresas: TipoEmpresa[]): string[] {
    return empresas.map(empresa => empresa.tipoEmpresa)
}
export function totalTipoEmpresa(empresas: TipoEmpresa[]): number {
    return empresas.reduce((total, empresa) => total + empresa.cantidad, 0)
}
export function agregarColorHexTipoEmpresa(empresas: TipoEmpresa[], colors: ColorHelp[]): (TipoEmpresa & { hexColor: string })[] {
    return empresas.map((empresa, index) => {
        const color = colors[index % colors.length] // Usa el índice para obtener el color correspondiente
        return {
            ...empresa,
            hexColor: color.bgHEX
        }
    })
}


// ------------------ RANK EMPRESA ---------------
export function getCantidadesRankEmpresa(rankEmpresas: RankEmpresa[]): number[] {
    return rankEmpresas.map(empresa => empresa.cantidad)
}
export function getLabelsRankEmpresa(rankEmpresas: RankEmpresa[]): string[] {
    return rankEmpresas.map(empresa => empresa.empresaNombre)
}
export function totalRankEmpresa(rankEmpresas: RankEmpresa[]): number {
    return rankEmpresas.reduce((total, empresa) => total + empresa.cantidad, 0)
}
export function agregarColorHexRankEmpresa(rankEmpresas: RankEmpresa[], colors: ColorHelp[]): (RankEmpresa & { hexColor: string })[] {
    return rankEmpresas.map((empresa, index) => {
        const color = colors[index % colors.length] // Usa el índice para obtener el color correspondiente
        return {
            ...empresa,
            hexColor: color.bgHEX
        }
    })
}


// ------------------ GRADO JEFE ---------------
export function getCantidadesTipoGradoJefe(grados: TipoGradoJefe[]): number[] {
    return grados.map(grado => grado.cantidad)
}
export function getLabelsTipoGradoJefe(grados: TipoGradoJefe[]): string[] {
    return grados.map(grado => grado.gradoNombre)
}
export function totalTipoGradoJefe(grados: TipoGradoJefe[]): number {
    return grados.reduce((total, grado) => total + grado.cantidad, 0)
}
export interface TipoGradoJefeConColor extends TipoGradoJefe {
    hexColor: string
}
export function agregarColorHexTipoGradoJefe(grados: TipoGradoJefe[], colors: ColorHelp[]): (TipoGradoJefe & { hexColor: string })[] {
    return grados.map((grado, index) => {
        const color = colors[index % colors.length] // Usa el índice para obtener el color correspondiente
        return {
            ...grado,
            hexColor: color.bgHEX
        }
    })
}


// ------------------ TIPO DIA SEMANA ---------------
export function getCantidadesTipoDia(dias: TipoDia[]): number[] {
    return dias.map(dia => dia.cantidad)
}
export function getLabelsTipoDia(dias: TipoDia[]): string[] {
    return dias.map(dia => dia.diaNombre)
}
export function totalTipoDia(dias: TipoDia[]): number {
    return dias.reduce((total, dia) => total + dia.cantidad, 0)
}
export function agregarColorHexTipoDia(dias: TipoDia[], colors: ColorHelp[]): (TipoDia & { hexColor: string })[] {
    return dias.map((dia, index) => {
        const color = colors[index % colors.length] // Usa el índice para obtener el color correspondiente
        return {
            ...dia,
            hexColor: color.bgHEX
        }
    })
}