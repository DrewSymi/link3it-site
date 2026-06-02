import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/lib/legal";
export const metadata = { title: "Terms of Use", description: "Terms governing use of the Link3IT website." };
export default function Page() { return <LegalPage doc={TERMS} />; }
