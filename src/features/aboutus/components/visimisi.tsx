"use client";

import Img from 'next/image';

export const VisiMisi = () => {
    return (
        <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className='space-y-3'>
                        <div className="bg-white/40 p-6 rounded-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                                Visi Kami
                            </h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Melalui verifikasi yang ketat, transparansi penuh, dan
                                    dukungan berkelanjutan, kami berkomitmen untuk menjadi
                                    platform pilihan utama yang tidak hanya memudahkan
                                    proses pencarian, tetapi juga meningkatkan standar
                                    keseluruhan industri.
                                </p>
                            </div>
                        </div>
                        {/* Left side - Misi */}
                        <div className="bg-white/40 p-6 rounded-2xl ">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
                                Misi Kami
                            </h2>
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    AsistenKita lahir dari pemahaman mendalam akan
                                    tantangan yang dihadapi keluarga Indonesia dalam mencari
                                    bantuan rumah tangga yang dapat dipercaya,
                                    memahami bahwa menemukan asisten yang tepat bukan
                                    hanya tentang keahlian, tetapi juga tentang kepercayaan,
                                    kecocokan nilai, dan keamanan.
                                </p>
                                <p>
                                    Misi kami adalah mengubah cara keluarga dan asisten
                                    terhubung—menciptakan proses yang transparan, aman,
                                    dan efisien untuk kedua belah pihak. Kami percaya bahwa
                                    setiap keluarga berhak mendapatkan bantuan berkualitas,
                                    dan setiap asisten berhak mendapatkan pekerjaan yang
                                    adil dan aman.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Visi */}
                    <div className="h-full flex flex-row items-center justify-center">
                        {/* Family images placeholder */}
                        <div className="space-y-4 h-full flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center">
                                    <Img src="/aboutus_1.png" alt="Family 1" width={300} height={400} className="" />
                                </div>
                                <div className="flex items-center justify-center">
                                    <Img src="/aboutus_2.png" alt="Family 2" width={300} height={400} className="" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <Img src="/aboutus_3.png" alt="Family 2" width={800} height={600} className="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
