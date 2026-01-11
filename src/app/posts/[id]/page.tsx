import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostById } from "./data";

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const { id } = await params;
    const postId = Number(id);

    if (Number.isNaN(postId)) {
        return { title: "Post not found" };
    }

    const post = await getPostById(postId);

    if (!post) {
        return { title: "Post not found" }
    }

    return {
        title: post.title,
        description: post.body.slice(0, 120),
    }
}

export default async function PostDetailsPage({ params } : Props) {
    const { id } = await params;
    const postId = Number(id);

    if (Number.isNaN(postId)) {
        notFound();
    }

    const post = await getPostById(postId);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <h1>{ post.title }</h1>
            <p style={{ marginTop: 12}}>{ post.body }</p>
        </div>
    );
};