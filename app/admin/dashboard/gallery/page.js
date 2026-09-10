"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function GalleryPage() {
  return (
    <CollectionManager
      table="gallery"
      title="Gallery"
      description="Upload images for the project gallery, grouped by category."
      emptyRow={{ category: "Project", image_url: "", caption: "", sort_order: 0 }}
      fields={[
        {
          key: "category",
          label: "Category",
          type: "select",
          options: ["Project", "Villas", "Farmhouses", "Roads", "Development", "Facilities", "Surroundings"],
        },
        { key: "image_url", label: "Image", type: "image", required: true },
        { key: "caption", label: "Caption", type: "text" },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
