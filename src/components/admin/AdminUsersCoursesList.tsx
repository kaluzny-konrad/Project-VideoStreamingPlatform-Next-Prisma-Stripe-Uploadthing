import { db } from "@/db";

import AdminUserCourseDeleteButton from "@/components/admin/AdminUserCourseDeleteButton";

export default async function AdminUsersCoursesList() {
  const users = await db.user.findMany({
    include: {
      CoursesOwnedByUser: true,
    },
  });

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <h2>{user.email}</h2>
          <>
            {user.CoursesOwnedByUser.map((course) => (
              <div key={course.id}>
                <h2>{course.name}</h2>
                <AdminUserCourseDeleteButton
                  userId={user.id}
                  courseId={course.id}
                />
              </div>
            ))}
          </>
        </div>
      ))}
    </div>
  );
}
