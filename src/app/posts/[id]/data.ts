import { prisma } from "../../../../lib//prisma";

export async function getPostById(id: number) {
    return prisma.post.findUnique({
        where: { id }
    });
}