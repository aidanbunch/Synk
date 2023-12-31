import { tabIndexAtom } from "@/pages/event/[id]/flow";
import {
	Heading,
	Tabs,
	TabList,
	Tab,
	TabIndicator,
	TabPanels,
	TabPanel,
} from "@chakra-ui/react";
import { useStore } from "@nanostores/react";

type FlowTabsProps = {
	tabsToShow: { stay: boolean; travel: boolean; activities: boolean };
	content: {
		stay?: JSX.Element;
		travel?: JSX.Element;
		activities?: JSX.Element;
	};
};

function FlowTabs({ tabsToShow, content }: FlowTabsProps) {
	const tabIndex = useStore(tabIndexAtom);

	return (
		<Tabs
			index={tabIndex}
			onChange={(index) => {
				tabIndexAtom.set(index);
			}}
			isFitted
		>
			<TabList>
				{tabsToShow.stay && (
					<Tab py="5">
						<Heading size="md" fontWeight="medium">
							Stay
						</Heading>
					</Tab>
				)}
				{tabsToShow.travel && (
					<Tab py="5">
						<Heading size="md" fontWeight="medium">
							Travel
						</Heading>
					</Tab>
				)}
				{tabsToShow.activities && (
					<Tab py="5">
						<Heading size="md" fontWeight="medium">
							Activities
						</Heading>
					</Tab>
				)}
			</TabList>
			<TabIndicator mt="-1.5px" height="2px" bg="blue.500" borderRadius="1px" />
			<TabPanels>
				{tabsToShow.stay && <TabPanel>{content.stay}</TabPanel>}
				{tabsToShow.travel && <TabPanel>{content.travel}</TabPanel>}
				{tabsToShow.activities && <TabPanel>{content.activities}</TabPanel>}
			</TabPanels>
		</Tabs>
	);
}

export default FlowTabs;
