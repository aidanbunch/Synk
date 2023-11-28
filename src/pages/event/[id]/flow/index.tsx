import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import FlowTabs from "@/components/layout/FlowTabs";
import StayContent from "@/components/stay/StayContent";
import TravelContent from "@/components/travel/TravelContent";
import ActivitiesContent from "@/components/activities/ActivitiesContent";

function FlowPage() {
	return (
		<>
			<Meta title="Event Flow" />
			<Layout>
				<FlowTabs
					tabsToShow={{ stay: true, travel: true, activities: true }}
					content={{
						stay: <StayContent />,
						travel: <TravelContent />,
						activities: <ActivitiesContent />,
					}}
				/>
			</Layout>
		</>
	);
}

export default requireAuth(FlowPage);
