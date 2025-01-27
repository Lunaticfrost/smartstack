import ProtectedRoute from '../../components/shared/ProtectedRoute';
import DashboardLayout from '../../components/dashboardLayout/DashboardLayout';
import Analytics from '../../components/analytics/Analytics';
const AnalyticsPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Analytics />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default AnalyticsPage;