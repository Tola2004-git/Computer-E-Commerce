import Link from "next/link"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-sm text-center">
        <h1 className="text-3xl font-semibold text-foreground">Payment complete</h1>
        <p className="mt-4 text-sm text-muted-foreground">Thank you — your payment was successful and your order is being processed.</p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/" className="rounded-2xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">Back to shop</Link>
          <Link href="/" className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">View orders</Link>
        </div>
      </div>
    </main>
  )
}
