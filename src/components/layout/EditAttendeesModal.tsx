import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
    FormLabel,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

type EditAttendeesModalProps = {
	initialAttendees: number;
    onClose: () => void;
	isOpen: boolean;
	onSubmit: (data: { numAttendees: number }) => void;
};

function EditAttendeesModal({
	initialAttendees,
    onClose,
	isOpen,
	onSubmit,
}: EditAttendeesModalProps) {
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			numAttendees: initialAttendees,
		},
	});

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change Number of Attendees</ModalHeader>
				<ModalCloseButton />
				<ModalBody bgColor="fg">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Center>
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
						</Center>
					</form>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" type="submit">
						Submit Changes
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EditAttendeesModal;
