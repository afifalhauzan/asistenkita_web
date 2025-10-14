"use client";

import { Shield, Eye, MessageSquare, HelpCircle } from 'lucide-react';

export const Komitmen = () => {
    const commitments = [
        {
            icon: Shield,
            title: "Keamanan adalah Prioritas",
            description: "Kami menawarkan berbagai pemeriksaan verifikasi latar belakang dan identitas, pemanfaatan platform berkelanjutan, untuk membantu Anda membuat pilihan yang lebih aman.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: Eye,
            title: "Transparansi yang Lebih Baik",
            description: "Dengan profil dan ulasan yang detail, serta standar komunitas dan kebijakan harga yang transparan—kami berkomitmen untuk memberdayakan Anda dalam membuat keputusan yang tepat dan percaya diri.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: MessageSquare,
            title: "Peningkatan Berkelanjutan",
            description: "Kami berdedikasi untuk menyederhanakan cara Anda menemukan atau menyediakan layanan berkualitas melalui peningkatan pencarian yang intuitif, fitur percakapan yang efisien, percakapan cerdas, dan banyak lagi.",
            gradient: "from-blue-500 to-blue-600"
        },
        {
            icon: HelpCircle,
            title: "Dukungan di Setiap Langkah",
            description: "Dan membantu Anda menavigasi platform kami hingga bantuan untuk keengganan Anda—tim kami hadir 24/7 untuk memastikan pengalaman Anda memenuhi ekspektasi bantuan yang tepat.",
            gradient: "from-blue-500 to-blue-600"
        }
    ];

    return (
        <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Komitmen Kami untuk Keamanan Anda
                </h2>
                <p className="text-md md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Keamanan adalah fondasi dari setiap hubungan kerja yang sehat. Kami membangun sistem berlapis untuk 
                    melindungi keluarga dan asisten di setiap tahap.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {commitments.map((commitment, index) => {
                    const IconComponent = commitment.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${commitment.gradient} flex items-center justify-center mb-6`}>
                                <IconComponent className="w-8 h-8 text-white" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {commitment.title}
                            </h3>
                            
                            <p className="text-gray-600 leading-relaxed">
                                {commitment.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
