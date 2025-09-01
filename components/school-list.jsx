import { SchoolCard } from "./school-card";

export const SchoolList = ({ schools = [] }) => {
  if (schools.length === 0) {
    return <div className="flex justify-center items-center py-16 text-gray-500">No schools found.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {schools.map((school) => (
        <SchoolCard key={school.id} school={school} />
      ))}
    </div>
  );
};
