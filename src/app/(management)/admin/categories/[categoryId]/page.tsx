import AdminCategoryInfo from "@/components/admin/AdminCategoryInfo";
import React from "react";

type Props = {
  params: {
    categoryId: string;
  };
};

export default function AdminCategoryPage({ params }: Props) {
  const { categoryId } = params;

  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Edit category</h2>

      <h2 className="mb-4 font-bold text-slate-600">Category info</h2>
      <AdminCategoryInfo categoryId={categoryId} />
    </div>
  );
}
