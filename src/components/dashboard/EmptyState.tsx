import { Button, Center, Heading, Stack } from "@chakra-ui/react";

function EmptyState() {
	return (
		<Center transform="translateY(400%)">
			<Stack spacing="5">
				<Heading size="md" color="fg-subtle">
					You currently have no events.
				</Heading>
				<Button>Create Event</Button>
			</Stack>
		</Center>
	);
}

export default EmptyState;
