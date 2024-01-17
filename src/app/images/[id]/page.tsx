import { db } from "@/lib/db";
import { Video } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
    params: {
        id: string;
    }
};

export default async function page({ params }: Props) {
    const { id } = params;

    const image = await db.video.findFirst({
        where: {
            id: parseInt(id),
        },
    }) as unknown as Video;

  return <Image src={image.url} width={200} height={200} alt=""></Image>;
}
