import LegalPage from "@/components/LegalPage";
import { SECURITY } from "@/lib/legal";
export const metadata = { title: "Security Statement", description: "How Link3IT approaches security during engagements and on this site." };
export default function Page() { return <LegalPage doc={SECURITY} />; }
