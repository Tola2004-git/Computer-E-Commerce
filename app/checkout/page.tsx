import { Metadata } from "next"
import CheckoutClient from "@/components/checkout-client"

export const metadata: Metadata = {
  title: "Checkout | Computer Shop",
  description: "Review your cart and payment details before completing your purchase.",
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <CheckoutClient />
    </main>
  )
}
