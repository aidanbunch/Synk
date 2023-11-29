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
import { stayCheckedAtom } from "@/pages/event/[id]/overview";

type OverviewStaySectionProps = {
	name: string;
	price: number;
	image: string;
	attendees: number;
};

function OverviewStaySection({
	name,
	price,
	image,
	attendees,
}: OverviewStaySectionProps) {
	const stayChecked = useStore(stayCheckedAtom);

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
					<Checkbox
						size="lg"
						colorScheme="gray"
						isChecked={stayChecked}
						onChange={(e) => {
							stayCheckedAtom.set(!stayCheckedAtom.get());
						}}
					/>
					<SimpleGrid columns={2} spacing="5">
						<OverviewCard
							isActivity={false}
							name={name}
							price={price}
							image={image}
							subheadingAmount={attendees}
						/>
					</SimpleGrid>
				</HStack>
			</Stack>
		</>
	);
}

export default OverviewStaySection;
