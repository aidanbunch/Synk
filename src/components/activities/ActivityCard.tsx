import { formatPrice } from "@/utils/util";
import {
	AspectRatio,
	HStack,
	Image,
	Spacer,
	Stack,
	Text,
	Card,
} from "@chakra-ui/react";

type ActivityCardProps = {
	id: string;
	name: string;
	numberOfGuests: number;
	pricePerNight: number;
	image: string;
	isSelected: boolean;
	setSelected: any;
};

function ActivityCard({
	id,
	name,
	numberOfGuests,
	pricePerNight,
	image,
	isSelected,
	setSelected,
}: ActivityCardProps) {
	return (
		<Card
			cursor="pointer"
			bgColor={isSelected ? "gray.200" : "white"}
			onClick={() => {
				setSelected({
					id: id,
					name: name,
					price_per_participant: pricePerNight / numberOfGuests,
					image_url: image,
				});
			}}
		>
			<AspectRatio width="100%" height="105px" ratio={4 / 3}>
				<Image
					src={image}
					fallbackSrc="https://www.tripsavvy.com/thmb/LvHd8jPLcmSgH3pnyf8Cy4pAw4s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/taipei101-tower-taiwan-56ccb69b5f9b5879cc5b6f0a.jpg"
					alt="Green double couch with wooden legs"
					borderRadius="lg"
				/>
			</AspectRatio>
			<Stack px="5" pt="2" spacing="1" pb="2">
				<Text fontWeight="medium" fontSize="sm" isTruncated>
					{name}
				</Text>
				<HStack>
					<Text fontWeight="regular" fontSize="xs" color={"fg-subtle"}>
						{numberOfGuests} Guests
					</Text>
					<Spacer />
					<Text fontWeight="regular" fontSize="xs">
						{formatPrice(pricePerNight)}/night
					</Text>
				</HStack>
			</Stack>
		</Card>
	);
}

export default ActivityCard;
