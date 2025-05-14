"use client";

import Layout from "@/components/Layout"; // Import the Layout component
import {
  FAQ,
  Featured,
  FinancialFuture,
  FinancilaFreedom,
  HeroSection,
  JoinSection,
  OffersSection,
} from "@/components";

export default function Home() {
  return (
    <Layout>
      <main>
        <HeroSection />
        <Featured />
        <OffersSection />
        <FinancilaFreedom />
        <FinancialFuture />
        <JoinSection />
        <FAQ />
      </main>
    </Layout>
  );
}
