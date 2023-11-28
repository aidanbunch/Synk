import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import { Heading, Stack, Container } from "@chakra-ui/react";
import EventCard from "@/components/events/EventCard";

function EventPage() {
	return (
		<>
			<Meta title="Event" />
			<Layout>
				<Container height="full" py="10" px="12" maxW="100%">
					<Stack spacing="14">
						<Heading as="h1" size="xl">
							Itinerary
						</Heading>
						<Stack spacing="5">
							<Heading as="h2" size="lg">
								We Recommend
							</Heading>
							<Stack>
								<EventCard
									organizationName="LavaLab"
									eventName="Fall '23 Retreat"
									totalPrice={1000}
									size="lg"
								/>
							</Stack>
						</Stack>
						<Stack spacing="5">
							<Heading as="h2" size="lg">
								Create your Own Plan
							</Heading>
							<Stack>
								<EventCard
									organizationName="LavaLab"
									eventName="Fall '23 Retreat"
									totalPrice={1000}
									size="lg"
								/>
							</Stack>
						</Stack>
					</Stack>
				</Container>
			</Layout>
		</>
	);
}

export default requireAuth(EventPage);
