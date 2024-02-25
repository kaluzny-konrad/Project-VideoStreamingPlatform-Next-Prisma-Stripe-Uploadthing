import { db } from '@/db';
import React from 'react'
import AdminCourseDeleteButton from './AdminCourseDeleteButton';

type Props = {}

export default async function AdminCoursesList({}: Props) {
    const courses = await db.course.findMany();
  
    return (
      <div>
        {courses.map((course) => (
            <div key={course.id}>
                <h2>{course.name}</h2>
                <AdminCourseDeleteButton courseId={course.id} />
            </div>
        ))}
      </div>
    );
  }
  