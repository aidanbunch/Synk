import {
	Stack,
	HStack,
	ButtonGroup,
	Button,
	IconButton,
	Select,
	Spacer,
	Box,
	Icon,
	Center,
	Heading,
	Divider,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import FlightCard from "./FlightCard";
import { AirportCodeTypes } from "@/utils/filterTypes";

type TravelContentProps = {
	initialAttendees: number;
	initialDepartureAirport: AirportCodeTypes;
	initialDestinationAirport: AirportCodeTypes;
};

function TravelContent({
	initialAttendees,
	initialDepartureAirport,
	initialDestinationAirport,
}: TravelContentProps) {
	return (
		<Stack p="5">
			<HStack spacing="5">
				<ButtonGroup size="md" isAttached variant="outline">
					<Button
						bgColor="white"
						fontWeight="medium"
						colorScheme="gray"
						_hover={{}}
					>
						{initialAttendees} Attendees
					</Button>
					<IconButton
						bgColor="white"
						fontWeight="medium"
						colorScheme="gray"
						aria-label="Add to friends"
						icon={<Icon as={Edit} size="5" />}
					/>
				</ButtonGroup>
				<Select
					placeholder="Departure Airport"
					defaultValue={initialDepartureAirport}
					id="location"
					bgColor="white"
				>
					<option value="ATL">ATL</option>
					<option value="LAX">LAX</option>
					<option value="ORD">ORD</option>
					<option value="DFW">DFW</option>
					<option value="DEN">DEN</option>
					<option value="JFK">JFK</option>
					<option value="SFO">SFO</option>
				</Select>
				<Select
					placeholder="Destination Airport"
					defaultValue={initialDestinationAirport}
					id="location"
					bgColor="white"
				>
					<option value="JFK">JFK</option>
					<option value="SFO">SFO</option>
				</Select>
				<Spacer />
				<Box width="240%" />
			</HStack>
			<HStack width="full" py="8" px="5">
				<Stack spacing="6">
					<Heading
						fontSize="2xl"
						fontWeight="medium"
						color="fg-subtle"
						textAlign="center"
					>
						Departures
					</Heading>
					<Stack spacing="5">
						{Array(5).fill(
							<FlightCard
								startingTime="8:05 AM"
								endingTime="9:30 AM"
								duration="1 hr, 25 min"
								price={1760}
								tickets={10}
								airlineName="United Airlines"
                                airlineLogo=""
							/>
						)}
					</Stack>
				</Stack>
				<Center height="550px" width="60px">
					<Divider orientation="vertical" style={{ borderColor: "#CED8E2" }} />
				</Center>
				<Stack spacing="6">
					<Heading
						fontSize="2xl"
						fontWeight="medium"
						color="fg-subtle"
						textAlign="center"
					>
						Arrivals
					</Heading>
					<Stack spacing="5">
						{Array(5).fill(
							<FlightCard
								startingTime="8:05 AM"
								endingTime="9:30 AM"
								duration="1 hr, 25 min"
								price={1760}
								tickets={10}
								airlineName="United Airlines"
                                airlineLogo=""
							/>
						)}
					</Stack>
				</Stack>
			</HStack>
			<HStack>
				<Spacer />
				<Button minW="15%">Next</Button>
			</HStack>
		</Stack>
	);
}

export default TravelContent;
