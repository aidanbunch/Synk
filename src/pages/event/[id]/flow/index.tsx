import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import {
	Text,
	Select,
	HStack,
	Spacer,
	Box,
	Stack,
	Button,
	Icon,
	ButtonGroup,
	IconButton,
	SimpleGrid,
	Card,
	Image,
	CardFooter,
	AspectRatio,
	Divider,
	Heading,
	Center,
	CardBody,
	VStack,
} from "@chakra-ui/react";
import FlowTabs from "@/components/layout/FlowTabs";
import StayContent from "@/components/stay/StayContent";
import { Edit } from "lucide-react";
import { useState } from "react";
import EventCard from "@/components/events/EventCard";
import FlightCard from "@/components/travel/FlightCard";
import TravelContent from "@/components/travel/TravelContent";

function FlowPage() {
	return (
		<>
			<Meta title="Event Flow" />
			<Layout>
				<FlowTabs
					tabsToShow={{ stay: true, travel: true, activities: true }}
					content={{
						stay: <StayContent />,
						travel: (
							<TravelContent />
						),
						activities: (
							<p>
								<Text>Activities</Text>
							</p>
						),
					}}
				/>
			</Layout>
		</>
	);
}

export default requireAuth(FlowPage);
