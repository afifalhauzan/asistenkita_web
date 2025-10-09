"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Hero from "@/features/home/hero_trust";
import Trusted from "@/features/home/trusted";
import Link from "next/link";

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> */}
      <Hero />
      <Trusted />
    </div>
  );
}