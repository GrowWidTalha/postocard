import DashboardPage from '@/components/dashboard-page'
import { getAllOrders } from '@/features/orders/actions/orders.action'
import React from 'react'
import OrdersClient from './OrdersClient'
import { Spinner } from '@/components/spinner'

const OrdersPage = async() => {
    const orders = await getAllOrders()
    console.log("Orders page")
    console.log(orders)
    if(!orders){
        return <Spinner size={"large"} />
    }
  return (
    <DashboardPage title='Orders' hideBackButton>
        {/* @ts-ignore */}
        <OrdersClient orders={orders} />
    </DashboardPage>
  )
}

export default OrdersPage
