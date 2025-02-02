import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import { RootState } from '@/store';
import { fetchTeams, deleteTeam, Team } from '@/store/slices/teamSlice';
import { Plus, Edit2, Trash2, Search, Users } from 'lucide-react';
import TeamModal from './TeamModal';

const TeamManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { teams, loading, error } = useSelector((state: RootState) => state.teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = () => {
    setSelectedTeam(null);
    setIsModalOpen(true);
  };

  const handleEditTeam = (team: Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        await dispatch(deleteTeam(teamId)).unwrap();
      } catch (error) {
        console.error('Failed to delete team:', error);
      }
    }
  };

  const filteredTeams = teams?.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading teams...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Teams</h1>
            <button 
              onClick={handleCreateTeam}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              <Plus className="mr-2 w-5 h-5" /> Create Team
            </button>
          </div>

          <div className="flex space-x-4 mb-6">
            <div className="relative flex-grow">
              <input 
                type="text"
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeams?.map((team) => (
              <div 
                key={team._id} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold">{team.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditTeam(team)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTeam(team._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                
                <div className="flex items-center text-gray-500 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {team.members.length} members
                </div>
              </div>
            ))}
          </div>

          {(!filteredTeams || filteredTeams.length === 0) && (
            <div className="text-center py-10 text-gray-500">
              No teams found. Create your first team!
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <TeamModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          team={selectedTeam}
        />
      )}
    </div>
  );
};

export default TeamManagement; 