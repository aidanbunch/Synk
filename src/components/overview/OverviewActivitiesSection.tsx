import {
	Stack,
	Divider,
	HStack,
	SimpleGrid,
	Checkbox,
	Heading,
} from "@chakra-ui/react";
import OverviewCard from "./OverviewCard";

function OverviewActivitiesSection() {
	return (
		<>
			<Divider borderColor="gray.300" />
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
		</>
	);
}

export default OverviewActivitiesSection;
