import { Box, Center } from "@chakra-ui/react";

type FilterCheckboxProps = {
	text: string;
	checked: boolean;
	onClick: () => void;
};

function FilterCheckbox({ text, checked, onClick }: FilterCheckboxProps) {
	return (
		<Box
			aria-checked={checked}
			onClick={() => {
				onClick();
			}}
			cursor="pointer"
			borderWidth="1px"
			bgColor="white"
			borderRadius="md"
			boxShadow="sm"
			_checked={{
				bg: "blue.500",
				color: "white",
			}}
			py="2"
			px="8"
		>
			<Center textTransform="capitalize" fontWeight="semibold">
				{text}
			</Center>
		</Box>
	);
}

export default FilterCheckbox;
