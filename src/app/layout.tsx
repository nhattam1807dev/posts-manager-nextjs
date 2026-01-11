import "../app/globals.css";
import Link from "next/link";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
                    <nav style={{ display: "flex", gap: 16 }}>
                        <Link href="/posts">Post</Link>
                        <Link href="/posts/new">New Post</Link>
                    </nav>
                </header>

                <main style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
                    { children }
                </main>
            </body>
        </html>
    )
}