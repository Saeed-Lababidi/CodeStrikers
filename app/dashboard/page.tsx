import { ClientOnlyGuard } from "@/lib/auth/client-only-guard";
import DashboardClient from "./DashboardClient";

export default function DashboardPage() {
  return (
    <ClientOnlyGuard>
      <DashboardClient user={{}} />
    </ClientOnlyGuard>
  );
}
