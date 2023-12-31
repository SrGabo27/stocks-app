import { ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { ILsStock } from "../../types/stock";
import { VerticalChart } from "../charts/VerticalChart";
import { faker } from "@faker-js/faker";

export interface IGraphProps {
	stocks: Array<ILsStock>;
}

export function Graph(props: IGraphProps): JSX.Element {
	const { stocks } = props;

	const [data, setData] = useState<ChartData<"bar", number[], string>>({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		setData({
			labels: stocks?.map((stock) => stock.symbol),
			datasets: [
				{
					label: "Stocks",
					data: stocks?.map((stock) => stock.currentPrice),
					backgroundColor: stocks.map(() => faker.color.rgb()),
				},
			],
		});
	}, [stocks]);

	return (
		<div className="bg-white w-full p-3 rounded-xl">
			<VerticalChart data={data} />
		</div>
	);
}
