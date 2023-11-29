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
import SidebarEventCard from "./SidebarEventCard";
import { showCreateNewEventModalAtom } from "./Layout";
import { useEffect, useState } from "react";
import { getEventFlowsWithImages } from "@/utils/db";
import { useRouter } from "next/router";

export const Sidebar = () => {
	const auth = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [eventFlows, setEventFlows] = useState<Array<any>>([]);

	useEffect(() => {
		setIsLoading(true);
		getEventFlowsWithImages(5)
			.then((data) => {
				if (data) {
					setEventFlows(data);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

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
					<Button
						onClick={() => {
							showCreateNewEventModalAtom.set(true);
						}}
					>
						Create Event
					</Button>
					<Link href="/dashboard" passHref legacyBehavior>
						<SidebarButton as="a" textColor="fg-subtle">
							My Events
						</SidebarButton>
					</Link>
					<Stack spacing="4" divider={<StackDivider />}>
						<Box />
						{/* map here, inside of boxes */}
						{/* limit of 5 */}
						{!isLoading && eventFlows && eventFlows.length > 0 ? (
							eventFlows.map((eventFlow, index) => {
								return (
									<SidebarEventCard
										key={index}
										activityName={eventFlow.event_name}
										eventName={eventFlow.activity}
										image={eventFlow.image}
									/>
								);
							})
						) : (
							<div
								onClick={() => {
									router.push(
										"/event/0df565bb-a933-4896-a935-5912e2edd50f/overview?hotel=3c423caa-87ea-48cf-8439-c0e6043c3935&departureFlight=6632528e-d0a4-4275-b9ed-25aa61f234ff&returnFlight=52d46c22-7eab-497c-af63-a800620f262b&activity=a1f8bcc1-cfe7-4ee0-a655-511a0114c7d1"
									);
								}}
							>
								<SidebarEventCard
									activityName={"LavaLab"}
									eventName={"Fall '23 Retreat"}
									image="https://assets-global.website-files.com/64efa831383dfe702db152da/655265cffa99b91b0b231ca4_twF27UUY_3aaczTYJFHCe3BQD3xskdMUW87em0nD9BIbIwLAiVszPQU_aOkA2el5idu1kUgPoHXJCiTsU_rGqsyAqikPb8H7lYLEzGFXv3IZFo-0N4nGQx4GnzrqOAs5dFk880xv3idxvmXCG9DqEsXPczr_Lb33oD5Y8E8fl2U.jpeg"
								/>
							</div>
						)}
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
