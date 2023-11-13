import {
	Button,
	Container,
	Divider,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	Stack,
	Text,
	Checkbox,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";
import Logo from "@/components/brand/Logo";
import {
	OAuthButtonGroup,
	ProviderItem,
} from "@/components/auth/OAuthButtonGroup";
import { useAuth } from "@/utils/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
	email: string;
	password: string;
	confirmPassword: string;
}

type AuthFormOptions = {
	title: string;
	buttonAction: string;
	subTitle?: string;
	subTitleLink?: string;
	subTitlePath?: string;
	forgotPassPath?: string;
	oAuthTitle?: string;
};

type AuthType = "signup" | "signin" | "forgotpass" | "changepass";

const optionsByType: Record<AuthType, AuthFormOptions> = {
	signup: {
		title: "Create an account",
		buttonAction: "Create Account",
		subTitle: "Already have an account?",
		subTitleLink: "Log in",
		subTitlePath: "/auth/signin",
		oAuthTitle: "or sign up with",
	},
	signin: {
		title: "Log in to your account",
		buttonAction: "Sign in",
		subTitle: "Don't have an account?",
		subTitleLink: "Sign up",
		subTitlePath: "/auth/signup",
		forgotPassPath: "/auth/forgotpass",
		oAuthTitle: "or continue with",
	},
	forgotpass: {
		title: "Reset your password",
		buttonAction: "Reset Password",
		subTitle: "Remember it after all?",
		subTitleLink: "Log in",
		subTitlePath: "/auth/signin",
	},
	changepass: {
		title: "Change your password",
		buttonAction: "Change Password",
	},
};

type AuthFormProps = {
	providers: ProviderItem[];
	authType: AuthType;
	onAuth: (user: any) => void;
};

export const AuthForm = ({ providers, authType, onAuth }: AuthFormProps) => {
  const type = authType in optionsByType ? authType : "signin";
	const toast = useToast({
		position: "top",
		duration: 5000,
		isClosable: true,
	});
	const formOptions = optionsByType[type];
	const auth = useAuth();
	const [pending, setPending] = useState(false);
	const {
		handleSubmit,
		register,
		formState: { errors },
		getValues,
	} = useForm<FormInputs>();

	const submitHandlersByType: Record<
		AuthType,
		(data: FormInputs) => Promise<void>
	> = {
		signin: ({ email, password }: FormInputs) => {
			return auth.signin(email, password).then((user) => {
				onAuth(user);
			});
		},
		signup: ({ email, password }: FormInputs) => {
			return auth.signup(email, password).then((user) => {
				onAuth(user);
				toast({
					title: "Success",
					description:
						"Thanks for signing up. Check your email for a confirmation link.",
					status: "success",
				});
			});
		},
		forgotpass: ({ email }: FormInputs) => {
			return auth.sendPasswordResetEmail(email).then(() => {
				setPending(false);
				toast({
					title: "Success",
					description: "Check your email for a password reset link.",
					status: "success",
				});
			});
		},
		changepass: ({ password }: FormInputs) => {
			return auth.updatePassword(password).then(() => {
				setPending(false);
				toast({
					title: "Success",
					description: "Updated password successfully!",
					status: "success",
				});
			});
		},
	};

	const onSubmit = ({ email, password, confirmPassword }: FormInputs) => {
		setPending(true);
		submitHandlersByType[type]({ email, password, confirmPassword }).catch(
			(finish: any) => {
				setPending(false);
				toast({
					title: "Success",
					description: finish.message,
					status: "success",
				});
			}
		);
	};

	return (
		<Container
			maxW="md"
			py={{ base: "0", sm: "8" }}
			px={{ base: "4", sm: "10" }}
			bg={{ base: "transparent", sm: "bg.surface" }}
			boxShadow={{ base: "none", sm: "md" }}
			borderRadius={{ base: "none", sm: "xl" }}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack spacing="8">
					<Stack spacing="6" align="center">
						<Logo />
						<Stack spacing="3" textAlign="center">
							<Heading size="lg">{formOptions.title}</Heading>
							{["signup", "signin", "forgotpass"].includes(type) && (
								<Text color="fg.muted">
									{formOptions.subTitle}{" "}
									<Link href={formOptions.subTitlePath ?? "/auth/signin"}>
										{formOptions.subTitleLink ?? "Log in"}
									</Link>
								</Text>
							)}
						</Stack>
					</Stack>
					<Stack spacing="6">
						<Stack spacing="5">
							{["signup", "signin", "forgotpass"].includes(type) && (
								<FormControl isRequired isInvalid={errors.email ? true : false}>
									<FormLabel htmlFor="email">Email</FormLabel>
									<Input
										id="email"
										type="email"
										{...register("email", {
											required: "Please enter your email",
										})}
									/>
									{errors.email && (
										<FormErrorMessage>{errors.email.message}</FormErrorMessage>
									)}
								</FormControl>
							)}
							{["signup", "signin", "changepass"].includes(type) && (
								<FormControl
									isRequired
									isInvalid={errors.password ? true : false}
								>
									<FormLabel htmlFor="password">Password</FormLabel>
									<Input
										id="password"
										type="password"
										{...register("password", {
											required: "Please enter a password",
											minLength: 6,
										})}
									/>
									{errors.password && (
										<FormErrorMessage>
											{errors.password.message}
										</FormErrorMessage>
									)}
								</FormControl>
							)}
							{["changepass", "signup"].includes(type) && (
								<FormControl
									isRequired
									isInvalid={errors.confirmPassword ? true : false}
								>
									<FormLabel htmlFor="password">Confirm Password</FormLabel>
									<Input
										id="confirmPassword"
										type="password"
										{...register("confirmPassword", {
											required: "Please enter your password again",
											validate: (value) => {
												if (value === getValues().password) {
													return true;
												} else {
													return "This doesn't match your password";
												}
											},
										})}
									/>
									{errors.confirmPassword && (
										<FormErrorMessage>
											{errors.confirmPassword.message}
										</FormErrorMessage>
									)}
								</FormControl>
							)}
							{["signin"].includes(type) && (
								<HStack justify="space-between">
									<Checkbox defaultChecked>Remember me</Checkbox>
									<Link href={formOptions.forgotPassPath ?? "/auth/forgotpass"}>
										Forgot password?
									</Link>
								</HStack>
							)}
						</Stack>
						<Stack spacing="6">
							<Button colorScheme="blue" isLoading={pending} type="submit">
								{formOptions.buttonAction}
							</Button>
							{["signin", "signup"].includes(type) && (
								<>
									<HStack>
										<Divider />
										<Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
											{formOptions.oAuthTitle ?? "or continue with"}
										</Text>
										<Divider />
									</HStack>
									<OAuthButtonGroup
										providers={providers}
										onAuth={onAuth}
										onError={(message) => {
											toast({
												title: "Error",
												description: message,
												status: "error",
											});
										}}
									/>
								</>
							)}
						</Stack>
					</Stack>
				</Stack>
			</form>
		</Container>
	);
};
