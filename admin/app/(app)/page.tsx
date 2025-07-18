import DashboardPage from "@/components/dashboard-page";
import Topcard from "@/components/topcard";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {

    return redirect("/orders")
  return (
    <div>
      <DashboardPage title="Dashboard Page" hideBackButton>
        <Topcard />
      </DashboardPage>
    </div>
  );
};

export default Dashboard;
