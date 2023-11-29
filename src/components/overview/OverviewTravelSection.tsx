import { Stack, HStack, Checkbox, Heading, Divider } from "@chakra-ui/react";
import OverviewFlightCard from "./OverviewFlightCard";
import { useStore } from "@nanostores/react";
import { departureFlightCheckedAtom, returnFlightCheckedAtom } from "@/pages/event/[id]/overview";

type OverviewTravelSectionProps = {
	startingTime: string;
	endingTime: string;
	duration: string;
	price: number;
	attendees: number;
	airlineName: string;
	airlineLogo: string;
	returnStartingTime: string;
	returnEndingTime: string;
	returnDuration: string;
	returnPrice: number;
	returnAirlineName: string;
	returnAirlineLogo: string;
};

function OverviewTravelSection({
	startingTime,
	endingTime,
	duration,
	price,
	attendees,
	airlineName,
	airlineLogo,
	returnStartingTime,
	returnEndingTime,
	returnDuration,
	returnPrice,
	returnAirlineName,
	returnAirlineLogo,
}: OverviewTravelSectionProps) {
	const departureFlightChecked = useStore(departureFlightCheckedAtom);
    const returnFlightChecked = useStore(returnFlightCheckedAtom)

	return (
		<>
			<Divider borderColor="gray.300" />
			<Stack width="100%" spacing="5" pt="2">
				<Heading fontSize="2xl">Travel</Heading>
				<Stack width="100%" spacing="25">
					<HStack spacing="25" width="100%">
						<Checkbox
							size="lg"
							colorScheme="gray"
							isChecked={departureFlightChecked}
							onChange={(e) => {
								departureFlightCheckedAtom.set(!departureFlightCheckedAtom.get());
							}}
						/>
						<OverviewFlightCard
							startingTime={startingTime}
							endingTime={endingTime}
							duration={duration}
							price={price}
							tickets={attendees}
							airlineName={airlineName}
							airlineLogo={airlineLogo}
						/>
					</HStack>
					<HStack spacing="25" width="100%">
						<Checkbox
							size="lg"
							colorScheme="gray"
							isChecked={returnFlightChecked}
							onChange={(e) => {
								returnFlightCheckedAtom.set(!returnFlightCheckedAtom.get());
							}}
						/>
						<OverviewFlightCard
							startingTime={returnStartingTime}
							endingTime={returnEndingTime}
							duration={returnDuration}
							price={returnPrice}
							tickets={attendees}
							airlineName={returnAirlineName}
							airlineLogo={returnAirlineLogo}
						/>
					</HStack>
				</Stack>
			</Stack>
		</>
	);
}

export default OverviewTravelSection;
