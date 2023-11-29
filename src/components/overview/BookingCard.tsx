import {
	Progress,
	VStack,
	HStack,
	Heading,
	Text,
	Button,
	Divider,
} from "@chakra-ui/react";
import BookingCardSection from "./BookingCardSection";
import { formatPrice } from "@/utils/util";
import { isBookingFinishedAtom } from "@/pages/event/[id]/overview";

type BookingCardProps = {
	spentBudget: number;
	totalBudget: number;
	hotelCards: React.ReactNode;
	flightCards: React.ReactNode;
	activityCards: React.ReactNode;
};

function BookingCard({ spentBudget, totalBudget, hotelCards, flightCards, activityCards }: BookingCardProps) {
	return (
		<VStack spacing="5">
			<Heading size="lg" fontWeight="semibold">
				Book Now
			</Heading>
			<HStack spacing="5">
				<Text fontWeight="medium" fontSize="xl">
					Budget
				</Text>
				<Progress
					value={spentBudget / totalBudget * 100}
					width="175px"
					height="12px"
					style={{ background: "#E6E6E3" }}
					borderRadius="md"
				/>
				<Text fontWeight="medium" fontSize="xl">
					{formatPrice(totalBudget)}
				</Text>
			</HStack>
			<BookingCardSection heading="Stay">
				{hotelCards}
			</BookingCardSection>
			<BookingCardSection heading="Travel">
				{flightCards}
			</BookingCardSection>
			<BookingCardSection heading="Activities">
				{activityCards}
			</BookingCardSection>
			<Divider borderColor="gray.300" pt="2" />
			<VStack spacing="5">
				<VStack spacing="0">
					<Heading fontWeight="semibold" fontSize="xl" color="#0FBC00">
						Total: {formatPrice(spentBudget)}
					</Heading>
					<Text color="fg-subtle" fontWeight="light" fontSize="sm">
						{totalBudget - spentBudget > 0 ? (
							`${formatPrice(totalBudget - spentBudget)} under budget`
						) : totalBudget - spentBudget < 0 ? (
							`${formatPrice(spentBudget - totalBudget)} over budget`
						) : (
							"On budget"
						)}
					</Text>
				</VStack>
				<Button
					size="lg"
					onClick={() => {
						isBookingFinishedAtom.set(true);
					}}
				>
					Book Now
				</Button>
			</VStack>
		</VStack>
	);
}

export default BookingCard;
