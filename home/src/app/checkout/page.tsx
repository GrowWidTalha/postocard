"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useCartStore } from "../../hooks/useCart"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { InformationStep } from "./informationStep"
import { PaymentStep } from "./paymentStep"
import { SuccessStep } from "./successStep"
import { placeOrder } from "@/features/designs/actions/order.actions"
import { useDesignStore } from "@/hooks/store"

const schema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientAddress: z.string().min(1, "Recipient address is required"),
  senderName: z.string().optional(),
  senderAddress: z.string().optional(),
  country: z.object({ value: z.string(), label: z.string() }),
  province: z.object({ value: z.string(), label: z.string() }),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const CheckoutFlow = () => {
  const {clearCart} = useCartStore()
  const {resetDesignStore} = useDesignStore()
  const [step, setStep] = useState(1)
  const { items } = useCartStore()
  const [orderData, setOrderData] = useState<FormData | null>(null)
  const [paymentId, setPaymentId] = useState("")
  const { fromText, toText } = useDesignStore()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipientName: "",
      recipientAddress: "",
      senderName: "",
      senderAddress: "",
      country: { value: "", label: "" },
      province: { value: "", label: "" },
      streetAddress: "",
      townCity: "",
      zipCode: "",
      phone: "",
      email: "",
      additionalInfo: "",
    },
  })

  const onSubmit = (data: FormData) => {
    setOrderData(data)
    setStep(2)
  }

  const handlePayment = async(transactionId: string) => {
    // Simulate payment process
    setPaymentId(transactionId)

    console.log("got all the reuired details")
    console.log({ orderData, transactionId})
    await placeOrder({
        email: orderData?.email!,
        paypalPaymentId: transactionId,
        recipientAddress: orderData?.recipientAddress!,
        recipientName: orderData?.recipientName!,
        senderAddress: orderData?.senderAddress,
        senderName: orderData?.senderName,
        from: fromText,
        to: toText
    }, items[0])

    clearCart()
    resetDesignStore()
    setStep(3)
  }

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Checkout</h1>
        <div className="mb-8 flex justify-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-2 ${
                step >= i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && <InformationStep form={form} />}
            {/* @ts-ignore */}
            {step === 2 && <PaymentStep totalPrice={totalPrice} onPayment={handlePayment} />}
            {step === 3 && <SuccessStep orderData={orderData} totalPrice={totalPrice} />}
            {step === 1 && (
              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CheckoutFlow
