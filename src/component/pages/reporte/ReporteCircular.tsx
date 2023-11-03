import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function ReporteCircular() {
  const labels = ['1', '2', '3', '4'];

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        //position: 'bottom',
      },
      title: {
        display: true,
        text: 'Intentos - Carta de presentación',
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [{
      label: 'Intentos',
      data: [10, 30, 13, 5],
      backgroundColor: ['#e8b962', '#26b594', '#fa5c82', '#2098E0'],
      hoverOffset: 4
    }]
  };

  return (
    <div id="chart" className='h-full'>
      <Doughnut
        options={options}
        data={data}
      />
    </div>
  );
}