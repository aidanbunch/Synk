import {
	Flex,
	Container,
	Box,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
} from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<Flex
			as="section"
			direction="row"
			height="100vh"
			bg="bg-canvas"
			overflowY="auto"
		>
			<Sidebar />
			<Box bg="gray.100" flex="1">
				<Box bg="bg-canvas" height="full">
					{children}
				</Box>
			</Box>
		</Flex>
	);
}

export default Layout;
