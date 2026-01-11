import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    const post = await prisma.post.findMany({
        orderBy: { createdAt: "desc"},
    });

    return NextResponse.json(post);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { title, body: content } = body;

    if (!title || !content) {
        return NextResponse.json(
            { error: "Missing field" },
            { status: 400}
        );
    }

    const post = await prisma.post.create({
        data: {
            title,
            body: content,
        },
    });

    return NextResponse.json(post, { status: 201 });
}

