"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { productSchema, ProductFormData } from "@/lib/schemas/product-schema";
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

export default function AddProductPage() {
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showFigma, setShowFigma] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
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

  /* ================= CATEGORY HANDLING (FIX) ================= */
  const selectedCategory = watch("category");

  useEffect(() => {
    // Reset sub-category when category changes
    setValue("subCategory", "");
  }, [selectedCategory, setValue]);

  const selectedSubCategories =
    mockCategories.find((c) => c.id === selectedCategory)?.subCategories || [];

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: ProductFormData) => {
    try {
      const existing: any[] = JSON.parse(
        localStorage.getItem("products") || "[]"
      );

      existing.push({
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("products", JSON.stringify(existing));
      toast.success("Product added successfully!");

      setTimeout(() => {
        router.push("/admin/products");
      }, 1200);
    } catch (err) {
      toast.error("Failed to save product");
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* ================= Mobile Sidebar ================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="relative w-64 h-full bg-white border-r shadow-lg">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded hover:bg-gray-100"
              >
                ✕
              </button>
            </div>
  
            <Sidebar />
          
          </div>
        </div>
      )}

      {/* ================= Desktop Sidebar ================= */}
      <div className="hidden md:block w-64 border-r bg-white">
        <Sidebar />
      </div>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col">
        {/* ================= Header ================= */}
        <div className="border-b bg-white px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 rounded hover:bg-gray-100"
              >
                ☰
              </button>
              <h1 className="text-2xl font-bold">Add New Product</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFigma((p) => !p)}
                className="px-4 py-2 text-sm bg-gray-100 rounded-full"
              >
                {showFigma ? "Hide Figma" : "View Figma"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 bg-gray-200 rounded-full"
              >
                Cancel
              </button>

              <button
                type="submit"
                form="product-form"
                disabled={!isValid || isSubmitting}
                className="px-6 py-2 bg-[#8b5cf6] text-white rounded-full disabled:bg-gray-400"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {showFigma && (
            <div className="mt-4 border rounded-xl overflow-hidden">
              <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/zseMQCcDXvA55nVZOiQMWI/PSZ-Admin-Flow?node-id=0-1"
                className="w-full h-[360px]"
                allowFullScreen
              />
            </div>
          )}
        </div>

        {/* ================= Form ================= */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <form
            id="product-form"
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* ===== Left ===== */}
              <div className="lg:col-span-2 space-y-6">
                <input
                  {...register("title")}
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    {...register("category")}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    {mockCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <select
                    {...register("subCategory")}
                    disabled={!selectedCategory}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Sub-Category</option>
                    {selectedSubCategories.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  {...register("description")}
                  rows={5}
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <ImageUpload
                  images={watch("images")}
                  onChange={(imgs) =>
                    setValue("images", imgs, { shouldValidate: true })
                  }
                />

                <PriceCalculator watch={watch} setValue={setValue} />
                <VariantsInput watch={watch} setValue={setValue} />
              </div>

              {/* ===== Right ===== */}
              <div className="bg-white border rounded-lg p-6 space-y-4">
                <input
                  {...register("brand")}
                  placeholder="Brand"
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <select
                  {...register("warranty")}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Warranty</option>
                  {warrantyOptions.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>

                <TagsInput watch={watch} setValue={setValue} />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    {...register("weight", { valueAsNumber: true })}
                    placeholder="Weight"
                    className="px-4 py-2 border rounded-lg"
                  />
                  <select
                    {...register("weightUnit")}
                    className="px-4 py-2 border rounded-lg"
                  >
                    {weightUnits.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <input
                  type="number"
                  {...register("stockQuantity", { valueAsNumber: true })}
                  placeholder="Stock"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
