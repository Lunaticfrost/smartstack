import DashboardLayout from '@/components/dashboardLayout/DashboardLayout';
import TeamManagement from '@/components/teams/TeamManagement';

const TeamPage: React.FC = () => {
  return (
    <DashboardLayout>
      <TeamManagement />
    </DashboardLayout>
  );
};

export default TeamPage;