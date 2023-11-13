import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/utils/auth";
import { QueryClientProvider } from "@/utils/db";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider>
			<ChakraProvider>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
