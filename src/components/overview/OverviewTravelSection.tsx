import { Stack, HStack, Checkbox, Heading, Divider } from "@chakra-ui/react";
import OverviewFlightCard from "./OverviewFlightCard";

function OverviewTravelSection() {
	return (
		<>
			<Divider borderColor="gray.300" />
			<Stack width="100%" spacing="5" pt="2">
				<Heading fontSize="2xl">Travel</Heading>
				<Stack width="100%" spacing="25">
					{Array(2).fill(
						<HStack spacing="25" width="100%">
							<Checkbox size="lg" colorScheme="gray" defaultChecked />
							<OverviewFlightCard />
						</HStack>
					)}
				</Stack>
			</Stack>
		</>
	);
}

export default OverviewTravelSection;
