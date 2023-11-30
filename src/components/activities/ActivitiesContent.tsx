import {
	Stack,
	HStack,
	Button,
	Select,
	Spacer,
	Icon,
	Divider,
	Text,
	Input,
	InputLeftElement,
	InputGroup,
	SimpleGrid,
	Progress,
	Spinner,
	Center,
} from "@chakra-ui/react";
import ActivityCard from "./ActivityCard";
import { Search } from "lucide-react";
import FilterCheckbox from "./FilterCheckbox";
import { useRouter } from "next/router";
import { useStore } from "@nanostores/react";
import {
	attendeesAtom,
	destinationAirportAtom,
	destinationCityAtom,
	spentBudgetAtom,
	totalBudgetAtom,
} from "@/pages/event/[id]/flow";
import { EventCityTypes, eventCityToAirportCode } from "@/utils/filterTypes";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { FlightOffers } from "@/pages/api/flights";

type ActivityContentProps = {
	selectedActivityObject: FlightOffers | {};
	setSelectedActivityObject: any;
	onOverviewClick: any;
};

function ActivitiesContent({
	selectedActivityObject,
	setSelectedActivityObject,
	onOverviewClick,
}: ActivityContentProps) {
	const router = useRouter();
	const destinationCity = useStore(destinationCityAtom);
	const attendees = useStore(attendeesAtom);
	const spentBudget = useStore(spentBudgetAtom);
	const totalBudget = useStore(totalBudgetAtom);

	const [filterDrinkCrafting, setFilterDrinkCrafting] = useState(false);
	const [filterArts, setFilterArts] = useState(false);
	const [filterCooking, setFilterCooking] = useState(false);
	const [filterWellness, setFilterWellness] = useState(false);
	const [filterFun, setFilterFun] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [activitiesData, setActivitiesData] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			let query = supabase.from("spaciously_activities").select("*").limit(12);

			if (destinationCity === "sf") {
				query = query.eq("location", "San Francisco");
			} else if (destinationCity === "nyc") {
				query = query.eq("location", "New York");
			}

			const categories = [];
			if (filterDrinkCrafting) {
				categories.push("Drink Crafting");
			}

			if (filterArts) {
				categories.push("Arts and Crafts");
			}

			if (filterCooking) {
				categories.push("Cooking and Baking");
			}

			if (filterWellness) {
				categories.push("Wellness");
			}

			if (filterFun) {
				categories.push("Fun Skills");
			}

			if (categories.length > 0) {
				query = query.in("category_name", categories);
			}

			const { data, error } = await query;

			if (error) {
				console.error("Error fetching data:", error);
			} else {
				setActivitiesData(data);
			}
			setIsLoading(false);
		};

		fetchData();
	}, [
		filterDrinkCrafting,
		filterArts,
		filterCooking,
		filterWellness,
		filterFun,
		destinationCity,
	]);

	return (
		<Stack px="5" py="0">
			<HStack spacing="6">
				<FilterCheckbox
					text="Drink Crafting"
					checked={filterDrinkCrafting}
					onClick={() => {
						setFilterDrinkCrafting(
							(filterDrinkCrafting) => !filterDrinkCrafting
						);
					}}
				/>
				<FilterCheckbox
					text="Arts"
					checked={filterArts}
					onClick={() => {
						setFilterArts((filterArts) => !filterArts);
					}}
				/>
				<FilterCheckbox
					text="Cooking"
					checked={filterCooking}
					onClick={() => {
						setFilterCooking((filterCooking) => !filterCooking);
					}}
				/>
				<FilterCheckbox
					text="Wellness"
					checked={filterWellness}
					onClick={() => {
						setFilterWellness((filterWellness) => !filterWellness);
					}}
				/>
				<FilterCheckbox
					text="Fun"
					checked={filterFun}
					onClick={() => {
						setFilterFun((filterFun) => !filterFun);
					}}
				/>
				<Spacer />
				<Button
					minW="10%"
					color="white"
					bgColor="black"
					_hover={{ bgColor: "gray.700" }}
				>
					Saved
				</Button>
				<Button
					minW="10%"
					color="white"
					bgColor="black"
					_hover={{ bgColor: "gray.700" }}
				>
					Filters
				</Button>
			</HStack>
			<HStack pt="2" justifyContent="space-between">
				<Select
					value={destinationCity}
					onChange={(event) => {
						destinationCityAtom.set(event.target.value);
						destinationAirportAtom.set(
							eventCityToAirportCode[event.target.value as EventCityTypes]
						);
					}}
					placeholder="City Code"
					id="location"
					bgColor="white"
					maxWidth="200"
				>
					<option value="nyc">New York, NY</option>
					<option value="sf">San Francisco, CA</option>
				</Select>
				<InputGroup bgColor="white" maxWidth="200">
					<InputLeftElement>
						<Icon as={Search} color="fg.muted" fontSize="lg" />
					</InputLeftElement>
					<Input placeholder="Search" rounded="lg" />
				</InputGroup>
				<Spacer />
				<HStack spacing="5">
					<Text fontWeight="semibold" fontSize="sm">
						Budget
					</Text>
					<Progress
						value={65}
						width="300px"
						style={{ background: "#E6E6E3" }}
						borderRadius="md"
					/>
				</HStack>
			</HStack>
			<Divider borderColor="gray.300" pt="4" />
			{isLoading ? (
				<Center h="600px">
					<Spinner size="xl" color="blue.500" />
				</Center>
			) : (
				<SimpleGrid columns={4} spacing="10" py="5">
					{activitiesData &&
						activitiesData.map((activity) => {
							return (
								<ActivityCard
									key={activity.id}
									id={activity.id}
									name={activity.name}
									numberOfGuests={attendees}
									pricePerNight={activity.price_per_participant * attendees}
									image={activity.image_url}
									setSelected={setSelectedActivityObject}
									isSelected={
										selectedActivityObject
											? // @ts-ignore
											  selectedActivityObject.id === activity.id
											: false
									}
								/>
							);
						})}
				</SimpleGrid>
			)}
			<HStack>
				<Spacer />
				<Button
					minW="15%"
					onClick={() => {
						onOverviewClick();
					}}
				>
					Go to Overview
				</Button>
			</HStack>
		</Stack>
	);
}

export default ActivitiesContent;
