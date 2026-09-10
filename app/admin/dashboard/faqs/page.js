"use client";

import { CollectionManager } from "@/components/admin/CollectionManager";

export default function FaqsPage() {
  return (
    <CollectionManager
      table="faqs"
      title="FAQs"
      description="Manage the frequently asked questions shown on the site."
      emptyRow={{ question: "", answer: "", sort_order: 0 }}
      fields={[
        { key: "question", label: "Question", type: "text", required: true },
        { key: "answer", label: "Answer", type: "textarea", required: true },
        { key: "sort_order", label: "Sort Order", type: "number" },
      ]}
    />
  );
}
