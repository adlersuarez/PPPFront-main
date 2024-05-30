import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Filler, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Filler,
    Legend
)

interface DatasetItem {
    id: string
    label: string
    data: number[]
    bgColor: string
    borderColor?: string
    borderWidth?: number
    stack?: string
}

interface ChartProps {
    data: DatasetItem[]
    labels: string[]
    titulo?: string
    legend: boolean
    indexAxis?: 'x' | 'y'; // Parámetro opcional para indexAxis
}

const BarChart: React.FC<ChartProps> = ({ data, labels, titulo, indexAxis, legend }) => {

    const maxData = data.reduce((max, dataset) => {
        const maxInDataset = Math.max(...dataset.data); // Encuentra el máximo en cada conjunto de datos
        return Math.max(max, maxInDataset); // Encuentra el máximo de todos los máximos encontrados
    }, -Infinity)

    const datasets = data.map(dataset => (
        {
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.bgColor,
            borderColor: dataset.borderColor,
            borderWidth: dataset.borderWidth,
            stack: dataset.stack
        }
    ))

    const chartData = {
        labels: labels,
        datasets: datasets,
    }

    const splitLabel = (label: string, maxWidth: number): string[] => {
        const words = label.split(' ')
        let currentLine = words[0]
        const lines = []

        for (let i = 1; i < words.length; i++) {
            if ((currentLine + words[i]).length <= maxWidth) {
                currentLine += ` ${words[i]}`
            } else {
                lines.push(currentLine)
                currentLine = words[i]
            }
        }
        lines.push(currentLine)
        return lines
    }

    const options = {
        indexAxis: indexAxis, // Utiliza el valor del parámetro indexAxis
        responsive: true,
        plugins: {
            legend: {
                display: legend,
                position: 'top' as const,
            },
            title: {
                display: !!titulo,
                text: titulo?.toUpperCase(),
            },
        },
        scales: {
            y: {
                suggestedMin: 0, // Establece el valor mínimo del eje y
                suggestedMax: maxData + 1, // Establece el valor máximo del eje y
                ticks: {
                    stepSize: maxData > 10 ? 5 : 1,
                    callback: indexAxis === 'y' ? function (_: any, index: number) {
                        const label = labels[index]
                        const maxWidth = 20 // Define la longitud máxima de cada línea
                        return splitLabel(label, maxWidth)
                    } : undefined,
                    font: {
                        size: indexAxis === 'y' ? 10 : 12, // Define el tamaño de la fuente de las etiquetas
                    },
                },
            },
            x: {
                suggestedMin: 0, // Establece el valor mínimo del eje y
                suggestedMax: maxData + 1, // Establece el valor máximo del eje y
                ticks: {
                    stepSize: maxData > 10 ? 5 : 1,
                    callback: indexAxis === 'x' ? function (_: any, index: number) {
                        const label = labels[index]
                        const maxWidth = 20 // Define la longitud máxima de cada línea
                        return splitLabel(label, maxWidth)
                    } : undefined,
                    font: {
                        size: indexAxis === 'x' ? 12 : 12, // Define el tamaño de la fuente de las etiquetas
                    },
                },
            },
        },
    }

    return (
        <Bar data={chartData} options={options} />
    )
}

export default BarChart