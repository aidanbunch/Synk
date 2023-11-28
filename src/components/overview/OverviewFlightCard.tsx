import { formatPrice } from "@/utils/util";
import {
	Card,
	CardBody,
	Stack,
	HStack,
	AspectRatio,
	Image,
	Text,
} from "@chakra-ui/react";

type OverviewFlightCardProps = {
	startingTime: string; // 8:05 AM format
	endingTime: string; // 9:30 AM format
	duration: string; // 1 hr, 25 min format
	price: number;
	tickets: number;
	airlineName: string;
	airlineLogo: string;
};

function OverviewFlightCard({
	startingTime,
	endingTime,
	duration,
	price,
	tickets,
	airlineName,
	airlineLogo,
}: OverviewFlightCardProps) {
	return (
		<Card borderRadius="lg" cursor="pointer">
			<CardBody py="-2" px="3">
				<Stack>
					<HStack spacing="4">
						<AspectRatio height="25px" width="25px" ratio={16 / 9}>
							<Image
								src={airlineLogo}
								fallbackSrc="https://companyurlfinder.com/marketing/assets/img/logos/united.com.png"
								alt="naruto"
								objectFit="cover"
								borderRadius="md"
							/>
						</AspectRatio>
						<Stack spacing="0" align="start" py="2">
							<HStack spacing="10">
								<Text fontWeight="medium" fontSize="xs">
									{startingTime} - {endingTime}
								</Text>
								<Text fontWeight="medium" fontSize="xs">
									{duration}
								</Text>
								<Text fontWeight="medium" fontSize="xs">
									{formatPrice(price)} ({tickets} people)
								</Text>
							</HStack>
							<Text color="fg-subtle" textAlign="start" fontSize="xs">
								{airlineName}
							</Text>
						</Stack>
					</HStack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default OverviewFlightCard;
