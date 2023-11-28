import React from "react";
import {
	Box,
	Image,
	HStack,
	VStack,
	IconButton,
	AspectRatio,
	Card,
} from "@chakra-ui/react";
import { Heart } from "lucide-react";
import { formatPrice } from "@/utils/util";

type OverviewCardProps = {
	isActivity: boolean; // otherwise, is hotel
	name: string;
	price: number; // per night or per guest
	image: string;
	subheadingAmount: number; // either number of guests or duration
};

const OverviewCard = ({
	isActivity,
	name,
	price,
	image,
	subheadingAmount,
}: OverviewCardProps) => {
	return (
		<Card
			borderRadius="lg"
			overflow="hidden"
			position="relative"
			shadow="sm"
			cursor="pointer"
		>
			<AspectRatio ratio={4 / 2}>
				<Image
					src={image}
					fallbackSrc="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/2e/79/34/the-grand-hotel-club.jpg?w=1200&h=-1&s=1"
					alt="Property Image"
				/>
			</AspectRatio>

			<Box p="6">
				<HStack justifyContent="space-between" spacing="5">
					<VStack align="start" spacing="0">
						<Box mt="1" fontWeight="bold" as="h4" isTruncated fontSize="xs">
							{name}
						</Box>
						<Box dir="flex" alignItems="baseline">
							<Box
								mt="1"
								fontWeight="semibold"
								color="fg-subtle"
								as="h4"
								lineHeight="tight"
								isTruncated
								fontSize="xs"
							>
								{subheadingAmount} {isActivity ? "hours" : "Guests"}
							</Box>
						</Box>
					</VStack>
					<VStack spacing={1} align="end">
						<Box mt="1" fontSize="xs" fontWeight="semibold">
							{formatPrice(price)}/
						</Box>
						<Box
							as="span"
							color="fg-subtle"
							fontSize="xs"
							fontWeight="semibold"
						>
							{isActivity ? "person" : "night"}
						</Box>
					</VStack>
				</HStack>
			</Box>
			<IconButton
				aria-label="Add to favorites"
				variant="solid"
				icon={<Heart fill="red" stroke="red" size="18px" />}
				position="absolute"
				top={2}
				right={2}
				size="sm"
				isRound
				backgroundColor="white"
				_hover={{
					background: "gray.300",
				}}
			/>
		</Card>
	);
};
export default OverviewCard;
