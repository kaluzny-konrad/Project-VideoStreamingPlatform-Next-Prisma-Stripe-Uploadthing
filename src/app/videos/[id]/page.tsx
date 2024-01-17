import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default function page({ params }: Props) {
  const { id } = params;
  return <div>
    {id}
  </div>;
}
