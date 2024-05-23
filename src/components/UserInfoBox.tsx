import { User } from "@prisma/client";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type PartialUser = Pick<User, "name" | "image">;

type Props = {
  user: PartialUser;
  title?: string;
};

export default function UserInfoBox({ user, title }: Props) {
  return (
    <div className="flex flex-row items-center justify-center w-full gap-2 p-4 bg-gray-200 lg:w-fit rounded-xl lg:flex-col lg:min-w-48">
      <Avatar className="mr-2 lg:mr-0">
        <AvatarImage src={user.image || ""} alt={user.name || ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
      <div className="justify-center text-sm text-center">
        {title && <p className="font-bold">{title}</p>}
        <p>{user.name}</p>
      </div>
    </div>
  );
}
