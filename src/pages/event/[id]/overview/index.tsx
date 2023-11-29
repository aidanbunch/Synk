import {
	Button,
	VStack,
	Divider,
	Heading,
	HStack,
	Container,
	Box,
	SimpleGrid,
	Text,
	Progress,
	Center,
	Icon,
} from "@chakra-ui/react";
import { UserPlus, MessagesSquare, CheckIcon } from "lucide-react";
import { requireAuth } from "@/utils/auth";
import Meta from "@/components/meta/Meta";
import Layout from "@/components/layout/Layout";
import OverviewStaySection from "@/components/overview/OverviewStaySection";
import OverviewTravelSection from "@/components/overview/OverviewTravelSection";
import OverviewActivitiesSection from "@/components/overview/OverviewActivitiesSection";
import BookingCardSection from "@/components/overview/BookingCardSection";
import BookingCardSectionItem from "@/components/overview/BookingCardSectionItem";
import {
	convertStringToDate,
	findRangeOfDays,
	formatPrice,
} from "@/utils/util";
import BookingFinishedState from "@/components/overview/BookingFinishedState";
import BookingCard from "@/components/overview/BookingCard";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import {
	getActivity,
	getEventFlowFromUUID,
	getFlight,
	getHotel,
} from "@/utils/server/_db";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const hotelId = context.query?.hotel;
	const departureFlightId = context.query?.departureFlight;
	const returnFlightId = context.query?.returnFlight;
	const activityId = context.query?.activity;

	let hotel = null;
	let departure_flight = null;
	let return_flight = null;
	let activity = null;
	let event_flow = null;

	if (activityId && activityId !== "") {
		activity = await getActivity(activityId as string);
	}

	if (departureFlightId && departureFlightId !== "") {
		departure_flight = await getFlight(departureFlightId as string);
	}

	if (returnFlightId && returnFlightId !== "") {
		return_flight = await getFlight(returnFlightId as string);
	}

	if (hotelId && hotelId !== "") {
		hotel = await getHotel(hotelId as string);
	}

	// working
	if (id) {
		event_flow = await getEventFlowFromUUID(id as string);
	}

	return {
		props: {
			hotel,
			departure_flight,
			return_flight,
			activity,
			event_flow,
		},
	};
};

export const isBookingFinishedAtom = atom(false);
export const stayCheckedAtom = atom(true);
export const departureFlightCheckedAtom = atom(true);
export const returnFlightCheckedAtom = atom(true);
export const activityCheckedAtom = atom(true);

const OverviewPage = ({
	hotel,
	departure_flight,
	return_flight,
	activity,
	event_flow,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const isBookingFinished = useStore(isBookingFinishedAtom);

	const stayChecked = useStore(stayCheckedAtom);
	const departureFlightChecked = useStore(departureFlightCheckedAtom);
	const returnFlightChecked = useStore(returnFlightCheckedAtom);
	const activityChecked = useStore(activityCheckedAtom);

	useEffect(() => {
		if (event_flow) {
			isBookingFinishedAtom.set(event_flow.booked);
		}
	}, []);

	return (
		<>
			<Meta title="Overview" />
			<Layout>
				<Container height="full" py="10" px="12" maxW="100%">
					<VStack spacing="4">
						<HStack justifyContent="space-between" width="100%">
							<Heading size="lg">Your Plan</Heading>
							<HStack>
								<Button
									rightIcon={<UserPlus />}
									variant="solid"
									color="black"
									border="1px"
									borderColor="gray.200"
									bg="white"
									_hover={{ bg: "gray.200", color: "black" }}
								>
									Invite Collaborators
								</Button>
								<Button
									rightIcon={<MessagesSquare />}
									variant="solid"
									border="1px"
									borderColor="gray.200"
									color="black"
									bg="white"
									_hover={{ bg: "gray.200", color: "black" }}
								>
									Gather Feedback
								</Button>
							</HStack>
						</HStack>
						<Divider borderColor="gray.300" />
						<SimpleGrid columns={2} px="0" spacing="100">
							<VStack spacing="4">
								{hotel && event_flow ? (
									<OverviewStaySection
										name={hotel.hotel_name}
										price={hotel.total_price}
										attendees={event_flow.num_attendees}
										image={hotel.image_url}
									/>
								) : (
									<></>
								)}
								{departure_flight && return_flight && event_flow ? (
									<OverviewTravelSection
										startingTime={departure_flight.starting_time}
										endingTime={departure_flight.ending_time}
										returnStartingTime={return_flight.starting_time}
										returnEndingTime={return_flight.ending_time}
										duration={departure_flight.duration}
										returnDuration={return_flight.duration}
										price={departure_flight.price}
										returnPrice={return_flight.price}
										attendees={event_flow.num_attendees}
										airlineName={departure_flight.airline_name}
										airlineLogo={departure_flight.airline_image}
										returnAirlineName={return_flight.airline_name}
										returnAirlineLogo={return_flight.airline_image}
									/>
								) : (
									<></>
								)}
								{activity && event_flow ? (
									<OverviewActivitiesSection
										name={activity.name}
										price={activity.price_per_participant}
										image={activity.image_url}
									/>
								) : (
									<></>
								)}
							</VStack>
							<Box
								bg={isBookingFinished ? "gray.100" : "white"}
								borderRadius="lg"
								py="5"
								px="12"
							>
								{isBookingFinished ? (
									<BookingFinishedState />
								) : (
									<BookingCard
										spentBudget={
											(activityChecked && activity ? activity.price_per_participant *
												event_flow.num_attendees : 0) +
											(departureFlightChecked && departure_flight ? departure_flight.price : 0) +
											(returnFlightChecked && return_flight ? return_flight.price : 0) +
											(stayChecked && hotel ? hotel.total_price * event_flow.num_attendees : 0)
										}
										totalBudget={event_flow ? event_flow.budget : 4500}
										hotelCards={
											hotel && event_flow && stayChecked ? (
												<BookingCardSectionItem
													heading={hotel.hotel_name}
													subheading={`${
														event_flow.num_attendees
													} Guests, ${findRangeOfDays(
														convertStringToDate(event_flow.start_date),
														convertStringToDate(event_flow.end_date)
													)} Nights`}
													price={hotel.total_price * event_flow.num_attendees}
												/>
											) : (
												<></>
											)
										}
										flightCards={
											<>
												{departure_flight &&
												return_flight &&
												event_flow &&
												departureFlightChecked ? (
													<BookingCardSectionItem
														heading={`${departure_flight.airline_name} Flight`}
														subheading={`"(${event_flow.num_attendees})"`}
														price={departure_flight.price}
													/>
												) : (
													<></>
												)}
												{departure_flight &&
												return_flight &&
												event_flow &&
												returnFlightChecked ? (
													<BookingCardSectionItem
														heading={`${return_flight.airline_name} Flight`}
														subheading={`"(${event_flow.num_attendees})"`}
														price={return_flight.price}
													/>
												) : (
													<></>
												)}
											</>
										}
										activityCards={
											activity && event_flow && activityChecked ? (
												<>
													<BookingCardSectionItem
														heading={activity.name}
														subheading={`( ${formatPrice(
															activity.price_per_participant *
																event_flow.num_attendees
														)}, ${event_flow.num_attendees}) `}
														price={200}
													/>
												</>
											) : (
												<></>
											)
										}
									/>
								)}
							</Box>
						</SimpleGrid>
					</VStack>
				</Container>
			</Layout>
		</>
	);
};

export default requireAuth(OverviewPage);
