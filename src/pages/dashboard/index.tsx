import { CreateNewEventModal } from "@/components/dashboard/CreateNewEventModal";
import EmptyState from "@/components/dashboard/EmptyState";
import EventCard from "@/components/events/EventCard";
import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import { Stack, Heading, Container } from "@chakra-ui/react";
import { useEffect } from "react";

function Dashboard() {
	// useEffect(() => {
	//     // Client-side fetch request

	//     fetch("/api/flights", {
	//         method: "POST",
	//         headers: {
	//             "Content-Type": "application/json",
	//         },
	//         body: JSON.stringify({
	//             attendees: 2,
	//             departingAirport: "LAX",
	//             returnAirport: "SFO",
	//             departingDate: "2023-12-01",
	//             returnDate: "2023-12-25",
	//         }),
	//     })
	//         .then((res) => res.json())
	//         .then((data) => console.log(data));
	// }, []);

	return (
		<>
			<Meta title="Dashboard" />
			<Layout>
				{/* <Container py="8" height="full">
							<EmptyState />
						</Container> */}
				{/* <CreateNewEventModal /> */}
				<Container height="full" py="10" px="12" maxW="100%">
					<Stack spacing="5">
						<Heading as="h1" size="lg">
							All Events
						</Heading>
						<Stack>
							{/* map events here */}
							<EventCard
								organizationName="LavaLab"
								eventName="Fall '23 Retreat"
								totalPrice={1000}
							/>
						</Stack>
					</Stack>
				</Container>
			</Layout>
		</>
	);
}

export default requireAuth(Dashboard);
