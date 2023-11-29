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
	Spinner,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
import FlightCard from "./FlightCard";
import {
	AirportCodeTypes,
	airportCodeToEventCity,
	eventCityToAirportCode,
} from "@/utils/filterTypes";
import {
	attendeesAtom,
	departureAirportAtom,
	destinationAirportAtom,
	destinationCityAtom,
	editAttendeesModalOpenAtom,
	tabIndexAtom,
} from "@/pages/event/[id]/flow";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import {
	apiRequest,
	convertDateToString,
	convertStringToDate,
} from "@/utils/util";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { FlightOffers } from "@/pages/api/flights";

type TravelContentProps = {
	selectedDepartureFlightObject: FlightOffers | {};
	setSelectedDepartureFlightObject: any;
	selectedReturnFlightObject: FlightOffers | {};
	setSelectedReturnFlightObject: any;
	planSelections: any;
	onOverviewClick: any;
};

function TravelContent({
	selectedDepartureFlightObject,
	setSelectedDepartureFlightObject,
	selectedReturnFlightObject,
	setSelectedReturnFlightObject,
	planSelections,
	onOverviewClick,
}: TravelContentProps) {
	const router = useRouter();
	const attendees = useStore(attendeesAtom);
	const departureAirport = useStore(departureAirportAtom);
	const destinationAirport = useStore(destinationAirportAtom);

	const departureDateFromQuery: unknown = router.query.departureDate;
	const returnDateFromQuery: unknown = router.query.returnDate;

	const initialDepDate = convertStringToDate(departureDateFromQuery as string);
	const initialRetDate = convertStringToDate(returnDateFromQuery as string);

	const [departureDate, setDepartureDate] = useState(initialDepDate);
	const [returnDate, setReturnDate] = useState(initialRetDate);

	const [isLoading, setIsLoading] = useState(false);
	const [departureData, setDepartureData] = useState<Array<any>>([]);
	const [destinationData, setDestinationData] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		apiRequest("/api/flights", "POST", {
			attendees: `${attendeesAtom.get()}`,
			departingAirport: departureAirportAtom.get(),
			returnAirport: destinationAirportAtom.get(),
			departingDate: convertDateToString(departureDate),
			returnDate: convertDateToString(returnDate),
			limit: 10,
		})
			.then((data) => {
				setDepartureData(data.departing);
				setDestinationData(data.returning);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [
		attendees,
		departureAirport,
		destinationAirport,
		departureDate,
		returnDate,
	]);

	const totalSelectedTabs =
		Object.values(planSelections).filter(Boolean).length;
	const currentTabIndex = useStore(tabIndexAtom);
	const isLastTab = currentTabIndex === totalSelectedTabs - 1;

	return (
		<Stack p="5">
			<HStack spacing="5">
				<ButtonGroup
					size="md"
					isAttached
					variant="outline"
					onClick={() => {
						editAttendeesModalOpenAtom.set(true);
					}}
				>
					<Button
						bgColor="white"
						fontWeight="medium"
						colorScheme="gray"
						_hover={{}}
					>
						{attendees} Attendees
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
					value={departureAirport}
					onChange={(event) => {
						departureAirportAtom.set(event.target.value);
					}}
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
					value={destinationAirport}
					onChange={(event) => {
						destinationAirportAtom.set(event.target.value);
						destinationCityAtom.set(
							airportCodeToEventCity[event.target.value as AirportCodeTypes]
						);
					}}
					id="location"
					bgColor="white"
				>
					<option value="JFK">JFK</option>
					<option value="SFO">SFO</option>
				</Select>
				<DatePicker
					placeholderText="Departure Date"
					onChange={(date: Date) => setDepartureDate(date)}
					selected={departureDate}
				/>
				<DatePicker
					placeholderText="Return Date"
					onChange={(date: Date) => setReturnDate(date)}
					selected={returnDate}
				/>
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
					{isLoading ? (
						<Center h="520px" w="400px">
							<Spinner size="xl" color="blue.500" />
						</Center>
					) : (
						<Stack spacing="5">
							{departureData &&
								departureData.map((flight, index) => (
									<FlightCard
										key={index}
										index={index}
										startingTime={flight.startingTime}
										endingTime={flight.endingTime}
										duration={flight.duration}
										price={flight.price}
										airlineLogo={flight.airlineImage}
										airlineName={flight.airlineName}
										airlineCode={flight.airlineCode}
										tickets={attendees}
										setSelected={setSelectedDepartureFlightObject}
										isSelected={
											selectedDepartureFlightObject
												? // @ts-ignore
												  selectedDepartureFlightObject.index === index
												: false
										}
									/>
								))}
						</Stack>
					)}
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
					{isLoading ? (
						<Center h="520px" w="400px">
							<Spinner size="xl" color="blue.500" />
						</Center>
					) : (
						<Stack spacing="5">
							{destinationData &&
								destinationData.map((flight, index) => (
									<FlightCard
										key={index}
										index={index}
										startingTime={flight.startingTime}
										endingTime={flight.endingTime}
										duration={flight.duration}
										price={flight.price}
										airlineLogo={flight.airlineImage}
										airlineName={flight.airlineName}
										airlineCode={flight.airlineCode}
										tickets={attendees}
										setSelected={setSelectedReturnFlightObject}
										isSelected={
											selectedReturnFlightObject
												? // @ts-ignore
												  selectedReturnFlightObject.index === index
												: false
										}
									/>
								))}
						</Stack>
					)}
				</Stack>
			</HStack>
			<HStack>
				<Spacer />
				<Button
					minW="15%"
					onClick={() => {
						if (isLastTab) {
							onOverviewClick(); // Navigate to the overview
						} else {
							const newTabIndex = currentTabIndex + 1;
							tabIndexAtom.set(newTabIndex); // Go to the next tab
						}
					}}
				>
					{isLastTab ? "Go to Overview" : "Next"}
				</Button>
			</HStack>
		</Stack>
	);
}

export default TravelContent;
