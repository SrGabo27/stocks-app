import { ISelectOption } from "./interfaces/selectOptionsInterface";
import AsyncSelect from "react-select/async";
import {
	GroupBase,
	MultiValue,
	OptionsOrGroups,
	SingleValue,
} from "react-select/dist/declarations/src";

interface ISelectProps {
	options?: Array<ISelectOption>;
	loadOptionsFn?: (inputValue: string) => Promise<Array<ISelectOption>>;
	placeholder?: string;
	isMulti?: boolean;
	className?: string;
	onChange?: (
		e: SingleValue<ISelectOption> | MultiValue<ISelectOption>,
	) => void;
}

export function CustomSelect(props: ISelectProps): JSX.Element {
	const {
		options = [],
		loadOptionsFn,
		className,
		placeholder = "Select...",
		isMulti = false,
		onChange,
	} = props;

	const loadOptions = async (
		inputValue: string,
		callback: (
			options: OptionsOrGroups<ISelectOption, GroupBase<ISelectOption>>,
		) => void,
	): Promise<OptionsOrGroups<ISelectOption, GroupBase<ISelectOption>>> => {
		if (loadOptionsFn) {
			const options = await loadOptionsFn(inputValue);
			callback(options);
			return options;
		}
		return [];
	};

	return (
		<div className={`w-full ${className}`}>
			<AsyncSelect
				placeholder={placeholder}
				options={options}
				loadOptions={loadOptions}
				isMulti={isMulti}
				cacheOptions={true}
				onChange={onChange}
			/>
		</div>
	);
}
