import DashboardPage from '@/components/dashboard-page'
import Topcard from '@/components/topcard'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
    <DashboardPage title='Dashboard Page' hideBackButton>
    </DashboardPage>
    <Topcard/>
    </div>
  )
}

export default Dashboard
