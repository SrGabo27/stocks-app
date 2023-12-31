export interface IButtonProps {
	className?: string;
	children?: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

export function Button(props: IButtonProps): JSX.Element {
	const { className, children, disabled = false, onClick } = props;

	return (
		<button
			className={`bg-green-500 w-full p-2 font-bold hover:scale-y-[1.1] duration-75 disabled:bg-gray-500 disabled:scale-[1] ${className}`}
			type="button"
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
