"use client";

import { trpc } from "@/server/client";
import Image from "next/image";

type Props = {
  creatorId: string;
};

export default function CourseCreator({ creatorId }: Props) {
  const { data: creator, error } = trpc.course.getCourseCreatorInfo.useQuery({
    creatorId,
  });

  return (
    <div>
      {creator ? (
        <div className="space-y-2">
          <h3>{creator.name}</h3>
          <Image src={creator.avatarUrl} alt={creator.name} width={100} height={100} />
        </div>
      ) : null}
    </div>
  );
}
