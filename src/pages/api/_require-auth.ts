import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../utils/server/_supabase"
import { User } from "@supabase/supabase-js";

type ErrorResponse = {
    status: string;
    code: string;
    message: string;
}

type ExtendedNextApiRequest = NextApiRequest & { user: User }

// Middleware for requiring auth
const requireAuth = (fn: Function) => async (req: ExtendedNextApiRequest, res: NextApiResponse<ErrorResponse>) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: "error",
            code: "auth/no-token",
            message: "You must be signed in to call this endpoint."
        })
    }

    const accessToken = req.headers.authorization.split(" ")[1]

    try {
        const { data: user, error } = await supabase.auth.getUser(accessToken)

        if (error) throw error
        req.user = user.user

        return fn(req, res)
    } catch(error) {
        res.status(401).send({
            status: "error",
            code: "auth/invalid-user-token",
            message: "Your login has expired. Please login again.",
          });
    }
}