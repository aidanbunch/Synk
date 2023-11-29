import EmptyState from "@/components/dashboard/EmptyState";
import EventCard from "@/components/events/EventCard";
import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import { getEventFlowsWithImages } from "@/utils/db";
import { Stack, Heading, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Dashboard() {
	const [isLoading, setIsLoading] = useState(false);
	const [eventFlows, setEventFlows] = useState<Array<any>>([]);
	const router = useRouter();

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	getEventFlowsWithImages(6)
	// 		.then((data) => {
	// 			if (data) {
	// 				setEventFlows(data);
	// 			}
	// 		})
	// 		.finally(() => {
	// 			setIsLoading(false);
	// 		});
	// }, []);

	return (
		<>
			<Meta title="Dashboard" />
			<Layout>
				<Container height="full" py="10" px="12" maxW="100%">
					<Stack spacing="5">
						<Heading as="h1" size="lg">
							All Events
						</Heading>
						<Stack>
							{/* {!isLoading &&
									eventFlows &&
									eventFlows.map((eventFlow, index) => {
										return (
											<EventCard
												key={index}
												activityName={eventFlow.event_name}
												eventName={eventFlow.activity}
												image={eventFlow.image}
												totalPrice={eventFlow.budget}
											/>
										);
									})} */}
							<div
								onClick={() => {
									router.push(
										"/event/0df565bb-a933-4896-a935-5912e2edd50f/overview?hotel=3c423caa-87ea-48cf-8439-c0e6043c3935&departureFlight=6632528e-d0a4-4275-b9ed-25aa61f234ff&returnFlight=52d46c22-7eab-497c-af63-a800620f262b&activity=a1f8bcc1-cfe7-4ee0-a655-511a0114c7d1"
									);
								}}
							>
								<EventCard
									activityName="LavaLab"
									eventName="Fall '23 Retreat"
									image="https://assets-global.website-files.com/64efa831383dfe702db152da/655265cffa99b91b0b231ca4_twF27UUY_3aaczTYJFHCe3BQD3xskdMUW87em0nD9BIbIwLAiVszPQU_aOkA2el5idu1kUgPoHXJCiTsU_rGqsyAqikPb8H7lYLEzGFXv3IZFo-0N4nGQx4GnzrqOAs5dFk880xv3idxvmXCG9DqEsXPczr_Lb33oD5Y8E8fl2U.jpeg"
									totalPrice={1188591}
								/>
							</div>
						</Stack>
					</Stack>
				</Container>
			</Layout>
		</>
	);
}

export default requireAuth(Dashboard);
