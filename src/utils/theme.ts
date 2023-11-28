import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
	config: {
		initialColorMode: "light", // 'dark' | 'light'
		useSystemColorMode: false,
	},
	semanticTokens: {
		colors: {
		  // accent semantic tokens
		  accent: { default: 'blue.500', _dark: 'blue.300' },
		  'accent-emphasis': { default: 'blue.700', _dark: 'blue.200' },
		  'accent-static': 'blue.500',
		  'accent-muted': { default: 'blue.300', _dark: 'blue.200' },
		  'accent-subtle': { default: 'blue.50', _dark: 'blue.800' },
		  // foreground semantic tokens
		  fg: { default: 'gray.100', _dark: 'gray.900' },
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
