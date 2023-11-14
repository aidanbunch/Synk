import { useAuth, requireAuth } from "@/utils/auth";
import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";

function Dashboard() {
	const auth = useAuth();
    useEffect(() => {
        console.log(auth);
    }, [auth]);
	return <Button onClick={() => {auth.signout()}}>{auth.user ? auth.user.email : ""}</Button>;
}

export default requireAuth(Dashboard);
