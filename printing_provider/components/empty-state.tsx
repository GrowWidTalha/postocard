import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";

const EmptyState = ({
  heading,
  subHeading,
  action,
}: {
  heading: string;
  subHeading: string;
  action?: React.ReactNode,
}) => {
  return (
    <Card className="w-full flex items-center justify-center">
      <CardContent className="flex flex-col items-center">
        <Image
          src={"/empty-state.jpg"}
          alt="Empty State"
          width={300}
          height={300}
          className="mx-auto object-contain selection:bg-transparent selection:text-transparent"
        />
        <CardTitle className="text-center mt-3">{heading}</CardTitle>
        <CardDescription className="text-center mt-2">
          {subHeading}
        </CardDescription>
        <div className="mt-4">
        {action}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
