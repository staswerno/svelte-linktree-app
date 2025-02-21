import type { PageServerLoad, Actions } from "./$types";
import { adminDB } from "$lib/server/admin";
import { error, fail, redirect } from "@sveltejs/kit";

export const load = (async ({ locals, params }) => {
	const uid = locals.userID;

	if (!uid) {
		throw redirect(302, "/login");
	}

	const userDoc = await adminDB.collection("users").doc(uid).get();
	const { username, bio } = userDoc.data()!;

	if (params.username !== username) {
		throw error(401, "That username does not belong to you");
	}

	return {
		bio,
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request, params }) => {
		const uid = locals.userID;

		const data = await request.formData();
		const bio = data.get("bio");

		const userRef = adminDB.collection("users").doc(uid!);
		const { username } = (await userRef.get()).data()!;

		if (params.username !== username) {
			throw error(401, "that username does not belong to you");
		}

		if (bio!.length > 260 || bio!.length < 1) {
			return fail(400, { problem: "bio must be between 1 and 260 characters" });
		}

		await userRef.update({
			bio,
		});
	},
} satisfies Actions;

// formatting checked
