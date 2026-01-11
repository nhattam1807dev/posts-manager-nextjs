import { prisma } from "../../../lib/prisma"

export type Post = {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
};

export async function getPosts(): Promise<Post[]> {
    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
}