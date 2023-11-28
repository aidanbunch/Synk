import { Box, Center } from "@chakra-ui/react";

type FilterCheckboxProps = {
	text: string;
};

function FilterCheckbox({ text }: FilterCheckboxProps) {
	return (
		<Box
			// aria-checked={true}
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
