import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function DELETE(
    _req: Request,
    context: any
) {
    const id = Number(context.params.id);

    if (Number.isNaN(id)) {
        return NextResponse.json(
            { error: "Invalid id" },
            { status: 400 }
        );
    }

    await prisma.post.delete({
        where: { id },
    });

    return NextResponse.json({ success: true });
}