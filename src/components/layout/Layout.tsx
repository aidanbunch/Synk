import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import {
	CreateNewEventModal,
	NewEventFormInputs,
} from "../dashboard/CreateNewEventModal";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { createEventFlow } from "@/utils/db";
import { useAuth } from "@/utils/auth";
import { useRouter } from "next/router";

export const showCreateNewEventModalAtom = atom(false);

function Layout({ children }: { children: React.ReactNode }) {
	const showCreateNewEventModal = useStore(showCreateNewEventModalAtom);
	const auth = useAuth();
	const router = useRouter();

	return (
		<Flex
			as="section"
			direction="row"
			height="100vh"
			bg="bg-canvas"
			overflowY="auto"
		>
			<Sidebar />
			<Box bg="fg" flex="1">
				<Box bg="bg-canvas" height="full">
					{children}
				</Box>
			</Box>
			<CreateNewEventModal
				isOpen={showCreateNewEventModal}
				onClose={() => showCreateNewEventModalAtom.set(false)}
				onSubmit={({
					planSelections,
					startDate,
					endDate,
					eventName,
					numAttendees,
					budget,
					eventLocation,
					departingLocation,
					idealEvent,
				}: NewEventFormInputs) => {
					createEventFlow(
						auth.user.uid!,
						JSON.stringify(planSelections),
						eventName,
						numAttendees,
						budget,
						idealEvent,
						eventLocation,
						departingLocation,
						startDate,
						endDate,
						false
					).then((id) => {
						if (id === "") {
							console.error("error creating event");
						} else {
							router.push(`/event/${id}`);
						}
						showCreateNewEventModalAtom.set(false)
					})
				}}
			/>
		</Flex>
	);
}

export default Layout;
