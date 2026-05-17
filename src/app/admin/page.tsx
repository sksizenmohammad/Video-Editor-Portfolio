import { AdminPanel } from "@/components/AdminPanel";
import { getAllClients } from "@/lib/clients";

export const metadata = {
  title: "Admin | SIZEN Portfolio",
  description: "Manage portfolio videos and daily uploads.",
};

export default function AdminPage() {
  return <AdminPanel clients={getAllClients()} />;
}
