"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const schoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  contact: z.string().regex(/^[0-9]{10}$/, "Phone be a 10-digit number"),
  image: z
    .any()
    .refine((fileList) => fileList.length === 1, "Image is required")
    .refine(
      (fileList) =>
        fileList?.[0]?.type === "image/jpeg" ||
        fileList?.[0]?.type === "image/png" ||
        fileList?.[0]?.type === "image/webp",
      "Only .jpg, .png, .webp formats are supported"
    ),
  email: z.email("Invalid email address"),
});

export const AddSchool = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schoolSchema),
    mode: "onSubmit",
  });
  const router = useRouter();
  const [backendError, setBackendError] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("image", data.image[0]);

      await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      router.push("/schools");
    } catch (error) {
      console.error(error);
      setBackendError("Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-white sm:border border-gray-200 rounded-xl p-6 space-y-6 sm:my-6"
      >
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-b-gray-200 pb-3">Enter School Details</h2>
        </header>

        {backendError && (
          <p className="text-red-700 w-full bg-red-100 p-2 rounded-md font-bold text-sm">Error: {backendError}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter school name"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-1 font-medium text-gray-700">
              Address
            </label>
            <input
              {...register("address")}
              id="address"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter address"
            />
            <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="mb-1 font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city")}
              id="city"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter city"
            />
            <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label htmlFor="state" className="mb-1 font-medium text-gray-700">
              State
            </label>
            <input
              {...register("state")}
              id="state"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter state"
            />
            <p className="text-red-500 text-sm mt-1">{errors.state?.message}</p>
          </div>

          {/* Contact */}
          <div className="flex flex-col">
            <label htmlFor="contact" className="mb-1 font-medium text-gray-700">
              Phone
            </label>
            <input
              {...register("contact")}
              id="contact"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter 10-digit number"
            />
            <p className="text-red-500 text-sm mt-1">{errors.contact?.message}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter email"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          {/* Image - full width row */}
          <div className="flex flex-col sm:col-span-2">
            <label htmlFor="image" className="mb-1 font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              {...register("image")}
              id="image"
              className="border border-gray-300 rounded-lg px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-red-500 text-sm mt-1">{errors.image?.message}</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow transition-all duration-200 disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
};
