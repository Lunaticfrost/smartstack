import ProtectedRoute from '../../components/shared/ProtectedRoute';
import TaskList from '../../components/tasks/TaskList';
const Tasks = () => {
  return (
    <ProtectedRoute>
        <TaskList />
    </ProtectedRoute>
  );
};

export default Tasks;