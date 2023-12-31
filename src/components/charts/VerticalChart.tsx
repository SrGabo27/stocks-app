import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top" as const,
		},
		title: {
			display: true,
			text: "Stocks Prices",
		},
	},
};

export interface IVerticalChartProps {
	data: ChartData<"bar", number[], string>;
}

export function VerticalChart(props: IVerticalChartProps) {
	const { data } = props;

	return (
		<div className="w-full">
			<Bar options={options} data={data} />
		</div>
	);
}
