import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import type { NextPage } from '@/types/routing';
import { ProfileContent } from '@/features/profile/ProfileContent';

const ProfilePage: NextPage = () => {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
};

export default ProfilePage;
