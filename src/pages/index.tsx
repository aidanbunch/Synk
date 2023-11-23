import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function Home() {
	return (
		<Box as="section" bg="bg.surface">
			<Container py={{ base: "16", md: "24" }}>
				<Stack spacing={{ base: "8", md: "10" }}>
					<Stack spacing={{ base: "4", md: "5" }} align="center">
						<Heading size="xl">Event Planning, Made Easy</Heading>
						<Text color="fg.muted" maxW="xl" textAlign="center" fontSize="lg">
							Plan your next event with ease using our automated platform. From scheduling to execution, we&apos;ve got you covered.
						</Text>
					</Stack>
					<Stack
						spacing="3"
						direction={{ base: "column", sm: "row" }}
						justify="center"
					>
						<Button variant="secondary" size="lg">
							Learn more
						</Button>
						<Button size="lg">Get Started</Button>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}
