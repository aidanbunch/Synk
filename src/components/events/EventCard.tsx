import { formatPrice } from "@/utils/util";
import {
	Card,
	Image,
	AspectRatio,
	HStack,
	Spacer,
	Icon,
	Text,
	Stack,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";

type EventCardProps = {
	size?: EventCardSize;
	isChooseCard?: boolean;
	activityName: string;
	eventName: string;
	totalPrice: number;
	image: string;
};

type EventCardSize = "md" | "lg";

function EventCard({
	size = "md",
	activityName,
	eventName,
	totalPrice,
	isChooseCard = false,
	image,
}: EventCardProps) {
	const isMd = size === "md";

	return (
		<Card
			direction={{ base: "column", sm: "row" }}
			overflow="hidden"
			variant="outline"
			cursor="pointer"
			minH="100px"
		>
			<AspectRatio width={isMd ? "250px" : "400px"} ratio={4 / 3}>
				<Image
					objectFit="cover"
					src={image}
					fallbackSrc="https://www.tripsavvy.com/thmb/LvHd8jPLcmSgH3pnyf8Cy4pAw4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taipei101-tower-taiwan-56ccb69b5f9b5879cc5b6f0a.jpg"
					alt="Event Image"
				/>
			</AspectRatio>

			<Stack py="5" px="10" width="full">
				<HStack>
					<Stack spacing="0">
						<Text fontSize="2xl" fontWeight="semibold">
							{eventName}
						</Text>
						<Text py="2" color="fg-subtle" fontSize="xl">
							{activityName}
						</Text>
					</Stack>
					{/* <Spacer />
					<Icon as={Edit} boxSize={5} /> */}
				</HStack>
				<Spacer />
				<HStack>
					<Spacer />
					{isChooseCard ? (
						<Text fontWeight="medium" fontSize="xl">
							Choose your Price
						</Text>
					) : (
						<>
							<Text fontWeight="medium" fontSize="xl">
								Total Price:{" "}
							</Text>
							<Text py="2" color="fg-muted" fontSize="xl">
								{formatPrice(totalPrice)}
							</Text>
						</>
					)}
				</HStack>
			</Stack>
		</Card>
	);
}

export default EventCard;
