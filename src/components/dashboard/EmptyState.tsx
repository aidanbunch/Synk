import { Button, Center, Heading, Stack } from "@chakra-ui/react";
import { showCreateNewEventModalAtom } from "../layout/Layout";

function EmptyState() {
	return (
		<Center transform="translateY(400%)">
			<Stack spacing="5">
				<Heading size="md" color="fg-subtle">
					You currently have no events.
				</Heading>
				<Button
					onClick={() => {
						showCreateNewEventModalAtom.set(true);
					}}
				>
					Create Event
				</Button>
			</Stack>
		</Center>
	);
}

export default EmptyState;
