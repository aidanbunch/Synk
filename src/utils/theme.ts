import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	config: {
		initialColorMode: "light", // 'dark' | 'light'
		useSystemColorMode: false,
	},
	semanticTokens: {
		colors: {
		  // accent semantic tokens
		  accent: { default: 'teal.500', _dark: 'teal.300' },
		  'accent-emphasis': { default: 'teal.700', _dark: 'teal.200' },
		  'accent-static': 'teal.500',
		  'accent-muted': { default: 'teal.300', _dark: 'teal.200' },
		  'accent-subtle': { default: 'teal.50', _dark: 'teal.800' },
		  // foreground semantic tokens
		  fg: { default: 'gray.700', _dark: 'gray.100' },
		  'fg-emphasis': { default: 'gray.900', _dark: 'gray.200' },
		  'fg-muted': { default: 'gray.600', _dark: 'gray.400' },
		  'fg-subtle': { default: 'gray.500', _dark: 'gray.300' },
		  'fg-on-accent': { default: 'white', _dark: 'inherit' },
		},
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
