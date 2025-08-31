import Image from "next/image";

export const SchoolCard = ({ school }) => {
  return (
    <article className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden max-w-xs h-full">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image src={school.image} alt={school.name} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 flex-1">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-800 capitalize">{school.name}</h3>

        {/* Push address section to bottom */}
        <div className="mt-auto pt-3 flex justify-between text-sm text-gray-600 gap-3">
          <span className="truncate font-medium">{school.city}</span>
          <span className="truncate">{school.address}</span>
        </div>
      </div>
    </article>
  );
};

