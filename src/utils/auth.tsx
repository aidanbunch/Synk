import React, {
	useState,
	useEffect,
	useMemo,
	useContext,
	createContext,
	ComponentType,
} from "react";
import supabase from "./supabase";
import { useUser, updateUser } from "./db";
import router from "next/router";
import analytics from "./analytics";
import {
	Provider,
	User,
} from "@supabase/supabase-js";

// `user` will be object, `null` (loading) or `false` (logged out)
type UserOptional = User | null | false;

const MERGE_DB_USER = true;

const ANALYTICS_IDENTIFY = true;

const authContext = createContext<any>(null);
export const useAuth = () => useContext(authContext);

export function AuthProvider({ children }: any) {
	const auth = useAuthProvider();
	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that creates the `auth` object and handles state
function useAuthProvider() {
	const [user, setUser] = useState<UserOptional>(null);

	let finalUser = useMergeExtraData(user, { enabled: MERGE_DB_USER });

	finalUser = useFormatUser(finalUser);
	useIdentifyUser(finalUser, { enabled: ANALYTICS_IDENTIFY });

	const handleAuth = async (response: any) => {
		const { user } = response.data;

		if (!user?.email_confirmed_at) {
			throw new Error(
				"Thanks for signing up! Please check your email to complete the process."
			);
		}

		if (user) setUser(user);
		return user;
	};

	const signup = (email: string, password: string) => {
		return supabase.auth
			.signUp({ email, password })
			.then(handleError)
			.then(handleAuth);
	};

	const signin = (email: string, password: string) => {
		return supabase.auth
			.signInWithPassword({ email, password })
			.then(handleError)
			.then(handleAuth);
	};

	const signinWithProvider = (name: Provider) => {
		return (
			supabase.auth
				.signInWithOAuth({
					provider: name,
					options: { redirectTo: `${window.location.origin}/dashboard` },
				})
				.then(handleError)
				.then(() => {
					return new Promise(() => null);
				})
		);
	};

	const signout = () => {
		return supabase.auth.signOut().then(handleError);
	};

	const sendPasswordResetEmail = (email: string) => {
		return supabase.auth.resetPasswordForEmail(email).then(handleError);
	};

	const confirmPasswordReset = (password: string, code: string) => {
		throw new Error("This functionality is not supported by Supabase");
	};

	const updatePassword = (password: string) => {
		return supabase.auth.updateUser({ password }).then(handleError);
	};

	const updateProfile = async (data: any) => {
		const { email, ...other } = data;

		// If email changed let them know to click the confirmation links
		if (email && user && email !== user.email) {
			await supabase.auth.updateUser({ email }).then(handleError);
			throw new Error(
				"To complete this process click the confirmation links sent to your new and old email addresses"
			);
		}

		// Persist all other data to the database
		if (Object.keys(other).length > 0) {
			if (user) await updateUser(user.id, other);
		}
	};

	useEffect(() => {
		// If URL contains `access_token` from OAuth or magic link flow avoid using
		// cached session so that user is `null` (loading state) until process completes.
		// Otherwise, a redirect to a protected page after social auth will redirect
		// right back to login due to cached session indicating they are logged out.
		if (window.location.hash.indexOf("#access_token=") === -1) {
			// Get current user and set in state
			supabase.auth.getSession().then(({ data: { session: session } }) => {
				if (session) {
					setUser(session.user);
				} else {
					setUser(false);
				}
			});
		}

		// Subscribe to user on mount
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (session) {
				setUser(session.user);
			} else {
				setUser(false);
			}
		});

		// Unsubscribe on cleanup
		return () => data.subscription.unsubscribe();
	}, []);

	return {
		user: finalUser,
		signup,
		signin,
		signinWithProvider,
		signout,
		sendPasswordResetEmail,
		confirmPasswordReset,
		updatePassword,
		updateProfile,
	};
}

function useFormatUser(user: any) {
	// Memoize so returned object has a stable identity
	return useMemo(() => {
		if (!user) return user;

		let provider = user.app_metadata.provider;
		if (provider === "email") provider = "password";
		const providers = [provider];

		return {
			// Include full auth user data
			...user,
			// Alter the names of some fields
			uid: user.id,
			// User's auth providers
			providers: providers,
		};
	}, [user]);
}

function useMergeExtraData(user: any, { enabled }: { enabled: boolean }) {
	// Get extra user data from database
	const { data, status, error }: { data: any; status: string; error: any } =
		useUser(enabled && user && user.id);

	// Memoize so returned object has a stable identity
	return useMemo(() => {
		// If disabled or no auth user (yet) then just return
		if (!enabled || !user) return user;

		switch (status) {
			case "success":
				if (data === null) return null;
				// Return auth `user` merged with extra user `data`
				return { ...user, ...data };
			case "error":
				throw new Error(`
            Error: ${error.message}
            This happened while attempting to fetch extra user data from the database
            to include with the authenticated user. Make sure the database is setup or
            disable merging extra user data by setting MERGE_DB_USER to false.
          `);
			default:
				return null;
		}
	}, [user, enabled, data, status, error]);
}

// Connect analytics session to current user
function useIdentifyUser(user: any, { enabled }: { enabled: boolean }) {
	useEffect(() => {
		if (user && enabled) {
			analytics.identify(user.uid);
		}
	}, [user, enabled]);
}

// A Higher Order Component for requiring authentication
export const requireAuth = (Component: ComponentType) => {
	return function RequireAuthHOC(props: any) {
		const auth = useAuth();

		useEffect(() => {
			// Redirect if not signed in
			if (auth.user === false) {
				router.replace("/auth/signin");
			}
		}, [auth]);

		if (!auth.user) {
			// return a page loader/skeleton here, maybe taken as param like
			// return <PageLoader />
		}

		return <Component {...props} />;
	};
};

function handleError(response: any) {
	if (response.error) throw response.error;
	return response;
}
