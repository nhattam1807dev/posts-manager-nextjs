import { createPost } from "../actions";

export default function NewPostPage() {
    return (
        <form 
            action={createPost}
            style={{ 
                display: "flex",
                flexDirection: "column",
                gap: 12 
            }}
        >
            <h1>Create Post</h1>

            <input name="title" placeholder="title" />
            <textarea name="body" placeholder="body"></textarea>

            <button type="submit">Create</button>
        </form>
    )
}