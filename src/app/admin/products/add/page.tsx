import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { productSchema, ProductFormData } from "@/lib/schemas/product-schema";
import { mockCategories, warrantyOptions, weightUnits } from "@/lib/data/mock-categories";
import { ImageUpload } from "@/components/ImageUpload";
import { PriceCalculator } from "@/components/PriceCalculator";
import { VariantsInput } from "@/components/VariantsInput";
import { TagsInput } from "@/components/TagsInput";
import { Sidebar } from "@/components/Sidebar";

export default function AddProductPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as any,
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
    mockCategories.find((cat) => cat.id === selectedCategory)?.subCategories ||
    [];

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Save to localStorage
      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const newProduct = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      existingProducts.push(newProduct);
      localStorage.setItem("products", JSON.stringify(existingProducts));

      toast.success("Product added successfully!");
      
      // Reset form or navigate back
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } catch (error) {
      toast.error("Failed to save product. Please try again.");
      console.error("Error saving product:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-[#ffff] ">
      
      {/* Mobile Sidebar Overlay */}
{isSidebarOpen && (
  <div className="fixed inset-0 z-50 md:hidden">
    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setIsSidebarOpen(false)}
    />

    {/* Drawer */}
    <div className="relative w-64 h-full bg-white border-r shadow-lg">
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Close menu"
        >
          ✕
        </button>
      </div>
      <Sidebar />
    </div>
  </div>
)}

      {/* Sidebar */}
     {/* Sidebar - Desktop */}
<div className="hidden md:block w-64 h-screen overflow-hidden bg-white border-r border-[#b2b0b0]">
  <Sidebar />
</div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header with Figma Embed */}

        {/* <div className="bg-[#ffffff] border-b border-gray-800">
          <div className="px-6 py-4">
            <div className="mb-4 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/zseMQCcDXvA55nVZOiQMWI/PSZ-Admin-Flow?node-id=0-1&t=Jc3UcCIK0GRuNJUq-1"
                width="100%"
                height="300"
                allowFullScreen
                className="w-full"
                title="Figma Design Reference"
              />
            </div>
          </div>
        </div> */}


        {/* Page Header with Title and Actions */}
        <div className="bg-[#ffffff] border-b border-gray-800 px-6 py-3">
          
          <div className="flex items-center justify-between">
                             {/* Mobile Menu Button */}
<button
  onClick={() => setIsSidebarOpen(true)}
  className="md:hidden mr-3 p-2 rounded-lg hover:bg-gray-100"
  aria-label="Open menu"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-black"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>
            <h1 className="text-2xl font-bold items-center text-center text-[#060606]">Add New Product</h1>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-[#e0e0e0] hover:bg-[#3a3a3a] text-[#595959] hover:text-white font-medium rounded-3xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="product-form"
                disabled={isSubmitting || !isValid}
                className="px-6 py-2 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-3xl transition-colors"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
           
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto bg-[#fdfdfd]">
          <div className="px-6 py-6">
            <form id="product-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Title<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      maxLength={150}
                      {...register("title")}
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                      placeholder="Enter product title"
                      aria-invalid={errors.title ? "true" : "false"}
                      aria-describedby={errors.title ? "title-error" : undefined}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.title && (
                        <p
                          id="title-error"
                          className="text-sm text-red-400"
                          role="alert"
                        >
                          {errors.title.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 ml-auto">
                        {watch("title")?.length || 0}/150
                      </p>
                    </div>
                  </div>

                  {/* Category & Sub-Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Category<span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="category"
                        {...register("category")}
                        onChange={(e) => {
                          setValue("category", e.target.value, {
                            shouldValidate: true,
                          });
                          setValue("subCategory", "", { shouldValidate: true });
                        }}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-black focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                        aria-invalid={errors.category ? "true" : "false"}
                        aria-describedby={
                          errors.category ? "category-error" : undefined
                        }
                      >
                        <option value="" className="bg-[#ffffff]">Select Category</option>
                        {mockCategories.map((category) => (
                          <option key={category.id} value={category.id} className="bg-[#ffffff]">
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p
                          id="category-error"
                          className="text-sm text-red-400 mt-1"
                          role="alert"
                        >
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="subCategory"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Sub-Category<span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="subCategory"
                        {...register("subCategory")}
                        disabled={!selectedCategory}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-black focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none disabled:bg-[#ffffff] disabled:text-gray-500 disabled:cursor-not-allowed"
                        aria-invalid={errors.subCategory ? "true" : "false"}
                        aria-describedby={
                          errors.subCategory ? "subcategory-error" : undefined
                        }
                      >
                        <option value="" className="bg-[#ffffff]">
                          {selectedCategory
                            ? "Select Sub-Category"
                            : "Select Category First"}
                        </option>
                        {selectedSubCategories.map((subCat) => (
                          <option key={subCat.id} value={subCat.id} className="bg-[#ffffff]">
                            {subCat.name}
                          </option>
                        ))}
                      </select>
                      {errors.subCategory && (
                        <p
                          id="subcategory-error"
                          className="text-sm text-red-400 mt-1"
                          role="alert"
                        >
                          {errors.subCategory.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Description<span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      id="description"
                      rows={6}
                      {...register("description")}
                      className="w-full px-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none resize-none"
                      placeholder="Enter product description. You can use newlines and bullets."
                      aria-invalid={errors.description ? "true" : "false"}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                    />
                    {errors.description && (
                      <p
                        id="description-error"
                        className="text-sm text-red-400 mt-1"
                        role="alert"
                      >
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Product Images */}
                  <div>
                    <ImageUpload
                      images={watch("images") || []}
                      onChange={(images) =>
                        setValue("images", images, { shouldValidate: true })
                      }
                      error={errors.images?.message}
                    />
                  </div>

                  {/* Pricing */}
                  <div>
                    <PriceCalculator
                      watch={watch}
                      setValue={setValue}
                      mrpError={errors.mrp?.message}
                      offerError={errors.offerPercent?.message}
                      sellingPriceError={errors.sellingPrice?.message}
                    />
                  </div>

                  {/* Variants */}
                  <div>
                    <VariantsInput watch={watch} setValue={setValue} />
                  </div>
                </div>

                {/* Right Column - Product Organization */}
                <div className="lg:col-span-1">
                  <div className="bg-[#ffff] rounded-lg border border-gray-800 p-6 space-y-6 sticky top-6">
                    <h2 className="text-lg font-semibold text-[#040404] mb-4">
                      Product Organization
                    </h2>

                    {/* Brand Manufacturer */}
                    <div>
                      <label
                        htmlFor="brand"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Brand Manufacturer
                      </label>
                      <input
                        type="text"
                        id="brand"
                        {...register("brand")}
                        className="w-full px-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                        placeholder="Enter brand name"
                      />
                    </div>

                    {/* Warranty */}
                    <div>
                      <label
                        htmlFor="warranty"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Add Warranty
                      </label>
                      <select
                        id="warranty"
                        {...register("warranty")}
                        className="w-full px-4 py-2.5 bg-[#f5f5f5] border border-gray-600 rounded-lg  focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                      >
                        <option value="" className="bg-[#8c8c8c]">Select Warranty</option>
                        {warrantyOptions.map((option) => (
                          <option key={option} value={option} className="bg-[#2a2a2a]">
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Seller Name */}
                    <div>
                      <label
                        htmlFor="sellerName"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Seller Name
                      </label>
                      <input
                        type="text"
                        id="sellerName"
                        {...register("sellerName")}
                        className="w-full px-4 py-2.5 bg-[#ffff] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none bg-[#1a1a1a]"
                       placeholder="Enter Seller name"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <TagsInput watch={watch} setValue={setValue} />
                    </div>

                    {/* Material and Care */}
                    <div>
                      <label
                        htmlFor="materialAndCare"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Material and Care
                      </label>
                      <select
                        id="materialAndCare"
                        {...register("materialAndCare")}
                        className="w-full px-4 py-2.5 bg-[#f3f3f3] border border-gray-600 rounded-lg text-black focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                      >
                        <option value="" className="bg-[#2a2a2a]">Select Instructions</option>
                        <option value="Machine Wash" className="bg-[#2a2a2a]">Machine Wash</option>
                        <option value="Hand Wash" className="bg-[#2a2a2a]">Hand Wash</option>
                        <option value="Dry Clean Only" className="bg-[#2a2a2a]">Dry Clean Only</option>
                      </select>
                    </div>

                    {/* Product Weight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Product weight
                        </label>
                        <input
                          type="number"
                          id="weight"
                          step="0.001"
                          min="0"
                          {...register("weight", { valueAsNumber: true })}
                          className="w-full px-4 py-2.5 bg-[#f4f4f4] border border-gray-600 rounded-lg text-black  placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                          placeholder="0.000"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="weightUnit"
                          className="block text-sm font-medium text-black mb-2"
                        >
                          Unit
                        </label>
                        <select
                          id="weightUnit"
                          {...register("weightUnit")}
                          className="w-full px-4 py-2.5 bg-[#ededed] border border-gray-600 rounded-lg text-black focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                        >
                          {weightUnits.map((unit) => (
                            <option key={unit} value={unit} className="bg-[#2a2a2a]">
                              {unit}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Stock Quantity */}
                    <div>
                      <label
                        htmlFor="stockQuantity"
                        className="block text-sm font-medium text-black mb-2"
                      >
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        id="stockQuantity"
                        min="0"
                        step="1"
                        {...register("stockQuantity", { valueAsNumber: true })}
                        className="w-full px-4 py-2.5 bg-[#eaeaea] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
                        placeholder="0"
                        aria-invalid={errors.stockQuantity ? "true" : "false"}
                        aria-describedby={
                          errors.stockQuantity ? "stock-error" : undefined
                        }
                      />
                      {errors.stockQuantity && (
                        <p
                          id="stock-error"
                          className="text-sm text-red-400 mt-1"
                          role="alert"
                        >
                          {errors.stockQuantity.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
