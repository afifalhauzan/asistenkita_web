import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import type { NextPage } from '@/types/routing';
import { ProfileContent } from '@/features/profile/ProfileContent';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const ProfilePage: NextPage = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <ProfileContent />
      <Footer />
    </ProtectedRoute>
  );
};

export default ProfilePage;
