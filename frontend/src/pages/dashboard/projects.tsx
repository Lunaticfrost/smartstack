import ProtectedRoute from '../../components/shared/ProtectedRoute';
import DashboardLayout from '../../components/dashboardLayout/DashboardLayout';
import ProjectManagement from '../../components/projects/projectManagement';
const ProjectsPage = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectManagement />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default ProjectsPage;