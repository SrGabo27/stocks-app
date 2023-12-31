import { Dispatch, useEffect } from "react";
import { socket } from "../../helpers/webSocketHelper";
import stocksService from "../../services/stocksService";
import { ILsStock, IStockValueData } from "../../types/stock";
import { Card } from "./components/Card/Card";

export interface ITopCardsProps {
	stocks: Array<ILsStock>;
	setStocks: Dispatch<Array<ILsStock>>;
}

export function TopCards(props: ITopCardsProps): JSX.Element {
	const { stocks, setStocks } = props;

	useEffect(() => {
		if (stocks.length > 0) {
			try {
				socket.addEventListener("message", (event) => {
					const data: IStockValueData = JSON.parse(event.data);

					if (data.data) {
						stocks.forEach((stock) => {
							const similarStock = data?.data.filter(
								(stockValue) => stockValue.s === stock.symbol,
							)[0];

							if (similarStock) {
								stocks[stocks.indexOf(stock)].previousPrice =
									stock.currentPrice;

								stocks[stocks.indexOf(stock)].currentPrice = similarStock.p;
							}
						});

						stocksService.saveStocks(stocks);
						setStocks([...stocks]);
					}
				});
			} catch (error) {
				console.log(error);
			}
		}
	}, [stocks, setStocks]);

	useEffect(() => { }, [stocks]);

	return (
		<div className={`w-full flex bg-blue flex-wrap`}>
			{stocks.map((stock) => (
				<Card stock={stock} key={stock.id} />
			))}
		</div>
	);
}
