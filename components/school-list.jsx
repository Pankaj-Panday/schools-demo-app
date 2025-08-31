"use client";

import { useEffect, useState } from "react";
import { SchoolCard } from "./school-card";

export const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchools = async () => {
      try {
        const res = await fetch("/api/schools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
        setSchools([]);
      } finally {
        setLoading(false);
      }
    };

    loadSchools();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center py-16 text-gray-500">Loading schools...</div>;
  }

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
