import {
	Button,
	VStack,
	Divider,
	Heading,
	HStack,
	Container,
	Box,
	Spacer,
} from "@chakra-ui/react";
import { UserPlus, MessagesSquare } from "lucide-react";
import { requireAuth } from "@/utils/auth";
import Meta from "@/components/meta/Meta";
import Layout from "@/components/layout/Layout";
import OverviewStaySection from "@/components/overview/OverviewStaySection";
import OverviewTravelSection from "@/components/overview/OverviewTravelSection";
import OverviewActivitiesSection from "@/components/overview/OverviewActivitiesSection";

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
						<OverviewStaySection />
						<Divider borderColor="gray.300" />
						<OverviewTravelSection />
						<Divider borderColor="gray.300" />
						<OverviewActivitiesSection />
					</VStack>
				</Container>
			</Layout>
		</>
	);
};

export default requireAuth(OverviewPage);
