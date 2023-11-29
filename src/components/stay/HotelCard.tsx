import { formatPrice } from "@/utils/util";
import {
	Text,
	Spacer,
	Stack,
	Card,
	Image,
	CardFooter,
	AspectRatio,
	IconButton,
} from "@chakra-ui/react";
import { Heart } from "lucide-react";
import { useState } from "react";

type HotelCardProps = {
	name: string;
	image: string;
	pricePerNight: number;
	numberOfGuests: number;
	isSelected: boolean;
	setSelected: any;
	index: number;
};

function HotelCard({
	name,
	image,
	pricePerNight,
	numberOfGuests,
	isSelected,
	setSelected,
	index,
}: HotelCardProps) {
	const [isLiked, setIsLiked] = useState(false);

	return (
		<Card
			cursor="pointer"
			bgColor={isSelected ? "gray.200" : "white"}
			onClick={() => {
				setSelected({
					hotelName: name,
					totalPrice: pricePerNight,
					imageUrl: image,
					index: index,
				});
			}}
		>
			<AspectRatio width="100%" ratio={4 / 3}>
				<Image
					src={image}
					fallbackSrc="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/2e/79/34/the-grand-hotel-club.jpg?w=1200&h=-1&s=1"
					alt="Green double couch with wooden legs"
					borderRadius="lg"
				/>
			</AspectRatio>
			<Stack px="5" pt="4" spacing="1" pb="0">
				<Text fontWeight="medium" isTruncated>
					{name}
				</Text>
				<Text fontWeight="regular" fontSize="sm" color={"fg-subtle"}>
					{numberOfGuests} Guests
				</Text>
			</Stack>
			<CardFooter pt="0">
				<Spacer />
				<Text fontWeight="regular" fontSize="sm">
					{formatPrice(pricePerNight)}/night
				</Text>
			</CardFooter>
			<IconButton
				aria-label="Add to favorites"
				variant="solid"
				icon={<Heart fill={isLiked ? "red" : "white"} stroke="red" />}
				position="absolute"
				top={2}
				right={2}
				size="md"
				isRound
				backgroundColor="white"
				_hover={{
					background: "gray.300",
				}}
				onClick={(e) => {
					e.stopPropagation()
					setIsLiked(!isLiked);
				}}
			/>
		</Card>
	);
}

export default HotelCard;
