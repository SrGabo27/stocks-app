export interface IStockValueData {
	data: Array<IStockValue>;
	type: string;
}

export interface IStockValue {
	// Last price
	p: number;
	// Symbol
	s: string;
	// UNIX timestamp
	t: string;
	// Volume
	v: number;
}

export interface IStockQuote {
	// Current price
	c: number;
	// High price of the day
	h: number;
	// Low price of the day
	l: number;
	// Open price of the day
	o: number;
	// Previous close price
	pc: number;
	// Change
	d: number;
	// Change percentage
	dp: number;
}

export interface IStock {
	description: string;
	displaySymbol: string;
	symbol: string;
	type: string;
}

export interface ILsStock {
	id?: number;
	symbol: string;
	alertPrice: number;
	currentPrice: number;
	previousPrice: number;
	changePercentage: number;
}
