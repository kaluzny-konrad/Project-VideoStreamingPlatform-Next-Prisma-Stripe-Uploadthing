import { db } from '@/db';
import React from 'react'
import AdminCategoriesDeleteButton from './AdminCategoriesDeleteButton';

type Props = {}

export default async function AdminCategoriesList({}: Props) {
    const categories = await db.category.findMany();
  
    return (
      <div>
        {categories.map((category) => (
            <div key={category.id}>
                <h2>{category.name}</h2>
                <AdminCategoriesDeleteButton categoryId={category.id} />
            </div>
        ))}
      </div>
    );
  }
  