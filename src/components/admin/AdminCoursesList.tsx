import { db } from '@/db';

import AdminCourseDeleteButton from '@/components/admin/AdminCourseDeleteButton';

export default async function AdminCoursesList() {
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
  