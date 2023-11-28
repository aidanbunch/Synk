import {
	AspectRatio,
	HStack,
	Image,
	Spacer,
	Stack,
	Text,
	Card,
	IconButton,
	Icon,
} from "@chakra-ui/react";
import { Heart } from "lucide-react";

function ActivityCard() {
	return (
		<Card cursor="pointer">
			<AspectRatio width="100%" height="105px" ratio={4 / 3}>
				<Image
					fallbackSrc="https://www.tripsavvy.com/thmb/LvHd8jPLcmSgH3pnyf8Cy4pAw4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taipei101-tower-taiwan-56ccb69b5f9b5879cc5b6f0a.jpg"
					alt="Green double couch with wooden legs"
					borderRadius="lg"
				/>
			</AspectRatio>
			<Stack px="5" pt="2" spacing="1" pb="2">
				<Text fontWeight="medium" fontSize="sm">
					Cozy Dome
				</Text>
				<HStack>
					<Text fontWeight="regular" fontSize="xs" color={"fg-subtle"}>
						25 Guests
					</Text>
					<Spacer />
					<Text fontWeight="regular" fontSize="xs">
						$3300/night
					</Text>
				</HStack>
			</Stack>
		</Card>
	);
}

export default ActivityCard;
