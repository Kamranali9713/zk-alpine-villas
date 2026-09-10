"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function FarmhousesPage() {
  return (
    <CollectionManager
      table="properties"
      title="Farmhouses"
      description="Add, edit or remove farmhouse listings shown on the public site."
      filter={{ kind: "farmhouse" }}
      fixedValues={{ kind: "farmhouse" }}
      emptyRow={{ title: "", size: "", price: "", description: "", image_url: "", is_active: true, sort_order: 0 }}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "size", label: "Size (e.g. 2 Acres)", type: "text" },
        { key: "price", label: "Price", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image_url", label: "Image", type: "image" },
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "is_active", label: "Published (visible on site)", type: "checkbox" },
      ]}
    />
  );
}
