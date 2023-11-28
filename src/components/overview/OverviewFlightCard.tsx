import {
	Card,
	CardBody,
	Stack,
	HStack,
	AspectRatio,
	Image,
	Text,
} from "@chakra-ui/react";

function OverviewFlightCard() {
	return (
		<Card borderRadius="lg" cursor="pointer">
			<CardBody py="-2" px="3">
				<Stack>
					<HStack spacing="4">
						<AspectRatio height="25px" width="25px" ratio={16 / 9}>
							<Image
								fallbackSrc="https://companyurlfinder.com/marketing/assets/img/logos/united.com.png"
								alt="naruto"
								objectFit="cover"
								borderRadius="md"
							/>
						</AspectRatio>
						<Stack spacing="0" align="start" py="2">
							<HStack spacing="10">
								<Text fontWeight="medium" fontSize="xs">
									8:05 AM - 9:30 AM
								</Text>
								<Text fontWeight="medium" fontSize="xs">
									1 hr, 25 min
								</Text>
								<Text fontWeight="medium" fontSize="xs">
									$1760 (10 people)
								</Text>
							</HStack>
							<Text color="fg-subtle" textAlign="start" fontSize="xs">
								United Airlines
							</Text>
						</Stack>
					</HStack>
				</Stack>
			</CardBody>
		</Card>
	);
}

export default OverviewFlightCard;
