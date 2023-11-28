import {
	Text,
	Spacer,
	Stack,
	Card,
	Image,
	CardFooter,
	AspectRatio,
} from "@chakra-ui/react";

function HotelCard() {
	return (
		<Card cursor="pointer">
			<AspectRatio width="100%" ratio={4 / 3}>
				<Image
					fallbackSrc="https://via.placeholder.com/53"
					alt="Green double couch with wooden legs"
					borderRadius="lg"
				/>
			</AspectRatio>
			<Stack px="5" pt="4" spacing="1" pb="0">
				<Text fontWeight="medium">Cozy Dome</Text>
				<Text fontWeight="regular" fontSize="sm" color={"fg-subtle"}>
					25 Guests
				</Text>
			</Stack>
			<CardFooter pt="0">
				<Spacer />
				<Text fontWeight="regular" fontSize="sm">
					$3300/night
				</Text>
			</CardFooter>
		</Card>
	);
}

export default HotelCard;
