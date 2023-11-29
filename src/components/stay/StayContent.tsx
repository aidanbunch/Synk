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
} from "@chakra-ui/react";
import HotelCard from "./HotelCard";
import { Edit } from "lucide-react";
import { EventCityTypes } from "@/utils/filterTypes";
import { tabIndexAtom } from "@/pages/event/[id]/flow";

type StayContentProps = {
	initialAttendees: number;
	initialCity: EventCityTypes;
};

function StayContent({ initialAttendees, initialCity }: StayContentProps) {
	return (
		<Stack p="5">
			<HStack>
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
					placeholder="City Code"
					defaultValue={initialCity}
					id="location"
					bgColor="white"
				>
					<option value="nyc">New York, NY</option>
					<option value="sf">San Francisco, CA</option>
				</Select>
				<Spacer />
				<Box width="300%" />
			</HStack>
			<SimpleGrid columns={4} spacing="10" py="5">
				{Array(8).fill(
					<HotelCard
						name="Cozy Dome"
						image=""
						pricePerNight={3300}
						numberOfGuests={25}
					/>
				)}
			</SimpleGrid>
			<HStack>
				<Spacer />
				<Button
					minW="15%"
					onClick={() => {
						const newTabIndex = tabIndexAtom.get() + 1;
						tabIndexAtom.set(newTabIndex);
					}}
				>
					Next
				</Button>
			</HStack>
		</Stack>
	);
}

export default StayContent;
