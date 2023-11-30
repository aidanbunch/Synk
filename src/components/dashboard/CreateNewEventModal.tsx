import {
	Stack,
	Button,
	Input,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalContent,
	ModalCloseButton,
	HStack,
	Textarea,
	Select,
	Center,
	SimpleGrid,
	Box,
	Checkbox,
	CheckboxGroup,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	isDateAfter,
	isDateBefore,
	isDateInPast,
	isSameDay,
} from "@/utils/util";
import { AirportCodeTypes } from "@/utils/filterTypes";

const selectablePlans = ["stay", "travel", "activities"] as const;
type PlanTypes = (typeof selectablePlans)[number];
type PlanSelectionStatus = { [key in PlanTypes]: boolean };

export interface NewEventFormInputs {
	planSelections: PlanSelectionStatus;
	startDate: Date;
	endDate: Date;
	eventName: string;
	numAttendees: number;
	budget: number;
	eventLocation: string;
	departingLocation: string;
	idealEvent: string;
}

type CreateNewEventModalProps = {
	onClose: () => void;
	isOpen: boolean;
	onSubmit: (data: NewEventFormInputs) => void;
};

export const CreateNewEventModal = ({
	onClose,
	isOpen,
	onSubmit,
}: CreateNewEventModalProps) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
		reset,
		control,
	} = useForm({
		defaultValues: {
			planSelections: {
				stay: true,
				travel: true,
				activities: true,
			},
			startDate: new Date(),
			// default end date is 4 days after start date
			endDate: (() => {
				const startDate = new Date();
				startDate.setDate(startDate.getDate() + 4);
				return startDate;
			})(),
			eventName: "Summer Retreat",
			numAttendees: 9,
			budget: 10000,
			eventLocation: "nyc",
			departingLocation: "LAX",
			idealEvent: "A casual event with a lot of team-building activities",
		},
	});

	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				reset();
				onClose();
			}}
			isCentered
			size="5xl"
		>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<ModalHeader>Create a New Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody bgColor="fg">
						<HStack spacing="20">
							<Stack minWidth={"40%"}>
								<FormControl
									isRequired
									isInvalid={errors.eventName ? true : false}
								>
									<FormLabel>Event Name</FormLabel>
									<Input
										id="eventName"
										placeholder="What is your event's name?"
										type="text"
										bgColor={"white"}
										{...register("eventName", {
											required: {
												value: true,
												message: "Event name is required",
											},
											maxLength: {
												value: 20,
												message: "Event name cannot exceed 20 characters",
											},
										})}
									/>
									{errors.eventName && (
										<FormErrorMessage>
											{errors.eventName.message}
										</FormErrorMessage>
									)}
								</FormControl>
								<Controller
									name={"numAttendees"}
									control={control}
									rules={{
										required: {
											value: true,
											message: "# of attendees is required",
										},
										min: {
											value: 1,
											message: "Must have at least 1 attendee",
										},
										max: {
											value: 1000,
											message: "Cannot have more than 1000 attendees",
										},
									}}
									render={({ field: { ref, ...restField } }) => (
										<FormControl
											isRequired
											isInvalid={errors.numAttendees ? true : false}
										>
											<FormLabel># of Attendees</FormLabel>
											<NumberInput
												{...restField}
												defaultValue={1}
												min={1}
												max={1000}
												placeholder="How many people will be attending?"
												bgColor={"white"}
											>
												<NumberInputField ref={ref} name={restField.name} />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
											{errors.numAttendees && (
												<FormErrorMessage>
													{errors.numAttendees.message}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								/>
								<Controller
									name={"budget"}
									control={control}
									rules={{
										required: {
											value: true,
											message: "Budget is required",
										},
										min: {
											value: 1,
											message: "Budget must be at least $1",
										},
									}}
									render={({ field: { ref, ...restField } }) => (
										<FormControl
											isRequired
											isInvalid={errors.budget ? true : false}
										>
											<FormLabel>Budget</FormLabel>
											<NumberInput
												{...restField}
												defaultValue={5000}
												min={1}
												id="budget"
												placeholder="What is the budget of your event?"
												bgColor={"white"}
											>
												<NumberInputField ref={ref} name={restField.name} />
												<NumberInputStepper>
													<NumberIncrementStepper />
													<NumberDecrementStepper />
												</NumberInputStepper>
											</NumberInput>
											{errors.budget && (
												<FormErrorMessage>
													{errors.budget.message}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								/>
								<Controller
									control={control}
									name="eventLocation"
									rules={{ required: "Please enter a location." }}
									render={({
										field: { onChange, onBlur, value, name, ref },
										fieldState: { error },
									}) => (
										<FormControl isRequired isInvalid={error ? true : false}>
											<FormLabel>Event Location</FormLabel>
											<Select
												placeholder="Where will your event be held?"
												id="eventLocation"
												ref={ref}
												value={value}
												onBlur={onBlur}
												onChange={onChange}
												name={name}
												bgColor="white"
											>
												<option value="nyc">New York, NY</option>
												<option value="sf">San Francisco, CA</option>
											</Select>
											{errors.eventLocation && (
												<FormErrorMessage>
													{error && error.message}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								/>

								<FormControl
									isRequired
									isInvalid={errors.idealEvent ? true : false}
								>
									<FormLabel>Describe your ideal event</FormLabel>
									<Textarea
										id="idealEvent"
										placeholder="i.e. a serene haven, full of nature"
										bgColor={"white"}
										{...register("idealEvent", {
											required: "Please enter your ideal event",
											minLength: {
												value: 5,
												message:
													"Your ideal event must be at least 5 characters long",
											},
										})}
									/>
									{errors.idealEvent && (
										<FormErrorMessage>
											{errors.idealEvent.message}
										</FormErrorMessage>
									)}
								</FormControl>
							</Stack>
							<Stack py="5">
								<HStack spacing="5">
									<Controller
										control={control}
										name="startDate"
										rules={{
											required: {
												value: true,
												message: "A start date is required",
											},
											validate: (value) => {
												const endDate = getValues().endDate;
												if (
													!isDateBefore(value, endDate) &&
													!isSameDay(value, endDate)
												) {
													return "Start date must be before end date";
												}
												if (isDateInPast(value)) {
													return "Start date cannot be in the past";
												}
												return true;
											},
										}}
										render={({ field }) => (
											<FormControl
												isRequired
												isInvalid={errors.startDate ? true : false}
											>
												<FormLabel>Start Date</FormLabel>
												<DatePicker
													placeholderText="Select date"
													onChange={(date: Date) => field.onChange(date)}
													selected={field.value}
													inline
												/>
												{errors.startDate && (
													<FormErrorMessage>
														{errors.startDate.message}
													</FormErrorMessage>
												)}
											</FormControl>
										)}
									/>
									<Controller
										control={control}
										name="endDate"
										rules={{
											required: {
												value: true,
												message: "An end date is required",
											},
											validate: (value) => {
												const startDate = getValues().startDate;
												if (
													!isDateAfter(value, startDate) &&
													!isSameDay(value, startDate)
												) {
													return "End date must be after start date";
												}
												if (isDateInPast(value)) {
													return "End date cannot be in the past";
												}
												return true;
											},
										}}
										render={({ field }) => (
											<FormControl
												isRequired
												isInvalid={errors.endDate ? true : false}
											>
												<FormLabel>End Date</FormLabel>
												<DatePicker
													placeholderText="Select date"
													onChange={(date: Date) => field.onChange(date)}
													selected={field.value}
													inline
												/>
												{errors.endDate && (
													<FormErrorMessage>
														{errors.endDate.message}
													</FormErrorMessage>
												)}
											</FormControl>
										)}
									/>
								</HStack>
								<Controller
									control={control}
									name="departingLocation"
									rules={{ required: "Please enter a location." }}
									render={({
										field: { onChange, onBlur, value, name, ref },
										fieldState: { error },
									}) => (
										<FormControl isRequired isInvalid={error ? true : false}>
											<FormLabel>Departing Location</FormLabel>
											<Select
												placeholder="Where will you leave from?"
												id="departingLocation"
												ref={ref}
												value={value}
												onBlur={onBlur}
												onChange={onChange}
												name={name}
												bgColor="white"
											>
												<option value="ATL">Atlanta, GA</option>
												<option value="LAX">Los Angeles, CA</option>
												<option value="ORD">Chicago, IL</option>
												<option value="DFW">Dallas, TX</option>
												<option value="DEN">Denver, CO</option>
												<option value="JFK">New York City, NY</option>
												<option value="SFO">San Francisco, CA</option>
											</Select>
											{errors.departingLocation && (
												<FormErrorMessage>
													{error && error.message}
												</FormErrorMessage>
											)}
										</FormControl>
									)}
								/>
								<FormControl
									isRequired
									isInvalid={errors.planSelections ? true : false}
								>
									<FormLabel>What would you like to plan?</FormLabel>
									<SimpleGrid columns={3} spacing="5">
										<Controller
											control={control}
											name="planSelections"
											rules={{
												validate: (value) => {
													return (
														Object.values(value).some((v) => v) ||
														"At least one plan type must be selected"
													);
												},
											}}
											render={({ field }) => (
												<CheckboxGroup
													value={Object.keys(field.value).filter(
														// @ts-ignore
														(key) => field.value[key]
													)}
													onChange={(values) => {
														let planType: PlanSelectionStatus = {
															stay: false,
															travel: false,
															activities: false,
														};
														values.forEach((value) => {
															// @ts-ignore
															planType[value] = true;
														});
														field.onChange(planType);
													}}
												>
													{selectablePlans.map((planName) => (
														<Box as="label" key={planName}>
															<Checkbox
																value={planName}
																style={{ display: "none" }}
															/>
															<Box
																aria-checked={field.value[planName]}
																cursor="pointer"
																borderWidth="1px"
																bgColor={"white"}
																borderRadius="md"
																boxShadow="sm"
																_checked={{
																	bg: "blue.500",
																	color: "white",
																}}
																padding="5"
															>
																<Center textTransform={"capitalize"}>
																	{planName}
																</Center>
															</Box>
														</Box>
													))}
												</CheckboxGroup>
											)}
										/>
									</SimpleGrid>
									{errors.planSelections && (
										<FormErrorMessage>
											{errors.planSelections.message}
										</FormErrorMessage>
									)}
								</FormControl>
							</Stack>
						</HStack>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" type="submit">
							Create a New Event
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};
