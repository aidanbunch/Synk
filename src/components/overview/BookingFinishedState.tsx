import { VStack, Icon, Heading } from "@chakra-ui/react";
import { CheckIcon } from "lucide-react";

function BookingFinishedState() {
	return (
		<VStack transform="translateY(150%)" bg="white" px="6" py="8">
			<Icon as={CheckIcon} color="#0FBC00" h="40px" w="40px" />
			<Heading size="md" color="fg-subtle" textAlign="center">
				You&apos;ve successfully booked this trip!
			</Heading>
		</VStack>
	);
}

export default BookingFinishedState;
