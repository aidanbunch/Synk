import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import FlowTabs from "@/components/layout/FlowTabs";
import StayContent from "@/components/stay/StayContent";
import TravelContent from "@/components/travel/TravelContent";
import ActivitiesContent from "@/components/activities/ActivitiesContent";
import { eventCityToAirportCode } from "@/utils/filterTypes";
import EditAttendeesModal from "@/components/layout/EditAttendeesModal";

function FlowPage() {
	return (
		<>
			<Meta title="Event Flow" />
			<Layout>
				<FlowTabs
					tabsToShow={{ stay: true, travel: true, activities: true }}
					content={{
						stay: <StayContent initialAttendees={23} initialCity="nyc" />,
						travel: (
							<TravelContent
								initialAttendees={23}
								initialDepartureAirport="LAX"
								initialDestinationAirport={eventCityToAirportCode["nyc"]}
							/>
						),
						activities: (
							<ActivitiesContent
								initialEventCity="nyc"
								spentBudget={2500}
								totalBudget={5000}
							/>
						),
					}}
				/>
			</Layout>
		</>
	);
}

export default requireAuth(FlowPage);
