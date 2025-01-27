import DashboardPage from "@/components/dashboard-page";
import Topcard from "@/components/topcard";
<<<<<<< HEAD
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <DashboardPage title="Dashboard Page" hideBackButton>
        <Topcard />
      </DashboardPage>
    </div>
  );
=======
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {


    return redirect("/designs")
//   return (
//     // <div>
//     //   <DashboardPage title="Dashboard Page" hideBackButton>
//     //     <Topcard />
//     //   </DashboardPage>
//     // </div>
//   );
>>>>>>> 41e2ed688c58c9ff04da4c17fe54ab47913bf8bf
};

export default Dashboard;
