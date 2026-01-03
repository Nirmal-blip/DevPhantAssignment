import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(150, "Title must be at most 150 characters"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  description: z.string().min(1, "Description is required"),
  images: z
    .array(z.string())
    .min(1, "At least one product image is required"),
  mrp: z.number().min(0, "MRP must be a positive number"),
  offerPercent: z.number().min(0, "Offer percentage must be between 0 and 100").max(100, "Offer percentage must be between 0 and 100"),
  sellingPrice: z.number().min(0, "Selling price must be a positive number"),
  brand: z.string().optional(),
  warranty: z.string().optional(),
  sellerName: z.string().default("Default Seller"),
  tags: z.array(z.string()).default([]),
  materialAndCare: z.string().optional(),
  weight: z.number().min(0, "Weight must be a positive number").optional(),
  weightUnit: z.string().default("kg"),
  stockQuantity: z.number().min(0, "Stock quantity must be a non-negative number").int("Stock quantity must be an integer"),
  variants: z
    .array(
      z.object({
        name: z.string(),
        options: z.array(z.string()),
      })
    )
    .default([]),
});

export type ProductFormData = z.infer<typeof productSchema>;
