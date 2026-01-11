export const dynamic = "force-dynamic";

import { Metadata } from "next";
import { getPosts } from "./data";
import { PostListClient } from "./PostListClient";

export const metadata: Metadata = {
    title: "Posts",
    description: "Manage posts in the system",
}

export default async function PostsPage() {
    const posts = await getPosts();
    
    return (
        <div>
            <h1>Posts</h1>
            <PostListClient posts={posts} />
        </div>
    )
}