import React from "react";
import {
	Box,
	Image,
	HStack,
	VStack,
	IconButton,
	AspectRatio,
} from "@chakra-ui/react";
import { Heart } from "lucide-react";

const OverviewCard = () => {
	return (
		<Box
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			position="relative"
			shadow={"sm"}
			bgColor="white"
            cursor="pointer"
		>
			<AspectRatio ratio={4/2}>
				<Image
					src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/2e/79/34/the-grand-hotel-club.jpg?w=1200&h=-1&s=1"
					alt="Property Image"
				/>
			</AspectRatio>

			<Box p="6">
				<HStack justifyContent="space-between" spacing="5">
					<VStack align="start" spacing="0">
						<Box
							mt="1"
							fontWeight="bold"
							as="h4"
							isTruncated
							fontSize="xs"
						>
							Large Cabin
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
								20 Guests
							</Box>
						</Box>
					</VStack>
					<VStack spacing={1} align="end">
						<Box fontSize="xs" fontWeight="semibold">$3,800/</Box>
						<Box as="span" color="fg-subtle" fontSize="xs" fontWeight="semibold">
							night
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
		</Box>
	);
};
export default OverviewCard;
