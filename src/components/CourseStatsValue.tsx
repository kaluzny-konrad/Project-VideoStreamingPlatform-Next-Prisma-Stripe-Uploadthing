import React from "react";

type Props = {
  Icon: React.ElementType;
  text: string;
  value: string | number;
};

export default function CourseStatsValue({ Icon, text, value }: Props) {
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <Icon size={24} />
      <div className="text-xs">
        <p>{text}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
