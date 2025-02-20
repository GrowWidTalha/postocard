"use client";

import { Design } from "@prisma/client";
import { useState } from "react";


const DesignPageClient = ({ design }: { design: Design }) => {

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-2xl font-semibold mb-4">{design.name}</h2>

    </div>
  );
};

export default DesignPageClient;
