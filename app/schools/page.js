import { SchoolList } from "@/components/school-list";

export default function ShowSchoolsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Schools</h1>
      <SchoolList />
    </main>
  );
}
