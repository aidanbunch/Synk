import { useAuth } from "@/utils/auth";
import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { Provider } from "@supabase/supabase-js";
import { useState } from "react";

export type ProviderItem = {
	id: Provider;
	name: string;
	icon: JSX.Element;
};

type OAuthButtonGroupProps = {
	onAuth: (user: any) => void;
	providers: ProviderItem[];
	onError: (errorMessage: string) => void;
};

export const OAuthButtonGroup = ({
	onAuth,
	providers,
	onError,
}: OAuthButtonGroupProps) => {
	const auth = useAuth();
	const [pending, setPending] = useState<string | null>(null);

	const onSignInWithProvider = (provider: Provider) => {
		setPending(provider);
		auth
			.signinWithProvider(provider)
			.then((user) => {
				onAuth(user);
			})
			.catch((error) => {
				setPending(null);
				onError(error.message);
			});
	};

	return (
		<ButtonGroup variant="secondary" spacing="4" justifyContent="stretch">
			{providers.map(({ name, icon, id }) => (
				<Button
					key={name}
					flexGrow={1}
					variant={"outline"}
					isLoading={pending === id}
          onClick={() => {
            onSignInWithProvider(id);
          }}
				>
					<VisuallyHidden>Sign in with {name}</VisuallyHidden>
					{icon}
				</Button>
			))}
		</ButtonGroup>
	);
};
