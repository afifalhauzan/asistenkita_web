"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { useAuth } from '../auth/hooks/useAuth';

export const AboutUs = () => {
    const { user } = useAuth();
    return (
        <div className="overflow-hidden bg-gray-50 relative z-10 flex flex-col items-center md:justify-start ">
            <div className="max-w-6xl w-full px-6 md:px-8 py-8 mt-20 md:mt-32">
                {/* Hero Section */}
                <div className="md:text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Misi Kami: Membangun Kembali<br />
                        <span className="text-blue-600">Kepercayaan di Setiap Rumah</span>
                    </h1>
                    <p className="text-md md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
                        AsistenKita lahir dari sebuah krisis senyap yang terjadi di jutaan rumah di seluruh Indonesia: 
                        runtuhnya rasa percaya dalam sektor pekerja domestik. Di satu sisi, keluarga hidup dalam kecemasan 
                        saat mencari bantuan rumah tangga, dihadapkan pada risiko penipuan dan keamanan yang mengancam ketenangan. 
                        Di sisi lain, jutaan Asisten Rumah Tangga (ART), yang mayoritasnya adalah perempuan bekerja tanpa perlindungan, 
                        rentan terhadap eksploitasi di tengah ketiadaan payung hukum yang pasti.
                    </p>
                </div>

                {/* Problem & Solution */}
                <div className="bg-white rounded-3xl box-shadow-default p-8 md:p-12 mb-16">
                    <p className="text-md md:text-lg text-gray-700 leading-relaxed mb-6">
                        Kami melihat ini bukan sekadar masalah individu, melainkan sebuah <strong>kegagalan sistem</strong>. 
                        Kanal informal seperti media sosial terbukti tidak aman, sementara agen konvensional seringkali tidak konsisten. 
                        Fenomena akun "blacklist" di media sosial adalah bukti keputusasaan publik akan adanya platform yang aman dan terverifikasi.
                    </p>
                    <p className="text-md md:text-lg text-gray-700 leading-relaxed">
                        Karena itulah AsistenKita hadir. Kami bukan sekadar platform pencari kerja. Kami adalah sebuah 
                        <strong className="text-blue-600"> infrastruktur sosial digital</strong> yang dirancang untuk menjadi jembatan kepercayaan. 
                        Misi kami adalah mereformasi ekosistem kerja domestik dengan memperkenalkan standar keamanan, transparansi, 
                        dan profesionalisme yang seharusnya sudah ada sejak lama. Kami percaya, setiap keluarga berhak atas 
                        <strong className="text-blue-600"> ketenangan pikiran</strong>, dan setiap pekerja berhak atas 
                        <strong className="text-blue-600"> pekerjaan yang layak dan bermartabat</strong>.
                    </p>
                </div>

                {/* How It Works Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                        Bagaimana AsistenKita Bekerja?
                    </h2>
                    <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                        Sebuah Alur yang Dirancang untuk Keamanan dan Kemudahan
                    </p>

                    {/* For Families Section */}
                    <div className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-8 text-center">
                            Untuk Keluarga (Pencari Asisten)
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-600 font-bold">1</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Pendaftaran Terverifikasi</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Anda mendaftar sebagai "Pencari Asisten" dan melakukan verifikasi email untuk 
                                    memastikan keamanan akun Anda sejak awal.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-600 font-bold">2</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Jelajahi Profil Profesional</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Setelah masuk, Anda bisa langsung menelusuri ratusan profil ART di halaman Explore. 
                                    Setiap kartu profil menampilkan informasi kunci seperti foto, keahlian, lokasi, 
                                    dan yang terpenting, lencana "Terverifikasi".
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-600 font-bold">3</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Gunakan Filter Canggih</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Hemat waktu Anda dengan memanfaatkan filter pencarian spesifik untuk menemukan 
                                    kandidat yang paling sesuai dengan kebutuhan—mulai dari lokasi, pengalaman, 
                                    hingga keahlian khusus.
                                </p>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-blue-600 font-bold">4</span>
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Hubungi Secara Aman</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    Temukan kandidat yang cocok? Anda bisa melihat profil lengkap mereka dan memulai 
                                    komunikasi melalui platform kami, tanpa perlu membagikan kontak pribadi di tahap awal.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* For ART Section */}
                    <div className="mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-8 text-center">
                            Untuk Asisten Rumah Tangga (Pekerja Profesional)
                        </h3>
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-green-600 font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Bangun Profil Profesional Anda</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            Setelah mendaftar sebagai "Asisten," Anda akan melalui proses onboarding terstruktur 
                                            untuk membangun portofolio digital Anda—mulai dari data diri, keahlian, riwayat kerja, 
                                            hingga preferensi pekerjaan (menginap atau pulang-pergi).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-green-600 font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Verifikasi Identitas Anda</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            Unggah dokumen identitas Anda untuk mendapatkan status "Terverifikasi", sebuah lencana 
                                            kepercayaan yang akan membuat profil Anda lebih menonjol dan dipercaya oleh ribuan keluarga.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-green-600 font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Dapatkan Akses ke Peluang Kerja Aman</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            Profil Anda akan muncul di halaman Explore, memberikan Anda akses ke peluang kerja 
                                            dari keluarga yang identitasnya juga telah kami verifikasi, mengurangi risiko penipuan dan eksploitasi.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-green-600 font-bold">4</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Dapatkan Perlindungan Kerja</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            Saat kesepakatan tercapai, Kontrak Digital memastikan hak-hak Anda, seperti upah 
                                            dan waktu istirahat, terlindungi secara tertulis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 box-shadow-default">
                                <div className="flex items-start">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                                        <span className="text-green-600 font-bold">5</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Bangun Reputasi Anda</h4>
                                        <p className="text-gray-700 leading-relaxed">
                                            Setelah pekerjaan selesai, Anda dan keluarga bisa saling memberikan ulasan. Review positif 
                                            akan membangun rekam jejak digital Anda, membuka jalan untuk mendapatkan pekerjaan yang 
                                            lebih baik dengan negosiasi gaji yang lebih kuat di masa depan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Team Section */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        Tim Kami
                    </h2>
                    <div className="grid md:grid-cols-3 gap-2 md:gap-8">
                        <div className="bg-white rounded-2xl p-6 text-center box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">AL</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Afiif Al Hauzaan Alfian</h3>
                            <p className="text-blue-600 font-medium">Developer</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center    box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">Atha Azzahra Khairun Nisa</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Atha Azzahra Khairun Nisa</h3>
                            <p className="text-green-600 font-medium">Product Manager & UX Strategist</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">Elvira Rosa Khoirunnisa</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Elvira Rosa Khoirunnisa</h3>
                            <p className="text-purple-600 font-medium">UI/UX Designer</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Siap Memulai Perjalanan Anda?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link 
                                href="/bantuan" 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Jelajahi ART Sekarang
                            </Link>
                        ) : (
                            <>
                                <Link 
                                    href="/signup" 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Daftar Sebagai ART
                                </Link>
                                <Link 
                                    href="/bantuan" 
                                    className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-xl border-2 border-blue-600 transition-all duration-300"
                                >
                                    Cari Asisten
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="absolute -top-20 -left-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>
            <div className="absolute bottom-60 -right-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>

        </div>
    );
}