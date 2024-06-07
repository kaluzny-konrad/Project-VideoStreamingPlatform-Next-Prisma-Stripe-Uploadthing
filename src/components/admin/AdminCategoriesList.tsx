import { db } from '@/db';

import AdminCategoriesDeleteButton from '@/components/admin/AdminCategoriesDeleteButton';

export default async function AdminCategoriesList() {
    const categories = await db.category.findMany();
  
    return (
      <div>
        {categories.map((category) => (
            <div key={category.id} data-test={`category-row-${category.slug}`}>
                <h2>{category.name}</h2>
                <AdminCategoriesDeleteButton categoryId={category.id} />
            </div>
        ))}
      </div>
    );
  }
  