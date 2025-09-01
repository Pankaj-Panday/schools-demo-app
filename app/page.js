import { AddSchool } from "@/components/add-school";
import Link from "next/link";

export default function Home() {
  return (
    <div className="sm:px-4 max-w-4xl mx-auto mt-4">
      <Link href="/schools" className="underline text-blue-500">View all schools</Link>
      <AddSchool />
    </div>
  );
}
