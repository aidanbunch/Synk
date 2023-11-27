import React from "react";
import { HStack, useColorModeValue, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

type LogoProps = {
	includeText?: boolean;
	width?: string;
	height?: string
};

function Logo({ includeText = false, width = "56", height = "64" }: LogoProps) {
	const fillColor = useColorModeValue("black", "white");
	const router = useRouter();

	return (
		<HStack
			cursor="pointer"
			onClick={() => {
				router.push("/dashboard");
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 56 64"
				fill="none"
			>
				<path
					d="M13.4935 34.0948C22.7053 48.6422 31.7263 51.4498 33.1835 31.2467L36.8465 30.4027L37.0478 30.7254C40.6134 36.4416 42.872 43.537 39.9034 49.5849C30.1069 69.5436 -0.229545 46.4769 5.53959 36.709L13.4935 34.0948Z"
					fill={fillColor}
				/>
				<path
					d="M40.6078 28.6393C40.7961 26.0625 28.2837 13.2067 23.479 31.0026L18.5641 31.2652C16.0752 26.8993 14.6649 21.4923 17.3052 17.2163C26.9367 1.6188 55.7205 17.6614 49.7286 26.4117L40.6078 28.6393Z"
					fill={fillColor}
				/>
			</svg>
			{includeText && <Heading color={fillColor} size="lg">Synk</Heading>}
		</HStack>
	);
}

export default Logo;
