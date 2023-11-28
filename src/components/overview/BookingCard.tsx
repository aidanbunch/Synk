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
import BookingCardSectionItem from "./BookingCardSectionItem";
import { formatPrice } from "@/utils/util";

type BookingCardProps = {
	spentBudget: number;
	totalBudget: number;
};

function BookingCard({ spentBudget, totalBudget }: BookingCardProps) {
	const totalPrice = 15320;

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
					value={(spentBudget / totalBudget) * 100}
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
				<BookingCardSectionItem
					heading="Large Cabin"
					subheading="20 Guests, 2 Nights"
					price={7600}
				/>
			</BookingCardSection>
			<BookingCardSection heading="Travel">
				<BookingCardSectionItem
					heading="American Airlines Flight"
					subheading="(10)"
					price={1760}
				/>
				<BookingCardSectionItem
					heading="Spirit Airlines Flight"
					subheading="(10)"
					price={1760}
				/>
			</BookingCardSection>
			<BookingCardSection heading="Activites">
				<BookingCardSectionItem
					heading="Relaxing Hike"
					subheading="($ 10, 20) "
					price={200}
				/>
				<BookingCardSectionItem
					heading="Intro to Tufting"
					subheading="($ 200, 20) "
					price={4000}
				/>
			</BookingCardSection>
			<Divider borderColor="gray.300" pt="2" />
			<VStack spacing="5">
				<VStack spacing="0">
					<Heading fontWeight="semibold" fontSize="xl" color="#0FBC00">
						Total: {formatPrice(totalPrice)}
					</Heading>
					<Text color="fg-subtle" fontWeight="light" fontSize="sm">
						{formatPrice(totalBudget - totalPrice)} under budget
					</Text>
				</VStack>
				<Button size="lg">Book Now</Button>
			</VStack>
		</VStack>
	);
}

export default BookingCard;
