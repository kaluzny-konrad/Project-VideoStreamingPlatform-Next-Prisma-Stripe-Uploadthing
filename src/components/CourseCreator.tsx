"use client";

import { trpc } from "@/server/client";
import Image from "next/image";
import UserInfoBox from "./UserInfoBox";

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
        <>
          <UserInfoBox user={creator} title="Autor" />
        </>
      ) : null}
    </div>
  );
}
