"use client";

import React from 'react';
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { MitraCard } from "@/components/MitraCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { mitraData } from "@/components/data/cardData";
import { testimonialsData } from "@/components/data/testimonialsData";
import Link from "next/link";

const MitraTestimoni: React.FC = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="bg-gray-50 relative">
            <div className="absolute z-0 top-140 -left-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>

            {/* Trust Section */}
            <section className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-16 relative z-10 ">
                <div className="text-left mb-2">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2 tracking-wider">ART & Nanny</h3>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Temukan Asisten Rumah Tangga & Nanny
                    </h2>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div>
                        {/* Mitra Cards Grid */}
                        <div className="flex max-w-[1100px] w-screen overflow-x-auto sm:overflow-hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-1 mb-8 pb-0 py-4 px-4 scrollbar-hide">
                            {mitraData.slice(0, 4).map((mitra) => (
                                <div className="flex-shrink-0 sm:w-auto py-8" key={mitra.id}>
                                    <MitraCard data={mitra} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex w-40 h-10 justify-center items-center bg-gray-50 hover:bg-blue-100 rounded-2xl border-2 border-blue-600 cursor-pointer transition-all duration-300 hover:scale-105">
                        <Link href="/bantuan" className="font-bold text-blue-600">
                            Lihat Semua
                        </Link>
                        <svg className="w-5 h-5 ml-2 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-transparent">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4 tracking-wider">TESTIMONIALS</h3>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Kata Mereka
                    </h2>
                </div>
                <TestimonialCarousel testimonials={testimonialsData} />
            </section>

            
            <section>

            </section>

        </div>
    );
};

export default MitraTestimoni;