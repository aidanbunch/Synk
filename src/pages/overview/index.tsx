import {
	Button,
	VStack,
	Divider,
	Heading,
	HStack,
	Container,
	Box,
	Spacer,
	SimpleGrid,
	Text,
	Progress,
} from "@chakra-ui/react";
import { UserPlus, MessagesSquare } from "lucide-react";
import { requireAuth } from "@/utils/auth";
import Meta from "@/components/meta/Meta";
import Layout from "@/components/layout/Layout";
import OverviewStaySection from "@/components/overview/OverviewStaySection";
import OverviewTravelSection from "@/components/overview/OverviewTravelSection";
import OverviewActivitiesSection from "@/components/overview/OverviewActivitiesSection";
import BookingCardSection from "@/components/overview/BookingCardSection";
import BookingCardSectionItem from "@/components/overview/BookingCardSectionItem";
import { formatPrice } from "@/utils/util";

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
							<Box bg="white" borderRadius="lg" py="5" px="12">
								<VStack spacing="5">
									<Heading size="lg" fontWeight="semibold">
										Book Now
									</Heading>
									<HStack spacing="5">
										<Text fontWeight="medium" fontSize="xl">
											Budget
										</Text>
										<Progress
											value={85}
											width="175px"
											height="12px"
											style={{ background: "#E6E6E3" }}
											borderRadius="md"
										/>
										<Text fontWeight="medium" fontSize="xl">
											$16,000
										</Text>
									</HStack>
									<BookingCardSection heading="Stay">
										<BookingCardSectionItem
											heading="Large Cabin"
											subheading="20 Guests, 2 Nights"
											price={7600}
										/>
									</BookingCardSection>
									<BookingCardSection heading="Travel">
										<BookingCardSectionItem
											heading="American Airlines Flight"
											subheading="(10)"
											price={1760}
										/>
										<BookingCardSectionItem
											heading="Spirit Airlines Flight"
											subheading="(10)"
											price={1760}
										/>
									</BookingCardSection>
									<BookingCardSection heading="Activites">
										<BookingCardSectionItem
											heading="Relaxing Hike"
											subheading="($ 10, 20) "
											price={200}
										/>
										<BookingCardSectionItem
											heading="Intro to Tufting"
											subheading="($ 200, 20) "
											price={4000}
										/>
									</BookingCardSection>
									<Divider borderColor="gray.300" pt="2" />
									<VStack>
										<Heading
											fontWeight="semibold"
											fontSize="xl"
											color="#0FBC00"
										>
											Total: {formatPrice(15320)}
										</Heading>
										<Text color="fg-subtle" fontWeight="light" fontSize="sm">
											{formatPrice(680)} under budget
										</Text>
										<Button size="lg">Book Now</Button>
									</VStack>
								</VStack>
							</Box>
						</SimpleGrid>
					</VStack>
				</Container>
			</Layout>
		</>
	);
};

export default requireAuth(OverviewPage);
