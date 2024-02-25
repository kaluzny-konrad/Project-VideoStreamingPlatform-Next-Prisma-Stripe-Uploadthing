import { db } from "@/db";

type Props = {
  categoryId: string;
};

export default async function AdminCategoryInfo({ categoryId }: Props) {
  const category = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return (
    <div>
      <p>Category name: {category?.name}</p>
      <p>Category slug: {category?.slug}</p>
    </div>
  );
}
