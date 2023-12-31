import { ILsStock } from "../../../../types/stock";
import { FaExclamationTriangle } from "react-icons/fa";

export interface ICardProps {
	stock: ILsStock;
}

export function Card(props: ICardProps): JSX.Element {
	const { stock } = props;

	return (
		<div className="bg-blue -full relative min-w-[170px] max-w-[210px] p-3 ">
			<div className="flex flex-col gap-2">
				<div className="flex w-full justify-between">
					<p>{stock.symbol}</p>

					<p
						className={`font-bold flex gap-1 ${stock.currentPrice < stock.alertPrice && "text-red-500"
							}`}
					>
						{stock.currentPrice}
						{stock.currentPrice < stock.alertPrice && <FaExclamationTriangle />}
					</p>
				</div>

				<div className="flex text-xl font-bold">
					<p
						className={`${stock.changePercentage > 0 ? "text-green-500" : "text-red-500"
							}`}
					>
						{stock.changePercentage > 0 ? "▲" : "▼"} {stock.changePercentage}
					</p>
				</div>
			</div>

			<div className="absolute w-[1px] h-[80%] bg-gray-500 top-2 right-0"></div>
		</div>
	);
}
