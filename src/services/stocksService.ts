import axios from "axios";
import { ILsStock, IStock, IStockQuote } from "../types/stock";

const token = "cm6dd39r01qg94pu0fu0cm6dd39r01qg94pu0fug";
const url = `https://finnhub.io/api/v1`;

const fetchData = async <T = unknown>(url: string) => {
	const request = await axios.get<T>(url);

	return request.data;
};

export class StocksService {
	public async getStocks(searchParam?: string): Promise<Array<IStock>> {
		const request = await fetchData<{ count: number; result: Array<IStock> }>(
			`${url}/search?q=${searchParam}&token=${token}`,
		);

		return request.result;
	}

	public async getStockQuote(symbol: string): Promise<IStockQuote> {
		try {
			const quote = await fetchData<IStockQuote>(
				`${url}/quote?symbol=${symbol}&token=${token}`,
			);

			return quote;
		} catch (err) {
			return {} as IStockQuote;
		}
	}

	public async saveStock(symbol: string, alertPrice: number): Promise<void> {
		const stocks = localStorage.getItem("stocks");

		const quote = await this.getStockQuote(symbol);

		if (Object.keys(quote).length === 0)
			return alert("You don't have access to this stock");

		const stock: ILsStock = {
			id: stocks ? JSON.parse(stocks).length + 1 : 1,
			symbol,
			alertPrice,
			currentPrice: quote.c,
			previousPrice: quote.pc,
			changePercentage: quote.dp,
		};

		if (stocks) {
			const parsedStocks: Array<ILsStock> = JSON.parse(stocks);

			parsedStocks.push(stock);

			localStorage.setItem("stocks", JSON.stringify(parsedStocks));
		}

		if (!stocks) {
			localStorage.setItem("stocks", JSON.stringify([stock]));
		}
	}

	public saveStocks(stocks: Array<ILsStock>): void {
		const parsedStocks = JSON.stringify(stocks);

		localStorage.setItem("stocks", parsedStocks);
	}

	public getSavedStocks(): Array<ILsStock> {
		const stocks = localStorage.getItem("stocks");

		if (stocks) {
			return JSON.parse(stocks);
		}

		return [];
	}
}

const stocksService = new StocksService();
export default stocksService;
