import LogoutButton from "@/components/LogoutButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Welcome</h1>
      {session?.user ? (
        <>
          <h1>Name: {session.user.name}</h1>
          <h1>Email: {session.user.email}</h1>
          <h1>Image: {session.user.image ? session.user.image : "No image"}</h1>
          <h1>Role: {session.user?.role}</h1>
          <LogoutButton />
        </>
      ) : (
        <>
          <h1>Please Login</h1>
          <Link href={"/api/auth/signin"}>Login</Link>
        </>
      )}
    </div>
  );
}
