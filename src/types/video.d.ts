import { Video } from "@prisma/client";

export type VideoOnList = {
  id: string;
  name: string;
};

export type VideoToWatch = {
    id: string;
    name: string;
    url: string;
}