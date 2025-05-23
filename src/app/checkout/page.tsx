import { auth } from "../../../auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout page",
};

export default async function CheckoutPage() {
  const session = await auth();

  if (!session.user) {
    redirect("/sign-in?callbackUrl=/checkout");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="mt-4">This is the checkout page.</p>
    </div>
  );
}
