import { SchoolList } from "@/components/school-list";
import Link from "next/link";

async function getSchools() {
  const res = await fetch(`${process.env.BASE_URL}/api/schools`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch schools");
  return res.json();
}

export default async function ShowSchoolsPage() {
  const schools = await getSchools();
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Schools</h1>
        <Link href="/" className="text-blue-500 underline">Go back</Link>
      </div>
      <SchoolList schools={schools} />
    </main>
  );
}
