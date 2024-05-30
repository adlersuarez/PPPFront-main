import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

interface DatasetItem {
    id: string
    label: string
    data: number[]
    borderColor: string
    bgColor?: string
}

interface ChartProps {
    data: DatasetItem[]
    labels: string[]
    titulo?: string
    fill?:boolean
}

const LineChart: React.FC<ChartProps> = ({ data, labels, titulo, fill }) => {

    const maxData = data.reduce((max, dataset) => {
        const maxInDataset = Math.max(...dataset.data);
        return Math.max(max, maxInDataset);
    }, -Infinity)

    const datasets = data.map(dataset => (
        {
            fill: fill,
            label: dataset.label,
            data: dataset.data,
            borderColor: dataset.borderColor,
            backgroundColor: dataset.bgColor,
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

    return <Line data={chartData} options={options} />
}

export default LineChart