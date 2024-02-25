import React from "react";
import { Button } from "./ui/button";

type Props = {};

export default function CoursesPanel({}: Props) {
  return (
    <div className="p-4 bg-white rounded-xl min-h-96">
      <h2 className="mb-6 text-lg font-bold text-slate-800">Filter Courses</h2>
      <p className="mb-2 text-xs font-light uppercase text-slate-400">
        Category
      </p>
      <div className="flex flex-col">
        <Button variant={"ghost"} className="justify-start w-full">
          All
        </Button>
        <Button variant={"ghost"} className="justify-start w-full">
          Design
        </Button>
        <Button variant={"ghost"} className="justify-start w-full">
          Development
        </Button>
        <Button variant={"ghost"} className="justify-start w-full">
          Marketing
        </Button>
      </div>
    </div>
  );
}
