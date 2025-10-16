import PekerjaanDetails from '@/features/pekerjaan/PekerjaanDetails';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default function PekerjaanDetailPage({
  params,
}: {
  params: { id: string };
}) {
     return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="">
                <PekerjaanDetails lowonganId={params.id} />
            </main>
            <Footer />
        </div>
    );
}
