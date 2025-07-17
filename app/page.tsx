import { redirect } from "next/navigation";

export default function RedirectPage() {
    redirect("/dashboard"); // Automatically redirects on to the dashboard page
}
