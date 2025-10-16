import PekerjaanDetails from '@/features/pekerjaan/PekerjaanDetails';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

export default async function PekerjaanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="">
                <PekerjaanDetails lowonganId={id} />
            </main>
            <Footer />
        </div>
    );
}
