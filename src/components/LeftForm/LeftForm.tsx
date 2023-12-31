import { Dispatch, useState } from "react";
import { MultiValue, SingleValue } from "react-select/dist/declarations/src";
import { socket } from "../../helpers/webSocketHelper";
import stocksService from "../../services/stocksService";
import { ILsStock } from "../../types/stock";
import { Input } from "../form/Input";
import { CustomSelect } from "../form/Select";
import { ISelectOption } from "../form/Select/interfaces/selectOptionsInterface";
import { Button } from "../ui/Button";

export interface ILeftFormProps {
	setStocks: Dispatch<Array<ILsStock>>;
}

export function LeftForm({ setStocks }: ILeftFormProps): JSX.Element {
	const [stock, setStock] = useState<ISelectOption>();
	const [price, setPrice] = useState<number>(0);

	const getStocks = async (searchParam: string) => {
		const dbStocks = await stocksService.getStocks(searchParam);

		if (dbStocks.length > 0)
			return dbStocks?.map((stock) => ({
				label: `${stock.description} (${stock.symbol})`,
				value: stock.symbol,
			}));

		return [];
	};

	const handleStockChange = (
		e: SingleValue<ISelectOption> | MultiValue<ISelectOption>,
	) => {
		const selectedStock = e as ISelectOption;
		setStock(selectedStock);
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isNaN(Number(e.target.value))) return;

		setPrice(Number(e.target.value));
	};

	const handleSave = async () => {
		if (!stock) return;

		await stocksService.saveStock(stock.value, price);

		setStocks(stocksService.getSavedStocks());

		socket.send(JSON.stringify({ type: "subscribe", symbol: stock.value }));
	};

	return (
		<div className="flex flex-col w-full bg-blue p-3 gap-3 h-[150px] rounded-xl max-w-[500px]">
			<CustomSelect
				className="text-black"
				loadOptionsFn={getStocks}
				placeholder="Search and select stock"
				onChange={handleStockChange}
			/>

			<Input
				value={price}
				type="text"
				placeholder="Set price alert"
				onChange={handlePriceChange}
			/>

			<Button disabled={!stock} onClick={handleSave}>
				Save
			</Button>
		</div>
	);
}
