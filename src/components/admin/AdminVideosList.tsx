import { db } from '@/db';

import AdminVideoDeleteButton from '@/components/admin/AdminVideoDeleteButton';

export default async function AdminVideosList() {
    const videos = await db.video.findMany();
  
    return (
      <div>
        {videos.map((video) => (
            <div key={video.id}>
                <h2>{video.fileName}</h2>
                <AdminVideoDeleteButton videoId={video.id} />
            </div>
        ))}
      </div>
    );
  }
  