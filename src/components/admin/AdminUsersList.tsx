import { db } from "@/db";

import AdminUserDeleteButton from "@/components/admin/AdminUserDeleteButton";

export default async function AdminUsersList() {
  const users = await db.user.findMany();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.username}</h2>
          <h2>{user.email}</h2>
          <AdminUserDeleteButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}
