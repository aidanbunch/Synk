import {
	AspectRatio,
	Card,
	CardBody,
	HStack,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";

function FlightCard() {
	return (
		<Card borderRadius="lg" cursor="pointer">
			<CardBody py="4" px="3">
				<Stack>
					<HStack spacing="4">
						<AspectRatio height="55px" width="55px" ratio={16 / 9}>
							<Image
								fallbackSrc="https://companyurlfinder.com/marketing/assets/img/logos/united.com.png"
								alt="naruto"
								objectFit="cover"
								borderRadius="md"
							/>
						</AspectRatio>
						<Stack spacing="0" align="start" py="2">
							<HStack spacing="10">
								<Text fontWeight="medium" fontSize="sm">
									8:05 AM - 9:30 AM
								</Text>
								<Text fontWeight="medium" fontSize="sm">
									1 hr, 25 min
								</Text>
								<Text fontWeight="medium" fontSize="sm">
									$1760 (10 people)
								</Text>
							</HStack>
							<Text color="fg-subtle" textAlign="start" fontSize="sm">
								United Airlines
							</Text>
						</Stack>
					</HStack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default FlightCard;
