import type { PageServerLoad } from "./$types";
import { adminAuth, adminDB } from "$lib/server/admin";
import { error, redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
	const uid = locals.userID;
	console.log("edit uid", uid);

	if (!uid) {
		throw redirect(302, "/login");
	}

	const userDoc = await adminDB.collection("users").doc(uid).get();
	const { username, bio } = userDoc.data()!;

	if (params.username !== username) {
		throw error(401, "that username does not belong to you");
	}
}) satisfies PageServerLoad;
