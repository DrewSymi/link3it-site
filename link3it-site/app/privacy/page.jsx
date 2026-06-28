import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/lib/legal";
export const metadata = { title: "Privacy Policy", description: "How Link3IT handles information collected through this website." };
export default function Page() { return <LegalPage doc={PRIVACY} />; }
