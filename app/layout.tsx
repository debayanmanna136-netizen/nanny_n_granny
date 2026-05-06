import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nani N Granny | Fast Flavor. No Compromise. — Hindmotor, Kolkata",
  description:
    "Nani N Granny is Hindmotor's boldest fast food cafe. Smash burgers, loaded pizzas, gourmet sandwiches & thick milkshakes. Dine-in, takeaway & delivery. Located at 41/15 R.G. Nagar Road, Konnagar.",
  keywords: [
    "Nani N Granny",
    "Hindmotor restaurant",
    "Konnagar fast food",
    "vegetarian cafe Hooghly",
    "burger pizza sandwich Hindmotor",
    "food delivery Konnagar",
  ],
  openGraph: {
    title: "Nani N Granny | Fast Food Cafe",
    description: "Bold flavors, zero compromise. Best fast food in Hindmotor, Kolkata.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
