import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { error, redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
	return {
		uid: locals.userID,
	};
}) 