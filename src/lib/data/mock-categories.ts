export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}

export const mockCategories: Category[] = [
  {
    id: "football",
    name: "Football",
    subCategories: [
      { id: "fashion", name: "Fashion" },
      { id: "equipment", name: "Equipment" },
      { id: "accessories", name: "Accessories" },
      { id: "jerseys", name: "Jerseys" },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    subCategories: [
      { id: "smartphones", name: "Smartphones" },
      { id: "laptops", name: "Laptops" },
      { id: "tablets", name: "Tablets" },
      { id: "accessories", name: "Accessories" },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    subCategories: [
      { id: "mens", name: "Men's Clothing" },
      { id: "womens", name: "Women's Clothing" },
      { id: "kids", name: "Kids' Clothing" },
      { id: "shoes", name: "Shoes" },
    ],
  },
  {
    id: "home",
    name: "Home & Kitchen",
    subCategories: [
      { id: "furniture", name: "Furniture" },
      { id: "kitchen", name: "Kitchen Appliances" },
      { id: "decor", name: "Home Decor" },
      { id: "bedding", name: "Bedding" },
    ],
  },
  {
    id: "books",
    name: "Books",
    subCategories: [
      { id: "fiction", name: "Fiction" },
      { id: "non-fiction", name: "Non-Fiction" },
      { id: "academic", name: "Academic" },
      { id: "children", name: "Children's Books" },
    ],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    subCategories: [
      { id: "fitness", name: "Fitness Equipment" },
      { id: "outdoor", name: "Outdoor Gear" },
      { id: "sports-apparel", name: "Sports Apparel" },
    ],
  },
];

export const warrantyOptions = [
  "No Warranty",
  "1 Month",
  "3 Months",
  "6 Months",
  "12 Months",
  "1 Year",
  "2 Years",
  "3 Years",
  "5 Years",
];

export const weightUnits = ["kg", "g", "lbs", "oz"];


