import {
	Stack,
	HStack,
	SimpleGrid,
	Checkbox,
	Heading,
	Divider,
} from "@chakra-ui/react";
import OverviewCard from "./OverviewCard";

function OverviewStaySection() {
	return (
		<>
			<Stack width="100%" spacing="5" pt="2">
				<Heading fontSize="2xl">Stay</Heading>
				<HStack
					align="start"
					justifyItems={"flex-start"}
					spacing="15"
					width="100%"
				>
					<Checkbox size="lg" colorScheme="gray" defaultChecked />
					<SimpleGrid columns={2} spacing="5">
						<OverviewCard
							isActivity={false}
							name="Cozy Dome"
							price={3800}
							image=""
							subheadingAmount={20}
						/>
						<OverviewCard
							isActivity={false}
							name="Cozy Dome"
							price={3800}
							image=""
							subheadingAmount={20}
						/>
					</SimpleGrid>
				</HStack>
			</Stack>
		</>
	);
}

export default OverviewStaySection;
