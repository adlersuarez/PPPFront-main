import React from 'react';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Registra los elementos y escalas necesarios
ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
)

interface DatasetItem {
    id: string
    type: 'line' | 'bar'
    label: string
    data: number[]
    borderColor: string
    borderWidth?: number
    bgColor?: string
    fill?: boolean
}

interface ChartProps {
    data: DatasetItem[]
    labels: string[]
    titulo?: string
}

// Definición del componente
export const MultipleCustomChart: React.FC<ChartProps> = ({ data, labels, titulo }) => {
    const maxData = data.reduce((max, dataset) => {
        const maxInDataset = Math.max(...dataset.data);
        return Math.max(max, maxInDataset);
    }, -Infinity)

    const datasets = data.map(dataset => (
        {
            type: dataset.type,
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.borderColor,
            backgroundColor: dataset.bgColor,
            borderWidth: dataset.borderWidth,
            fill: dataset.fill
        }
    ))

    const chartData = {
        labels: labels,
        datasets: datasets,
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
            title: {
                display: titulo ? true : false,
                text: titulo?.toUpperCase(),
            },
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: maxData + 1,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    }

    return <Chart type={'bar'} data={chartData} options={options} />;
}
