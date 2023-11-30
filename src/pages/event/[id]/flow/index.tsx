import Layout from "@/components/layout/Layout";
import Meta from "@/components/meta/Meta";
import { requireAuth } from "@/utils/auth";
import FlowTabs from "@/components/layout/FlowTabs";
import StayContent from "@/components/stay/StayContent";
import TravelContent from "@/components/travel/TravelContent";
import ActivitiesContent from "@/components/activities/ActivitiesContent";
import EditAttendeesModal from "@/components/layout/EditAttendeesModal";
import { useEffect, useState } from "react";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/router";
import { EventCityTypes, eventCityToAirportCode } from "@/utils/filterTypes";
import { useSetState } from "@mantine/hooks";
import { HotelOffers } from "@/pages/api/hotels";
import { FlightOffers } from "@/pages/api/flights";
import { useToast } from "@chakra-ui/react";
import {
	uploadEventFlowActivities,
	uploadEventFlowFlights,
	uploadEventFlowHotels,
} from "@/utils/db";

export interface ActivityOffers {
	id: string;
}

export const tabIndexAtom = atom(0);
export const attendeesAtom = atom(2);
// eventCityToAirportCode["nyc"]
export const departureAirportAtom = atom("LAX");
export const destinationCityAtom = atom("nyc");
export const destinationAirportAtom = atom("JFK");
export const editAttendeesModalOpenAtom = atom(false);
export const spentBudgetAtom = atom(0);
export const totalBudgetAtom = atom(0);

function FlowPage() {
	const editAttendeesModalOpen = useStore(editAttendeesModalOpenAtom);
	const attendees = useStore(attendeesAtom);
	const router = useRouter();
	const toast = useToast();

	const planSelections = JSON.parse(router.query.planSelections as string);
	const attendeesFromQuery = router.query.attendees;
	const budgetFromQuery = router.query.budget;
	const destinationCityFromQuery = router.query.destinationCity;
	const departureAirportFromQuery = router.query.departureAirport;

	const [selectedHotelObject, setSelectedHotelObject] = useSetState<
		HotelOffers | {}
	>({});
	const [selectedDepartureFlightObject, setSelectedDepartureFlightObject] =
		useSetState<FlightOffers | {}>({});
	const [selectedReturnFlightObject, setSelectedReturnFlightObject] =
		useSetState<FlightOffers | {}>({});
	const [selectedActivityObject, setSelectedActivityObject] = useSetState<
		ActivityOffers | {}
	>({});

	useEffect(() => {
		// set atom from query params
		if (attendeesFromQuery) {
			attendeesAtom.set(parseInt(attendeesFromQuery as string));
		}

		if (budgetFromQuery) {
			totalBudgetAtom.set(parseInt(budgetFromQuery as string));
		}

		if (destinationCityFromQuery) {
			destinationCityAtom.set(destinationCityFromQuery as string);
			destinationAirportAtom.set(
				eventCityToAirportCode[destinationCityFromQuery as EventCityTypes]
			);
		}

		if (departureAirportFromQuery) {
			departureAirportAtom.set(departureAirportFromQuery as string);
		}
	}, []);

	const onOverviewClick = async () => {
		try {
			const hotelName = planSelections.stay
				? // @ts-ignore
				  selectedHotelObject.hotelName
				: null;
			const departureFlightDuration = planSelections.travel
				? // @ts-ignore
				  selectedDepartureFlightObject.duration
				: null;
			const returnFlightDuration = planSelections.travel
				? // @ts-ignore
				  selectedReturnFlightObject.duration
				: null;
			const activityName = planSelections.activities
				? // @ts-ignore
				  selectedActivityObject.name
				: null;

			if (
				(planSelections.stay && !hotelName) ||
				(planSelections.travel && !departureFlightDuration) ||
				(planSelections.travel && !returnFlightDuration) ||
				(planSelections.activities && !activityName)
			) {
				throw new Error("Please select an option for every plan.");
			}

			let hotelUUID = "";

			if (hotelName) {
				hotelUUID = await uploadEventFlowHotels(
					router.query.id as string,
					hotelName,
					// @ts-ignore
					selectedHotelObject.totalPrice,
					// @ts-ignore
					selectedHotelObject.imageUrl
				);
			}

			let departureFlightUUID = "";

			if (departureFlightDuration) {
				// @ts-ignore
				departureFlightUUID = await uploadEventFlowFlights(
					router.query.id as string,
					// @ts-ignore
					selectedDepartureFlightObject.startingTime,
					// @ts-ignore
					selectedDepartureFlightObject.endingTime,
					// @ts-ignore
					selectedDepartureFlightObject.duration,
					// @ts-ignore
					selectedDepartureFlightObject.price,
					// @ts-ignore
					selectedDepartureFlightObject.airlineCode,
					// @ts-ignore
					selectedDepartureFlightObject.airlineName,
					// @ts-ignore
					selectedDepartureFlightObject.airlineImage
				);
			}

			let returnFlightUUID = "";

			if (returnFlightDuration) {
				// @ts-ignore
				returnFlightUUID = await uploadEventFlowFlights(
					router.query.id as string,
					// @ts-ignore
					selectedReturnFlightObject.startingTime,
					// @ts-ignore
					selectedReturnFlightObject.endingTime,
					// @ts-ignore
					selectedReturnFlightObject.duration,
					// @ts-ignore
					selectedReturnFlightObject.price,
					// @ts-ignore
					selectedReturnFlightObject.airlineCode,
					// @ts-ignore
					selectedReturnFlightObject.airlineName,
					// @ts-ignore
					selectedReturnFlightObject.airlineImage
				);
			}

			if (activityName) {
				await uploadEventFlowActivities(
					// @ts-ignore
					selectedActivityObject.id,
					router.query.id as string
				);
			}
			router.push({
				pathname: `/event/${router.query.id}/overview`,
				query: {
					hotel: hotelUUID,
					departureFlight: departureFlightUUID,
					returnFlight: returnFlightUUID,
					// @ts-ignore
					activity: activityName ? selectedActivityObject.id : "",
				},
			});
		} catch (error) {
			toast({
				title: "Please select an option for every plan.",
				status: "error",
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Meta title="Event Flow" />
			<Layout>
				<FlowTabs
					tabsToShow={{
						stay: planSelections.stay,
						travel: planSelections.travel,
						activities: planSelections.activities,
					}}
					content={{
						stay: (
							<StayContent
								selectedHotelObject={selectedHotelObject}
								setSelectedHotelObject={setSelectedHotelObject}
								planSelections={planSelections}
								onOverviewClick={async () => {
									await onOverviewClick();
								}}
							/>
						),
						travel: (
							<TravelContent
								selectedDepartureFlightObject={selectedDepartureFlightObject}
								setSelectedDepartureFlightObject={
									setSelectedDepartureFlightObject
								}
								selectedReturnFlightObject={selectedReturnFlightObject}
								setSelectedReturnFlightObject={setSelectedReturnFlightObject}
								planSelections={planSelections}
								onOverviewClick={async () => {
									await onOverviewClick();
								}}
							/>
						),
						activities: (
							<ActivitiesContent
								selectedActivityObject={selectedActivityObject}
								setSelectedActivityObject={setSelectedActivityObject}
								onOverviewClick={async () => {
									await onOverviewClick();
								}}
							/>
						),
					}}
				/>
				<EditAttendeesModal
					isOpen={editAttendeesModalOpen}
					initialAttendees={attendees}
					onClose={() => {
						editAttendeesModalOpenAtom.set(false);
					}}
					onSubmit={({ numAttendees }) => {
						attendeesAtom.set(numAttendees);
						editAttendeesModalOpenAtom.set(false);
					}}
				/>
			</Layout>
		</>
	);
}

export default requireAuth(FlowPage);
