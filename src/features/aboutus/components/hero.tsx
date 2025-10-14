"use client";

import { LogoFull } from '../../../components/LogoFull';

export const Hero = () => {
    return (
        <div className="text-center py-6 md:py-24">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-blue-600 mb-6">
                AsistenKita
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Platform aman yang menghubungkan keluarga dengan Asisten Rumah Tangga & 
                Nanny terverifikasi di seluruh Indonesia.
            </p>
            
            {/* Two columns for ART and Majikan */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto">
                {/* Sebagai ART */}
                <div className="bg-white rounded-2xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Sebagai ART</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Setiap calon pekerja kami dorong untuk melewati 
                        proses verifikasi identitas, 
                        untuk keamanan Anda.
                    </p>
                </div>
                
                {/* Sebagai Majikan */}
                <div className="bg-white rounded-2xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Sebagai Majikan</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Sediakan ekspektasi yang 
                        jelas dari awal dengan fitur 
                        kontrak digital kami untuk 
                        menghindari 
                        kesalahpahaman.
                    </p>
                </div>
            </div>
        </div>
    );
};
