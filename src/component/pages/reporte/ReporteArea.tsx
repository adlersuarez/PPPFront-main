import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function ReporteArea() {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                //position: 'top',
            },
            title: {
                display: true,
                text: 'Facultades - % Aprobados',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];

    const data = {
        labels: labels,
        datasets: [
            {
                fill: true,
                label: 'Ingeniería',
                data: [95, 90, 100, 97, 100, 95, 90],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
            },
        ],
    };

    return (
        <div id="chart" className='w-full'>
            <Line
                options={options}
                data={data}
            />
        </div>
    );
}