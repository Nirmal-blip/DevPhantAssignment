"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  productSchema,
  ProductFormData,
} from "@/lib/schemas/product-schema";

import {
  mockCategories,
  warrantyOptions,
  weightUnits,
} from "@/lib/data/mock-categories";

import { ImageUpload } from "@/components/ImageUpload";
import { PriceCalculator } from "@/components/PriceCalculator";
import { VariantsInput } from "@/components/VariantsInput";
import { TagsInput } from "@/components/TagsInput";
import { Sidebar } from "@/components/Sidebar";

export default function AddProductClient() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      description: "",
      images: [],
      mrp: 0,
      offerPercent: 0,
      sellingPrice: 0,
      brand: "",
      warranty: "",
      tags: [],
      materialAndCare: "",
      weight: undefined,
      weightUnit: "kg",
      stockQuantity: 0,
      variants: [],
    },
  });

  const selectedCategory = watch("category");
  const selectedSubCategories =
    mockCategories.find((c) => c.id === selectedCategory)?.subCategories || [];

  const onSubmit = async (data: ProductFormData) => {
    try {
      const products = JSON.parse(
        localStorage.getItem("products") || "[]"
      );

      products.push({
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("products", JSON.stringify(products));

      toast.success("Product added successfully!");
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err) {
      toast.error("Failed to save product");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-white border-r">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="border-b px-6 py-3 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden"
          >
            ☰
          </button>

          <h1 className="text-2xl font-bold">Add New Product</h1>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded-3xl bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="product-form"
              disabled={!isValid || isSubmitting}
              className="px-6 py-2 rounded-3xl bg-violet-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          id="product-form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6"
        >
          {/* 🔥 KEEP YOUR EXISTING FORM JSX HERE (unchanged) */}
        </form>

      </div>
    </div>
  );
}
