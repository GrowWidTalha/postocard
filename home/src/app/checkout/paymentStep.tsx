"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PayPalButton from "@/components/PayPalButton"

interface PaymentStepProps {
  totalPrice: number;
  onPayment: (transactionId: string) => void;
}

export const PaymentStep: React.FC<PaymentStepProps> = ({ totalPrice, onPayment }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handlePayment = (transactionId: string) => {
    setIsProcessing(true)

    onPayment(transactionId)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Payment Details</h2>
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between items-center">
          <span>Total</span>
          <span className="text-2xl font-bold text-blue-600">${totalPrice}</span>
        </div>
      </div>
      <div className="space-y-4">
      <PayPalButton
    //   @ts-ignore
        price={totalPrice}
        // @ts-ignore
        onSuccess={handlePayment}

      />
      </div>
    </div>
  )
}
