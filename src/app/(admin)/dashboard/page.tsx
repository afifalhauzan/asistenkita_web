import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import type { NextPage } from '@/types/routing';
import { DashboardContent } from '@/features/dashboard/DashboardContent';

const DashboardPage: NextPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default DashboardPage;
