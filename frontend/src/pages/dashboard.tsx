import ProtectedRoute from '../components/shared/ProtectedRoute';
import Dashboard from '../components/dashboard/Dashboard';
import DashboardLayout from '../components/dashboardLayout/DashboardLayout';
const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;