import {
	Stack,
	HStack,
	SimpleGrid,
	Checkbox,
	Heading,
	Divider,
} from "@chakra-ui/react";
import OverviewCard from "./OverviewCard";
import { useStore } from "@nanostores/react";
import { activityCheckedAtom } from "@/pages/event/[id]/overview";

type OverviewActivitiesSectionProps = {
	name: string;
	price: number;
	image: string;
};

function OverviewActivitiesSection({
	name,
	price,
	image,
}: OverviewActivitiesSectionProps) {
	const activityChecked = useStore(activityCheckedAtom);

	return (
		<>
			<Divider borderColor="gray.300" />
			<Stack width="100%" spacing="5" pt="2">
				<Heading fontSize="2xl">Activities</Heading>
				<HStack
					align="start"
					justifyItems={"flex-start"}
					spacing="15"
					width="100%"
				>
					<Checkbox
						size="lg"
						colorScheme="gray"
						isChecked={activityChecked}
						onChange={() => {
							activityCheckedAtom.set(!activityCheckedAtom.get());
						}}
					/>
					<SimpleGrid columns={2} spacing="5">
						<OverviewCard
							isActivity
							name={name}
							price={price}
							image={image}
							subheadingAmount={6}
						/>
					</SimpleGrid>
				</HStack>
			</Stack>
		</>
	);
}

export default OverviewActivitiesSection;
