import UploadZone from "@/components/UploadZone";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <p>Upload zone:</p>
      <UploadZone />
    </div>
  );
}
