import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/utils/auth";
import { QueryClientProvider } from "@/utils/db";
import { theme } from "@/utils/theme";
import '@fontsource-variable/lexend';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
