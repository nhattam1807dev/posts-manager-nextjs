"use client";

import { useOptimistic, useState, useTransition } from "react";
import { deletePost } from "./actions";
import type { Post } from "./data";
import Link from "next/link";

export function PostListClient({ posts }: { posts: Post[]}) {
    const [optimisticPost, removeOptimistic] = useOptimistic(
        posts,
        (state: Post[], id: number) => state.filter(p => p.id !== id)
    );
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    if (optimisticPost.length === 0) {
        return <p>No posts yet.</p>
    }

    async function handleDelete(id: number) {
        setError(null);
        removeOptimistic(id);

        startTransition( async() => {
            try {
                await deletePost(id);
            } catch (error: any) {
                setError(error.message);
            }
        });
    }

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {optimisticPost.map(post => (
                    <li 
                        key={post.id}
                        style={{
                            padding: 12,
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            display: "flex",
                            justifyContent: "space-between" 
                        }}
                    >
                        <Link href={`/posts/${post.id}`}>
                            {post.title}
                        </Link>
                        <button
                            disabled={isPending}
                            onClick={() => {
                                handleDelete(post.id);
                            }}
                        >
                            {isPending ? "Deleting..." : "Delete"}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
}