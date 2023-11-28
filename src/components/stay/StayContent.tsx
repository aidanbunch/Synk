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
    Icon
} from "@chakra-ui/react";
import HotelCard from "./HotelCard";
import { Edit } from "lucide-react";

function StayContent() {
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
						23 Attendees
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
					defaultValue={"nyc"}
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
				{Array(8).fill(<HotelCard />)}
			</SimpleGrid>
			<HStack>
				<Spacer />
				<Button minW="15%">Next</Button>
			</HStack>
		</Stack>
	);
}

export default StayContent;
