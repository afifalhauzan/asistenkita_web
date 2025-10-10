"use client";

import React, { useRef, useState } from 'react';
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import CountUp from 'react-countup';
import { motion, useInView } from 'framer-motion';
import Img from "next/image";

const Trusted: React.FC = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const statsRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(statsRef, { once: true, amount: 0.3 });
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);

    if (isInView && !hasAnimated) {
        setHasAnimated(true);
    }

    return (
        <div className="min-h-screen">
            <main className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col md:flex-row gap-5 md:gap-12 lg:gap-8 xl:gap-20 items-center justify-start">
                    <div className="flex-1 w-full relative">
                        <div className="absolute top-20 md:-top-10">
                            <Img
                                src="/orang_hero.png"
                                alt="Trusted Person"
                                width="300"
                                height="450"
                                className="w-80 sm:w-100 md:w-115 lg:w-140 xl:w-160"
                            />
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-12 right-12 w-12 h-12 bg-blue-300 rounded-full opacity-60 animate-float"></div>
                        <div className="absolute bottom-30 left-15 w-12 h-12 bg-yellow-300 rounded-full opacity-70 animate-float"></div>

                        {/* Background Circle */}
                        <div className="absolute inset-0 opacity-20 transform scale-110"></div>

                        <div className="flex z-10 rounded-3xl p-0 sm:p-8 py-6 sm:py-0 items-center justify-center">

                            <div className="w-full h-96 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                {/* Floating Elements */}
                                <div className="absolute top-5 md:top-30 -right-0 md:right-10 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                    Temukan bantuan
                                </div>
                                <div className="absolute w-1/3 text-center bottom-12 right-50 md:left-12 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                    Temukan bantuan
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Side - Content */}
                    <div className="flex-1 space-y-10 md:max-w-2/5">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                Platform Terpercaya
                            </h2>

                            <p className="text-md md:text-lg text-gray-600 leading-relaxed text-justify">
                                Kami berdedikasi untuk membangun komunitas yang
                                aman dan terpercaya. Lihat bagaimana kami telah
                                membantu ribuan keluarga menemukan asisten yang
                                tepat untuk menciptakan ketenangan di rumah.
                            </p>
                        </div>

                        {/* Statistics Grid */}
                        <motion.div
                            ref={statsRef}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="grid grid-cols-2 gap-4 md:gap-8"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6"
                            >
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    {hasAnimated && (
                                        <CountUp
                                            start={0}
                                            end={1000}
                                            duration={3}
                                            separator=","
                                            suffix="+"
                                        />
                                    )}
                                    {!hasAnimated && "0+"}
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Asisten Terverifikasi
                                </div>
                            </motion.div>

                            {/* 500+ Keluarga Terdaftar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6"
                            >
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    {hasAnimated && (
                                        <CountUp
                                            start={0}
                                            end={500}
                                            duration={3}
                                            separator=","
                                            suffix="+"
                                        />
                                    )}
                                    {!hasAnimated && "0+"}
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Keluarga Terdaftar
                                </div>
                            </motion.div>

                            {/* 98% Tingkat Kepuasan */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6"
                            >
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    {hasAnimated && (
                                        <CountUp
                                            start={0}
                                            end={98}
                                            duration={3}
                                            suffix="%"
                                        />
                                    )}
                                    {!hasAnimated && "0%"}
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Tingkat Kepuasan
                                </div>
                            </motion.div>

                            {/* 24/7 Dukungan */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6"
                            >
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    {hasAnimated && (
                                        <CountUp
                                            start={0}
                                            end={24}
                                            duration={3}
                                            suffix="/7"
                                        />
                                    )}
                                    {!hasAnimated && "0/7"}
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Dukungan
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Trusted;