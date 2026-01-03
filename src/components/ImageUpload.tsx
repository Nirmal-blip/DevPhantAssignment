"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { X, Camera } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  error?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export function ImageUpload({ images, onChange, error }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Only JPG, PNG, and WebP images are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 5MB";
    }
    return null;
  };

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const error = validateFile(file);
        if (error) {
          toast.error(error);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          newImages.push(result);
          if (newImages.length === Array.from(files).length) {
            onChange([...images, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [images, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-black">
        Product Images <span className="text-red-500">*</span>
      </label>

      {/* Image Grid */}
      <div className="grid grid-cols-5 gap-3">
        {/* Existing Images */}
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square border border-gray-600 rounded-lg overflow-hidden bg-[#2a2a2a] group"
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 w-6 h-6 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {images.length < 10 && (
          <label
            htmlFor="image-upload"
            className="aspect-square border-2 border-dashed border-gray-600 rounded-lg bg-[#ffffff] flex flex-col items-center justify-center cursor-pointer hover:border-[#8b5cf6] hover:bg-[#2a2a2a]/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            <Camera className="w-8 h-8 text-black mb-2" />
            <span className="text-xs text-black">Add Image</span>
          </label>
        )}
      </div>

      {/* Image Counter */}
      <p className="text-xs text-gray-500">
        {images.length}/10 images
      </p>

      {error && (
        <p className="text-sm text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
