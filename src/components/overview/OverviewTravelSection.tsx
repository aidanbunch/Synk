import {
	Stack,
	Button,
	IconButton,
	HStack,
	Text,
	Select,
	Spacer,
	Box,
	SimpleGrid,
	ButtonGroup,
	Icon,
	Checkbox,
	VStack,
	Heading,
	Card,
	CardBody,
	AspectRatio,
	Image,
} from "@chakra-ui/react";
import OverviewCard from "./OverviewCard";
import FlightCard from "../travel/FlightCard";
import OverviewFlightCard from "./OverviewFlightCard";

function OverviewTravelSection() {
	return (
		<Stack width="100%" spacing="5" pt="2">
			<Heading fontSize="2xl">Travel</Heading>
			<Stack
				width="100%"
				spacing="25"
			>
				{Array(2).fill(
					<HStack
						spacing="25"
						width="100%"
					>
						<Checkbox size="lg" colorScheme="gray" defaultChecked />
						<OverviewFlightCard />
					</HStack>
				)}
			</Stack>
		</Stack>
	);
}

export default OverviewTravelSection;
