import { formatPrice } from "@/utils/util";
import { HStack, Heading, VStack } from "@chakra-ui/react";

type BookingCardSectionItemProps = {
	heading: string;
	subheading: string;
	price: number;
};

function BookingCardSectionItem({
	heading,
	subheading,
	price,
}: BookingCardSectionItemProps) {
	return (
		<HStack justifyContent="space-between" width="full" align="start">
			<VStack align="start">
				<Heading fontWeight="medium" fontSize="md">
					{heading}
				</Heading>
				<Heading fontWeight="medium" color="fg-subtle" fontSize="sm">
					{subheading}
				</Heading>
			</VStack>
			<Heading fontWeight="semibold" fontSize="md" color="#0FBC00">
				{formatPrice(price)}
			</Heading>
		</HStack>
	);
}

export default BookingCardSectionItem;
