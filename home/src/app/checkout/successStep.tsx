"use client"

import { motion } from "framer-motion"
import { CheckCircle, Package, Truck } from "lucide-react"
// @ts-ignore
export const SuccessStep = ({ orderData, totalPrice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
      >
        <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-green-600"
      >
        Payment Successful!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xl text-gray-600"
      >
        Thank you for your purchase. Your order of <span className="font-semibold text-green-500">${totalPrice}</span>{" "}
        has been placed successfully.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center space-x-8 mt-8"
      >
        <OrderStep icon={Package} text="Order Received" />
        <OrderStep icon={Truck} text="Preparing for Print" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-6 bg-green-50 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4 text-green-700">What's Next?</h3>
        <p className="text-gray-600">
          We'll send print your card with you selected design and custom text in no time through mail. if you have any questions, please don't hesitate to contact our customer support.
        </p>
      </motion.div>
    </motion.div>
  )
}
// @ts-ignore
const OrderStep = ({ icon: Icon, text }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center space-y-2">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <Icon className="w-8 h-8 text-green-600" />
    </div>
    <p className="text-sm font-medium text-gray-600">{text}</p>
  </motion.div>
)
