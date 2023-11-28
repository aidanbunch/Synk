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
							<OverviewFlightCard
								startingTime="8:05 AM"
								endingTime="9:30 AM"
								duration="1 hr, 25 min"
								price={1760}
								tickets={10}
								airlineName="United Airlines"
								airlineLogo=""
							/>
						</HStack>
					)}
				</Stack>
			</Stack>
		</>
	);
}

export default OverviewTravelSection;
