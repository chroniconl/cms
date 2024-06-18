// TODO clean up types
"use client";
import { Button } from "@/components/ui/button";
import { UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { create } from "zustand";

const useStore = create<{
  images: any[];
  addImages: (newImages: any) => void;
}>((set) => ({
  images: [],
  addImages: (newImages: any) =>
    set((state: any) => ({ images: [...state.images, ...newImages] })),
}));

export default function MediaUploadForm() {
  const images = useStore((state) => state.images);
  const addImages = useStore((state) => state.addImages);

  const onDrop = (acceptedFiles: any) => {
    const newImages = acceptedFiles.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    console.log(newImages);
    addImages(newImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    // Revoke data uris to avoid memory leaks
    return () => images.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [images]);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Upload Images</h2>
        <p className="text-stone-500 dark:text-stone-400">
          Drag and drop your images or click to select files.
        </p>
      </div>
      <div {...getRootProps()} className={"grid gap-4"}>
        <div
          className={`flex items-center justify-center rounded-md border-2 ${
            isDragActive
              ? "border-blue-500"
              : "border-dashed border-stone-300 dark:border-stone-700"
          } p-12 transition-colors duration-300 ease-in-out`}
        >
          <div className="text-center space-y-2">
            <UploadCloudIcon className="mx-auto h-8 w-8 text-stone-400" />
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">
              Drag & drop your images here, or click to select files
            </p>
            <Button>Select files</Button>
            <input
              {...getInputProps()}
              className="hidden"
              type="file"
              multiple
            />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {images?.map((file, index) => (
          <Image
            key={index}
            src={file.preview}
            alt="Uploaded Image"
            className="aspect-square object-cover rounded-md"
            width={300}
            height={300}
          />
        ))}
      </div>
    </div>
  );
}
