import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import { Heading, Stack, Container } from "@chakra-ui/react";
import EventCard from "@/components/events/EventCard";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { checkEventFlowExists, getEventFlowFromUUID } from "@/utils/db";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	// exists in db, checking if the associated flow exists
	const eventFlowExists = await checkEventFlowExists(id as string);

	if (!id || eventFlowExists === undefined || !eventFlowExists) {
		// generate recommendation and pass id down as prop
		// delay for 3 seconds to allow db to load
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const eventFlow = await getEventFlowFromUUID(id as string);
		return {
			props: {
				eventFlow,
				id,
			},
		};
	}

	// redirect to overview page
	return {
		redirect: {
			destination: `/dashboard`,
			statusCode: 302,
		},
	};
};

function EventPage({
	eventFlow,
	id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();

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
								<div
									onClick={() => {
										router.push(
											"/event/af934726-d0cf-43c2-aad0-d3629ee3e9b4/overview?hotel=2d6655b0-27d3-4ee9-b2e1-2c8606bda3fe&departureFlight=b244ebcb-1d4f-43e1-8fad-2a2ebd17f117&returnFlight=a1891554-ed7a-432f-ba5a-c26f10becee8&activity=5664636b-0154-43f3-8302-200c3ed9cc50"
										);
									}}
								>
									<EventCard
										activityName="Hiking, Yoga and Spa"
										eventName="Peaceful Retreat in San Diego"
										totalPrice={8455}
										size="lg"
										image="https://assets-global.website-files.com/64efa831383dfe702db152da/64f29f8c04d35f42dbd55511_I18R1uDuGIbxhn3jG3HLhgyBNNKLqKxSY9O5OGbudltiRlAI8-6mdTEEF2oVUXFE0fHzfkRYlAPobJPDCD2raC_qYG-p5EKpZoZr3uc58AVmRjhFtZcMHD5uHWgitNWIQlBgGOdd1CsOqZBzXCNWRxafyXsi08tzY86rsM7vS-E.webp"
									/>
								</div>
							</Stack>
						</Stack>
						<Stack spacing="5">
							<Heading as="h2" size="lg">
								Create your Own Plan
							</Heading>
							<Stack
								onClick={() => {
									router.push({
										pathname: `/event/${id}/flow`,
										query: {
											planSelections: eventFlow.planSelections,
											attendees: eventFlow.num_attendees,
											budget: eventFlow.budget,
											destinationCity: eventFlow.event_location,
											departureAirport: eventFlow.departing_location,
											departureDate: eventFlow.start_date,
											returnDate: eventFlow.end_date,
											id: id,
										},
									});
								}}
							>
								<EventCard
									isChooseCard
									activityName="Choose your activities"
									eventName="Choose your Plan"
									totalPrice={1000}
									size="lg"
									image=""
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
