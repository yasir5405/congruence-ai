"use client";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className="p-2 border rounded"
      onClick={() =>
        signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
    >
      Logout
    </button>
  );
};

export default LogoutButton;
