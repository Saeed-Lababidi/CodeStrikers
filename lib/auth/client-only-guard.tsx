"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function ClientOnlyGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/auth/club/login");
      } else {
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return null; // or a spinner

  return (
    <>
      {children}
    </>
  );
}
