"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Hero from "@/features/home/hero_trust";
import Trusted from "@/features/home/trusted";
import Link from "next/link";
import MitraTestimoni from "@/features/home/mitra_testimoni";
import type { NextPage } from '@/types/routing';
import { Footer } from "@/components/Footer";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <Hero />
      <Trusted />
      <MitraTestimoni />
      <Footer />
    </div>
  );
};

export default Home;