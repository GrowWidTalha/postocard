"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Select from "react-select";
import { useCartStore } from "../../hooks/useCart";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PayPalButton from "@/components/PayPalButton";
// import { placeOrder } from "./actions"

// Assuming these are your country and province options
const countryOptions = [
  { value: "sri-lanka", label: "Sri Lanka" },
  { value: "usa", label: "United States" },
  // Add more countries as needed
];

const provinceOptions = [
  { value: "western", label: "Western Province" },
  { value: "central", label: "Central Province" },
  // Add more provinces as needed
];

const schema = z.object({
  userId: z.string().optional(),
  guestEmail: z.string().email("Invalid email address").optional(),
  designId: z.string().min(1, "Design ID is required"),
  customMessage: z.string().min(1, "Custom message is required"),
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
});

type FormData = z.infer<typeof schema>;

const CheckoutPage = () => {
  const { items } = useCartStore();
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    // Check if all required fields are filled
    const hasErrors = Object.keys(errors).length > 0;
    setIsFormValid(!hasErrors);
  }, [errors]);

  const onSubmit = async (data: FormData) => {
    try {
      //   const result = await placeOrder(data)
      console.log("Order placed successfully:", data);
      // Handle successful order placement (e.g., show confirmation, clear cart, etc.)
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleGuestCheckout = () => {
    setIsGuestCheckout(true);
    setShowLoginDialog(false);
  };

  const handleLogin = () => {
    // Implement login logic here
    setShowLoginDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg p-8 md:p-12">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                name="recipientName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Recipient Name" />
                )}
              />
              <Controller
                name="recipientAddress"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Recipient Address" />
                )}
              />
              <Controller
                name="senderName"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Sender Name (Optional)" />
                )}
              />
              <Controller
                name="senderAddress"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Sender Address (Optional)" />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder="Country / Region"
                  />
                )}
              />
              <Controller
                name="province"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={provinceOptions}
                    placeholder="Province"
                  />
                )}
              />
              <Controller
                name="streetAddress"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Street Address" />
                )}
              />
              <Controller
                name="townCity"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Town / City" />
                )}
              />
              <Controller
                name="zipCode"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="ZIP Code" />
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} placeholder="Phone" />}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="Email Address" />
                )}
              />
              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} placeholder="Additional Information" />
                )}
              />
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4 mb-6">
                <div className="flex justify-between">
                  <Image
                    src={item.thumbnailUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={40}
                    height={40}
                  />
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4">
                  <span>Total</span>
                  <span className="text-orange-500">
                    ${items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className={`space-y-4 ${!isFormValid ? 'filter blur-sm' : ''}`}>
              {/* Paypal button */}
              <PayPalButton price={items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} disabled={isFormValid}/>
            </div>
            <p className="text-gray-600 text-sm mt-4">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
