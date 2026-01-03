"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/product-schema";

interface VariantsInputProps {
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

const variantOptions = [
  "Size (Alpha)",
  "Size (Numeric)",
  "Color",
];

export function VariantsInput({ watch, setValue }: VariantsInputProps) {
  const variants = watch("variants") || [];
  const [selectedOption, setSelectedOption] = useState("");

  const addVariant = () => {
    if (!selectedOption.trim()) return;

    const existingVariant = variants.find((v) => v.name === selectedOption);
    if (existingVariant) {
      return; // Already exists
    }

    const updatedVariants = [
      ...variants,
      {
        name: selectedOption,
        options: [],
      },
    ];

    setValue("variants", updatedVariants, { shouldValidate: true });
    setSelectedOption("");
  };

  const removeVariant = (index: number) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setValue("variants", updatedVariants, { shouldValidate: true });
  };

  const addOption = (variantIndex: number, option: string) => {
    if (!option.trim()) return;
    const updatedVariants = [...variants];
    if (!updatedVariants[variantIndex].options.includes(option.trim())) {
      updatedVariants[variantIndex].options.push(option.trim());
      setValue("variants", updatedVariants, { shouldValidate: true });
    }
  };

  const removeOption = (variantIndex: number, optionIndex: number) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].options = updatedVariants[
      variantIndex
    ].options.filter((_, i) => i !== optionIndex);
    setValue("variants", updatedVariants, { shouldValidate: true });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Variants</h3>

      {/* Add Variant Dropdown */}
      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Option name
        </label>
        <div className="flex gap-2">
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-[#f4f4f4] border border-gray-600 rounded-lg text-gray-700 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none"
          >
            <option value="" className="bg-[#fefefe]">Select Option</option>
            {variantOptions.map((option) => (
              <option key={option} value={option} className="bg-[#2a2a2a]">
                {option}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addVariant}
            disabled={!selectedOption.trim()}
            className="px-4 py-2.5 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Existing Variants */}
      {variants.length > 0 && (
        <div className="space-y-4">
          {variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="border border-gray-600 rounded-lg p-4 bg-[#f2f2f2] space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-black">{variant.name}</h4>
                <button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  className="text-gray-400 hover:text-red-400"
                  aria-label={`Remove variant ${variant.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {variant.options.map((option, optionIndex) => (
                  <span
                    key={optionIndex}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#f3f3f3] text-black rounded-full text-sm border border-gray-600"
                  >
                    {option}
                    <button
                      type="button"
                      onClick={() => removeOption(variantIndex, optionIndex)}
                      className="text-gray-400 hover:text-red-400"
                      aria-label={`Remove option ${option}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add option value..."
                  className="flex-1 px-3 py-2 bg-[#f7f7f7] border border-gray-600 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addOption(variantIndex, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {variants.length === 0 && (
        <p className="text-sm text-gray-500 italic">
          No variants added. Variants are optional.
        </p>
      )}
    </div>
  );
}
