import { signIn, signOut, useSession } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession()
    return <>
        <a href="/api/auth/signin">Sign in</a>
        <br />
        <a href="/api/auth/signout">Sign out</a>
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <br />
        <pre>{JSON.stringify(status, null, 2)}</pre>
        <br />
        <iframe src="/api/session" />
        <br />
        <iframe src="/api/jwt" />
    </>
}
