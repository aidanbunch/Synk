import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	config: {
		initialColorMode: "light", // 'dark' | 'light'
		useSystemColorMode: false,
	},
	fonts: {
		heading: `'Lexend Variable', sans-serif`,
		body: `'Lexend Variable', sans-serif`,
		mono: `'Lexend Variable', sans-serif`,
	},
	components: {
		Button: {
			defaultProps: {
				colorScheme: "blue",
			},
		},
	},
});
