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
} from "@chakra-ui/react";
import ActivityCard from "./ActivityCard";
import { Search } from "lucide-react";
import FilterCheckbox from "./FilterCheckbox";

type ActivitiesContentProps = {
	initialEventCity: string;
	spentBudget: number;
	totalBudget: number;
};

function ActivitiesContent({
	initialEventCity,
	spentBudget,
	totalBudget,
}: ActivitiesContentProps) {
	return (
		<Stack px="5" py="0">
			<HStack spacing="6">
				<FilterCheckbox text="Drink Crafting" checked={true} />
				<FilterCheckbox text="Arts" checked={true} />
				<FilterCheckbox text="Cooking" checked={false} />
				<FilterCheckbox text="Wellness" checked={false} />
				<FilterCheckbox text="Fun" checked={false} />
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
					placeholder="City Code"
					defaultValue={initialEventCity}
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
						value={(spentBudget / totalBudget) * 100}
						width="300px"
						style={{ background: "#E6E6E3" }}
						borderRadius="md"
					/>
				</HStack>
			</HStack>
			<Divider borderColor="gray.300" pt="4" />
			<SimpleGrid columns={4} spacing="10" py="5">
				{Array(12).fill(
					<ActivityCard
						name="Cozy Dome"
						numberOfGuests={25}
						pricePerNight={3300}
						image=""
					/>
				)}
			</SimpleGrid>
			<HStack>
				<Spacer />
				<Button minW="15%" onClick={() => {
					// finished with flow
				}}>
					Go to Overview
				</Button>
			</HStack>
		</Stack>
	);
}

export default ActivitiesContent;
