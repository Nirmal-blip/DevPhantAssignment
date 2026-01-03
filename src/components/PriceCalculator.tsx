"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/product-schema";

interface PriceCalculatorProps {
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
  mrpError?: string;
  offerError?: string;
  sellingPriceError?: string;
}

export function PriceCalculator({
  watch,
  setValue,
  mrpError,
  offerError,
  sellingPriceError,
}: PriceCalculatorProps) {
  const mrp = watch("mrp") as number;
  const offerPercent = watch("offerPercent") as number;
  const sellingPrice = watch("sellingPrice") as number;
  const [isManualSellingPriceEdit, setIsManualSellingPriceEdit] = useState(false);

  // Auto-calculate selling price when MRP or offer% changes
  useEffect(() => {
    // Skip auto-calculation only if user is actively typing in selling price field
    if (isManualSellingPriceEdit) return;

    const mrpNum = typeof mrp === "number" && !isNaN(mrp) ? mrp : 0;
    const offerNum = typeof offerPercent === "number" && !isNaN(offerPercent) ? offerPercent : 0;

    // If MRP is valid and greater than 0, always calculate selling price
    if (mrpNum > 0 && offerNum >= 0 && offerNum <= 100) {
      const calculated = mrpNum * (1 - offerNum / 100);
      const expectedSellingPrice = Math.round(calculated * 100) / 100;
      
      // Always update selling price when MRP or Offer changes
      setValue("sellingPrice", expectedSellingPrice, {
        shouldValidate: true,
      });
    } else if (mrpNum === 0) {
      // Reset selling price if MRP is 0
      setValue("sellingPrice", 0, { shouldValidate: true });
    }
  }, [mrp, offerPercent, setValue, isManualSellingPriceEdit]);

  // Auto-calculate offer% when selling price is manually changed
  const handleSellingPriceChange = (value: string) => {
    setIsManualSellingPriceEdit(true);
    const sellingPriceNum = value === "" ? 0 : parseFloat(value) || 0;
    const mrpNum = typeof mrp === "number" && !isNaN(mrp) ? mrp : 0;

    setValue("sellingPrice", sellingPriceNum, { shouldValidate: true });

    if (mrpNum > 0 && sellingPriceNum >= 0) {
      const calculatedOffer = ((mrpNum - sellingPriceNum) / mrpNum) * 100;
      const roundedOffer = Math.max(0, Math.min(100, Math.round(calculatedOffer * 100) / 100));
      setValue("offerPercent", roundedOffer, { shouldValidate: true });
    }

    // Reset flag after a short delay to allow auto-calculation to resume when MRP/Offer changes
    setTimeout(() => setIsManualSellingPriceEdit(false), 300);
  };

  const handleMRPChange = (value: string) => {
    const mrpNum = value === "" ? 0 : parseFloat(value) || 0;
    setValue("mrp", mrpNum, { shouldValidate: true });
    // Immediately reset manual edit flag so useEffect can calculate selling price
    setIsManualSellingPriceEdit(false);
  };

  const handleOfferChange = (value: string) => {
    const offerNum = parseFloat(value) || 0;
    setValue("offerPercent", offerNum, { shouldValidate: true });
    // Immediately reset manual edit flag so useEffect can calculate selling price
    setIsManualSellingPriceEdit(false);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Pricing</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* MRP */}
        <div>
          <label
            htmlFor="mrp"
            className="block text-sm font-medium text-black mb-2"
          >
            <span className="text-red-500">*</span>MRP
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
            <input
              type="number"
              id="mrp"
              step="0.01"
              min="0"
              value={typeof mrp === "number" && mrp > 0 ? mrp : ""}
              onChange={(e) => handleMRPChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#ffff] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
              placeholder="0"
              aria-invalid={mrpError ? "true" : "false"}
              aria-describedby={mrpError ? "mrp-error" : undefined}
            />
          </div>
          {mrpError && (
            <p id="mrp-error" className="text-sm text-red-400 mt-1" role="alert">
              {mrpError}
            </p>
          )}
        </div>

        {/* Offer % */}
        <div>
          <label
            htmlFor="offerPercent"
            className="block text-sm font-medium text-black mb-2"
          >
            Offer
          </label>
          <select
            id="offerPercent"
            value={typeof offerPercent === "number" ? offerPercent : 0}
            onChange={(e) => handleOfferChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-[#e7e7e7] border border-gray-600 rounded-lg text-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
            aria-invalid={offerError ? "true" : "false"}
            aria-describedby={offerError ? "offer-error" : undefined}
          >
            <option value={0} className="bg-[#ffff]">No Offer</option>
            {[5, 10, 15, 20, 25, 30, 40, 50, 60, 70].map((val) => (
              <option key={val} value={val} className="bg-[#ffff]">
                {val}% Off
              </option>
            ))}
          </select>
          {offerError && (
            <p id="offer-error" className="text-sm text-red-400 mt-1" role="alert">
              {offerError}
            </p>
          )}
        </div>

        {/* Selling Price */}
        <div>
          <label
            htmlFor="sellingPrice"
            className="block text-sm font-medium text-black mb-2"
          >
            Selling Price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black">₹</span>
            <input
              type="number"
              id="sellingPrice"
              step="0.01"
              min="0"
              value={typeof sellingPrice === "number" && sellingPrice > 0 ? sellingPrice : ""}
              onChange={(e) => handleSellingPriceChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#ffffff] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
              placeholder="0"
              aria-invalid={sellingPriceError ? "true" : "false"}
              aria-describedby={sellingPriceError ? "selling-price-error" : undefined}
            />
          </div>
          {sellingPriceError && (
            <p
              id="selling-price-error"
              className="text-sm text-red-400 mt-1"
              role="alert"
            >
              {sellingPriceError}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
