import { CreateNewEventModal } from "@/components/dashboard/CreateNewEventModal";
import EmptyState from "@/components/dashboard/EmptyState";
import { Sidebar } from "@/components/layout/Sidebar";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import {
	Flex,
	Box,
	Text,
	Stack,
	Heading,
	Container,
	Card,
	Image,
	AspectRatio,
	HStack,
	Spacer,
	Icon,
} from "@chakra-ui/react";
import { Edit } from "lucide-react";
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
    //             arrivalAirport: "SFO",
    //             departingDate: "2023-12-01",
    //             arrivalDate: "2023-12-25",
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => console.log(data));
    // }, []);

	return (
		<>
			<Meta title="Dashboard" />
			<Flex
				as="section"
				direction="row"
				height="100vh"
				bg="bg-canvas"
				overflowY="auto"
			>
				<Sidebar />
				<Box bg="gray.100" flex="1">
					<Box bg="bg-canvas" height="full">
						{/* <Container py="8" height="full">
							<EmptyState />
						</Container> */}
						{/* <CreateNewEventModal /> */}
						<Container height="full" py="8" px="10" maxW="100%">
							<Stack spacing="5">
								<Heading as="h3" size="lg">
									All Events
								</Heading>
								<Card
									direction={{ base: "column", sm: "row" }}
									overflow="hidden"
									variant="outline"
									cursor="pointer"
									minH="100px"
								>
									<AspectRatio width="250px" ratio={4 / 3}>
										<Image
											objectFit="cover"
											fallbackSrc="https://via.placeholder.com/53"
											alt="Event Image"
										/>
									</AspectRatio>

									<Stack py="5" px="10" width="full">
										<HStack>
											<Stack spacing="0">
												<Heading size="md">Fall &apos;23 Retreat</Heading>
												<Text py="2" color="fg-subtle">
													LavaLab
												</Text>
											</Stack>
											<Spacer />
											<Icon as={Edit} boxSize={6} />
										</HStack>
										<HStack>
											<Spacer />
											<Heading size="md">Total Price: </Heading>
											<Text py="2" color="fg-muted" fontSize="lg">
												$1,000
											</Text>
										</HStack>
									</Stack>
								</Card>
							</Stack>
						</Container>
					</Box>
				</Box>
			</Flex>
		</>
	);
}

export default requireAuth(Dashboard);
