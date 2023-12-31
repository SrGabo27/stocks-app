import { useEffect, useState } from "react";
import { Graph } from "../components/Graph";
import { LeftForm } from "../components/LeftForm";
import { TopCards } from "../components/TopCards";
import { socket } from "../helpers/webSocketHelper";
import stocksService from "../services/stocksService";
import { ILsStock } from "../types/stock";

export function Home(): JSX.Element {
	const [stocks, setStocks] = useState<Array<ILsStock>>(
		stocksService.getSavedStocks(),
	);

	useEffect(() => {
		if (stocks.length > 0) {
			socket.addEventListener("open", () => {
				stocks.forEach((stock) => {
					socket.send(
						JSON.stringify({ type: "subscribe", symbol: stock.symbol }),
					);
				});
			});
		}

		//eslint-disable-next-line
	}, []);

	return (
		<div className="flex flex-col">
			<TopCards stocks={stocks} setStocks={setStocks} />

			<div className="flex flex-wrap md:flex-nowrap w-full px-5 py-10 gap-10">
				<LeftForm setStocks={setStocks} />
				<Graph stocks={stocks} />
			</div>
		</div>
	);
}
