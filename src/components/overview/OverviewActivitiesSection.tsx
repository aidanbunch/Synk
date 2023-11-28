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
} from "@chakra-ui/react";
import OverviewCard from "./OverviewCard";

function OverviewActivitiesSection() {
	return (
		<Stack width="100%" spacing="5" pt="2">
			<Heading fontSize="2xl">Activites</Heading>
			<HStack
				align="start"
				justifyItems={"flex-start"}
				spacing="15"
				width="100%"
			>
				<Checkbox size="lg" colorScheme="gray" defaultChecked />
				<SimpleGrid columns={2} spacing="5">
					<OverviewCard />
					<OverviewCard />
				</SimpleGrid>
			</HStack>
		</Stack>
	);
}

export default OverviewActivitiesSection;
