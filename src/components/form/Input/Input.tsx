import { ChangeEvent } from "react";

export interface IInputProps {
	type: "text" | "number";
	value?: string | number;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
}

export function Input(props: IInputProps): JSX.Element {
	return (
		<div className={`w-full ${props.className}`}>
			<div className="w-full h-full relative">
				<input className="w-full text-black p-[5px] rounded-[3px]" {...props} />

				<span className="text-green-500 text-2xl absolute right-2 top-0">
					$
				</span>
			</div>
		</div>
	);
}
