import {
	Stack,
	Button,
	IconButton,
	HStack,
	Select,
	Spacer,
	Box,
	SimpleGrid,
	ButtonGroup,
	Icon,
	Spinner,
	Center,
} from "@chakra-ui/react";
import HotelCard from "./HotelCard";
import { Edit } from "lucide-react";
import { EventCityTypes, eventCityToAirportCode } from "@/utils/filterTypes";
import {
	attendeesAtom,
	destinationAirportAtom,
	destinationCityAtom,
	editAttendeesModalOpenAtom,
	tabIndexAtom,
} from "@/pages/event/[id]/flow";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { apiRequest } from "@/utils/util";
import { HotelOffers } from "@/pages/api/hotels";

type StayContentProps = {
	selectedHotelObject: HotelOffers | {};
	setSelectedHotelObject: any;
	planSelections: any;
	onOverviewClick: any;
};

function StayContent({
	selectedHotelObject,
	setSelectedHotelObject,
	onOverviewClick,
	planSelections,
}: StayContentProps) {
	const attendees = useStore(attendeesAtom);
	const destinationCity = useStore(destinationCityAtom);

	const [isLoading, setIsLoading] = useState(false);
	const [hotelData, setHotelData] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		apiRequest("/api/hotels", "POST", {
			attendees: `${attendeesAtom.get()}`,
			cityCode: destinationAirportAtom.get(),
			limit: 8,
		})
			.then((data) => {
				console.log(data);
				setHotelData(data.hotels);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [attendees, destinationCity]);

	const totalSelectedTabs =
		Object.values(planSelections).filter(Boolean).length;
	const currentTabIndex = useStore(tabIndexAtom);
	const isLastTab = currentTabIndex === totalSelectedTabs - 1;

	return (
		<Stack p="5">
			<HStack>
				<ButtonGroup
					size="md"
					isAttached
					variant="outline"
					onClick={() => {
						editAttendeesModalOpenAtom.set(true);
					}}
				>
					<Button bgColor="white" fontWeight="medium" colorScheme="gray">
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
					placeholder="City Code"
					value={destinationCity}
					onChange={(event) => {
						destinationCityAtom.set(event.target.value);
						destinationAirportAtom.set(
							eventCityToAirportCode[event.target.value as EventCityTypes]
						);
					}}
					id="location"
					bgColor="white"
				>
					<option value="nyc">New York, NY</option>
					<option value="sf">San Francisco, CA</option>
				</Select>
				<Spacer />
				<Box width="300%" />
			</HStack>
			{isLoading ? (
				<Center h="665px">
					<Spinner size="xl" color="blue.500" />
				</Center>
			) : (
				<SimpleGrid columns={4} spacing="10" py="5">
					{hotelData &&
						hotelData.map((hotel, index) => (
							<HotelCard
								key={index}
								index={index}
								name={hotel.hotelName}
								image={hotel.imageUrl}
								pricePerNight={hotel.totalPrice}
								numberOfGuests={attendees}
								isSelected={
									selectedHotelObject
										? // @ts-ignore
										  selectedHotelObject.index === index
										: false
								}
								setSelected={setSelectedHotelObject}
							/>
						))}
				</SimpleGrid>
			)}
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

export default StayContent;
