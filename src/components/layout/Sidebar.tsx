import {
	Avatar,
	Box,
	Button,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Stack,
	StackDivider,
	Text,
	VStack,
	Image,
	AspectRatio,
} from "@chakra-ui/react";
import { MoreVertical } from "lucide-react";
import Logo from "../brand/Logo";
import { SidebarButton } from "./SidebarButton";
import { useAuth } from "@/utils/auth";
import Link from "next/link";

export const Sidebar = () => {
	const auth = useAuth();

	return (
		<Stack
			flex="1"
			maxW={{ base: "full", sm: "xs" }}
			py={{ base: "6", sm: "8" }}
			px={{ base: "4", sm: "6" }}
			bg="bg.surface"
			borderRightWidth="1px"
			justifyContent="space-between"
		>
			<Stack spacing="8">
				<VStack spacing="4" alignItems="start">
					<Logo width="40" height="40" includeText />
				</VStack>
				<Stack spacing="1">
					<Box />
					<Button>Create Event</Button>
					<Link href="/dashboard" passHref legacyBehavior>
						<SidebarButton as="a" textColor="fg-subtle">
							My Events
						</SidebarButton>
					</Link>
					<Stack spacing="4" divider={<StackDivider />}>
						<Box />
						<HStack spacing="5">
							<AspectRatio ratio={4 / 3} width="14" height="14">
								<Image
									alt=""
									fallbackSrc="https://via.placeholder.com/53"
									borderRadius="md"
								/>
							</AspectRatio>
							<VStack alignItems={"start"} spacing="0">
								<Text color="fg-subtle" fontSize="sm">
									LavaLab
								</Text>
								<Text fontSize="md">Fall &apos;23 Retreat</Text>
							</VStack>
						</HStack>
						<Box />
					</Stack>
					<VStack spacing="0" alignItems="start">
						<Link href="/dashboard" passHref legacyBehavior>
							<SidebarButton as="a">Event Summary</SidebarButton>
						</Link>
						<Link href="/dashboard" passHref legacyBehavior>
							<SidebarButton as="a">Settings</SidebarButton>
						</Link>
					</VStack>
				</Stack>
			</Stack>
			<Stack spacing="4" divider={<StackDivider />}>
				<Box />
				<HStack spacing="3" justify="space-between">
					<HStack spacing="3">
						<Avatar
							boxSize="10"
							src={auth.user ? auth.user.user_metadata.avatar_url : ""}
						/>
						<Box>
							<Text textStyle="sm" fontWeight="medium">
								{auth.user ? auth.user.name : ""}
							</Text>
							<Text textStyle="sm" color="fg.muted">
								{auth.user ? auth.user.email : ""}
							</Text>
						</Box>
					</HStack>
					<Menu>
						<MenuButton
							as={IconButton}
							variant="tertiary"
							icon={<MoreVertical />}
							aria-label="Open Menu"
						>
							Actions
						</MenuButton>
						<MenuList>
							<MenuItem
								onClick={() => {
									auth.signout();
								}}
							>
								Log Out
							</MenuItem>
						</MenuList>
					</Menu>
				</HStack>
			</Stack>
		</Stack>
	);
};
