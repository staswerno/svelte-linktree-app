import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "./$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    
    const collectionRef = collection(db, "users");

    const q = query(
        collectionRef,
        where("username", "==", params.username),
        limit(1)
    )
    // log these values to see what they are
    const snapshot = await getDocs(q);
    const exists = snapshot.docs[0]?.exists();
    const data = snapshot.docs[0]?.data();
    console.log(snapshot);
    console.log(exists);
    console.log(data);

    if (!exists) {
        return error(404, "user not found");
    }

    if (!data.published) {
        // should this be a return?
        // or... build catch block?
        throw error(403, `${data.username}'s profile is private`)
    }


    return {
        username: data.username,
        photoURL: data.photoURL,
        bio: data.bio,
        links: data.links ?? [],
    };
}) satisfies PageLoad;