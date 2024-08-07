import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// this is a dedicated server endpoint

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { idToken } = await request.json();

	const expiresIn = 60 * 60 * 24 * 5; // 5 days

	const decodedIdToken = await adminAuth.verifyIdToken(idToken);

	if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
		const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
		const options = {
			maxAge: expiresIn,
			httpOnly: true,
			secure: false,
			path: "/",
		};

		cookies.set("__scoobysession", cookie, options);
		return json({ status: "signedIn" });
	} else {
		throw error(401, "recent sign in required!");
	}
};

export const DELETE: RequestHandler = async ({ cookies }) => {
	cookies.delete("__scoobysession", { path: "/" });
	return json({ status: "signedOut" });
};
