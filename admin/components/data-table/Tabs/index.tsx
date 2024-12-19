"use client";
import { useState } from "react";
import TabItem from "./TabItem";

export interface IItem {
  index: number;
  label: string;
  value: "all" | "risk" | "onHold" | "potentialRisk" | "onTrack" | "archived";
  number: number;
}


const TableTabs = () => {
  const [activeTab, setActiveTab] = useState<IItem["value"]>("all");
  return (
    <div className="flex flex-row items-center gap-5 px-5">

    </div>
  );
};

export default TableTabs;
