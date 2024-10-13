"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  if (session.data?.user) {
    return <div className="">Signed In</div>;
  }
  return <div className="">Not signed In</div>;
}
