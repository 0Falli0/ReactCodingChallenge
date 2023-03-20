import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type props = {
    gc_count: number;
}

function GcChart(props: props) {
    const data = {
        labels: ['GC' , 'AT'],
        datasets: [
            {
                label: '% of bases proportion',
                data: [props.gc_count, 100 - props.gc_count],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <Pie data={data}/>
    )
}

export default GcChart;