import ProtectedRoute from '../components/shared/ProtectedRoute';
import TaskList from '../components/tasks/TaskList';
import DashboardLayout from '../components/dashboardLayout/DashboardLayout';
const Tasks = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <TaskList />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Tasks;