import DashboardPage from '@/components/dashboard-page'
import { getAllOrders } from '@/features/orders/actions/orders.action'
import React from 'react'
import OrdersClient from './OrdersClient'
import { Spinner } from '@/components/spinner'

const OrdersPage = async () => {
    const orders = await getAllOrders()
    console.log(orders)
    if (!orders) {
        return <Spinner size={"large"} />
    }
    return (
        <DashboardPage title='Orders' >
            {/* @ts-ignore */}
            <OrdersClient orders={orders.data} />
        </DashboardPage>
    )
}

export default OrdersPage
