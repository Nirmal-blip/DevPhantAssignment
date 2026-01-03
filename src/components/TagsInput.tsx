"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductFormData } from "@/lib/schemas/product-schema";

interface TagsInputProps {
  watch: UseFormWatch<ProductFormData>;
  setValue: UseFormSetValue<ProductFormData>;
}

export function TagsInput({ watch, setValue }: TagsInputProps) {
  const tags = watch("tags") || [];
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setValue("tags", [...tags, trimmedTag], { shouldValidate: true });
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="tags"
        className="block text-sm font-medium text-black"
      >
        Tags
      </label>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-600 rounded-lg bg-[#ffffff] focus-within:ring-2 focus-within:ring-[#8b5cf6] focus-within:border-transparent min-h-[48px]">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-3 py-1 bg-[#ffffff] text-gray-300 rounded-full text-sm border border-gray-600"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-400 hover:text-red-400"
              aria-label={`Remove tag ${tag}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          type="text"
          id="tags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Add tags (press Enter or comma)" : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-white placeholder-gray-500"
        />
      </div>
      <p className="text-xs text-gray-500">
        Press Enter or comma to add a tag
      </p>
    </div>
  );
}
