"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function FacilitiesPage() {
  return (
    <CollectionManager
      table="facilities"
      title="Facilities"
      description="Manage the amenities grid (Gas, Electricity, Water, Security, etc.)."
      emptyRow={{ name: "", description: "", icon: "sparkle", sort_order: 0 }}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        {
          key: "icon",
          label: "Icon",
          type: "select",
          options: ["flame", "bolt", "droplet", "shield", "book", "moon", "cross", "tree", "sparkle"],
        },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
