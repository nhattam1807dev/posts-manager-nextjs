"use server";

import { prisma } from "../../../lib/prisma";
import { revalidateTag } from "next/cache";

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    if (!title || !body) throw new Error("Missing fields");

    await prisma.post.create({
        data: { title, body },
    })

    revalidateTag("posts", {});
}

export async function deletePost(id: number) {
    if (!id) {
        throw new Error("Invalid post id");
    }

    await prisma.post.delete({
        where: { id },
    });

    revalidateTag("posts", {});
}