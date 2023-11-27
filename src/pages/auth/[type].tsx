import { useRouter } from "next/router";
import Meta from "@/components/meta/Meta";
import {
	Avatar,
	Box,
	Center,
	Flex,
	Heading,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { AuthForm } from "@/components/auth/AuthForm";
import { GoogleIcon } from "@/components/auth/ProviderIcons";
import { ProviderItem } from "@/components/auth/OAuthButtonGroup";

const providers: ProviderItem[] = [
	{ id: "google", name: "Google", icon: <GoogleIcon /> },
];

function AuthPage() {
	const router: any = useRouter();
	const handleAuth = (user: any) => {
		router.push(router.query.next || "/dashboard");
	};

	return (
		<>
			<Meta title="Authentication" />
			<Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
				<Stack direction="row" spacing="12">
					<Flex flex="1" bg="white">
						<AuthForm
							providers={providers}
							onAuth={handleAuth}
							authType={router.query.type}
						/>
					</Flex>
					<Center
						flex="1"
						px={{ lg: "8" }}
						display={{ base: "none", lg: "flex" }}
					>
						<VStack spacing="8">
							<Stack direction="row" spacing="3">
								<Heading size="sm" fontWeight="medium" textAlign="center">
									What can I say - I fell in love with Synk.
								</Heading>
							</Stack>
							<VStack spacing="4">
								<Avatar
									size="lg"
									src="https://avatars.githubusercontent.com/u/20296626?v=4"
									name="Simon Holzmayer"
								/>
								<Stack textAlign="center" spacing="1">
									<Text textStyle="md" fontWeight="medium" color="fg.muted">
										Aidan Bunch
									</Text>
									<Text fontWeight="medium" textStyle="sm" color="fg.muted">
										aidan@synk.com
									</Text>
								</Stack>
							</VStack>
						</VStack>
					</Center>
				</Stack>
			</Box>
		</>
	);
}

// static files for each auth page
export const getStaticPaths = () => ({
	paths: [
		{ params: { type: "signin" } },
		{ params: { type: "signup" } },
		{ params: { type: "forgotpass" } },
		{ params: { type: "changepass" } },
	],
	fallback: true,
});

export function getStaticProps({ params }: any) {
	return { props: {} };
}

export default AuthPage;
