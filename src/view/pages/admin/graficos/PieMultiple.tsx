import React from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement
)

interface PieDatasetItem {
    id: string
    data: number[]
    backgroundColor: string[]
    borderColor?: string[]
    borderWidth?: number
}

interface PieChartProps {
    data: PieDatasetItem[]
    labels: string[]
    titulo?: string
    legend: boolean
    position?: 'top' | 'left' | 'right' | 'bottom'
    tipo: 'porcentaje' | 'cantidad'
}

const PieChart: React.FC<PieChartProps> = ({ data, labels, titulo, tipo, position,legend }) => {

    const chartData = {
        labels: labels,
        datasets: data.map(dataset => {
            const total = dataset.data.reduce((total, elemento) => total + elemento, 0)
            const porcentaje = dataset.data.map(elemento => (elemento * 100 / total).toFixed(2))
            const label = tipo === 'cantidad' ? ' #' : ' %'
            const data = tipo === 'cantidad' ? dataset.data : porcentaje

            return {
                label: label,
                data: data,
                backgroundColor: dataset.backgroundColor,
                borderColor: dataset.borderColor,
                borderWidth: dataset.borderWidth
            }
        })
    }

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: titulo ? true : false,
                text: titulo?.toUpperCase(),
            },
            legend: {
                position: position,
                display: legend
            },
        },
    }

    return (
        <Pie data={chartData} options={options} />
    )
}

export default PieChart
