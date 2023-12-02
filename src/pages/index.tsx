import Meta from "@/components/meta/Meta";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	return (
		<>
			<Meta title="Synk" />
			<Box as="section" bg="bg.surface">
				<Container py="16">
					<Stack spacing={{ base: "8", md: "10" }}>
						<Stack spacing={{ base: "4", md: "5" }} align="center">
							<Heading size="3xl" textAlign="center" pt="15" pb="6">Event Planning, Made Easy</Heading>
							<video
								src="https://qwusjyzfofxtckzzaexg.supabase.co/storage/v1/object/public/VideoBucket/synk-demo.mp4"
								loop
								autoPlay
								muted
								playsInline
								style={{
									width: "100%",
									marginTop: "10px",
									height: "100%",
									borderRadius: "8px",
									display: "block",
									objectFit: "cover",
									backgroundColor: "rgba(0,0,0,0)",
									objectPosition: "50% 50%",
									boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
								}}
							></video>
							<Text color="fg.muted" maxW="xl" textAlign="center" fontSize="lg" pt="5">
								Plan your next event with ease using our automated platform.
								From scheduling to execution, we&apos;ve got you covered.
							</Text>
						</Stack>
						<Stack
							spacing="3"
							direction={{ base: "column", sm: "row" }}
							justify="center"
						>
							<Button
								variant="secondary"
								size="lg"
								onClick={() => {
									router.push("/dashboard");
								}}
							>
								Learn more
							</Button>
							<Button
								size="lg"
								onClick={() => {
									router.push("/dashboard");
								}}
							>
								Get Started
							</Button>
						</Stack>
					</Stack>
				</Container>
			</Box>
		</>
	);
}
