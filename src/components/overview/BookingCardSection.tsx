import { Divider, VStack, Heading } from "@chakra-ui/react";

type BookingCardSectionProps = {
	heading: string;
	children: React.ReactNode;
};

function BookingCardSection({ heading, children }: BookingCardSectionProps) {
	return (
		<>
			<Divider borderColor="gray.300" />
			<VStack align="start" w="full" spacing="3">
				<Heading
					fontWeight="medium"
					color="fg-subtle"
					fontSize="lg"
					letterSpacing="wide"
					textTransform="uppercase"
				>
					{heading}
				</Heading>
				{children}
			</VStack>
		</>
	);
}

export default BookingCardSection;
