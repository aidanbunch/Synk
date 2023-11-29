import {
	Button,
	VStack,
	Divider,
	Heading,
	HStack,
	Container,
	Box,
	SimpleGrid,
	Text,
	Progress,
	Center,
	Icon,
} from "@chakra-ui/react";
import { UserPlus, MessagesSquare, CheckIcon } from "lucide-react";
import { requireAuth } from "@/utils/auth";
import Meta from "@/components/meta/Meta";
import Layout from "@/components/layout/Layout";
import OverviewStaySection from "@/components/overview/OverviewStaySection";
import OverviewTravelSection from "@/components/overview/OverviewTravelSection";
import OverviewActivitiesSection from "@/components/overview/OverviewActivitiesSection";
import BookingCardSection from "@/components/overview/BookingCardSection";
import BookingCardSectionItem from "@/components/overview/BookingCardSectionItem";
import { formatPrice } from "@/utils/util";
import BookingFinishedState from "@/components/overview/BookingFinishedState";
import BookingCard from "@/components/overview/BookingCard";

const OverviewPage = () => {
	return (
		<>
			<Meta title="Overview" />
			<Layout>
				<Container height="full" py="10" px="12" maxW="100%">
					<VStack spacing="4">
						<HStack justifyContent="space-between" width="100%">
							<Heading size="lg">Your Plan</Heading>
							<HStack>
								<Button
									rightIcon={<UserPlus />}
									variant="solid"
									color="black"
									border="1px"
									borderColor="gray.200"
									bg="white"
									_hover={{ bg: "gray.200", color: "black" }}
								>
									Invite Collaborators
								</Button>
								<Button
									rightIcon={<MessagesSquare />}
									variant="solid"
									border="1px"
									borderColor="gray.200"
									color="black"
									bg="white"
									_hover={{ bg: "gray.200", color: "black" }}
								>
									Gather Feedback
								</Button>
							</HStack>
						</HStack>
						<Divider borderColor="gray.300" />
						<SimpleGrid columns={2} px="0" spacing="100">
							<VStack spacing="4">
								<OverviewStaySection />
								<OverviewTravelSection />
								<OverviewActivitiesSection />
							</VStack>
							{/* gray.100 if the booking is done, white otherwise */}
							<Box bg="white" borderRadius="lg" py="5" px="12">
								{/* <BookingFinishedState /> */}
								<BookingCard spentBudget={8000} totalBudget={16000} />
							</Box>
						</SimpleGrid>
					</VStack>
				</Container>
			</Layout>
		</>
	);
};

export default requireAuth(OverviewPage);
