import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BITEHAUS | Fast Flavor. No Compromise. — Lakewood, NJ",
  description:
    "BITEHAUS is Lakewood's boldest fast food cafe. Smash burgers, loaded pizzas, gourmet sandwiches & thick milkshakes. Dine-in, takeaway & delivery. Located at 82 Maple Street, Lakewood, NJ.",
  keywords: [
    "BITEHAUS",
    "Lakewood restaurant",
    "Lakewood fast food",
    "vegetarian cafe New Jersey",
    "burger pizza sandwich Lakewood",
    "food delivery Lakewood NJ",
  ],
  openGraph: {
    title: "BITEHAUS | Fast Food Cafe",
    description: "Bold flavors, zero compromise. Best fast food in Lakewood, NJ.",
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
