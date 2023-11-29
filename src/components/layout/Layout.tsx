import { Flex, Box } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import {
	CreateNewEventModal,
	NewEventFormInputs,
} from "../dashboard/CreateNewEventModal";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

export const showCreateNewEventModalAtom = atom(false);

function Layout({ children }: { children: React.ReactNode }) {
	const showCreateNewEventModal = useStore(showCreateNewEventModalAtom);

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
					console.log(planSelections);
					console.log(startDate);
					console.log(endDate);
					console.log(eventName);
					console.log(numAttendees);
					console.log(budget);
					console.log(eventLocation);
					console.log(departingLocation);
					console.log(idealEvent);
				}}
			/>
		</Flex>
	);
}

export default Layout;
